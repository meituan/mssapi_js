var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

s3.listBuckets(function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
