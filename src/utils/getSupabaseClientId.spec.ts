import { beforeAll, describe, expect, it } from 'vitest';

import { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseClientId } from './getSupabaseClientId';

describe(getSupabaseClientId.name, () => {
  describe('having a client name not undefined', () => {
    describe('when called', () => {
      let clientNameFixture: string;
      let result: unknown;

      beforeAll(() => {
        clientNameFixture = 'client-name-example';

        result = getSupabaseClientId(clientNameFixture);
      });

      it('should return a string', () => {
        expect(result).toBe(`supabase_client_${clientNameFixture}`);
      });
    });
  });

  describe('having a client name undefined', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getSupabaseClientId();
      });

      it('should return a string', () => {
        expect(result).toBe(SupabaseClient);
      });
    });
  });
});
