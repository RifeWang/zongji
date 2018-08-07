const Listener = require('./index');

const binlog = new Listener({
  host: 'localhost',    // MySQL Connection Settings 
  user: 'user',
  password: 'password',
  // debug: true
});

binlog.on(event => {
  console.log(event);
});

binlog.start({
  serverId: 1,
  startAtEnd: true,
  includeEvents: ['rotate', 'tablemap', 'writerows', 'updaterows', 'deleterows'],  
  includeSchema: {
    'database': ['table_1', 'table_2'],  
  }
});