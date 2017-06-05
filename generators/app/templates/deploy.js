const request = require('request');
// npm run deploy --dev --suffix=wealth(如果是蜂投需要增加suffix参数)
let suffix = process.env.npm_config_suffix;

// npm run deploy --dev
const dev = process.env.npm_config_dev;
// npm run deploy --test
const test = process.env.npm_config_test;
console.log(`发布工程名称： aDemo${suffix?`-${suffix}`: ''}${test? '+test' : ''}`)
if (suffix) {
  suffix = encodeURIComponent(`-${suffix}`);
} else {
  suffix = '';
}
let jobName = `<%= name %>${suffix}`;
if (dev) {
  request(`http://192.168.4.133:8080/buildByToken/build?job=${jobName}&token=dev`,
    (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
} else if (test) {
  request(`http://192.168.4.133:8080/buildByToken/build?job=${jobName}%2Btest&token=test`,
    (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
}
