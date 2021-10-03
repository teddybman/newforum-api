class GetThread {
  constructor(thread, comments) {
    this._verifyPayload(thread);
    this._verifyPayloadComment(comments);

    const { id, title, body, date, username } = thread;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = new Date(date);
    this.username = username;
    this.comments = comments;
  }

  _verifyPayload({ id, title, body, date, username }) {
    if (!id || !title || !body || !date || !username) {
      throw new Error('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof username !== 'string' || typeof date !== 'object') {
      throw new Error('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyPayloadComment(comments) {
    comments.map((cmt) => {
      if (!cmt.id || !cmt.username || !cmt.date || !cmt.content) {
        throw new Error('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
      if (typeof cmt.id !== 'string' || typeof cmt.username !== 'string' || typeof cmt.date !== 'object' || typeof cmt.content !== 'string') {
        throw new Error('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
      return true;
    });
  }
}

module.exports = GetThread;
