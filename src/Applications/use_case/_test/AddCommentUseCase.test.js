const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('a AddCommentUseCase function', () => {
  it('should orchestrating create new comment action correctly', async () => {
    const useCasePayload = {
      params: { threadId: 'thread-123' },
      payload: { content: 'sebuah komentar' },
    };

    const owner = 'user-123';

    const expectedAddedComment = {
      id: 'comment-123',
      content: 'sebuah komentar',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    const mockThreadRepository = new ThreadRepository();

    const getCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment));

    const addedComment = await getCommentUseCase.execute(useCasePayload, owner);

    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.addComment).toBeCalledWith({
      content: 'sebuah komentar',
      owner: 'user-123',
      threadId: 'thread-123',
    });
  });
});
