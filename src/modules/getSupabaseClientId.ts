import { SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClientId(clientName?: string): string | typeof SupabaseClient {
  return clientName !== undefined ? `supabase_client_${clientName}` : SupabaseClient;
}
