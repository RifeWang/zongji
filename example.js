const Listener = require('./index');

const binlog = new Listener({
  host: 'localhost',
  user: 'user',
  password: 'password',
  // debug: true
}, {
  database: 'database',    // listening for which one database
  table: ['table_1', 'table_2'],   // listening for tables
  action: ['DeleteRows', 'WriteRows', 'UpdateRows']   // listening for actions
});


binlog.on(event => {
  console.log(event);
});

