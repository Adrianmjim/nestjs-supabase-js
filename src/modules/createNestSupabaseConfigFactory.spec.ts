import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { createNestSupabaseConfigFactory } from './createNestSupabaseConfigFactory';
import { SupabaseConfigFixtures } from '../fixtures/SupabaseConfigFixtures';
import { NestSupabaseConfig } from '../models/NestSupabaseConfig';
import { NestSupabaseConfigFactory } from '../models/NestSupabaseConfigFactory';

describe(createNestSupabaseConfigFactory.name, () => {
  describe('when called', () => {
    let nestSupabaseConfigFactoryFixture: jest.Mocked<NestSupabaseConfigFactory>;
    let nestSupabaseConfigFixture: NestSupabaseConfig;
    let result: unknown;

    beforeAll(() => {
      nestSupabaseConfigFactoryFixture = {
        createNestSupabaseConfig: jest.fn(),
      };
      nestSupabaseConfigFixture = SupabaseConfigFixtures.any;

      nestSupabaseConfigFactoryFixture.createNestSupabaseConfig.mockReturnValueOnce(
        nestSupabaseConfigFixture as unknown as NestSupabaseConfig | Promise<NestSupabaseConfig>,
      );

      result = createNestSupabaseConfigFactory(nestSupabaseConfigFactoryFixture);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call nestSupabaseConfigFactoryFixture.createNestSupabaseConfig()', () => {
      expect(nestSupabaseConfigFactoryFixture.createNestSupabaseConfig).toHaveBeenCalledTimes(1);
      expect(nestSupabaseConfigFactoryFixture.createNestSupabaseConfig).toHaveBeenCalledWith();
    });

    it('should return a NestSupabaseConfig | Promise<NestSupabaseConfig>', () => {
      expect(result).toBe(nestSupabaseConfigFixture);
    });
  });
});
