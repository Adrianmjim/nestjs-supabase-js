import { Inject } from '@nestjs/common';

import { getSupabaseClientId } from '../utils/getSupabaseClientId';

export const InjectSupabaseClient: (clientName?: string) => ParameterDecorator = (
  clientName?: string,
): ParameterDecorator => Inject(getSupabaseClientId(clientName));
