var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

watermark_object = new Buffer('lena.jpg@50p')
var params = {
  Bucket: KEY.bucket_name,
  Key: KEY.object_name,
  ImageActions: 'watermark=1&object=' + watermark_object.toString('base64')
};

var file = require('fs').createWriteStream('./download/watermark1');
s3.getImage(params).createReadStream().pipe(file);
