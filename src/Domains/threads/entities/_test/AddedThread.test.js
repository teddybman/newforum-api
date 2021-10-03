const AddedThread = require('../AddedThread');

describe('An AddedThread function', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'abc',
      title: 'just a title',
      body: 'this is a body',
      owner: 'user-123',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'abc',
      title: 'just a title',
      body: 'this is a body',
      owner: 123,
      date: '2021-09-01',
    };

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedThread object correctly', () => {
    const payload = {
      id: 'abc-123',
      title: 'just a title',
      body: 'this is a body',
      owner: 'user-123',
      date: '2021-09-01',
    };

    const { id, title, body, owner, date } = new AddedThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
  });
});
