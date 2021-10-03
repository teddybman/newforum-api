const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating create new thread action correctly', async () => {
    const useCasePayload = {
      payload: { title: 'sebuah thread', body: 'sebuah body thread' },
    };

    const owner = 'user-123';

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.payload.title,
      body: useCasePayload.payload.body,
      owner,
      date: '2021-09-01',
    });

    const mockThreadRepository = new ThreadRepository();

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));

    const addedThread = await getThreadUseCase.execute(useCasePayload, owner);

    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith({
      title: 'sebuah thread',
      body: 'sebuah body thread',
      owner: 'user-123',
    });
  });
});
