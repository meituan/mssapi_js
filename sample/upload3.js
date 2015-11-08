var KEY = require('./key')
var MSS = require('../');

//实例化,当前实例生效:
var s3 = new MSS.S3({
  accessKeyId: KEY.access_key,
  secretAccessKey: KEY.secret_key,
  params:{
    Bucket: KEY.bucket_name
  }
});

var data = {Key: 'Hello', Body: 'World!'};
s3.putObject(data, function(err, data) {
  if (err) {
    console.log("Error uploading data: ", err);
  } else {
    console.log("Successfully uploaded data to %s/Hello", KEY.bucket_name);
  }
});
