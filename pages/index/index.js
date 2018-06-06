//index.js
//获取应用实例
const app = getApp();
const appKey = 'fc35d7872c25744ab4669c7d9dbcf15e'; //用于访问新闻接口的appKey

let contentNewsList;
let newsType;
let indexIsHidden;
let topPic = [];

let newsUrl;
let newsTitle;
let newsAuthor;
let newId;

Page({
  data: {
    headerTitleName: [
      { name: '国内', nameID: '01', newsType: 'gn' },
      { name: '国际', nameID: '02', newsType: 'gj' },
      { name: '财经', nameID: '03', newsType: 'cj' },
      { name: '娱乐', nameID: '04', newsType: 'yl' },
      { name: '军事', nameID: '05', newsType: 'js' },
      { name: '体育', nameID: '06', newsType: 'ty' },
      { name: '其他', nameID: '07', newsType: 'other' },
    ],

    topPic: topPic,
    tapID: '01', //判断是否选中
    contentNewsList: contentNewsList,

    indexIsHidden: indexIsHidden
  },

  newsType: 'gn', //默认请求的是头条数据

  //事件处理函数

  //headerBar 点击
  headerTitleClick: function (e) {
    let _this = this;
    newsType = e.currentTarget.dataset.newstype;
    _this.setData({
      tapID: e.target.dataset.id,
      indexIsHidden: false
    })
    //获取新闻
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=' + newsType,
      data: {},
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        let editTimeArray = new Array();
        var editTime;
        for (let i = 0; i < resultData.length; i++) {
          let nowTime = new Date();
          let editDay = resultData[i].date.split('T')[0];
          let editHour = resultData[i].date.split('T')[1].split('.')[0];
      
          resultData[i].date = editDay + ' ' + editHour;
        }

        //获取头部轮播图片
        topPic = []
        while (topPic.length < 3) {
          let ranNum = Math.floor(Math.random() * resultData.length);
          if (!topPic.find(n => n.id == resultData[ranNum].id && resultData[ranNum].firstImage !== undefined)) {
            topPic.push({ 'id': resultData[ranNum].id, 'url': resultData[ranNum].firstImage, 'title': resultData[ranNum].title })
          }
        }

        _this.setData({
          contentNewsList: resultData,
          indexIsHidden: true,
          topPic: topPic
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },

  //跳转到新闻详情页
  viewDetail: function(e) {
    newId = e.currentTarget.dataset.id
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail?id=' + newId,
      data: {},
      method: 'GET',
      success: res => {
        if (res.data.code === 200){
          wx.navigateTo({
            url: '../detail/detail?res=' + JSON.stringify(res.data),
          })
        }
      }
    })
  },

  onLoad: function () {
    var _this = this;
    //请求头条数据
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=gn',
      data: {},
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        let editTimeArray = new Array();
        var editTime;
        for (let i = 0; i < resultData.length; i++) {
          let nowTime = new Date();
          let editDay = resultData[i].date.split('T')[0];
          let editHour = resultData[i].date.split('T')[1].split('.')[0];

          resultData[i].date = editDay + ' ' + editHour;
        }

        //获取头部轮播图片
        topPic = []
        while (topPic.length < 3){
          let ranNum = Math.floor(Math.random() * resultData.length);
          if (!topPic.find(n => n.id == resultData[ranNum].id && resultData[ranNum].firstImage !== undefined)) {
            topPic.push({ 'id': resultData[ranNum].id, 'url': resultData[ranNum].firstImage, 'title': resultData[ranNum].title  })
          }
        }

        _this.setData({
          contentNewsList: resultData,
          indexIsHidden: true,
          topPic: topPic
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },
})
