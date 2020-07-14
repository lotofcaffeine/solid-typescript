import { Authentication } from '../usecases/authentication';
import faker from 'faker';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
