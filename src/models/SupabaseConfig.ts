import { SupabaseClientOptions } from '@supabase/supabase-js';

export interface SupabaseConfig<
  TDatabase = unknown,
  TSchemaName extends string & keyof TDatabase = 'public' extends keyof TDatabase ? 'public' : string & keyof TDatabase,
> {
  supabaseUrl: string;
  supabaseKey: string;
  options?: SupabaseClientOptions<TSchemaName>;
}
