const ZongJi = require('./lib/zongji');

module.exports = class Listener {

  constructor(mysqlConfig) {
    this.zongji = new ZongJi(mysqlConfig);
  }

  async start (option) {
    this.zongji.start(option)
  }

  async on (cb) {
    this.zongji.on('binlog', event => {
      const result = event.dump();
      if (result && result.hasOwnProperty('action') && result.action.toLowerCase() != 'tablemap') {   // hide tablemap event
        cb( Object.assign({ binlogName: this.zongji.binlogName, binlogNextPos: this.zongji.binlogNextPos }, result) );
      } 
    });
  }

  async stop () {
    return this.zongji.stop();
  }
}