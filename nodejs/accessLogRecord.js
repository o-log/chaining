/*
function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}
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

function createObjFromString(line){

    var re = /^([\d\.]+) - ("[^"]+") [a-z-]+ \[([^\]]+)\] "([^"]*)" (\d+) (\d+) ([\d.]+) (\S+) (\S+) "([^"]*)" "([^"]*)" "([^"]*)"/;
    var matches = line.match(re);

    if (matches === null){
        return null;
    }

    //console.log(get_type(matches[0]));

    var res = new accessLogRecord;

    res.ip = matches[1];
    res.domain = matches[2];
    res.time = matches[3];
    res.url = matches[4];
    res.wait = matches[7];
    res.upstream_http_code = matches[8];
    res.http_code = matches[5];
    res.size = matches[6];

    //res.ts = strtotime($this->time);
    //res.dt = date('c', $this->ts);

    res.back_wait = matches[9];
    res.back = matches[10];

    res.ref = matches[11];
    //res.ref = urldecode($this->ref);

    res.user_agent = matches[12];

    //console.log(res);

    return res;

}

exports.createObjFromString = createObjFromString;