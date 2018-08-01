
# Base on [zongji]('https://github.com/nevill/zongji'), wrap for result

## Quick Start

```javascript
const Listener = require('./index');

const binlog = new Listener({
  host: 'localhost',    // MySQL Connection Settings 
  user: 'user',
  password: 'password',
}, {
  database: 'database',    // listening for which one database
  table: ['table_1', 'table_2'],   // listening for tables
  action: ['DeleteRows', 'WriteRows', 'UpdateRows']   // listening for actions
});


binlog.on(result => {
  console.log(result);   // return an object that includes action, database, table, rows 
});
```


### the result like below: 
```
{
  action: 'WriteRows',
  database: 'database',
  table: 'table_1',
  rows:[ 
    { id: 1, username: 'name', sex: 'm' } 
  ]
}
```

For a complete implementation see [`example.js`](example.js)...


