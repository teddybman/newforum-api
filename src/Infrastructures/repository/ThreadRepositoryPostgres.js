const AddedThread = require('../../Domains/threads/entities/AddedThread');
const AddedComment = require('../../Domains/threads/entities/AddedComment');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ id, title, body, owner, date });
  }

  async getThreadById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak dapat ditemukan');
    }
    return result.rows;
  }

  async getThreadDetail(threadId) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
             FROM threads threads
             INNER JOIN users users on threads.owner = users.id
             WHERE threads.id = $1
            `,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT comments.id, users.username, comments.date, comments.content, comments.isdelete
             FROM comments
             INNER JOIN users users ON users.id = comments.owner
             WHERE comments.threadid = $1
             ORDER BY comments.date
            `,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async addComment(newComment) {
    const { content, owner, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner, threadId, isDelete, date',
      values: [id, content, owner, threadId, false, date],
    };

    const result = await this._pool.query(query);
    console.log('addComment Result :', result.rows[0]);

    return new AddedComment({ ...result.rows[0] });
  }

  async getCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak dapat ditemukan');
    }

    return result.rows;
  }

  async deleteCommentById(commentId, owner) {
    const query = {
      text: 'UPDATE comments SET isdelete = $1 WHERE id = $2 and owner = $3',
      values: [true, commentId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('anda tidak memiliki hak mengakses comment ini');
    }
  }
}

module.exports = ThreadRepositoryPostgres;
