class DeleteCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, owner) {
    const { threadId, commentId } = useCasePayload.params;

    // check thread Id, comment Id & Owner
    await this._threadRepository.getThreadById(threadId);

    await this._threadRepository.getCommentById(commentId);

    await this._threadRepository.deleteCommentById(commentId, owner);
  }
}

module.exports = DeleteCommentUseCase;
