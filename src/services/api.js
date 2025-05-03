import { request } from 'umi';

// 请求中国地图GeoJson
export async function getGeoJson(options) {
  // return request('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', {
  return request('https://qitan-officialweb.oss-cn-beijing.aliyuncs.com/static/file/geoJson.json', {
    method: 'GET',
    params: options || {},
    getResponse: true,
  });
}

// 订阅资讯
export async function subscribeNewsletter(options) {
  return request('/subscribe/subscribeNewsletter', {
    method: 'POST',
    data: options || {},
  });
}

// 联系我们
export async function contactUs(options) {
  return request('/content/contactUs', {
    method: 'POST',
    data: options || {},
  });
}

// 获取发展历程列表
export async function getTimeline(options) {
  return request('/timeline/getAll', {
    method: 'GET',
    params: options || {},
  });
}

// 获取企业荣誉列表
export async function getHonour(options) {
  return request('/enterpriseHonour/getAll', {
    method: 'GET',
    params: options || {},
  });
}

// 获取说明书, 参数products, 不填为全部列表，可填字符串，多个用,分割
export async function getManualByProducts(options) {
  return request('/instructions/getByProducts', {
    method: 'GET',
    params: options || {},
  });
}

// 获取所有DEMO数据文件列表
export async function getDemoList(options) {
  return request('/demoDataFile/getAll', {
    method: 'GET',
    params: options || {},
  });
}

// 获取发表文章列表
export async function getArticleList(options) {
  return request('/publish/getList', {
    method: 'GET',
    params: options || {},
  });
}

// 获取视频集锦列表
export async function getVideoList(options) {
  return request('/video/getVideoList', {
    method: 'GET',
    params: options || {},
  });
}

// 获取banner
export async function getBannerList(options) {
  return request('/banner/getList', {
    method: 'GET',
    params: options || {},
  });
}

// 获取新闻
export async function getNewsList(options) {
  return request('/news/getList', {
    method: 'GET',
    params: options || {},
  });
}
