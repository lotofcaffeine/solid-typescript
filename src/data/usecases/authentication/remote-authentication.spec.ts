import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClient } from 'data/protocols/http/http-post-client';

/* eslint-disable no-useless-constructor */

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = 'any _url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
