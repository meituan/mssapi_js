var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

var params = {
  Bucket: KEY.bucket_name,
  Key: KEY.object_name,
  ImageActions: '50p'
};

var file = require('fs').createWriteStream('./download/iamge1');
s3.getImage(params).createReadStream().pipe(file);
