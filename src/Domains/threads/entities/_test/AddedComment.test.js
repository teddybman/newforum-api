const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      id: 'abc-123',
      content: 'this is a content',
      owner: 'user-123',
      threadid: 'thread-123',
      isdelete: true,
    };

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'abc-123',
      content: 'this is a content',
      owner: 'user-123',
      threadid: 'thread-123',
      isdelete: 123,
      date: '2021-09-01',
    };
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedComment object correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'sebuah komentar',
      owner: 'user-123',
      threadid: 'thread-123',
      isdelete: false,
      date: new Date('2021-09-01'),
    };

    const { id, content, owner, threadid, isdelete, date } = new AddedComment(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
