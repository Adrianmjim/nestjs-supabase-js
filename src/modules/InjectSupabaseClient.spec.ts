import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { Inject } from '@nestjs/common';

import { getSupabaseClientId } from './getSupabaseClientId';
import { InjectSupabaseClient } from './InjectSupabaseClient';

jest.mock('@nestjs/common', () => ({ Inject: jest.fn() }));
jest.mock('./getSupabaseClientId');

describe(InjectSupabaseClient.name, () => {
  describe('when called', () => {
    let clientNameFixture: string;
    let resolvedClientNameFixture: string;

    beforeAll(() => {
      clientNameFixture = 'client-name-example';
      resolvedClientNameFixture = 'resolved-client-name-example';

      (getSupabaseClientId as jest.Mock<typeof getSupabaseClientId>).mockReturnValueOnce(resolvedClientNameFixture);

      InjectSupabaseClient(clientNameFixture);
    });

    afterAll(() => {
      jest.clearAllMocks();
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
