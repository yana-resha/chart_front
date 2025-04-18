import HttpRequestMock from 'http-request-mock'

export const setupMocks = () => {
  const mocker = HttpRequestMock.setup()

  const sendResponse = {
    basicResponse: {
      success: true,
      payload: {
        externalId: '1316234627',
      },
    },
  }

  mocker.mock({
    url: '',
    method: 'get',
    delay: 1000,
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: sendResponse,
  })
}
