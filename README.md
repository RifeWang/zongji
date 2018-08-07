
# Base on [zongji](https://github.com/nevill/zongji), wrap for result

## Installation

* Requires Node.js v4+

  ```bash
  $ npm install zongji2
  ```

## Quick Start

```javascript
const Listener = require('zongji2');

const binlog = new Listener({
  host: 'localhost',    // MySQL Connection Settings 
  user: 'user',
  password: 'password',
});

binlog.on(result => {
  console.log(result);    
  // get result and then do anything you want
});

binlog.start({
  serverId: 1,
  startAtEnd: true,
  includeEvents: ['rotate', 'tablemap', 'writerows', 'updaterows', 'deleterows'],  
  includeSchema: {
    'database': ['table_1', 'table_2'],  
  }
});
```


### the result like below: 
You can retry through binlogName and binlogNextPos if something error.
```
{
  binlogName: 'mysql-bin.000004',  
  binlogNextPos: 5670,
  action: 'WriteRows',
  database: 'database',
  table: 'table_1',
  rows:[ 
    { id: 1, username: 'name', sex: 'm' } 
  ]
}
```

For a complete implementation see [zongji](https://github.com/nevill/zongji) ...


