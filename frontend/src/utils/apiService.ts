import axios, { AxiosInstance, Method, RawAxiosRequestHeaders } from "axios";

interface ApiServiceRequestConfig<BodyType> {
  method: Method;
  url: string;
  headers?: RawAxiosRequestHeaders | undefined;
  body?: BodyType;
  params?: any;
}

interface ApiServiceGetConfig<QueryType> {
  url: string;
  query?: QueryType | undefined;
}

interface ApiServicePostConfig<BodyType> {
  url: string;
  body?: BodyType | undefined;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // @ts-ignore
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  private async request<D>({
    method,
    url,
    headers = {},
    body,
    params
  }: ApiServiceRequestConfig<D>) {
    const token = localStorage.getItem('token');

    const baseHeaders = {
      "Content-Type": "application/json",
      "Authorization": token ? "Bearer " + token : undefined,
    };

    return this.axiosInstance({
      method,
      url,
      headers: {
        ...baseHeaders,
        ...headers,
      },
      data: body,
      params,
    });
  }

  public async get<Q>({ url, query }: ApiServiceGetConfig<Q>) {
    return this.request({
      method: 'GET',
      url,
      params: query,
    });
  }

  public async post<B>({ url, body }: ApiServicePostConfig<B>) {
    return this.request({
      method: 'POST',
      url,
      body,
    });
  }
}

export const apiService = new ApiService();
