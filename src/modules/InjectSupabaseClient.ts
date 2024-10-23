import { Inject } from '@nestjs/common';

import { getSupabaseClientId } from './getSupabaseClientId';

export const InjectSupabaseClient: (clientName?: string) => ParameterDecorator = (
  clientName?: string,
): ParameterDecorator => Inject(getSupabaseClientId(clientName));
