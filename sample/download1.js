var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

var params = {
  Bucket: KEY.bucket_name,
  Key: KEY.object_name
};

var file = require('fs').createWriteStream('./download/file1');
s3.getObject(params).createReadStream().pipe(file);
