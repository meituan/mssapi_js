mss-sdk-js
==========

美团云存储(MSS) SDK for Node.js

### Installation

	npm install mss-sdk

### Usage
  
#### 初始化`MSS`

```javascript
var MSS = require('mss-sdk');
```

#### 配置

##### 方法1:

```javascript

// 参考sample/config1.js

var config = new MSS.Config({
	accessKeyId: '你的accessKey', 
	secretAccessKey: '你的secretKey'
});

//全局生效:
MSS.config = config;
```

##### 方法2:
  
创建一个json文件`config.json`:

```javascript

{
	"accessKeyId": "你的accessKey", 
	"secretAccessKey": "你的secretKey"
}
```

加载`config.json`:

```javascript

// 参考sample/config2.js

//全局生效:
MSS.config.loadFromPath('./config.json');
```
  
##### 方法3:

```javascript

// 参考sample/config3.js

var config = new MSS.Config({
	accessKeyId: '你的accessKey', 
	secretAccessKey: '你的secretKey'
});

//实例化:
var s3 = new MSS.S3();
//当前实例生效:
s3.config = config;
```
  
##### 方法4:

```javascript

// 参考sample/config4.js

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});
```
  
#### 实例化

##### 示例1:

```javascript

var s3 = new MSS.S3();
```
  
##### 示例2:

```javascript

var mybucket = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});
```
  
##### 示例3:

```javascript

// 参考sample/inst3.js

var mybucket = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey',
  params:{
    Bucket: 'mybucket'
  }
});
```
  
##### 示例4:

```javascript

// 参考sample/inst4.js

var mykey = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey',
  params:{
    Bucket: 'mybucket',
    Key: 'myObject'
  }
});
```

#### 调用

##### 创建一个bucket并上传一个文件:

```javascript

// 参考sample/create_bucket.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey',
  params:{
    Bucket: 'myBucket'
  }
});

s3.createBucket(function() {
  var data = {Key: 'Hello', Body: 'Word!'};
  s3.putObject(data, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to %s/Hello", 'myBucket');
    }
  });
});
```

##### 列出所有bucket:

```javascript

// 参考sample/list_buckets.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

s3.listBuckets(function(err, data) {
	if (err)
		console.log(err, err.stack);
	else
		console.log(data);
});
```
	
##### 列出bucket中的文件:

```javascript

// 参考sample/list_objects.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',     //required
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
```
	
##### 下载文件示例1:

```javascript

// 参考sample/download1.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',
  Key: 'myObject'};
var file = require('fs').createWriteStream('./download/file1');
s3.getObject(params).createReadStream().pipe(file);
```

##### 下载文件示例2:

```javascript

// 参考sample/download2.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',
  Key: 'myObject'};
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
```
	
##### 上传文件示例1：

```javascript

// 参考sample/upload1.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var file = require('fs').createReadStream('./upload/file');

var params = {
  Bucket: 'myBucket',
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
```
	
##### 上传文件示例2：

```javascript

// 参考sample/upload2.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var fileBuffer = require('fs').readFileSync('./upload/file');

s3.putObject({
  Bucket: 'myBucket',
  Key: 'upload/file2',
  Body: fileBuffer
}, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log('success');
  }
});
```

##### 上传文件示例3：

```javascript

// 参考sample/upload3.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey',
  params:{
    Bucket: 'myBucket'
  }
});

var data = {Key: 'Hello', Body: 'World!'};
s3.putObject(data, function(err, data) {
  if (err) {
    console.log("Error uploading data: ", err);
  } else {
    console.log("Successfully uploaded data to %s/Hello", 'myBucket');
  }
});
```

##### 获取bucket的acl信息:
	
```javascript

// 参考sample/get_acl.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey',
  params:{
    Bucket: 'myBucket'
  }
});

s3bucket.getBucketAcl(function(err, data) {
	if (err) {
		console.log(err);	// an error occurred
	} else {
		console.log(data);	// successful response
	}
});
```

