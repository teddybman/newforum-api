const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const GetThread = require('../../../Domains/threads/entities/GetThread');

describe('a ThreadRepositoryPostgres', () => {
  it('should be instance of ThreadRepository domain', () => {
    const threadRepositoryPostgres = new ThreadRepository({}, {});

    expect(threadRepositoryPostgres).toBeInstanceOf(ThreadRepository);
  });

  describe('behaviour test', () => {
    afterEach(async () => {
      await UsersTableTestHelper.cleanTable();
      await ThreadsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe('an addThread function', () => {
      it('should persist new thread and return added thread correctly', async () => {
        const newThread = ({
          title: 'sebuah thread',
          body: 'sebuah body thread',
          owner: 'user-123',
        });

        await UsersTableTestHelper.addUser({ username: 'dicoding' });

        const fakeIdGenerator = () => '123';
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        const addedThread = await threadRepositoryPostgres.addThread(newThread);
        const thread = await ThreadsTableTestHelper.getThreadById('thread-123');
        expect(addedThread.id).toEqual('thread-123');
        expect(addedThread.title).toEqual('sebuah thread');
        expect(addedThread.body).toEqual('sebuah body thread');
        expect(addedThread.owner).toEqual('user-123');
        expect(thread).toHaveLength(1);
      });
    });

    describe('a getThreadById function', () => {
      it('should throw NotFound error when thread id not available', async () => {
        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-999' });
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await expect(threadRepositoryPostgres.getThreadById('thread-123')).rejects.toThrowError(NotFoundError);
      });

      it('should not throw NotFound error when thread id is available', async () => {
        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await expect(threadRepositoryPostgres.getThreadById('thread-123')).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe('an addComment function', () => {
      it('should persist new comment and return added comment correctly', async () => {
        const newComment = ({
          content: 'sebuah komentar',
          owner: 'user-123',
          threadId: 'thread-123',
        });

        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });

        const fakeIdGenerator = () => '123';
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        const addedComment = await threadRepositoryPostgres.addComment(newComment);
        const comment = await ThreadsTableTestHelper.getCommentById('comment-123');
        expect(addedComment.id).toEqual('comment-123');
        expect(addedComment.content).toEqual('sebuah komentar');
        expect(addedComment.owner).toEqual('user-123');
        expect(addedComment.threadId).toEqual('thread-123');
        expect(addedComment.isDelete).toEqual(false);
        expect(addedComment.date).toBeInstanceOf(Date);
        expect(comment).toHaveLength(1);
      });
    });

    describe('getThreadDetail function', () => {
      it('should get Thread Data Detail and display correctly', async () => {
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
        await ThreadsTableTestHelper.addComment({ content: 'sebuah komentar' });

        const threadDetail = await threadRepositoryPostgres.getThreadDetail('thread-123');
        expect(threadDetail).toStrictEqual({
          id: 'thread-123',
          title: 'sebuah thread',
          body: 'ini adalah sebuah thread',
          date: new Date('2021-09-01'),
          username: 'dicoding',
        });
      });
    });

    describe('getCommentsByThreadId function', () => {
      it('should get comment by ThreadId Data Detail and display correctly', async () => {
        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
        await ThreadsTableTestHelper.addComment({ content: 'sebuah komentar' });

        const threadDetail = await threadRepositoryPostgres.getCommentsByThreadId('thread-123');
        expect(threadDetail).toStrictEqual([
          {
            id: 'comment-123',
            username: 'dicoding',
            date: new Date('2021-09-01'),
            isdelete: false,
            content: 'sebuah komentar',
          },
        ]);
      });
    });

    describe('a getCommentById function', () => {
      it('should throw error when comment id not found', async () => {
        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
        await ThreadsTableTestHelper.addComment({ content: 'sebuah comment' });

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await expect(threadRepositoryPostgres.getCommentById('comment-111')).rejects.toThrowError(NotFoundError);
      });

      it('should not throw error when comment id is found', async () => {
        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
        await ThreadsTableTestHelper.addComment({ content: 'sebuah comment' });

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await expect(threadRepositoryPostgres.getCommentById('comment-123')).resolves.not.toThrowError(NotFoundError);
      });
    });

    describe('a deleteCommentById function', () => {
      it('should update isDelete column to true', async () => {
        await UsersTableTestHelper.addUser({ username: 'dicoding' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
        await ThreadsTableTestHelper.addComment({ content: 'sebuah comment' });

        const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

        await threadRepositoryPostgres.deleteCommentById('comment-123', 'user-123');
        const comments = await threadRepositoryPostgres.getCommentById('comment-123');
        expect(comments[0].isdelete).toEqual(true);
      });
    });
  });
});
