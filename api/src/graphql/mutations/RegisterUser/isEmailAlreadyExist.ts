import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { DBService } from '../../../database/DBService';
import Container from 'typedi';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  private dbService: DBService;
  constructor() {
    this.dbService = Container.get(DBService);
  }

  async validate(email: string) {
    const user = await this.dbService.getUserByEmail(email);
    if (user != null) return false;
    return true;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    const options = {
      message: 'Email already in use',
      ...validationOptions,
    };
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
