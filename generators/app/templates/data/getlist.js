module.exports = function(router, faker) {
  router.get('/fdt/api/demo/getlist', function(req, res) {
    const data = [];
    for (let i = 0; i < req.query.l; i++) {
      data.push(`${i + 1}. ${faker.lorem.sentence()}`);
    }
    res.send({
      meta: {
        code: 200,
      },
      message: 'success',
      data,
    });
  });
};
