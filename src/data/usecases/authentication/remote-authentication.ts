import {
  HttpPostClient,
  HttpPostParams,
} from '@/data/protocols/http/http-post-client';
import { Authentication } from '@/domain/usecases/authentication';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/models/account-models';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<
      Authentication.Params,
      AccountModel
    >
  ) {}

  async auth(params: Authentication.Params): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.serverError:
      case HttpStatusCode.notFound:
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();

      default:
        break;
    }
  }
}
