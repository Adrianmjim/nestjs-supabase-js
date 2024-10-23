import { DynamicModule, Module } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseCoreModule } from './SupabaseCoreModule';
import { SupabaseCoreModuleProvider } from './SupabaseCoreModuleProvider';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';
import { getSupabaseClientId } from '../utils/getSupabaseClientId';

@Module({})
export class SupabaseModule {
  public static forRoot(nestSupabaseConfig: NestSupabaseConfig): DynamicModule {
    return {
      imports: [SupabaseCoreModule.forRoot(nestSupabaseConfig)],
      module: SupabaseModule,
    };
  }

  public static forRootAsync(nestSupabaseConfigAsync: NestSupabaseConfigAsync): DynamicModule {
    return {
      imports: [SupabaseCoreModule.forRootAsync(nestSupabaseConfigAsync)],
      module: SupabaseModule,
    };
  }

  public static injectClient(...clientNames: string[]): DynamicModule {
    const initialDynamicModule: DynamicModule = {
      exports: [],
      module: SupabaseModule,
      providers: [],
    };

    const resolvedClientNames: (string | undefined)[] = [...clientNames];

    if (resolvedClientNames.length === 0) {
      resolvedClientNames.push(undefined);
    }

    const supabaseModule: DynamicModule = resolvedClientNames.reduce<DynamicModule>(
      (dynamicModule: DynamicModule, clientName: string | undefined): DynamicModule => {
        const supabaseClientId: string | typeof SupabaseClient = getSupabaseClientId(clientName);

        dynamicModule.exports?.push(supabaseClientId);
        dynamicModule.providers?.push({
          inject: [SupabaseCoreModuleProvider],
          provide: supabaseClientId,
          useFactory: (supabaseCoreModuleProvider: SupabaseCoreModuleProvider) =>
            supabaseCoreModuleProvider.getClient(clientName),
        });

        return dynamicModule;
      },
      initialDynamicModule,
    );

    return supabaseModule;
  }
}
