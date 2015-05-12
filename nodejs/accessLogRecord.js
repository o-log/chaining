/*
function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}
*/

/**
 * модель одной записи аксесс-лога
 */
function accessLogRecord(){
    this.ip = '';
    this.domain = '';
    this.time = '';
    this.url = '';
    this.wait = '';
    this.upstream_http_code = '';
    this.http_code = '';
    this.size = '';

    //res.ts = strtotime($this->time);
    //res.dt = date('c', $this->ts);

    this.back_wait = '';
    this.back = '';

    this.ref = '';
    //res.ref = urldecode($this->ref);

    this.user_agent = '';
}

/**
 * заполняет модель данными из строки, если удалось - возвращает true
 * @param line
 * @returns {boolean}
 */
accessLogRecord.prototype.createObjFromString = function (line){

    var re = /^([\d\.]+) - ("[^"]+") [a-z-]+ \[([^\]]+)\] "([^"]*)" (\d+) (\d+) ([\d.]+) (\S+) (\S+) "([^"]*)" "([^"]*)" "([^"]*)"/;
    var matches = line.match(re);

    if (matches === null){
        return false;
    }

    //console.log(get_type(matches[0]));

    //var res = new accessLogRecord();

    this.ip = matches[1];
    this.domain = matches[2];
    this.time = matches[3];
    this.url = matches[4];
    this.wait = matches[7];
    this.upstream_http_code = matches[8];
    this.http_code = matches[5];
    this.size = matches[6];

    //res.ts = strtotime($this->time);
    //res.dt = date('c', $this->ts);

    this.back_wait = matches[9];
    this.back = matches[10];

    this.ref = matches[11];
    //res.ref = urldecode($this->ref);

    this.user_agent = matches[12];

    //console.log(res);

    return true;
}

module.exports = accessLogRecord;
