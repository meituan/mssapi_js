var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key,
  params:{
    Bucket: KEY.bucket_name,
    Key: KEY.object_name
  }
});

s3.headObject(function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
