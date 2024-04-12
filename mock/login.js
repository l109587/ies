export default {
  'post /login.php': (req, res) => {
    //get 参数
    let getParam = req.query;
    //post 参数
    let psotParam = req.body;
    if (getParam.action == 'login') {
      var json = '';
      var admin = {
        username: 'admin',
        password: 'c4ca4238a0b923820dcc509a6f75849b',
      };
      var sec = {
        username: 'secadm',
        password: 'c4ca4238a0b923820dcc509a6f75849b',
      };
      var adt = {
        username: 'audit',
        password: 'c4ca4238a0b923820dcc509a6f75849b',
      };
      var data = psotParam;
      if (data.username == admin.username && data.password == admin.password) {
        json = {
          success: true,
          token: 'fa18c52981606ff872097d3118dac83c',
          userType: 'sys',
        };
      } else if (
        data.username == sec.username &&
        data.password == sec.password
      ) {
        json = {
          success: true,
          token: '5b63abb4fc706cc5dnda8b4d3b50d15b',
          userType: 'sec',
        };
      } else if (
        data.username == adt.username &&
        data.password == adt.password
      ) {
        json = {
          success: true,
          token: '5b73abb4fc706cc5d7da8b4d3b50d15b',
          userType: 'adt',
        };
      } else {
        json = { success: false, msg: '请输入正确的用户名或密码！' };
      }
      res.send(json);
    } else if (getParam.action == 'config') {
      json = {
        success: true,
        prod: '存储介质信息消除工具',
        site: '前端框架',
        vers: '北信源边界安全部 ｜ 版本号：V1.0',
        bjtp: 'erase',
      };
      res.send(json);
    }
  },
  'get /login.php': (req, res) => {
    //get 参数
    let getParam = req.query;
    //post 参数
    let psotParam = req.body;
    if (getParam.action == 'token') {
      let json = { success: true, token: 'e9159d585cf64f1a7da767c231266fc1' };
      res.send(json);
    }
  },
};
