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

    var accessLogRecord_obj = new accessLogRecord();
    var alr_is_loaded = accessLogRecord_obj.createObjFromString(line);

    if (!alr_is_loaded){
        console.log('ALR fail');
        fails++;
        return;
    }

    var chain_obj = new chainingLogRecord();
    var chain_is_loaded = chain_obj.fillFromAccessLogRecordObj(accessLogRecord_obj);
    if (!chain_is_loaded){
        console.log('C fail');
        fails++;
        return;
    }

    chain_obj.chain();

    //
    // store access log record to elastic
    //

    var body = {};
    body.ip = accessLogRecord_obj.ip;
    body.url = accessLogRecord_obj.url;
    //'url_as_term' => self::el_term($this->url),
    //'wait' => intval($this->wait * 1000),
    body.dt = accessLogRecord_obj.dt;
    body.ref = accessLogRecord_obj.ref;
    //'user_agent' => $this->user_agent,
    //'platform' => $this->platform,
    //'back' => self::el_term($this->back),
    //'back_wait' => intval($this->back_wait * 1000),
    //'back_http_code' => $this->upstream_http_code,
    body.http_code = accessLogRecord_obj.http_code;
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