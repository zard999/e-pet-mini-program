<template>
	<view class="categoryContainer">
		<view class="header">
			<view class="category active">分类</view>
			<view class="trademark">品牌</view>
		</view>

		<view class="content">
			<view class="leftNav">
				<view class="navItem" :class="{ active: currentIndex === index }" v-for="(category, index) in categoryList" :key="category.cateid" @click="currentIndex = index">{{ category.name }}</view>
			</view>
			<scroll-view scroll-y="true" enable-flex class="rightScroll">
				<view class="scrollItem">
					<view class="dog">
						<view class="topHeader">
							<text class="leftTitle">{{ dogInfo.title }}</text>
							<image class="rightAll" :src="dogInfo.rigth_img.image" mode=""></image>
						</view>

						<view class="contentList">
							<view class="contentItem" v-for="item in dogInfo.list" :key="item.id_param" @click="toShopList(item)">
								<image class="itemImg" :src="item.photo" mode=""></image>
								<text class="itemText">{{ item.name }}</text>
							</view>
						</view>
					</view>

					<view class="recommendTrademark">
						<view class="topHeader"><text class="title">{{trademarkInfo.title}}</text></view>

						<view class="contentList">
							<view class="contentItem" v-for="trademark in trademarkInfo.list" :key="trademark.target.param">
								<view class="itemImg"><image class="img" :src="trademark.logo" mode=""></image></view>
								<text class="itemText">{{trademark.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			currentIndex: 0
		};
	},
	mounted() {
		this.getCategoryData();
	},
	methods: {
		getCategoryData() {
			this.$store.dispatch('getCategoryData');
		},
		
		// 点击去对应分类的商品列表
		toShopList(item){
			wx.setStorageSync('shoplist_key',item)
			wx.navigateTo({
				url:'../shoplist/shoplist'
			})
		}
	},

	computed: {
		...mapGetters(['categoryList']),

		// 当前的currentCategory
		currentCategory() {
			return this.categoryList[this.currentIndex] || {};
		},

		// 当前currentCategory中的狗狗的信息
		dogInfo() {
			return (this.currentCategory.cate_list || [])[0] || {};
		},
		
		// 当前currentCategory中品牌的信息
		trademarkInfo(){
			return (this.currentCategory.cate_list || [])[1] || {};
		}
	}
};
</script>

<style lang="stylus">
.categoryContainer
	height 100%
	background-color #f3f4f5
	.header
		display flex
		align-items center
		justify-content center
		width 100%
		height 80rpx
		background-color #fff
		font-size 28rpx
		font-weight 600
		.category
			width 60rpx
			height 80rpx
			line-height 80rpx
			text-align center
			box-sizing border-box
			margin-right 80rpx
		.trademark
			width 60rpx
			height 80rpx
			line-height 80rpx
			box-sizing border-box
			text-align center
		.active
			color #41c856
			border-bottom 4rpx solid #41c856
	.content
		display flex
		margin-top 10rpx
		.leftNav
			width 140rpx
			background-color #fff
			.navItem
				width 140rpx
				height 100rpx
				font-size 28rpx
				line-height 100rpx
				text-align center
				border-bottom 1rpx solid #aaa
				&.active
					color #41C856
					background-color #f3f4f5
					border-bottom 1rpx solid #fff
		.rightScroll
			height calc(100vh - 100rpx)
			margin-left 10rpx
			background-color #fff
			.scrollItem
				.dog
					padding 10rpx 10px 40px
					.topHeader
						display flex
						justify-content space-between
						align-items center
						padding-top 20rpx
						font-size 24rpx
						color #999
						.rightAll
							width 100rpx
							height 20rpx
					.contentList
						display flex
						flex-wrap wrap
						.contentItem
							display flex
							flex-direction column
							width 33.33%
							margin-top 20rpx
							.itemImg
								width 100%
								height 174rpx
							.itemText
								width 100%
								height 40rpx
								text-align center
								line-height 40rpx
								font-size 26rpx
								margin-top 20rpx
				.recommendTrademark
					padding 5px 5px 20px
					.topHeader
						display flex
						justify-content space-between
						align-items center
						padding: 20rpx 0
						font-size 24rpx
						color #999
					.contentList
						display flex
						flex-wrap wrap
						justify-content space-between
						.contentItem
							display flex
							flex-direction column
							width 48%
							margin-top 10rpx
							.itemImg
								border 1rpx solid #999
								box-sizing border-box
								text-align center
								.img
									width 160rpx
									height 90rpx
									margin-top 8rpx
							.itemText
								width 100%
								height 40rpx
								text-align center
								line-height 40rpx
								font-size 24rpx
								margin-top 10rpx
							
</style>
