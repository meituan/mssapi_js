var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key
});

var params = {
  Bucket: KEY.bucket_name,//required
  Delimiter: '/',         //用'/'折叠伪子目录
  Marker: '',             //分页标签
  MaxKeys: 100,           //最大成员数
  Prefix: ''              //按前缀查询
};

s3.listObjects(params, function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
