import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';
import { NestSupabaseConfigFactoryAsyncOptions } from '../models/NestSupabaseConfigFactoryAsyncOptions';

export function isNestSupabaseConfigFactoryAsyncOptions(
  value: NestSupabaseConfigAsync,
): value is NestSupabaseConfigFactoryAsyncOptions {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (value as NestSupabaseConfigFactoryAsyncOptions).useFactory !== undefined;
}
