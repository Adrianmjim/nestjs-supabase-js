import { NameSupabaseConfigPair } from './NameSupabaseConfigPair';
import { SupabaseConfig } from './SupabaseConfig';

export type NestSupabaseConfig = SupabaseConfig | NameSupabaseConfigPair[];
