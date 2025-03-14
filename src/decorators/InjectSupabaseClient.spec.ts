import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

import { Inject } from '@nestjs/common';

import { InjectSupabaseClient } from './InjectSupabaseClient';
import { getSupabaseClientId } from '../utils/getSupabaseClientId';

vitest.mock('@nestjs/common', () => ({ Inject: vitest.fn() }));
vitest.mock('../utils/getSupabaseClientId');

describe(InjectSupabaseClient.name, () => {
  describe('when called', () => {
    let clientNameFixture: string;
    let resolvedClientNameFixture: string;

    beforeAll(() => {
      clientNameFixture = 'client-name-example';
      resolvedClientNameFixture = 'resolved-client-name-example';

      vitest.mocked(getSupabaseClientId).mockReturnValueOnce(resolvedClientNameFixture);

      InjectSupabaseClient(clientNameFixture);
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call Inject()', () => {
      expect(Inject).toHaveBeenCalledTimes(1);
      expect(Inject).toHaveBeenCalledWith(resolvedClientNameFixture);
    });

    it('should call getSupabaseClientId', () => {
      expect(getSupabaseClientId).toHaveBeenCalledTimes(1);
      expect(getSupabaseClientId).toHaveBeenCalledWith(clientNameFixture);
    });
  });
});
