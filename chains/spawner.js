"use strict";

process.argv.shift();
process.argv.shift();
var source_filename = process.argv.shift();

if (!source_filename){
    console.log('no input filename given');
    process.exit();
}

var child_process = require('child_process');
var fs = require('fs');

var re = /\//g;
var source_filename_proc = source_filename.replace(re, '_');
console.log(source_filename_proc);
var parts_dir_path = '/tmp/' + source_filename_proc + '.parts';

if (!fs.existsSync(parts_dir_path)) {
    fs.mkdirSync(parts_dir_path);
}

var letters = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];

var active_workers = 0;

//letters.forEach(processLetter);
var letter = letters.shift();
processLetter(letter);

function processLetter(letter){
    var output_filename = parts_dir_path + '/' + letter;

    console.log(active_workers + ' ' + letter + ' GREP');
    var grep_child = child_process.execSync('grep uuid=' + letter + ' ' + source_filename + ' > ' + output_filename);

    console.log(letter + ' PARSE');
    var parser_child = child_process.spawn('node', ['parse_sbtracking_log.js', output_filename]);

    parser_child.stdout.on('data', function (data) {
        console.log(letter + ' stdout: ' + data);
    });

    parser_child.stderr.on('data', function (data) {
        console.log(letter + ' stderr: ' + data);
    });

    parser_child.on('close', function (code) {
        console.log(letter + ' child process exited with code ' + code);
        var letter = letters.shift();
        if (!letter){
            process.exit();
        }
        processLetter(letter);
    });
}