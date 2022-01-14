<template>
	<view class="cartContainer">
		<scroll-view v-if="userInfo.nickName && cartList.length" scroll-y="true" enable-flex class="cartScroll">
			<view class="scrollMain">
				<!-- 购物车列表 -->
				<view class="cartList">
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(cart, index) in cartList" :key="cart.gid" @click="bindClick">
							<view class="cartItem">
								<view class="checkbox">
									<image class="noCheckImg" :class="{ selected: cart.isChecked }" src="../../static/images/nocheck.png" @click="checkSingle(cart)"></image>
								</view>

								<view class="itemContent">
									<image class="itemImg" :src="cart.photo" mode=""></image>
									<view class="rightContent">
										<text class="title">{{ cart.subject }}</text>

										<view class="price_and_addplus">
											<text class="price">￥{{ cart.sale_price }}</text>
											<view class="add_plus">
												<view class="plus" :class="{ active: cart.count > 1 }" @click="handlerNum(cart, -1, true)">-</view>
												<input class="inp" type="text" :value="cart.count" @change="handlerNum(cart, $event.target.value, false)" />
												<!-- <input class="inp" type="text" v-model="cart.count" @change="handlerNum(cart, $event.target.value, false)" /> -->
												<view class="add" @click="handlerNum(cart, 1, true)">+</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<template v-slot:right>
								<view class="slot-button" @click="deleteImte(index)"><text class="slot-button-text">删除</text></view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
		</scroll-view>

		<!-- 结算 -->
		<view class="settlement" v-if="userInfo.nickName && cartList.length">
			<image :class="{ selected: isCheckAll }" class="total" src="../../static/images/nocheck.png" @click="allCheck"></image>
			合计：
			<text class="price">￥{{ totalPrice }}</text>
			<text class="discount">优惠:￥{{ discount }}</text>
			<view class="toSettlement">去结算({{ totalNum }})</view>
		</view>

		<view v-else class="emptyCart">
			<image style="width: 100%;" src="../../static/images/cart-kong.jpg" mode=""></image>
			<view class="anyTo" @click="anyTo">随便逛逛</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			userInfo: {},
			swipeList: [],
			options1: [
				{
					text: '取消置顶'
				}
			],
			options2: [
				{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '确认',
					style: {
						backgroundColor: '#F56C6C'
					}
				}
			]
		};
	},

	mounted() {
		this.userInfo = wx.getStorageSync('userInfo_key');
	},

	methods: {
		// 单选
		checkSingle(cart) {
			cart.isChecked = !cart.isChecked;
		},

		// 全选
		allCheck() {
			this.isCheckAll = !this.isCheckAll;
		},

		// 改变数量
		handlerNum(cart, disNum, flag) {
			// console.log(cart, disNum * 1, flag);
			if (flag) {
				cart.count += +disNum;
				if (cart.count < 1) {
					uni.showModal({
						content: '喵~不需要该商品可取消勾选哦!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								// 点击确定的逻辑
								cart.count = 1;
							}
						}
					});
				} else if (cart.count > 20) {
					uni.showModal({
						content: '喵~商品最大数量为20哦!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								// 点击确定的逻辑
								this.$nextTick(function() {
									cart.count = 20;
								});
							}
						}
					});
				}
			} else {
				// 为什么只能变1次1，因为cart.count变为1后，input变值时，cart里面的count为1，而下面再将其变为1，实际上数据是没有变的，那么就不会触发响应式，所以要在开头的时候就将其改变值。这样虽然改变了两个值，但是太快了，vue会做优化，只改变前一次，所以需要用到$nextTick
				cart.count = +disNum;
				if (!/^\d+$/.test(cart.count)) {
					uni.showModal({
						content: '喵~不能输入非法字符哦!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								// 点击确定的逻辑
								this.$nextTick(function() {
									cart.count = 1;
								});
							}
						}
					});
				} else if (cart.count === 0) {
					uni.showModal({
						content: '喵~不需要该商品可取消勾选哦!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								// 点击确定的逻辑
								this.$nextTick(function() {
									cart.count = 1;
								});
							}
						}
					});
				} else if (cart.count > 20) {
					uni.showModal({
						content: '喵~商品最大数量为20哦!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								// 点击确定的逻辑
								this.$nextTick(function() {
									cart.count = 20;
								});
							}
						}
					});
				}
			}
		},

		// 删除item
		deleteImte(index) {
			this.cartList.splice(index, 1);
			uni.showToast({
				title: '删除成功',
				duration: 2000
			});
		},

		// 去任意页面逛逛
		anyTo() {
			if (!this.cartList.length) {
				wx.reLaunch({
					url: '../category/category'
				});
				return;
			}
			wx.navigateTo({
				url: '../login/login'
			});
		}
	},
	computed: {
		...mapState({
			cartList: state => state.cart.cartList
		}),

		// 计算合计价格
		totalPrice() {
			return this.cartList.reduce((p, c) => {
				if (c.isChecked) {
					p += c.count * c.sale_price;
				}
				return p;
			}, 0);
		},

		// 计算优惠
		discount() {
			return this.cartList.reduce((p, c) => {
				if (c.isChecked) {
					p += c.count * (c.market_price - c.sale_price);
				}
				return p;
			}, 0);
		},

		// 计算合计数量
		totalNum() {
			return this.cartList.reduce((p, c) => {
				if (c.isChecked) {
					p++;
				}
				return p;
			}, 0);
		},

		// 全选
		isCheckAll: {
			get() {
				return this.cartList.every(item => item.isChecked);
			},
			set(newValue) {
				this.cartList.forEach(item => (item.isChecked = newValue));
			}
		}
	}
};
</script>

