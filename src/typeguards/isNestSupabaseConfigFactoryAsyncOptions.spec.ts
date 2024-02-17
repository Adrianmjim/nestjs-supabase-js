import { beforeAll, describe, expect, it } from '@jest/globals';

import { isNestSupabaseConfigFactoryAsyncOptions } from './isNestSupabaseConfigFactoryAsyncOptions';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';
import { NestSupabaseConfigClassAsyncOptions } from '../models/NestSupabaseConfigClassAsyncOptions';
import { NestSupabaseConfigFactory } from '../models/NestSupabaseConfigFactory';

describe(isNestSupabaseConfigFactoryAsyncOptions.name, () => {
  describe('having a isNestSupabaseConfigFactoryAsyncOptions which is not a isNestSupabaseConfigFactoryAsyncOptions', () => {
    let appAsyncOptions: NestSupabaseConfigClassAsyncOptions;

    beforeAll(() => {
      class AppOptionsFactory implements NestSupabaseConfigFactory {
        public createNestSupabaseConfig(): NestSupabaseConfig | Promise<NestSupabaseConfig> {
          return {
            supabaseKey: '',
            supabaseUrl: '',
          };
        }
      }

      appAsyncOptions = {
        useClass: AppOptionsFactory,
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestSupabaseConfigFactoryAsyncOptions(appAsyncOptions);
      });

      it('should return true', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a isNestSupabaseConfigFactoryAsyncOptions', () => {
    let nestSupabaseConfigAsync: NestSupabaseConfigAsync;

    beforeAll(() => {
      nestSupabaseConfigAsync = {
        useFactory: () => ({
          supabaseKey: '',
          supabaseUrl: '',
        }),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isNestSupabaseConfigFactoryAsyncOptions(nestSupabaseConfigAsync);
      });

      it('should return false', () => {
        expect(result).toBe(true);
      });
    });
  });
});
