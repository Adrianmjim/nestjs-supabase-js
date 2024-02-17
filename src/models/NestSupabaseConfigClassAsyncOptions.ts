import { ModuleMetadata, Type } from '@nestjs/common';

import { NestSupabaseConfigFactory } from './NestSupabaseConfigFactory';

export interface NestSupabaseConfigClassAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<NestSupabaseConfigFactory>;
}
