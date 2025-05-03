const baseUrl = (function () {
  if (process.env.NODE_ENV === 'development') {
    // return 'http://192.168.2.134:8888'; // 我的后端服务
    return 'http://192.168.10.143:8888'; // 我的后端服务， wifi查看
    // return 'http://192.168.2.171:8888';
    // return 'http://192.168.2.202:8888';
    // return 'http://192.168.2.246:9001';
    // return 'http://172.16.1.44:9001';
    // return 'http://47.94.106.118:80';
    // return 'http://192.168.2.229:8888';
    // return 'http://192.168.2.167:8088';
  } else {
    // return 'http://127.0.0.1:9001';
    return `https://${window.location.hostname}:${window.location.port}`;
    // return `http://${window.location.hostname}:${window.location.port}`; // TEST
  }
})();

export default baseUrl;
