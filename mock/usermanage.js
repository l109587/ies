import Mock, { mock } from 'mockjs';
Mock.Random.extend({
  constellation: function (date) {
    var constellations = ['系统管理员', '安全管理员', '区域管理员'];
    return this.pick(constellations);
  },
});

export default {
  'post /cfg.php': (req, res) => {
    //get 参数
    let getParam = req.query;
    //post 参数
    let postParam = req.body;
    const { controller, action } = getParam;
    if (controller === 'sys') {
      if (action === 'getuserInfo') {
        res.send(
          mock({
            success: true,
            'data|10': [
              {
                id: '@increment',
                name: '@first',
                usergroup: '@CONSTELLATION',
              },
            ],
            total: 12,
          }),
        );
      }
    }
  },
};
