const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    content: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    weather: {
      type: 'varchar',
    },
    is_delete: {
      type: 'varchar',
      default: 'false',
    },
    created_at: {
      createDate: 'true',
    },
    updated_at: {
      updateDate: 'true',
    },
  },
});
