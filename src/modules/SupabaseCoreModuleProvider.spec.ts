import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { GenericSchema } from '@supabase/supabase-js/dist/module/lib/types';

vitest.mock('@supabase/supabase-js');

import { SupabaseCoreModuleProvider } from './SupabaseCoreModuleProvider';
import { SupabaseConfigFixtures } from '../fixtures/SupabaseConfigFixtures';
import { NameSupabaseConfigPair } from '../models/NameSupabaseConfigPair';
import { SupabaseConfig } from '../models/SupabaseConfig';

describe(SupabaseCoreModuleProvider.name, () => {
  describe('.constructor()', () => {
    describe('having a SupabaseConfig', () => {
      describe('when called', () => {
        let supabaseConfigFixture: SupabaseConfig;

        beforeAll(() => {
          supabaseConfigFixture = SupabaseConfigFixtures.any;

          new SupabaseCoreModuleProvider(supabaseConfigFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call createClient()', () => {
          expect(createClient).toHaveBeenCalledTimes(1);
          expect(createClient).toHaveBeenCalledWith(
            supabaseConfigFixture.supabaseUrl,
            supabaseConfigFixture.supabaseKey,
            supabaseConfigFixture.options,
          );
        });
      });
    });

    describe('having a NameSupabaseConfigPair[]', () => {
      describe('when called', () => {
        let nameSupabaseConfigPairFixture: NameSupabaseConfigPair[];

        beforeAll(() => {
          nameSupabaseConfigPairFixture = [
            {
              name: 'name-example',
              supabaseConfig: SupabaseConfigFixtures.any,
            },
          ];

          new SupabaseCoreModuleProvider(nameSupabaseConfigPairFixture);
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call createClient()', () => {
          expect(createClient).toHaveBeenCalledTimes(1);
          expect(createClient).toHaveBeenCalledWith(
            nameSupabaseConfigPairFixture[0]?.supabaseConfig.supabaseUrl,
            nameSupabaseConfigPairFixture[0]?.supabaseConfig.supabaseKey,
            nameSupabaseConfigPairFixture[0]?.supabaseConfig.options,
          );
        });
      });
    });
  });

  describe('.getClient()', () => {
    describe('having a a clientName undefined', () => {
      describe('when called and providers.get() returns undefined', () => {
        let supabaseConfigFixture: SupabaseConfig;
        let result: unknown;

        beforeAll(() => {
          supabaseConfigFixture = SupabaseConfigFixtures.any;

          const supabaseCoreModuleProvider: SupabaseCoreModuleProvider = new SupabaseCoreModuleProvider(
            supabaseConfigFixture,
          );

          try {
            supabaseCoreModuleProvider.getClient();
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe('SupabaseClient does not exist.');
        });
      });

      describe('when called and providers.get() returns SupabaseClient', () => {
        let supabaseConfigFixture: SupabaseConfig;
        let supabaseClientFixture: SupabaseClient<unknown, never, GenericSchema>;
        let result: unknown;

        beforeAll(() => {
          supabaseConfigFixture = SupabaseConfigFixtures.any;
          supabaseClientFixture = {} as SupabaseClient<unknown, never, GenericSchema>;

          vitest.mocked(createClient).mockReturnValueOnce(supabaseClientFixture);

          const supabaseCoreModuleProvider: SupabaseCoreModuleProvider = new SupabaseCoreModuleProvider(
            supabaseConfigFixture,
          );

          result = supabaseCoreModuleProvider.getClient();
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should return a SupabaseClient', () => {
          expect(result).toBe(supabaseClientFixture);
        });
      });
    });

    describe('having a a clientName not undefined', () => {
      describe('when called and providers.get() returns undefined', () => {
        let supabaseConfigFixture: SupabaseConfig;
        let clientNameFixture: string;
        let result: unknown;

        beforeAll(() => {
          supabaseConfigFixture = SupabaseConfigFixtures.any;
          clientNameFixture = 'client-name-example';

          const supabaseCoreModuleProvider: SupabaseCoreModuleProvider = new SupabaseCoreModuleProvider(
            supabaseConfigFixture,
          );

          try {
            supabaseCoreModuleProvider.getClient(clientNameFixture);
          } catch (error: unknown) {
            result = error;
          }
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toBe(`No SupabaseClient with name "${clientNameFixture}" was found.`);
        });
      });
    });
  });
});
