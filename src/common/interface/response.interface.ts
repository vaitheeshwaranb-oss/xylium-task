export interface ResponseInterface {
  message: string;
  data: object | string;
  length?: number;
}

export interface SendMailInterface {
  mail: [];
  subject: string;
  message: string;
}
