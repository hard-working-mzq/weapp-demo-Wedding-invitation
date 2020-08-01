//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isPlayingMusic: false
  },

  //事件处理函数
  bgm: null,
  music_url: 'https://s320.xiami.net/380/85380/423132/1770005254_1991284_h.mp3?ccode=xiami_web_web&expire=86400&duration=244&psid=2a5d7ef596ee8c5f7c78af388bc1a230&ups_client_netip=119.125.199.69&ups_ts=1596094834&ups_userid=0&utid=tNCnF1Q9qkUCAXFmHJtdCspm&vid=1770005254&fn=1770005254_1991284_h.mp3&vkey=B1d25c8ad1639e24b13cec9ec08b333be',
  music_coverImgUrl: '',
  onReady: function() {
    this.bgm = wx.getBackgroundAudioManager()
    this.bgm.title = 'marry me'
    this.bgm.epname = 'wedding'
    this.bgm.singer = 'singer'
    this.bgm.coverImgUrl = this.music_coverImgUrl
    this.bgm.onCanplay(()=> {
        this.bgm.pause()
    })
    this.bgm.src = this.music_url
  },

  play: function (e) {
    if (this.data.isPlayingMusic) {
      this.bgm.pause()
    }else {
      this.bgm.play()
    }
    this.setData ({
      isPlayingMusic: !this.data.isPlayingMusic
    })
  },

  callGroom: function(){
    wx.makePhoneCall({
      phoneNumber: '12345678912',
    })
  },
  callBride: function(){
    wx.makePhoneCall({
      phoneNumber: '12345678912',
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
