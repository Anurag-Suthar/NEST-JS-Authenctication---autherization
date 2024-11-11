import { Policy } from './interfaces/policy.interface';
import { Injectable } from '@nestjs/common';
import { PolicyHandler } from './interfaces/policy-handler.interface';

import { ActiveUserData } from '../../interface/active-user-data.interface';
import { PolicyHandlerStorage } from './policy-handle.storage';

export class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHandleStorage: PolicyHandlerStorage) {
    this.policyHandleStorage.add(FrameworkContributorPolicy, this);
  }
  async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@trilon.io');
    if (!isContributor) {
      throw new Error('User is not a contributor');
    }
  }
}
