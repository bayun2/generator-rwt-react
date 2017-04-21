module.exports = function(router, faker) {
  router.get('/fdt/api/demo/get', function(req, res) {
    res.send({
      meta: {
        code: 200,
      },
      message: 'success',
      data: {
        id: faker.random.uuid(),
        nickName: faker.name.findName(),
      },
    });
  });
}
