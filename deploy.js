const s3 = require('s3');
const aws = require('aws-sdk')

const client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

const params = {
  localDir: "dist/",
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.

  s3Params: {
    Bucket: "parkingspots",
    Prefix: "",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};
const uploader = client.uploadDir(params);
uploader.on('error', function (err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function () {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function () {
  console.log("done uploading");
  invalidateIndex();
});


function invalidateIndex () {
  const client = new aws.CloudFront({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })
  const invalidation = client.createInvalidation({
    DistributionId: process.env.SPOTS_AWS_CLOUDFRONT_DISTRIBUTION_ID, /* required */
    InvalidationBatch: {
      /* required */
      CallerReference: Date.now() + '', /* required */
      Paths: {
        /* required */
        Quantity: 1, /* required */
        Items: [
          '/',
          /* more items */
        ]
      }
    }
  }, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log('Index was invalidated with invalidation id: ', data.Invalidation.Id);           // successful response
  })
}

