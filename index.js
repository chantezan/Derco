const AWS = require('aws-sdk');
const axios = require('axios');

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    let data;
  // fetch data from a url endpoint
  
  console.log("asdasd")
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    body = await res;
    body =  JSON.stringify(body.data[0])
    return {
        statusCode,
        body,
        headers
    };
};