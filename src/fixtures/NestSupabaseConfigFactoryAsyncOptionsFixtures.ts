import { SupabaseConfigFixtures } from './SupabaseConfigFixtures';
import { NestSupabaseConfigFactoryAsyncOptions } from '../models/NestSupabaseConfigFactoryAsyncOptions';

export class NestSupabaseConfigFactoryAsyncOptionsFixtures {
  public static get any(): NestSupabaseConfigFactoryAsyncOptions {
    const nestSupabaseConfigAsync: NestSupabaseConfigFactoryAsyncOptions = {
      imports: [],
      inject: [],
      useFactory: () => SupabaseConfigFixtures.any,
    };

    return nestSupabaseConfigAsync;
  }

  public static get withoutInject(): NestSupabaseConfigFactoryAsyncOptions {
    const nestSupabaseConfigAsync: NestSupabaseConfigFactoryAsyncOptions = {
      imports: [],
      useFactory: () => SupabaseConfigFixtures.any,
    };

    return nestSupabaseConfigAsync;
  }

  public static get withoutImports(): NestSupabaseConfigFactoryAsyncOptions {
    const nestSupabaseConfigAsync: NestSupabaseConfigFactoryAsyncOptions = {
      inject: [],
      useFactory: () => SupabaseConfigFixtures.any,
    };

    return nestSupabaseConfigAsync;
  }
}
