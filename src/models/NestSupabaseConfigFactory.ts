import { NestSupabaseConfig } from './NestSupabaseConfig';

export interface NestSupabaseConfigFactory {
  createNestSupabaseConfig: () => NestSupabaseConfig | Promise<NestSupabaseConfig>;
}
