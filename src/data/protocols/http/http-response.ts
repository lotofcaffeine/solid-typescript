export enum HttpStatusCode {
  unathorized = 401,
  noContent = 204,
  ok = 200,
  badRequest = 400,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}
export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
