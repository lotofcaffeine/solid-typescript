import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';
import { Authentication } from '@/domain/usecases';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<
      Authentication.Params,
      AccountModel
    >
  ) {}

  async auth(params: Authentication.Params): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
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
