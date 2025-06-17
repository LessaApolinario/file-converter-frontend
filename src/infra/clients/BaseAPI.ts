import { env } from '@/core/utils/env'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

export class BaseAPI {
  private _client: AxiosInstance

  constructor() {
    this._client = axios.create({
      baseURL: `${env.VITE_FILE_CONVERTER_API_URL}/api`,
    })
  }

  get client() {
    return this._client
  }
}
