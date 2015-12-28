var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

watermark_text= new Buffer('你好Lena.jpg！')
var params = {
  Bucket: KEY.bucket_name,
  Key: KEY.object_name,
  ImageActions: 'watermark=2&type=d3F5LW1pY3JvaGVp&text=' + watermark_text.toString('base64')
};

var file = require('fs').createWriteStream('./download/watermark2');
s3.getImage(params).createReadStream().pipe(file);
