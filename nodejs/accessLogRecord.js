var elasticsearch = require('elasticsearch');

var el_client = new elasticsearch.Client({
    host: 'localhost:9200'
});

var bulk = [];

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

    //this.ts = strtotime($this->time);
    //res.dt = date('c', $this->ts);
    this.ts = 0;
    this.dt = 0; // TODO: use valid default date?

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

    //console.log(this.time);

    var clf_date_re = /^(.+?)\/(.+?)\/(.+?):(.+)$/;
    var clf_date_matches = this.time.match(clf_date_re);

    var rfc822_date = clf_date_matches[1] + ' ' + clf_date_matches[2] + ' ' + clf_date_matches[3] + ' ' + clf_date_matches[4];

    //console.log(clf_date_matches);


    //var pd = Date.parse(rfc822_date);

    //console.log(pd);

    var d = new Date(rfc822_date);

    //console.log(d);

    this.ts = d.getTime();
    this.dt = d.toISOString();

    //console.log(this.dt);

    this.back_wait = matches[9];
    this.back = matches[10];

    this.ref = matches[11];
    //res.ref = urldecode($this->ref);

    this.user_agent = matches[12];

    //console.log(res);

    return true;
}

accessLogRecord.prototype.storeToElastic = function(){
    //
    // store access log record to elastic
    //

    var body = {};
    body.ip = this.ip;
    body.url = this.url;
    //'url_as_term' => self::el_term($this->url),
    //'wait' => intval($this->wait * 1000),
    body.dt = this.dt;
    body.ref = this.ref;
    //'user_agent' => $this->user_agent,
    //'platform' => $this->platform,
    //'back' => self::el_term($this->back),
    //'back_wait' => intval($this->back_wait * 1000),
    //'back_http_code' => $this->upstream_http_code,
    body.http_code = this.http_code;
    //'user_agent_as_term' => self::el_term($this->user_agent),
    //'size' => intval($this->size)

    /*
     var task = {
     index: 'nodejs',
     type: 'nodejs',
     //id: '1',
     body: body
     };
     ;
     el_client.create(task);
     */

    var task = { index:  {
        _index: 'nodejs',
        _type: 'nodejs'
    }};

    bulk.push(task);
    bulk.push(body);

    if (bulk.length == 200){
        el_client.bulk({
            body: bulk
        });

        bulk = [];
    }

}

module.exports = accessLogRecord;
