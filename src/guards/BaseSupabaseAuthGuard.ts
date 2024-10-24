import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient, User, UserResponse } from '@supabase/supabase-js';

@Injectable()
export abstract class BaseSupabaseAuthGuard implements CanActivate {
  public constructor(protected readonly supabaseClient: SupabaseClient) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: unknown = context.switchToHttp().getRequest();

    const token: string | undefined = await this.extractTokenFromRequest(request);

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    const userResponse: UserResponse = await this.supabaseClient.auth.getUser(token);

    if (userResponse.error !== null) {
      throw new UnauthorizedException();
    }

    (request as { user: User }).user = userResponse.data.user;

    return true;
  }

  protected abstract extractTokenFromRequest(request: unknown): (string | undefined) | Promise<string | undefined>;
}
