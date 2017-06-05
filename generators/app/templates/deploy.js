const request = require('request');

// npm run deploy --dev
const dev = process.env.npm_config_dev;
// npm run deploy --test
const test = process.env.npm_config_test;

if (dev) {
  request('http://192.168.4.133:8080/buildByToken/build?job=<%= name %>&token=dev',
    (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
} else if (test) {
  request('http://192.168.4.133:8080/buildByToken/build?job=<%= name %>%2Btest&token=test',
    (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
}