<style lang="stylus">
.cartContainer
	height 100%
	.cartScroll
		height calc(100vh - 138rpx)
		background-color #f3f4f5
		.cartList
			width 100%
			padding 0 20rpx 0 20rpx
			background-color #fff
			.cartItem
				display flex
				align-items center
				padding 30rpx
				.checkbox
					.noCheckImg
						width 40rpx
						height 40rpx
						&.selected
							background url('../../static/images/check.png')
							background-size cover
				.itemContent
					display flex
					margin-left 20rpx
					width 100%
					.itemImg
						width 180rpx
						height 180rpx
						flex-shrink 0
					.rightContent
						width 100%
						display flex
						flex-direction column
						margin-left 20rpx
						.title
							display -webkit-box
							-webkit-box-orient vertical
							-webkit-line-clamp 2 /* * 多行文本溢出... */
							overflow hidden
							font-size 26rpx
						.price_and_addplus
							display flex
							justify-content space-between
							margin-top 64rpx
							padding-right 50rpx
							.price
								color #ff5757
								font-weight 600
							.add_plus
								display flex
								align-items center
								box-sizing border-box
								text-align center
								border 1rpx solid #999
								height 42rpx
								border-radius 20rpx
								.plus
									width 60rpx
									border-right #999 solid 1rpx
									color #999
									&.active
										color #000
								.inp
									width 60rpx
									font-size 24rpx
									outline none
								.add
									width 60rpx
									height 42rpx
									border-left #999 solid 1rpx
			.slot-button
				display flex
				justify-content center
				align-items center
				width 120rpx
				height 100%
				background-color #e64340
				color #fff
	.settlement
		position absolute
		bottom 0
		left 0
		display flex
		align-items center
		justify-content space-between
		width 100%
		background-color #fff
		padding 30rpx
		font-size 26rpx
		color #999
		z-index 999
		.total
			width 40rpx
			height 40rpx
			&.selected
				background url('../../static/images/check.png')
				background-size cover
		.price
			font-size 34rpx
			color #ff5757
			font-weight 600
		.discount
			font-size 24rpx
			color #ff5757
		.toSettlement
			color #ff5757
			font-size 22rpx
			margin-top 8rpx
			width 180rpx
			height 70rpx
			border-radius 70px
			font-size 28rpx
			line-height 70rpx
			text-align center
			color #fff
			font-size 500
			background-color #41c856
			margin-right 50rpx
	.emptyCart
		display flex
		flex-direction column
		align-items center
		.anyTo
			width 200rpx
			height 80rpx
			color #f13e3e
			border 2rpx solid #f13e3e
			border-radius 80rpx
			box-sizing border-box
			text-align center
			line-height 80rpx
</style>
