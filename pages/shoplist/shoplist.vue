<template>
	<view class="shoplistContainer">
		<view class="search">
			<view class="searchInp">
				<image class="searchImg" src="../../static/images/search.png" mode=""></image>
				<input class="inp" type="text" value="" placeholder="点击搜索商品" />
			</view>
		</view>

		<view class="header">
			<view class="item" :class="{ active: currentIndex === index }" v-for="(nav, index) in navList" :key="index" @click="sort(index)">{{ nav }}</view>
		</view>

		<view class="shoplist">
			<view class="shopItem" v-for="item in shopList2" :key="item.gid">
				<image class="shopImg" :src="item.photo" @click="toDetail(item)"></image>
				<view class="detail">
					<view class="title" @click="toDetail(item)">{{ item.subject }}</view>
					<view class="price">
						<text class="priceText">￥{{ item.sale_price }}</text>
						<text class="dprice">{{ item.dprice }}</text>
					</view>
					<view class="sold">
						<text class="comments">{{ item.comments }}</text>
						<text class="soldNum">{{ item.sold }}</text>
						<image class="toCart" src="../../static/images/addcart.png" @click="toCart(item)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
export default {
	data() {
		return {
			shopList1: [],
			shopList2: [],
			currentIndex: 0,
			navList: ['默认', '销量', '价格', '筛选'],
			userInfo: {}
		};
	},
	mounted() {
		this.userInfo = wx.getStorageSync('userInfo_key');
		this.shopList2 = wx.getStorageSync('shoplist_key').list;
		this.shopList1 = cloneDeep(this.shopList2);
	},
	methods: {
		// 排序
		sort(index) {
			this.currentIndex = index;
			if (index === 0) {
				this.shopList2 = cloneDeep(this.shopList1);
			} else if (index === 1) {
				this.shopList2.sort((a, b) => b.sold.slice(3) - a.sold.slice(3));
			} else if (index === 2) {
				this.shopList2.sort((a, b) => b.sale_price - a.sale_price);
			}
		},

		// 点击去商品详情页面
		toDetail(item) {
			wx.setStorageSync('detailInfo_key', item);
			wx.navigateTo({ url: '../detail/detail' });
		},

		// 添加当前商品到购物车
		toCart(item) {
			if (this.userInfo.nickName) {
				let obj = this.cartList.find(cart => cart.gid === item.gid);
				console.log(obj);
				if (obj) {
					obj.count++;
				} else {
					obj = item;
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
							wx.reLaunch({ url: '../cart/cart' });
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

	computed: { ...mapState({ cartList: state => state.cart.cartList }) }
};
</script>

<style lang="stylus">
.shoplistContainer
	height 100%
	.search
		background-color #fff
		.searchInp
			height 80rpx
			display flex
			align-items center
			background-color #f6f6f6
			margin 20rpx
			border-radius 10rpx
			.searchImg
				width 30rpx
				height 30rpx
				margin 0 20rpx
			.inp
				font-size 24rpx
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
			box-sizing border-box
			border-bottom 1rpx solid #999
			.shopImg
				width 200rpx
				height 200rpx
				flex-shrink 0
			.detail
				width 100%
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
					display flex
					align-items center
					justify-content space-between
					margin-top 10rpx
					font-size 26rpx
					color #999
					.soldNum
						margin-left -100rpx
					.toCart
						width 60rpx
						height 60rpx
</style>
