var KEY = require('./key')
var MSS = require('../');

var config = new MSS.Config({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

//全局生效:
MSS.config = config;

var s3 = new MSS.S3();
s3.listBuckets(function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
