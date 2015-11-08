var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

// This URL will expire in one minute (600 seconds)
var params = {
  Bucket: KEY.bucket_name,
  Key: KEY.object_name,
  Expires: 600
};

var url = s3.getSignedUrl('getObject', params);
console.log("The URL to GET is [%s]", url);

var url = s3.getSignedUrl('headObject', params);
console.log("The URL to HEAD is [%s]", url);
