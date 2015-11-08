var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

var file = require('fs').createReadStream('./upload/file');

var params = {
  Bucket: KEY.bucket_name,
  Key: 'upload/file1',
  Body: file
};

s3.putObject(params).on('httpHeaders', function(statusCode, headers) {
  console.log(headers);
}).on('httpUploadProgress', function(progress) {
  console.log(progress);
}).on('error', function(error) {
  console.log(error);
}).on('success', function() {
  console.log('success');
}).send();
