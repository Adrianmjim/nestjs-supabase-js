import { Inject } from '@nestjs/common';

import { getSupabaseClientId } from './getSupabaseClientId';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectSupabaseClient: (clientName?: string) => ParameterDecorator = (
  clientName?: string,
): ParameterDecorator => Inject(getSupabaseClientId(clientName));
