const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadUseCase = require('../GetThreatUseCase');

describe('a GetThreadUseCase function', () => {
  it('should orchestrating get Thread detail action correctly', async () => {
    const useCasePayload = { threadId: 'thread-123' };

    const expectedGetThread = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: new Date('2021-09-01'),
      username: 'dicoding',
    };

    const expectedGetComments = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: new Date('2021-09-01'),
        content: 'sebuah komentar',
      },
    ];

    const expectedGetThreadDetail = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: new Date('2021-09-01'),
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: new Date('2021-09-01'),
          content: 'sebuah komentar',
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const getThreadDetailUseCase = new GetThreadUseCase({ threadRepository: mockThreadRepository });

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadDetail = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedGetThread));
    mockThreadRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedGetComments));

    const thread = await getThreadDetailUseCase.execute(useCasePayload);

    expect(thread.id).toEqual(expectedGetThreadDetail.id);
    expect(thread.title).toEqual(expectedGetThreadDetail.title);
    expect(thread.body).toEqual(expectedGetThreadDetail.body);
    expect(thread.date).toEqual(expectedGetThreadDetail.date);
    expect(thread.username).toEqual(expectedGetThreadDetail.username);
    expect(thread.comments.id).toEqual(expectedGetThreadDetail.comments.id);
    expect(thread.comments.username).toEqual(expectedGetThreadDetail.comments.username);
    expect(thread.comments.date).toEqual(expectedGetThreadDetail.comments.date);
    expect(thread.comments.content).toEqual(expectedGetThreadDetail.comments.content);

    expect(thread).toEqual(expectedGetThreadDetail);
    expect(mockThreadRepository.getThreadDetail).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getThreadDetail).toBeCalledTimes(1);
  });
});
