<template>
	<view class="shoplistContainer">
		<view class="header">
			<view class="item active">默认</view>
			<view class="item">销量</view>
			<view class="item">价格</view>
			<view class="item">筛选</view>
		</view>

		<view class="shoplist">
			<view class="shopItem" v-for="item in shopList" :key="item.gid" @click="toDetail(item)">
				<image class="shopImg" :src="item.photo" mode=""></image>
				<view class="detail">
					<view class="title">{{ item.subject }}</view>
					<view class="price">
						<text class="priceText">￥{{ item.sale_price }}</text>
						<text class="dprice">{{ item.dprice }}</text>
					</view>
					<view class="sold">
						<text class="comments">{{ item.comments }}</text>
						<text class="soldNum">{{ item.sold }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return { shopList: [] };
	},
	mounted() {
		this.shopList = wx.getStorageSync('shoplist_key').list;
	},
	methods: {
		// 点击去商品详情页面
		toDetail(item) {
			wx.setStorageSync('detailInfo_key', item);
			wx.navigateTo({ url: '../detail/detail' });
		}
	}
};
</script>

<style lang="stylus">
.shoplistContainer
	height 100%
	.header
		display flex
		.item
			width 25%
			height 80rpx
			line-height 80rpx
			text-align center
			border-bottom 1rpx solid #999
			box-sizing border-box
			font-size 28rpx
			&.active
				color #41c856
	.shoplist
		.shopItem
			display flex
			padding 20rpx
			border-bottom 1rpx solid #999
			.shopImg
				width 200rpx
				height 200rpx
				flex-shrink 0
			.detail
				margin-left 20rpx
				.title
					font-size 26rpx
					display -webkit-box
					-webkit-box-orient vertical
					-webkit-line-clamp 2 /* * 多行文本溢出... */
					overflow hidden
				.price
					margin-top 40rpx
					.priceText
						color #ff5757
						font-size 28rpx
					.dprice
						font-size 26rpx
						color #999999
						margin-left 30rpx
				.sold
					margin-top 10rpx
					font-size 26rpx
					color #999
					.soldNum
						margin-left 10rpx
</style>
