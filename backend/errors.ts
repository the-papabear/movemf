export class BackendError {
  code: number;
  message: string;

  constructor(code: number, message?: string) {
    this.code = code;
    this.message = message || '';
  }
}
