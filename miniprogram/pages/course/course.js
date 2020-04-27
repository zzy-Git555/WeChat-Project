// pages/course/course.js
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0
  },
  detail: function(e) {
    var data = JSON.stringify(e.currentTarget.dataset.result)
    console.log("传输过去的数据:", data)
    wx.navigateTo({
      url: '/pages/template/template?detail=' + data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // getContentData() {
  //   wx.cloud.callFunction({
  //     name: 'getContent',
  //     success: res => {
  //       console.log("云函数返回的数据", res)
  //     },
  //     fail: err => {
  //       console.error('云函数调用失败', err)
  //     }
  //   })
  // },
  //页面切换
  changeItem: function(e) {
    console.log(e)
    this.setData({
      item: e.target.dataset.index
    })
  },
  //tab切换
  changeTab: function(e) {
    console.log(e)
    this.setData({
      tab: e.detail.current
    })
  },

  onLoad: function(options) {
    var that = this
    // wx.cloud.callFunction({
    //   name: 'getContent',
    //   success: res => {
    //     console.log("云函数返回的数据", res)
    //     var result = res.data
    //     this.setData({
    //       result
    //     })
    //   },
    //   fail: err => {
    //     console.error('云函数调用失败', err)
    //   }
    // })
    const db = wx.cloud.database()
    db.collection("Content").get()

      .then(res => {

        var result = res.data
        // console.log(result)
        this.setData({
          result
        })
      }).catch(err => {
        console.error(err)
      })
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})