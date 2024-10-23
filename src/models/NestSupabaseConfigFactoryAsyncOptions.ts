import { Abstract, ModuleMetadata, Type } from '@nestjs/common';

import { NestSupabaseConfig } from './NestSupabaseConfig';

export interface NestSupabaseConfigFactoryAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  inject?: (string | symbol | Function | Type<unknown> | Abstract<unknown>)[];
  useFactory: (...args: unknown[]) => NestSupabaseConfig;
}
