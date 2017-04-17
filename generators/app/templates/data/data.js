const bodyParser = require('body-parser');
const faker = require('faker/locale/zh_CN');

module.exports = function mockData(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get('/wealth/page/newAccount/requestWitness', function(req, res) {
    res.send({
      status: 200,
      message: 'success',
      result: {
        id: faker.random.uuid(),
        nickName: faker.name.findName(),
      },
    })
  })
}
