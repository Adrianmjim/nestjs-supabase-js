import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { SupabaseCoreModuleInjectionSymbols } from '../models/SupabaseCoreModuleInjectionSymbols';

const DEFAULT_CLIENT: string = 'default';

@Injectable()
export class SupabaseCoreModuleProvider {
  private readonly supabaseClients: Map<string, SupabaseClient> = new Map<string, SupabaseClient>();

  public constructor(
    @Inject(SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG) nestSupbaseConfig: NestSupabaseConfig,
  ) {
    if (Array.isArray(nestSupbaseConfig)) {
      for (const nameSupabaseConfigPair of nestSupbaseConfig) {
        this.supabaseClients.set(
          nameSupabaseConfigPair.name,
          createClient(
            nameSupabaseConfigPair.supabaseConfig.supabaseUrl,
            nameSupabaseConfigPair.supabaseConfig.supabaseKey,
            nameSupabaseConfigPair.supabaseConfig.options,
          ),
        );
      }
    } else {
      this.supabaseClients.set(
        DEFAULT_CLIENT,
        createClient(nestSupbaseConfig.supabaseUrl, nestSupbaseConfig.supabaseKey, nestSupbaseConfig.options),
      );
    }
  }

  public getClient(clientName?: string): SupabaseClient {
    const supabaseClient: SupabaseClient | undefined = this.supabaseClients.get(clientName ?? DEFAULT_CLIENT);

    if (supabaseClient === undefined) {
      let errorDescription: string;

      if (clientName === undefined) {
        errorDescription = 'SupabaseClient does not exist.';
      } else {
        errorDescription = `No SupabaseClient with name "${clientName}" was found.`;
      }

      throw new Error(errorDescription);
    }

    return supabaseClient;
  }
}
