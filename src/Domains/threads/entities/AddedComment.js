class AddedComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, owner, threadid, isdelete, date } = payload;

    this.id = id;
    this.content = content;
    this.owner = owner;
    this.threadId = threadid;
    this.isDelete = isdelete;
    this.date = date;
  }

  _verifyPayload({ id, content, owner, threadid, isdelete, date }) {
    if (!id || !content || !owner || !threadid || isdelete === '' || !date) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string' || typeof threadid !== 'string' || typeof isdelete !== 'boolean' || typeof date !== 'object') {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedComment;
