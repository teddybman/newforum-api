const GetThread = require('../../Domains/threads/entities/GetThread');

class GetThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;

    await this._threadRepository.getThreadById(threadId);

    const thread = await this._threadRepository.getThreadDetail(threadId);
    const comments = await this._threadRepository.getCommentsByThreadId(threadId);

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].isdelete) comments[i].content = '**komentar telah dihapus**';
    }

    const newComments = comments.map((cmt) => ({
      id: cmt.id,
      username: cmt.username,
      date: cmt.date,
      content: cmt.content,
    }));

    return new GetThread(thread, newComments);
  }
}

module.exports = GetThreadUseCase;
