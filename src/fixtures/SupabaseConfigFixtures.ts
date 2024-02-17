import { SupabaseConfig } from '../models/SupabaseConfig';

export class SupabaseConfigFixtures {
  public static get any(): SupabaseConfig {
    const nestSupabaseConfig: SupabaseConfig = {
      supabaseKey: 'supabase-key-example',
      supabaseUrl: 'supabase-url-example',
    };

    return nestSupabaseConfig;
  }
}
