import { Policy } from './policy.interface';
import { ActiveUserData } from '../../../interface/active-user-data.interface';

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: ActiveUserData): Promise<void>;
}
