import { Injectable } from '@nestjs/common';
import {
  IHttp,
  IHttpRequest,
  IHttpResponse,
} from '../../../../../data/ports/http/http';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

const RESOURCE = 'checkin';

@Injectable()
export class CustomerHttp implements IHttp {
  constructor(private httpService: HttpService) {}

  async post(request: IHttpRequest): Promise<IHttpResponse> {
    const response = await lastValueFrom(
      this.httpService.post(RESOURCE, {
        date: new Date(),
        customer: request.body.customer,
      }),
    );
    return {
      body: response.data,
      status: response.status,
    };
  }
  get(request: IHttpRequest): Promise<IHttpResponse> {
    throw new Error('Method not implemented.' + request.url);
  }
  put(request: IHttpRequest): Promise<IHttpResponse> {
    throw new Error('Method not implemented.' + request.url);
  }
  patch(request: IHttpRequest): Promise<IHttpResponse> {
    throw new Error('Method not implemented.' + request.url);
  }
  delete(request: IHttpRequest): Promise<IHttpResponse> {
    throw new Error('Method not implemented.' + request.url);
  }
}
