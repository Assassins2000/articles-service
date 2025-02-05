import { UserServiceErrorCode } from '../constants';

export interface UserServiceError {
  code: UserServiceErrorCode;
  message: 'User with such username exists';
}
