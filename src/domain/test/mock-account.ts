import { Authentication } from '@/domain/usecases/authentication';
import faker from 'faker';
import { AccountModel } from '../models';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
