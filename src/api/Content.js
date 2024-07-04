import request from '/src/utils/request.js'
export const getPerDayWord = ()=>  request.get('/api/sjyy?type=json',{
   headers: {
      'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7'
    }
});
