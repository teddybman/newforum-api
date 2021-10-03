const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('a DeleteCommentUseCase function', () => {
  it('should orchestrating soft delete comment action correctly', async () => {
    const useCasePayload = {
      params: { threadId: 'thread-123', commentId: 'comment-123' },
    };

    const owner = 'user-123';

    const expectedDeletedComment = {
      id: 'comment-123',
      content: 'sebuah komentar',
      owner: 'user-123',
      isdelete: true,
      date: '2021-09-01',
    };

    const mockThreadRepository = new ThreadRepository();
    const getCommentDeleteUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDeletedComment));

    await getCommentDeleteUseCase.execute(useCasePayload, owner);

    expect(mockThreadRepository.getThreadById)
      .toHaveBeenCalledWith(useCasePayload.params.threadId);
    expect(mockThreadRepository.getCommentById)
      .toHaveBeenCalledWith(useCasePayload.params.commentId);
  });
});
