"use strict";

var fs = require('fs');
var readlines = require('./readlines');
var accessLogRecord = require('./accessLogRecord');
var chainingLogRecord = require('./chainingLogRecord');
var context = require('./context');

var line_index = 0;
var alr_fails = 0;
var clr_fails = 0;




var elasticsearch = require('elasticsearch');

var el_client = new elasticsearch.Client({
    host: 'localhost:9200'
});


console.log('creating index');

el_client.indices.create({index: "nodejs_chains"}, function(){
    var body = {
        nodejs_chains: {
            properties: {
                origin: {"type": "string", "index": "not_analyzed"},
                ref: {"type": "string", "index": "not_analyzed"},
                url_0: {"type": "string", "index": "not_analyzed"},
                url_1: {"type": "string", "index": "not_analyzed"},
                url_2: {"type": "string", "index": "not_analyzed"},
                url_3: {"type": "string", "index": "not_analyzed"},
                url_4: {"type": "string", "index": "not_analyzed"},
                group_0: {"type": "string", "index": "not_analyzed"},
                group_1: {"type": "string", "index": "not_analyzed"},
                group_2: {"type": "string", "index": "not_analyzed"},
                group_3: {"type": "string", "index": "not_analyzed"},
                group_4: {"type": "string", "index": "not_analyzed"},
                last_action_0: {"type": "string", "index": "not_analyzed"},
                last_action_1: {"type": "string", "index": "not_analyzed"},
                last_action_2: {"type": "string", "index": "not_analyzed"},
                last_action_3: {"type": "string", "index": "not_analyzed"},
                last_action_4: {"type": "string", "index": "not_analyzed"}
            }
        }
    };

    el_client.indices.putMapping({index: "nodejs_chains", type: "nodejs_chains", body: body}, mainLoop);
});




function lineParser(line) {
    if ((line_index % 5000) == 0) {
        console.log('Line ' + line_index + "/" + alr_fails + "/" + clr_fails + "/" + context.getChainsCount());
    }

    var accessLogRecord_obj = new accessLogRecord();
    var alr_is_loaded = accessLogRecord_obj.createObjFromString(line);

    if (!alr_is_loaded){
        //console.log('ALR fail');
        alr_fails++;
        return;
    }

    //accessLogRecord_obj.storeToElastic();

    var clr_obj = new chainingLogRecord();
    var clr_is_loaded = clr_obj.fillFromAccessLogRecordObj(accessLogRecord_obj);
    if (!clr_is_loaded){
        //console.log('C fail');
        clr_fails++;
        return;
    }

    clr_obj.chain();

    line_index++;
}

function mainLoop() {
    process.argv.shift();
    process.argv.shift();
    var input_filename = process.argv.shift();

    if (!input_filename){
        console.log('no input filename given');
        process.exit();
    }

    console.log('parsing ' + input_filename);

    var input = fs.createReadStream(input_filename);
    readlines.readLines(input, lineParser);
}