// pages/face/face.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navigateToNewpage: function(face_list, base64) {
    wx.navigateTo({
      url: '/pages/face/faceResult/faceResult?face_list=' + face_list + "&url=" + base64
    })
  },
  get_token: function(base64) {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: "get",
      data: {
        "grant_type": "client_credentials",
        "client_id": "NRxyKZ0hpe5bHkpO26fjuVnN",
        "client_secret": "blF1Ie8H2ikhlVVtX6FItTYkU2K3XNZx"
      },
      dataType: "JSON",
      success: res => {
        //获取token
        that.faceId(JSON.parse(res.data).access_token, base64)
        // console.log(JSON.parse(res.data).access_token)
      }
    })
  },
  faceId: function(token, base64) {

    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + token,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        image: base64,
        image_type: "BASE64",
        face_field: "age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type,mask,spoofing"
      },
      success: res => {
        console.log("人脸识别api调用成功", res.data.result.face_list[0])

        var face_list = JSON.stringify(res.data.result)
        that.navigateToNewpage(face_list, base64)

        that.setData({
          face_list: res.data.result.face_list
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showToast({
          title: '上传成功',
        })

        console.log("临时图片路径", res.tempFilePaths[0]);

        var manager = wx.getFileSystemManager();
        manager.readFile({
          filePath: res.tempFilePaths[0],
          encoding: "base64",
          success: res => {
            var src = "data:image/jpg;base64," + res.data

            //成功拿到图片base64数据 赋值给get_token
            that.get_token(res.data)
            // console.log(res.data)
            that.setData({
              url: src
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    // that.get_token()
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