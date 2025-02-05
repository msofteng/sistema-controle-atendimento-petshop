import { HttpHeaders, HttpErrorResponse as ResponseHttpError } from "@angular/common/http";

export default class HttpErrorResponse<T> extends ResponseHttpError {
  override readonly error: T;

  constructor(init: {
    error?: T,
    headers?: HttpHeaders,
    status?: number,
    statusText?: string,
    url?: string
  }) {
    super({
      error: init.error as T,
      headers: init.headers,
      status: init.status,
      statusText: init.statusText,
      url: init.url
    });

    this.error = init.error as T;
  }
}