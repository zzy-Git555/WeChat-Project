// miniprogram/pages/template/template.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    vote:0
  },
  likeClick:function(){
    if(this.data.isShow != true){
      wx.cloud.callFunction({
        name:'like',
        data:{
          contents: this.data.contents,
          filterCourse:this.data.filterCourse,
          img:this.data.img,
          title:this.data.title,
          tools:this.data.tools
        }
      })
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        duration:2000
      })
      console.log("可", this.data.contents)
    }else{
      wx.cloud.callFunction({
        name:'remove',
        data:{
          contents: this.data.contents
        }
      })
      wx.showToast({
        title: '取消收藏',
        icon:'none',
        duration:2000
      })
    }
   
    this.setData({
      isShow:this.data.isShow==false ? true : false
    })
  },
  add:function(){
    wx.cloud.callFunction({
      name:'add',
      data:{
        vote:this.data.vote++
      },
      success:res=>{
       this.setData({
        vote:this.data.vote++
       })
       wx.showToast({
        title: '点赞',
        duration:100
      })
      },fail:err=>{
        console.log(err)
      }
    })

    

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    // const db = wx.cloud.database()
    // db.collection("Content").get()

    //   .then(res => {
    //     var result = res.data
    //     this.setData({
    //       result
    //     })
    //   }).catch(err => {
    //     console.error(err)
    //   })
    var data = JSON.parse(options.detail)
    console.log("接收到的数据：",data)
    this.setData({
      title:data.title,
      contents:data.contents,
      img:data.img,
      filterCourse:data.filterCourse
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