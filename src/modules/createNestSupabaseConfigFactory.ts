import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigFactory } from '../models/NestSupabaseConfigFactory';

export function createNestSupabaseConfigFactory(
  nestSupabaseConfigFactory: NestSupabaseConfigFactory,
): NestSupabaseConfig | Promise<NestSupabaseConfig> {
  return nestSupabaseConfigFactory.createNestSupabaseConfig();
}
