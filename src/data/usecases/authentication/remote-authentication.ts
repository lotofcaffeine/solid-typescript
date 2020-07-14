import {
  HttpPostClient,
  HttpPostParams,
} from '../../protocols/http/http-post-client';
import { Authentication } from '../../../domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth(params: Authentication.Params): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: params,
    } as HttpPostParams);
  }
}
