var KEY = require('./key')
var MSS = require('../');

var config = new MSS.Config({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

//实例化:
var s3 = new MSS.S3();
//当前实例生效:
s3.config = config;

s3.listBuckets(function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
