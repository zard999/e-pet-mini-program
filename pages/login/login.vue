<template>
	<view class="loginContainer">
		<image class="logo" src="../../static/images/logo.png" mode=""></image>
		<view class="title">需要登录才能继续哦~</view>
		<view class="iphone-login" @click="login">微信一键登录</view>
		<view class="other-phone">手机号登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		login() {
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					wx.setStorageSync('userInfo_key', res.userInfo);
					wx.reLaunch({
						url: '../center/center'
					});
				}
			});
		}
	}
};
</script>

<style lang="stylus">
.loginContainer
	height 100%
	display flex
	flex-direction column
	align-items center
	.logo
		width 300rpx
		height 300rpx
	.title
		font-size 24rpx
	.iphone-login
		width 90%
		height 100rpx
		color #fff
		background-color #74be5e
		line-height 100rpx
		text-align center
		border-radius 50rpx
		font-size 32rpx
		margin 30rpx 0
	.other-phone
		font-size 24rpx
		color #999
</style>
