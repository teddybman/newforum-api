/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'sebuah thread',
    body = 'ini adalah sebuah thread',
    owner = 'user-123',
    date = new Date('2021-09-01'),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async getThreadById(id) {
    const query = {
      text: 'SELECT id, title, body, owner, date FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async addComment({
    id = 'comment-123',
    content = 'sebuah komentar',
    owner = 'user-123',
    threadId = 'thread-123',
    isDelete = false,
    date = new Date('2021-09-01'),
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, content, owner, threadId, isDelete, date],
    };

    await pool.query(query);
  },

  async getCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async getCommentDetail(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteCommentById(commentId, owner) {
    const query = {
      text: 'UPDATE comments set is_delete = $1 WHERE id = $2 and owner = $3',
      values: [true, commentId, owner],
    };

    await pool.query(query);
  },

  async getThreadDetail(threadId) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username,
             comments.id AS com_id, xusers.username AS com_username, comments.date AS com_date, comments.content,
             comments.is_delete  
             FROM threads threads 
             INNER JOIN users users on threads.owner = users.id
             RIGHT JOIN comments comments on comments.thread_id = threads.id
             INNER JOIN users xusers on xusers.id = comments.owner
             WHERE threads.id = $1
            `,
      values: [threadId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads CASCADE');
  },
};

module.exports = ThreadsTableTestHelper;