##### 设置bucket的acl信息:
	
```javascript

// 参考sample/put_acl.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',
  ACL: 'private'
};

s3.putBucketAcl(params, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("set private success");
    params["ACL"] = 'public-read'
    s3.putBucketAcl(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("set public-read success");
      }
    });
  }
});
```

##### 删除一个文件:

```javascript

// 参考sample/delete_object.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',
  Key: 'myObject'
};

s3.deleteObject(params, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("success");
	}
});
```
	
##### 删除一个bucket:

```javascript

// 参考sample/delete_bucket.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {Bucket: 'myBucket'};

s3.deleteBucket(params, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("success");
	}
});
```
	
##### 获取一个带有签名的用于下载的url:

```javascript

// 参考sample/get_presign_url.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

// This URL will expire in one minute (60 seconds)
var params = {
  Bucket: 'myBucket',
  Key: 'myObject',
  Expires: 60
};

var url = s3.getSignedUrl('getObject', params);
console.log("The URL to GET is [%s]", url);

var url = s3.getSignedUrl('headObject', params);
console.log("The URL to HEAD is [%s]", url);
```

##### 分片上传:

```javascript

// 代码较长请参考sample/multipart_upload.js
```

#### 图片处理服务

##### 将图片按比例缩小到原来的50%:

```javascript

// 参考sample/image1.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

var params = {
  Bucket: 'myBucket',
  Key: 'myObject',
  ImageActions: '50p'
};

var file = require('fs').createWriteStream('./download/iamge1');
s3.getImage(params).createReadStream().pipe(file);
```

##### 在图片上打图片水印:

```javascript

// 参考sample/watermark1.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

watermark_object = new Buffer('lena.jpg@50p')
var params = {
  Bucket: 'myBucket',
  Key: 'myObject',
  ImageActions: 'watermark=1&object=' + watermark_object.toString('base64')
};

var file = require('fs').createWriteStream('./download/watermark1');
s3.getImage(params).createReadStream().pipe(file);
```

##### 在图片上打文字水印:

```javascript

// 参考sample/watermark2.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

watermark_text= new Buffer('你好Lena.jpg！')
var params = {
  Bucket: 'myBucket',
  Key: 'myObject',
  ImageActions: 'watermark=2&type=d3F5LW1pY3JvaGVp&text=' + watermark_text.toString('base64')
};

var file = require('fs').createWriteStream('./download/watermark2');
s3.getImage(params).createReadStream().pipe(file);
```

##### 获取一个预签名的图片url:

```javascript

// 参考sample/get_presign_image.js

var s3 = new MSS.S3({
  accessKeyId: '你的accessKey',
  secretAccessKey: '你的secretKey'
});

// This URL will expire in one minute (600 seconds)
var params = {
  Bucket: 'myBucket',
  Key: 'myObject',
  ImageActions: '50p'
  Expires: 600
};

// 获取缩小50%的图片预签名url用于GET或HEAD
var url = s3.getSignedUrl('getImage', params);
console.log("The URL to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL to HEAD is [%s]", url);

console.log();

// 获取打图片水印的图片预签名url用于GET或HEAD
watermark_object = new Buffer('lena.jpg@50p')
params['ImageActions'] = 'watermark=1&object=' + watermark_object.toString('base64')
var url = s3.getSignedUrl('getImage', params);
console.log("The URL(image watermark) to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL(image watermark) to HEAD is [%s]", url);

console.log();

// 获取打文字水印的图片预签名url用于GET或HEAD
watermark_text= new Buffer('你好Lena.jpg！')
params['ImageActions'] = 'watermark=2&type=d3F5LW1pY3JvaGVp&text=' + watermark_text.toString('base64')
var url = s3.getSignedUrl('getImage', params);
console.log("The URL(text watermark) to GET is [%s]", url);
var url = s3.getSignedUrl('headImage', params);
console.log("The URL(text watermark) to HEAD is [%s]", url);
```
