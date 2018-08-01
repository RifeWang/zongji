const ZongJi = require('./lib/zongji');

module.exports = class Listener {

  constructor(mysqlConfig, listenOptions) {
    this.zongji = new ZongJi(mysqlConfig);
    
    const t = [];
    const tmp = Array.isArray(listenOptions) ? listenOptions : [listenOptions];
    tmp.map(option => {
      if (option.hasOwnProperty('database') && option.hasOwnProperty('table') && option.hasOwnProperty('action')) {   // verify
        t.push(option);
      }
    })
    this.listenOptions = t;
    
    this.start();
  }

  async start () {
    this.zongji.start({
      startAtEnd: true,
      includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows']  
    })
  }

  async on (cb) {
    this.zongji.on('binlog', event => {
      const result = event.dump();
      if (result.action.toLowerCase() != 'tablemap') {   // hide tablemap event
        let flag = false;
        this.listenOptions.map(v => {
          if (v.database == result.database && v.table.includes(result.table) && v.action.includes(result.action)) {   // check database/table/action 
            flag = true
          }
        })
        if (flag) {
          cb(result);
        }
      }
    });
  }

  async stop () {
    return this.zongji.stop();
  }
}