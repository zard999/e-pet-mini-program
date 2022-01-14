<template>
	<view class="detailContainer">
		<view class="header">
			<view class="shop active">商品</view>
			<view class="detail">详情</view>
			<view class="evaluate">评价</view>
		</view>

		<scroll-view scroll-y="true" enable-flex class="detailScroll" style="height: calc(100vh - 200rpx);">
			<view class="scrollItem">
				<image class="detailImg" :src="detailInfo.photo" mode=""></image>

				<view class="price">
					<view class="leftPrice">
						<text class="priceText">￥{{ detailInfo.sale_price }}</text>
						<view class="original">
							价格
							<text class="originalPrice">￥{{ detailInfo.market_price }}</text>
						</view>
					</view>

					<view class="countDown">
						<BaseCounter :time="86410">
							<template slot-scope="{ d, hh, mm, ss }">
								<view class="countTime">
									<text class="countText">距离结束仅剩 {{ d }} 天</text>
									<view class="count">
										<view class="time">{{ hh }}</view>
										:
										<view class="time">{{ mm }}</view>
										:
										<view class="time">{{ ss }}</view>
									</view>
								</view>
							</template>
						</BaseCounter>
					</view>
				</view>

				<view class="title">
					<view class="titleText">{{ detailInfo.subject }}</view>
					<view class="titleDetail">{{ detailInfo.presubject }}</view>
				</view>

				<view class="tag">
					<view class="tagItem">
						<image src="../../static/images/qualityassurance.png" mode=""></image>
						<text>正品保证</text>
					</view>
					<view class="tagItem">
						<image src="../../static/images/freeshipping.png" mode=""></image>
						<text>99元包邮</text>
					</view>
					<view class="tagItem">
						<image src="../../static/images/thirtydays.png" mode=""></image>
						<text>30天退货</text>
					</view>
				</view>

				<BaseCounter :time="600000"></BaseCounter>
			</view>
		</scroll-view>

		<view class="cart">
			<view class="collect">
				<image class="collectImg" src="../../static/images/collect.png" mode=""></image>
				<text class="collectText">收藏</text>
			</view>

			<view class="shopCart">
				<image class="shopCartImg" src="../../static/images/tabBar/tab-cart.png" mode=""></image>
				<text class="shopCartText">购物车</text>

				<text class="shopNum">{{ shopNum }}</text>
			</view>

			<view class="addCart" @click="addCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
// 倒计时组件
import BaseCounter from './components/base-counter.vue';
export default {
	data() {
		return {
			detailInfo: {},
			userInfo: {}
		};
	},
	mounted() {
		this.userInfo = wx.getStorageSync('userInfo_key');
		this.detailInfo = wx.getStorageSync('detailInfo_key');
	},

	methods: {
		// 添加当前商品到购物车
		addCart() {
			if (this.userInfo.nickName) {
				let obj = this.cartList.find(item => item.gid === this.detailInfo.gid);
				console.log(obj);
				if (obj) {
					obj.count++;
				} else {
					obj = this.detailInfo;
					obj.count = 1;
					obj.isChecked = true;
					this.cartList.push(obj);
				}
				uni.showModal({
					content: '商品已成功加入购物车!',
					confirmText: '去购物车',
					confirmColor: '#59ce40',
					cancelText: '继续购物',
					success: function(res) {
						if (res.confirm) {
							// 点击确定的逻辑
							wx.reLaunch({
								url: '../cart/cart'
							});
						} else if (res.cancel) {
							// 点击取消的逻辑
							// 就停留在当前页面
							console.log('hhh');
						}
					}
				});
			} else {
				uni.showModal({
					content: '请先登录!',
					confirmText: '去登录',
					confirmColor: '#59ce40',
					cancelText: '继续逛逛',
					success: function(res) {
						if (res.confirm) {
							// 点击确定的逻辑
							wx.navigateTo({
								url: '../login/login'
							});
						} else if (res.cancel) {
							// 点击取消的逻辑
							// 就停留在当前页面
							console.log('hhh');
						}
					}
				});
			}
		}
	},

	computed: {
		...mapState({
			cartList: state => state.cart.cartList
		}),

		// 计算购物车数量
		shopNum() {
			return this.cartList.reduce((p, c) => {
				return (p += c.count);
			}, 0);
		}
	},

	components: {
		BaseCounter
	}
};
</script>

<style lang="stylus">
.detailContainer
	height 100%
	background-color #f3f4f5
	.header
		display flex
		align-items center
		justify-content center
		width 100%
		height 80rpx
		background-color #fff
		font-size 32rpx
		box-sizing border-box
		border-bottom 1rpx solid #ddd
		.shop
			width 70rpx
			height 80rpx
			line-height 80rpx
			text-align center
			box-sizing border-box
		.detail
			width 70rpx
			height 80rpx
			line-height 80rpx
			box-sizing border-box
			text-align center
			margin-left 10rpx
		.evaluate
			width 70rpx
			height 80rpx
			line-height 80rpx
			box-sizing border-box
			text-align center
			margin-left 10rpx
		.active
			border-bottom 4rpx solid #f03e3e
	.detailImg
		width 100%
		height 750rpx
	.price
		display flex
		.leftPrice
			width 70%
			background-color #282729
			padding 20rpx
			.priceText
				color #e6b686
				font-size 32rpx
				font-weight 600
			.original
				color #fff
				font-size 28rpx
				.originalPrice
					text-decoration line-through
					font-weight 500
		.countDown
			width 30%
			display flex
			flex-direction column
			align-items center
			padding 20rpx
			background-color #e3a865
			.countTime
				display flex
				flex-direction column
				align-items center
				font-size 22rpx
				.countText
					font-weight 100
				.count
					display flex
					align-items center
					margin-top 10rpx
					.time
						padding 5rpx
						background-color #fff
						color #ad7340
						line-height 40rpx
						text-align center
						font-weight 600
						border-radius 10rpx
						margin 0 4rpx
	.title
		font-weight 100
		padding 20rpx
		background-color #fff
		.titleText
			font-size 28rpx
		.titleDetail
			font-size 24rpx
			color #eb567c
			margin 10rpx 0
	.tag
		display flex
		align-items center
		padding 20rpx 0
		background-color #fff
		margin-top 30rpx
		.tagItem
			display flex
			align-items center
			justify-content center
			width 33.33333%
			image
				width 40rpx
				height 40rpx
			text
				font-size 24rpx
				margin-left 10rpx
				color #999
	.cart
		width 100%
		height 120rpx
		position absolute
		bottom 0
		left 0
		display flex
		justify-content space-between
		align-items center
		background-color #fff
		margin-top 20rpx
		image
			width 40rpx
			height 40rpx
		.collect
			display flex
			flex-direction column
			align-items center
			margin-left 60rpx
			color #999
			.collectText
				margin-top 10rpx
				font-size 24rpx
		.shopCart
			position relative
			display flex
			flex-direction column
			align-items center
			margin-left 20rpx
			font-size 24rpx
			color #999
			.shopCartText
				margin-top 10rpx
				font-size 24rpx
			.shopNum
				position absolute
				top -14rpx
				right -2rpx
				padding 6rpx 10rpx
				background-color #f03e3e
				border-radius 50%
				text-align center
				color #fff
				font-size 20rpx
		.addCart
			display flex
			align-items center
			justify-content center
			width 50%
			height 120rpx
			background-color #f03e3e
			color #fff
</style>
