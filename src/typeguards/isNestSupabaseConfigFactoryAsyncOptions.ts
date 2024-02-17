import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';
import { NestSupabaseConfigFactoryAsyncOptions } from '../models/NestSupabaseConfigFactoryAsyncOptions';

export function isNestSupabaseConfigFactoryAsyncOptions(
  value: NestSupabaseConfigAsync,
): value is NestSupabaseConfigFactoryAsyncOptions {
  return (value as NestSupabaseConfigFactoryAsyncOptions).useFactory !== undefined;
}
