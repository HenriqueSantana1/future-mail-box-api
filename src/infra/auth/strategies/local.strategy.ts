import {User} from '@domain/entities/user.entity';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ValidateUser} from '@useCases/user/validate-user';
import {Strategy} from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUser: ValidateUser) {
    super({usernameField: 'email'});
  }

  validate(email: string, password: string): Promise<User> {
    return this.validateUser.execute({email, password});
  }
}
