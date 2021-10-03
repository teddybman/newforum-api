const NewComment = require('../NewComment');

describe('a NewComment Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'abc',
      date: '01/12/2020',
    };

    expect(() => new NewComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      content: 123,
    };

    expect(() => new NewComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewComment object correctly', () => {
    const payload = {
      content: 'isi dari comment',
    };

    const { content } = new NewComment(payload);

    expect(content).toEqual(payload.content);
  });
});
