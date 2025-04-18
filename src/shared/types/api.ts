export interface ErrorResponse {
  error?: string[]
}

export type BasicResponse<T> = ErrorResponse & T
