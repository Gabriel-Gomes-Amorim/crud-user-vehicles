import { User } from 'src/infra/user/entities/user.entity';

export interface UserToken {
  access_token: string;
  user: User;
}
