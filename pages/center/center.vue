<template>
	<view class="centerContainer">
		<view class="header">
			<view class="icon">
				<image class="leftIcon" src="../../static/images/shezhi.png" mode=""></image>
				<image class="rightIcon" src="../../static/images/search-right.png" mode=""></image>
			</view>

			
			
			<view class="login" v-if="userInfo.nickName">
				<image class="avatar" :src="userInfo.avatarUrl" mode=""></image>
				<text class="loginText">{{userInfo.nickName}}</text>
			</view>
			
			<view class="login" v-else>
				<image class="avatar" :src="avatar" mode=""></image>
				<text class="loginText">未登陆</text>
			</view>

			<view class="buttomWrap"><image v-for="(item, index) in headerData.items" :key="item.id" class="buttomImg" :src="item.above_image.img_url" mode=""></image></view>
		</view>

		<!-- 订单管理 -->
		<view class="order">
			<view class="orderList">
				<view v-for="(item, index) in orderData.items" :key="item.id" class="orderItem">
					<image class="itemImg" :src="item.above_image.img_url" mode=""></image>
					<text class="itemText">{{ item.below_text }}</text>
				</view>
			</view>
		</view>

		<!-- 钱包管理 -->
		<view class="wallet">
			<view class="walletList">
				<view v-for="(item, index) in walletData.items" :key="item.id" class="walletItem">
					<text class="itemPrice">{{ item.above_text }}</text>
					<text class="itemText">{{ item.below_text }}</text>
				</view>
			</view>
		</view>

		<view class="server">
			<view class="title">
				<image class="leftImg" :src="serverImg.left_image.img_url" mode=""></image>
				<image class="rightImg" :src="serverImg.right_image.img_url" mode=""></image>
			</view>

			<view class="serverList">
				<view class="serverItem" v-for="item in serverData.items" :key="item.id">
					<image class="itemImg" :src="item.above_image.img_url" mode=""></image>
					<text class="itemText">{{item.below_text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			userInfo:{}
		};
	},
	mounted() {
		this.getCenterData();
		this.userInfo = wx.getStorageSync('userInfo_key')
	},

	methods: {
		getCenterData() {
			this.$store.dispatch('getCenterData');
		}
	},

	computed: {
		...mapGetters(['centerList', 'avatar']),

		headerData() {
			return (this.centerList[0] || {}).data;
		},

		orderData() {
			return (this.centerList[1] || {}).data;
		},

		walletData() {
			return (this.centerList[2] || {}).data;
		},
		
		serverImg(){
			return (this.centerList[3] || {}).header;
		},
		
		serverData() {
			return (this.centerList[3] || {}).data;
		}
		
		
	}
};
</script>

<style lang="stylus">
.centerContainer
	height 100%
	background-color #f3f3f3
	.header
		width 100%
		background-color #42cb56
		padding-top 30rpx
		.icon
			display flex
			justify-content space-between
			margin 0 20rpx
			image
				width 48rpx
				height 48rpx
		.login
			display flex
			align-items center
			margin 50rpx 20rpx
			.avatar
				width 140rpx
				height 140rpx
				border-radius 50%
			.loginText
				font-size 30rpx
				color #fff
				font-weight 500
				margin-left 20rpx
		.buttomWrap
			display flex
			align-items center
			width 95%
			height 60rpx
			background-color #252525
			border-radius 30rpx 30rpx 0 0
			margin-left 20rpx
			.buttomImg
				width 128rpx
				height 28rpx
				margin-left 30rpx
	.order
		display flex
		align-items flex-end
		height 230rpx
		background-color #fff
		margin 30rpx 20rpx
		border-radius 30rpx
		.orderList
			display flex
			align-items center
			justify-content space-around
			width 100%
			padding 20rpx
			.orderItem
				display flex
				flex-direction column
				align-items center
				width 20%
				.itemImg
					width 50rpx
					height 44rpx
				.itemText
					font-size 24rpx
					margin-top 10rpx
	.wallet
		display flex
		align-items flex-end
		height 230rpx
		background-color #fff
		margin 30rpx 20rpx
		border-radius 30rpx
		.walletList
			display flex
			align-items center
			justify-content space-around
			width 100%
			padding 20rpx
			.walletItem
				display flex
				flex-direction column
				align-items center
				width 20%
				.itemPrice
					width 50rpx
					height 44rpx
					line-height 44rpx
					text-align center
					color #ff5757
				.itemText
					font-size 24rpx
					margin-top 10rpx
	.server
		background-color #fff
		margin 30rpx 20rpx
		border-radius 30rpx
		padding 30rpx
		.title
			display flex
			justify-content space-between
			.leftImg
				width 168rpx
				height 32rpx
			.rightImg
				width 20rpx
				height 32rpx
		.serverList
			display flex
			flex-wrap wrap
			margin-top 40rpx
			.serverItem
				width 25%
				display flex
				flex-direction column
				align-items center
				text-align center
				margin 20rpx 0
				.itemImg
					width 40rpx
					height 40rpx
				.itemText
					width 100%
					font-size 24rpx
					margin-top 10rpx
</style>
