import { afterAll, beforeAll, describe, expect, it, Mock, Mocked, vitest } from 'vitest';

import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AuthError, SupabaseClient, User } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

import { BaseSupabaseAuthGuard } from './BaseSupabaseAuthGuard';

class TestSupabaseAuthGuard extends BaseSupabaseAuthGuard {
  public constructor(
    private readonly getToken: () => string | undefined,
    supabaseClient: SupabaseClient,
  ) {
    super(supabaseClient);
  }

  protected extractTokenFromRequest(_request: Request): (string | undefined) | Promise<string | undefined> {
    return this.getToken();
  }
}

describe(BaseSupabaseAuthGuard.name, () => {
  let testSupabaseAuthGuard: TestSupabaseAuthGuard;
  let supabaseAuthClientMock: Mocked<SupabaseAuthClient>;
  let supabaseClientMock: Mocked<SupabaseClient>;
  let getTokenMock: Mock<() => string | undefined>;

  beforeAll(() => {
    supabaseAuthClientMock = {
      getUser: vitest.fn(),
    } as Partial<Mocked<SupabaseAuthClient>> as Mocked<SupabaseAuthClient>;

    supabaseClientMock = {
      auth: supabaseAuthClientMock,
    } as Partial<Mocked<SupabaseClient>> as Mocked<SupabaseClient>;

    getTokenMock = vitest.fn();

    testSupabaseAuthGuard = new TestSupabaseAuthGuard(getTokenMock, supabaseClientMock);
  });

  describe('canActivate', () => {
    describe('when called and getToken() returns undefined', () => {
      let switchToHttpMock: Mocked<HttpArgumentsHost>;
      let executionContextMock: Mocked<ExecutionContext>;
      let result: unknown;

      beforeAll(async () => {
        switchToHttpMock = {
          getRequest: vitest.fn(),
        } as Partial<Mocked<HttpArgumentsHost>> as Mocked<HttpArgumentsHost>;

        executionContextMock = {
          switchToHttp: vitest.fn().mockReturnValueOnce(switchToHttpMock),
        } as Partial<Mocked<ExecutionContext>> as Mocked<ExecutionContext>;

        try {
          await testSupabaseAuthGuard.canActivate(executionContextMock);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call executionContext.switchToHttp()', () => {
        expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
        expect(executionContextMock.switchToHttp).toHaveBeenCalledWith();
      });

      it('should call executionContext.switchToHttp().getRequest()', () => {
        expect(switchToHttpMock.getRequest).toHaveBeenCalledTimes(1);
        expect(switchToHttpMock.getRequest).toHaveBeenCalledWith();
      });

      it('should call getToken()', () => {
        expect(getTokenMock).toHaveBeenCalledTimes(1);
        expect(getTokenMock).toHaveBeenCalledWith();
      });

      it('should throw a UnauthorizedException', () => {
        expect(result).toBeInstanceOf(UnauthorizedException);
        expect(result).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('when called and userResponse.error is not null', () => {
      let switchToHttpMock: Mocked<HttpArgumentsHost>;
      let executionContextMock: Mocked<ExecutionContext>;
      let tokenFixture: string;
      let result: unknown;

      beforeAll(async () => {
        switchToHttpMock = {
          getRequest: vitest.fn(),
        } as Partial<Mocked<HttpArgumentsHost>> as Mocked<HttpArgumentsHost>;

        executionContextMock = {
          switchToHttp: vitest.fn().mockReturnValueOnce(switchToHttpMock),
        } as Partial<Mocked<ExecutionContext>> as Mocked<ExecutionContext>;

        tokenFixture = 'token';

        getTokenMock.mockReturnValueOnce(tokenFixture);

        supabaseAuthClientMock.getUser.mockResolvedValueOnce({
          data: { user: null },
          error: {} as AuthError,
        });

        try {
          await testSupabaseAuthGuard.canActivate(executionContextMock);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call executionContext.switchToHttp()', () => {
        expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
        expect(executionContextMock.switchToHttp).toHaveBeenCalledWith();
      });

      it('should call executionContext.switchToHttp().getRequest()', () => {
        expect(switchToHttpMock.getRequest).toHaveBeenCalledTimes(1);
        expect(switchToHttpMock.getRequest).toHaveBeenCalledWith();
      });

      it('should call getToken()', () => {
        expect(getTokenMock).toHaveBeenCalledTimes(1);
        expect(getTokenMock).toHaveBeenCalledWith();
      });

      it('should call supabaseClient.auth.getUser()', () => {
        expect(supabaseClientMock.auth.getUser).toHaveBeenCalledTimes(1);
        expect(supabaseClientMock.auth.getUser).toHaveBeenCalledWith(tokenFixture);
      });

      it('should throw a UnauthorizedException', () => {
        expect(result).toBeInstanceOf(UnauthorizedException);
        expect(result).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('when called and userResponse.data is not null', () => {
      let switchToHttpMock: Mocked<HttpArgumentsHost>;
      let executionContextMock: Mocked<ExecutionContext>;
      let tokenFixture: string;
      let requestFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        switchToHttpMock = {
          getRequest: vitest.fn(),
        } as Partial<Mocked<HttpArgumentsHost>> as Mocked<HttpArgumentsHost>;

        executionContextMock = {
          switchToHttp: vitest.fn().mockReturnValueOnce(switchToHttpMock),
        } as Partial<Mocked<ExecutionContext>> as Mocked<ExecutionContext>;

        tokenFixture = 'token';
        requestFixture = {};

        switchToHttpMock.getRequest.mockReturnValueOnce(requestFixture);

        getTokenMock.mockReturnValueOnce(tokenFixture);

        supabaseAuthClientMock.getUser.mockResolvedValueOnce({
          data: { user: {} as User },
          error: null,
        });

        result = await testSupabaseAuthGuard.canActivate(executionContextMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call executionContext.switchToHttp()', () => {
        expect(executionContextMock.switchToHttp).toHaveBeenCalledTimes(1);
        expect(executionContextMock.switchToHttp).toHaveBeenCalledWith();
      });

      it('should call executionContext.switchToHttp().getRequest()', () => {
        expect(switchToHttpMock.getRequest).toHaveBeenCalledTimes(1);
        expect(switchToHttpMock.getRequest).toHaveBeenCalledWith();
      });

      it('should call getToken()', () => {
        expect(getTokenMock).toHaveBeenCalledTimes(1);
        expect(getTokenMock).toHaveBeenCalledWith();
      });

      it('should call supabaseClient.auth.getUser()', () => {
        expect(supabaseClientMock.auth.getUser).toHaveBeenCalledTimes(1);
        expect(supabaseClientMock.auth.getUser).toHaveBeenCalledWith(tokenFixture);
      });

      it('should return true', () => {
        expect(result).toBeTruthy();
      });
    });
  });
});
