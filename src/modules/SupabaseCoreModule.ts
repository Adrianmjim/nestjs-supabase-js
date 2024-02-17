import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { createNestSupabaseConfigFactory } from './createNestSupabaseConfigFactory';
import { SupabaseCoreModuleProvider } from './SupabaseCoreModuleProvider';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';
import { SupabaseCoreModuleInjectionSymbols } from '../models/SupabaseCoreModuleInjectionSymbols';
import { isNestSupabaseConfigFactoryAsyncOptions } from '../typeguards/isNestSupabaseConfigFactoryAsyncOptions';

@Global()
@Module({})
export class SupabaseCoreModule {
  public static forRoot(nestSupabaseConfig: NestSupabaseConfig): DynamicModule {
    return {
      exports: [SupabaseCoreModuleProvider],
      module: SupabaseCoreModule,
      providers: [
        {
          provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
          useValue: nestSupabaseConfig,
        },
        SupabaseCoreModuleProvider,
      ],
    };
  }

  public static forRootAsync(nestSupabaseConfigAsync: NestSupabaseConfigAsync): DynamicModule {
    const moduleProviders: Provider[] = [SupabaseCoreModuleProvider];

    if (isNestSupabaseConfigFactoryAsyncOptions(nestSupabaseConfigAsync)) {
      moduleProviders.push({
        inject: nestSupabaseConfigAsync.inject ?? [],
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
        useFactory: nestSupabaseConfigAsync.useFactory,
      });
    } else {
      moduleProviders.push({
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY,
        useClass: nestSupabaseConfigAsync.useClass,
      });

      moduleProviders.push({
        inject: [SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY],
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
        useFactory: createNestSupabaseConfigFactory,
      });
    }

    return {
      exports: [SupabaseCoreModuleProvider],
      imports: nestSupabaseConfigAsync.imports ?? [],
      module: SupabaseCoreModule,
      providers: moduleProviders,
    };
  }
}
