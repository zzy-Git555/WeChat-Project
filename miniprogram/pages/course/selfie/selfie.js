// pages/course/selfie/selfie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  detail: function (e) {
    var data = JSON.stringify(e.currentTarget.dataset.result)
    console.log("传输过去的数据:", data)
    wx.navigateTo({
      url: '/pages/template/template?detail=' + data,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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