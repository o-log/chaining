var start_msecs = new Date().getTime();

var sum = 0;
for (var i = 0; i < 10000000; i++){
  sum++;

}

var end_msecs = new Date().getTime();

response.write("sum: " + sum + "\n");
response.write("msecs: " + (end_msecs - start_msecs) + "\n");
