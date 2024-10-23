import { afterAll, beforeAll, describe, expect, it, Mock, vitest } from 'vitest';

vitest.mock('../typeguards/isNestSupabaseConfigFactoryAsyncOptions');

import { createNestSupabaseConfigFactory } from './createNestSupabaseConfigFactory';
import { SupabaseCoreModule } from './SupabaseCoreModule';
import { SupabaseCoreModuleProvider } from './SupabaseCoreModuleProvider';
import { NestSupabaseConfigFactoryAsyncOptionsFixtures } from '../fixtures/NestSupabaseConfigFactoryAsyncOptionsFixtures';
import { SupabaseConfigFixtures } from '../fixtures/SupabaseConfigFixtures';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigClassAsyncOptions } from '../models/NestSupabaseConfigClassAsyncOptions';
import { NestSupabaseConfigFactory } from '../models/NestSupabaseConfigFactory';
import { NestSupabaseConfigFactoryAsyncOptions } from '../models/NestSupabaseConfigFactoryAsyncOptions';
import { SupabaseCoreModuleInjectionSymbols } from '../models/SupabaseCoreModuleInjectionSymbols';
import { isNestSupabaseConfigFactoryAsyncOptions } from '../typeguards/isNestSupabaseConfigFactoryAsyncOptions';

describe(SupabaseCoreModule.name, () => {
  describe('.forRoot()', () => {
    describe('when called', () => {
      let nestSupabaseConfigFixture: NestSupabaseConfig;
      let result: unknown;

      beforeAll(() => {
        nestSupabaseConfigFixture = SupabaseConfigFixtures.any;

        result = SupabaseCoreModule.forRoot(nestSupabaseConfigFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should return a DynamicModule', () => {
        expect(result).toStrictEqual({
          exports: [SupabaseCoreModuleProvider],
          module: SupabaseCoreModule,
          providers: [
            {
              provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
              useValue: nestSupabaseConfigFixture,
            },
            SupabaseCoreModuleProvider,
          ],
        });
      });
    });
  });

  describe('.forRootAsync', () => {
    describe('having a NestSupabaseConfigFactoryAsyncOptions', () => {
      describe('when called', () => {
        let nestSupabaseConfigFactoryAsyncOptionsFixture: NestSupabaseConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestSupabaseConfigFactoryAsyncOptionsFixture = NestSupabaseConfigFactoryAsyncOptionsFixtures.any;

          (
            isNestSupabaseConfigFactoryAsyncOptions as unknown as Mock<typeof isNestSupabaseConfigFactoryAsyncOptions>
          ).mockReturnValueOnce(true);

          result = SupabaseCoreModule.forRootAsync(nestSupabaseConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestSupabaseConfigFactoryAsyncOptions()', () => {
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestSupabaseConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [SupabaseCoreModuleProvider],
            imports: nestSupabaseConfigFactoryAsyncOptionsFixture.imports,
            module: SupabaseCoreModule,
            providers: [
              SupabaseCoreModuleProvider,
              {
                inject: nestSupabaseConfigFactoryAsyncOptionsFixture.inject,
                provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
                useFactory: nestSupabaseConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestSupabaseConfigFactoryAsyncOptions without inject', () => {
      describe('when called', () => {
        let nestSupabaseConfigFactoryAsyncOptionsFixture: NestSupabaseConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestSupabaseConfigFactoryAsyncOptionsFixture = NestSupabaseConfigFactoryAsyncOptionsFixtures.withoutInject;

          (
            isNestSupabaseConfigFactoryAsyncOptions as unknown as Mock<typeof isNestSupabaseConfigFactoryAsyncOptions>
          ).mockReturnValueOnce(true);

          result = SupabaseCoreModule.forRootAsync(nestSupabaseConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestSupabaseConfigFactoryAsyncOptions()', () => {
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestSupabaseConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [SupabaseCoreModuleProvider],
            imports: nestSupabaseConfigFactoryAsyncOptionsFixture.imports,
            module: SupabaseCoreModule,
            providers: [
              SupabaseCoreModuleProvider,
              {
                inject: [],
                provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
                useFactory: nestSupabaseConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestSupabaseConfigFactoryAsyncOptions without imports', () => {
      describe('when called', () => {
        let nestSupabaseConfigFactoryAsyncOptionsFixture: NestSupabaseConfigFactoryAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          nestSupabaseConfigFactoryAsyncOptionsFixture = NestSupabaseConfigFactoryAsyncOptionsFixtures.withoutImports;

          (
            isNestSupabaseConfigFactoryAsyncOptions as unknown as Mock<typeof isNestSupabaseConfigFactoryAsyncOptions>
          ).mockReturnValueOnce(true);

          result = SupabaseCoreModule.forRootAsync(nestSupabaseConfigFactoryAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestSupabaseConfigFactoryAsyncOptions()', () => {
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestSupabaseConfigFactoryAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [SupabaseCoreModuleProvider],
            imports: [],
            module: SupabaseCoreModule,
            providers: [
              SupabaseCoreModuleProvider,
              {
                inject: nestSupabaseConfigFactoryAsyncOptionsFixture.inject,
                provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
                useFactory: nestSupabaseConfigFactoryAsyncOptionsFixture.useFactory,
              },
            ],
          });
        });
      });
    });

    describe('having a NestSupabaseConfigClassAsyncOptions', () => {
      describe('when called', () => {
        let nestSupabaseConfigClassAsyncOptionsFixture: NestSupabaseConfigClassAsyncOptions;
        let result: unknown;

        beforeAll(() => {
          class NestSupabaseConfigFactoryTest implements NestSupabaseConfigFactory {
            public createNestSupabaseConfig(): NestSupabaseConfig | Promise<NestSupabaseConfig> {
              return SupabaseConfigFixtures.any;
            }
          }

          nestSupabaseConfigClassAsyncOptionsFixture = {
            imports: [],
            useClass: NestSupabaseConfigFactoryTest,
          };

          (
            isNestSupabaseConfigFactoryAsyncOptions as unknown as Mock<typeof isNestSupabaseConfigFactoryAsyncOptions>
          ).mockReturnValueOnce(false);

          result = SupabaseCoreModule.forRootAsync(nestSupabaseConfigClassAsyncOptionsFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call isNestSupabaseConfigFactoryAsyncOptions()', () => {
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledTimes(1);
          expect(isNestSupabaseConfigFactoryAsyncOptions).toHaveBeenCalledWith(
            nestSupabaseConfigClassAsyncOptionsFixture,
          );
        });

        it('should return a DynamicModule', () => {
          expect(result).toStrictEqual({
            exports: [SupabaseCoreModuleProvider],
            imports: nestSupabaseConfigClassAsyncOptionsFixture.imports,
            module: SupabaseCoreModule,
            providers: [
              SupabaseCoreModuleProvider,
              {
                provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY,
                useClass: nestSupabaseConfigClassAsyncOptionsFixture.useClass,
              },
              {
                inject: [SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY],
                provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
                useFactory: createNestSupabaseConfigFactory,
              },
            ],
          });
        });
      });
    });
  });
});
