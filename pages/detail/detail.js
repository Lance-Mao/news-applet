// pages/detail/detail.js
let newsDate;
let newsTitle;
let newsContent;
let newsSource;
let newsReadCount;
let res;

let indexIsHidden;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '',
    newsDate: '',
    newsSource: '',
    newsReadCount: 0,
    newsContent: {},
    indexIsHidden: false
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let datas = JSON.parse(options.res);
    let _this = this;
    newsTitle = datas.result.title;
    newsDate = datas.result.date.replace('T',' ').split('.')[0];
    newsContent = datas.result.content;
    newsSource = datas.result.source;
    newsReadCount = datas.result.readCount;
    _this.setData({
      newsTitle: newsTitle,
      newsDate: newsDate,
      newsContent: newsContent,
      newsSource: newsSource,
      newsReadCount: newsReadCount,
      indexIsHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})