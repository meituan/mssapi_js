var MSS = require('../');

//全局生效:
MSS.config.loadFromPath('./config.json');

var s3 = new MSS.S3();
s3.listBuckets(function(err, data) {
  if (err)
    console.log(err, err.stack);
  else
    console.log(data);
});
