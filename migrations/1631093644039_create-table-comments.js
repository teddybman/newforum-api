exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    threadid: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    isdelete: {
      type: 'BOOLEAN',
      notNull: true,
    },
    date: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  pgm.addConstraint('comments', 'fk_comments.owner_and_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('comments', 'fk_comments.threadid_and_threads.id', 'FOREIGN KEY(threadid) REFERENCES threads(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};
