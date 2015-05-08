"use strict";

var fs = require('fs');
var readlines = require('./readlines');
var accessLogRecord = require('./accessLogRecord');
var chainingLogRecord = require('./chainingLogRecord');
var elasticsearch = require('elasticsearch');

var el_client = new elasticsearch.Client({
    host: 'localhost:9200'
});

var line_index = 0;
var bulk = [];
var fails = 0;

function lineParser(line) {
    console.log('Line ' + line_index + "/" + fails);
    var res = accessLogRecord.createObjFromString(line);

    if (res === null){
        fails++;
        return;
    }

    var chaining_res = chainingLogRecord.createObjFromAccessLogRecordObj(res);

    var body = {};
    body.ip = res.ip;
    body.url = res.url;
    //'url_as_term' => self::el_term($this->url),
    //'wait' => intval($this->wait * 1000),
    body.dt = res.dt;
    body.ref = res.ref;
    //'user_agent' => $this->user_agent,
    //'platform' => $this->platform,
    //'back' => self::el_term($this->back),
    //'back_wait' => intval($this->back_wait * 1000),
    //'back_http_code' => $this->upstream_http_code,
    body.http_code = res.http_code;
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

    line_index++;
}

var input = fs.createReadStream('/tmp/lines.txt');
readlines.readLines(input, lineParser);