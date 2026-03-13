import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseInterface } from '../interface/response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface> {
    return next.handle().pipe(
      map((response: ResponseInterface) => {
        const message: string = response?.message ?? 'Request Successfully';
        const data: string | object = response?.data ?? response;
        const length: number = Array.isArray(data)
          ? data.length
          : data && typeof data === 'object'
            ? Object.keys(data).length
            : 0;

        return { message, data, length };
      }),
    );
  }
}
