export interface IResponseError {
  code: string
  message: string
}

export interface IBasicResponse<I> {
  success: boolean
  error?: IResponseError[]
  data?: I
}
