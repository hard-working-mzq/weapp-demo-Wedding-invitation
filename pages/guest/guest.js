// pages/guest/guest.js
Page({
  data: {
    picker: {
      arr: ['0','1','2','3','4','5','6'],
      index: 1
    }
  },

  pickerChange: function(e) {
    this.setData ({
      'picker.index': e.detail.value
    })
  },

  nameChange: function(e) {
    this.checkName(e.detail.value)
  },

  phoneChange: function(e) {
    this.checkPhone(e.detail.value)
  },

  checkName: function(data) {
    var reg = /^[\u4E00-\u9F5A-Za-z]+$/;
    return this.check(data, reg, '姓名输入错误！')
  },

  checkPhone: function(data) {
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(data, reg, '手机号码输入错误！')
  },

  check: function(data,reg, errMsg) {
    if (!reg.test(data)) {
      wx.showToast({
        title: errMsg, icon:'none', duration:1500
      })
      return false
    }
      return true
  },

  formSubmit: function(e) {
    console.log(e.detail.formId)
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    if (this.checkName(name) && this.checkPhone(phone)) {
      wx.login ({
        success: res => {
          server.post ({ formId: e.detail.formId, code: res.code},()=>{
             wx.showToast({title: '提交成功', icon: 'success', duration:1500})
             server.sendTemplateMessage (res => {
               console.log('模板信息发送结果:' ,res.data)
             })
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

var server = {
  appid: 'wxa571560f19f6703a',
  secret: 'R14789R6352',
  user: {openid:'',formId:''},
  post: function(data, success){
    console.log('收到客户端提交的数据：',data)
    this.user.formId = data.formId
    this.getOpenid(data.code, res => {
      console.loh('用户openid:'+res.data.openid)
      this.user.openid = res.data.openid
      success()
    })
  },
  getOpenid:function(code,success) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {appid:this.appid, secret:this.secret,grant_type:
      'authorization_code',js_code:code},
      success: success
    })
  },
  sendTemplateMessage: function(success) {
    var user = this.user
    var data = {
      touser: user.openid,
      template_id: 'vKLdyH1bJ8aXFZrZ-kgrYA58dcf8OCd5DDPN0QdXPhM',
      page: 'index',
      form_id: user.formId,
      data: {
        keyword1: {value: 'XXX XXX'},
        keyword2: {value: '谢谢你的祝福'},
        keyword3: {value: '请记得按时参加婚宴哦'},
        keyword4: {value: '------地址-------'},
      }
    }
    this.getAccessToken(res=>{
      var token = res.data.access_token
      console.log('服务器access_token:'+token)
      var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token ='+token
      wx.request({
        url: url, method: 'POST',data:data, success:success
      })
    })
  },
  getAccessToken: function(success) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+this.appid+'&secret='+this.secret
    wx.request({
      url: url, success: success
    })
  }
}