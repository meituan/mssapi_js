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
  ImageActions: '50p',
  Expires: 600
};

var url = s3.getSignedUrl('getImage', params);
console.log("The URL to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL to HEAD is [%s]", url);

console.log();

watermark_object = new Buffer('lena.jpg@50p')
params['ImageActions'] = 'watermark=1&object=' + watermark_object.toString('base64')
var url = s3.getSignedUrl('getImage', params);
console.log("The URL(image watermark) to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL(image watermark) to HEAD is [%s]", url);

console.log();

watermark_text= new Buffer('你好Lena.jpg！')
params['ImageActions'] = 'watermark=2&type=d3F5LW1pY3JvaGVp&text=' + watermark_text.toString('base64')
var url = s3.getSignedUrl('getImage', params);
console.log("The URL(text watermark) to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL(text watermark) to HEAD is [%s]", url);
