const GetThread = require('../GetThread');

describe('a GetThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      id: 'abc',
      title: 'this is a title',
      body: 'a content',
      date: '12/01/2020',
    };

    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'aaa',
      title: 123,
      body: 'a content',
      date: '12/01/2020',
      username: 'test',
      comments: [],
    };

    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should fetch GetThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: new Date('10/11/2020'),
      username: 'dicoding',
    };

    const commentPayload = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: new Date('2021-09-01'),
        content: 'sebuah komentar',
      },
    ];

    const getThread = new GetThread(payload, commentPayload);

    expect(getThread.id).toEqual(payload.id);
    expect(getThread.title).toEqual(payload.title);
    expect(getThread.body).toEqual(payload.body);
    expect(getThread.date).toEqual(payload.date);
    expect(getThread.username).toEqual(payload.username);
    expect(getThread.comments.id).toEqual(commentPayload.id);
    expect(getThread.comments.username).toEqual(commentPayload.username);
    expect(getThread.comments.content).toEqual(commentPayload.content);
  });
});
