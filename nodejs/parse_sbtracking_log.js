"use strict";

var fs = require('fs');
var readlines = require('./readlines');
var accessLogRecord = require('./accessLogRecord');
var chainingLogRecord = require('./chainingLogRecord');

var line_index = 0;
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

    accessLogRecord_obj.storeToElastic();

    var chain_obj = new chainingLogRecord();
    var chain_is_loaded = chain_obj.fillFromAccessLogRecordObj(accessLogRecord_obj);
    if (!chain_is_loaded){
        console.log('C fail');
        fails++;
        return;
    }

    chain_obj.chain();

    line_index++;
}

var input = fs.createReadStream('/tmp/lines.txt');
readlines.readLines(input, lineParser);