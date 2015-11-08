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

var file = require('fs').createWriteStream('./download/file2');

s3.getObject(params).on('httpData', function(chunk) {
  file.write(chunk);
}).on('httpDone', function() {
  file.end();
}).on('httpDownloadProgress', function(progress) {
  console.log(progress);
}).on('error', function(error) {
  console.log(error);
}).on('success', function() {
  console.log('success');
}).on('httpHeaders', function(statusCode, headers) {
  console.log('statusCode: ' + statusCode + "\n", headers);
}).send();
