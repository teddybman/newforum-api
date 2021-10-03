const NewComment = require('../../Domains/threads/entities/NewComment');

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, owner) {
    const { threadId } = useCasePayload.params;

    // Check threadId existance
    await this._threadRepository.getThreadById(threadId);

    const comment = new NewComment(useCasePayload.payload);
    comment.threadId = threadId;
    comment.owner = owner;

    return this._threadRepository.addComment(comment);
  }
}

module.exports = AddCommentUseCase;
