import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { DynamicModule } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseClientId } from './getSupabaseClientId';
import { SupabaseCoreModule } from './SupabaseCoreModule';
import { SupabaseCoreModuleProvider } from './SupabaseCoreModuleProvider';
import { SupabaseModule } from './SupabaseModule';
import { NestSupabaseConfigFactoryAsyncOptionsFixtures } from '../fixtures/NestSupabaseConfigFactoryAsyncOptionsFixtures';
import { SupabaseConfigFixtures } from '../fixtures/SupabaseConfigFixtures';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigAsync } from '../models/NestSupabaseConfigAsync';

vitest.mock('./getSupabaseClientId');
vitest.mock('./SupabaseCoreModule');

describe(SupabaseModule.name, () => {
  describe('.forRoot()', () => {
    describe('when called', () => {
      let nestSupabaseConfigFixture: NestSupabaseConfig;
      let dynamicModuleFixture: DynamicModule;
      let result: unknown;

      beforeAll(() => {
        nestSupabaseConfigFixture = SupabaseConfigFixtures.any;
        dynamicModuleFixture = {
          module: SupabaseCoreModule,
        };

        vitest.mocked(SupabaseCoreModule.forRoot).mockReturnValueOnce(dynamicModuleFixture);

        result = SupabaseModule.forRoot(nestSupabaseConfigFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call SupbaseCoreModule.forRoot()', () => {
        expect(SupabaseCoreModule.forRoot).toHaveBeenCalledTimes(1);
        expect(SupabaseCoreModule.forRoot).toHaveBeenCalledWith(nestSupabaseConfigFixture);
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: SupabaseModule,
        });
      });
    });
  });

  describe('.forRootAsync()', () => {
    describe('when called', () => {
      let nestSupabaseConfigAsyncFixture: NestSupabaseConfigAsync;
      let dynamicModuleFixture: DynamicModule;
      let result: unknown;

      beforeAll(() => {
        nestSupabaseConfigAsyncFixture = NestSupabaseConfigFactoryAsyncOptionsFixtures.any;
        dynamicModuleFixture = {
          module: SupabaseCoreModule,
        };

        vitest.mocked(SupabaseCoreModule.forRootAsync).mockReturnValueOnce(dynamicModuleFixture);

        result = SupabaseModule.forRootAsync(nestSupabaseConfigAsyncFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call SupbaseCoreModule.forRoot()', () => {
        expect(SupabaseCoreModule.forRootAsync).toHaveBeenCalledTimes(1);
        expect(SupabaseCoreModule.forRootAsync).toHaveBeenCalledWith(nestSupabaseConfigAsyncFixture);
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          imports: [dynamicModuleFixture],
          module: SupabaseModule,
        });
      });
    });
  });

  describe('.injectClient()', () => {
    describe('having a clientName undefined', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          vitest.mocked(getSupabaseClientId).mockReturnValueOnce(SupabaseClient);

          result = SupabaseModule.injectClient();
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call getSupabaseClientId()', () => {
          expect(getSupabaseClientId).toHaveBeenCalledTimes(1);
          expect(getSupabaseClientId).toHaveBeenCalledWith(undefined);
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [SupabaseClient],
            module: SupabaseModule,
            providers: [
              {
                inject: [SupabaseCoreModuleProvider],
                provide: SupabaseClient,
                useFactory: expect.any(Function) as unknown as (...args: unknown[]) => unknown,
              },
            ],
          });
        });
      });
    });
  });
});
