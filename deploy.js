const AWS = require('aws-sdk');
const Promise = require('bluebird');

const lambda = new AWS.Lambda({
  region: 'us-west-2'
});

const cwd = process.cwd();
const zipLambdaCommand = `
  cd ${cwd}/lambda/${lambdaName}/ &&
  npm install --production &&
  zip -r ${lambdaName}.zip * --quiet`;

const lambdaUpdateFunctionCodeParams = {
  FunctionName: `${lambdaName}`,
  Publish: true,
  ZipFile: read(`${cwd}/lambda/${lambdaName}/${lambdaName}.zip`)
 };
lambdaUpdateFunctionCode(lambdaUpdateFunctionCodeParams);