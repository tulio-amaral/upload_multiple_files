const url = require('url');

class Routes {
  #io
  constructor(io) {
    this.#io = io
  }

  async post(request, response) {
    const { headers } = request;
    const { query: { socketId } } = url.parse(request.url, true);

    console.log('chamou!', socketId);

    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)

    const onFinish = (response, redirectTo) => {
      response.writeHead(303,  {
        Connection: 'close',
        Location: `${redirectTo}?msg=Files uploaded with success!`
      })

      response.end()
    }

    setTimeout(() => {
      return onFinish(response, headers.origin)

    }, 2000)

  }
}

module.exports = Routes