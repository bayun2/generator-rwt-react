module.exports = function(router, faker) {
  router.post('/fdt/api/demo/post', function(req, res) {
    res.send({
      meta: {
        code: 200,
      },
      message: 'success',
      data: req.body,
    });
  });
};
