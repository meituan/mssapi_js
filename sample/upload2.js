var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

var fileBuffer = require('fs').readFileSync('./upload/file');

s3.putObject({
  Bucket: KEY.bucket_name,
  Key: 'upload/file2',
  Body: fileBuffer
}, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('success');
  }
});
