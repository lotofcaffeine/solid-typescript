import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test/mock-http';
import faker from 'faker';

/* eslint-disable no-useless-constructor */
type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};
describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
