class ThreadsHandler {
  constructor({
    addThreadUseCase,
    getThreadUseCase,
    addCommentUseCase,
    deleteCommentUseCase,
  }) {
    this._addThreadUseCase = addThreadUseCase;
    this._getThreadUseCase = getThreadUseCase;
    this._addCommentUseCase = addCommentUseCase;
    this._deleteCommentUseCase = deleteCommentUseCase;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id } = request.auth.credentials;
    const addedThread = await this._addThreadUseCase.execute(request, id);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const getThread = await this._getThreadUseCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data: {
        thread: getThread,
      },
    });
    response.code(200);
    return response;
  }

  async postCommentHandler(request, h) {
    const { id } = request.auth.credentials;
    const addedComment = await this._addCommentUseCase.execute(request, id);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h) {
    const { id } = request.auth.credentials;
    const deleteComment = await this._deleteCommentUseCase.execute(request, id);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
