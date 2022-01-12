<template>
	<view class="indexContainer">
		<!-- header -->
		<view class="header">
			<view class="search">
				<image class="search_icon" src="../../static/images/search.png" mode=""></image>
				<input class="searchInp" type="text" value="" placeholder="驱虫新品" />
			</view>

			<image class="news" src="../../static/images/search-right.png" mode=""></image>
		</view>

		<scroll-view scroll-y="true" enable-flex class="indexScroll" style="height: calc(100vh - 80rpx);">
			<view class="scrollMain">
				<!-- indexSwiper -->
				<swiper class="indexSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"> 
					<swiper-item v-for="banner in bannerList" :key="banner.advid">
						<view class="swiper-item"><image class="swiperImg" :src="banner.img_url" mode=""></image></view>
					</swiper-item>
				</swiper>

				<!-- center的两张图片 -->
				<image class="centerImg1" :src="centerImg1.img_url" mode=""></image>
				<image class="centerImg2" :src="centerImg2.img_url" mode=""></image>

				<!-- 养宠推荐 -->
				<view class="recommend">
					<view class="title">{{ recommend.title || '' }}</view>

					<view class="recommendItem" v-for="goods in recommend.goodsList" :key="goods.gid">
						<image class="leftImg" :src="goods.img_src" mode=""></image>
						<view class="item">
							<text class="itemTitle">{{ goods.title }}</text>
							<view class="itemBottom">
								<image class="rightImg" :src="goods.goods_img" mode=""></image>
								<view class="itemRight">
									<text class="price">${{ goods.sale_price }}</text>
									<text class="num">{{ goods.be_interested }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 心选特惠 -->
				<view class="discount">
					<view class="title">{{ discount.title }}</view>
					<view class="discountList">
						<view class="discountItem" v-for="goods in discount.goodsList" :key="goods.gid">
							<view class="itemImg"><image class="img" :src="goods.goods_img" mode=""></image></view>
							<text class="itemText">{{ goods.title }}</text>
							<view class="itemPrice">
								<text class="nPrice">￥{{ goods.sale_price }}</text>
								<text class="oPrice">￥{{ goods.market_price }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 猜你喜欢 -->
				<view class="like">
					<view class="title">{{like.title}}</view>
					<view class="likeList">
						<view class="likeItem" v-for="goods in like.goodsList" :key="goods.gid">
							<image class="itemImg" :src="goods.img.img_url" mode=""></image>
							<view class="itemTitle">{{goods.title}}</view>
							<view class="cateList">
								<view class="cateItem" v-for="(prop,index) in goods.goods_properties" :key="index">{{prop}}</view>
							</view>
							<view class="itemPrice">
								<text class="price">￥{{goods.normal_price.price}}</text>
								<text class="tag_content">{{goods.normal_price.tag_content}}</text>
							</view>
							<view class="itemTop">
								<image class="topImg" :src="goods.rank_detail.icon_img.img_url" mode=""></image>
								<text class="topTitle">{{goods.rank_detail.message}}</text>
								<image class="topImgRight" src="https://static.epetbar.com/epet_wap_img/index/arrow.png" mode=""></image>
							</view>
							<view class="itemBottom"><image class="buttomImg" :src="goods.rank_detail.bg_img.img_url" mode=""></image></view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Index',
	mounted() {
		this.getIndexData();
	},

	methods: {
		// 获取首页的数据
		getIndexData() {
			this.$store.dispatch('getIndexData');
		}
	},

	computed: {
		...mapGetters(['indexList']),

		// 轮播图
		bannerList() {
			return (this.indexList[0] || {}).images || [];
		},

		/* 中间的第一张图片 */
		centerImg1() {
			return (this.indexList[1] || {}).images || {};
		},

		/* 中间的第二张图片 */
		centerImg2() {
			return (this.indexList[2] || {}).images || {};
		},

		// 养宠推荐
		recommend() {
			return this.indexList[3] || {};
		},

		// 心选特惠
		discount() {
			return this.indexList[4] || {};
		},
		
		// 猜你喜欢
		like(){
			return this.indexList[5] || {}
		}
	}
};
</script>

<style lang="stylus">
.indexContainer
	height 100%
	background-color #f7f7f7
	padding 0 20rpx
	.header
		display flex
		justify-content space-around
		align-items center
		padding-top 20rpx
		.search
			display flex
			align-items center
			width 85%
			height 60rpx
			background-color #fdfdfd
			border-radius 60rpx
			.search_icon
				width 20rpx
				height 20rpx
				margin 0 20rpx
			.searchInp
				font-size 25rpx
		.news
			width 50rpx
			height 50rpx
	.indexSwiper
		width 100%
		padding-top 30rpx
		.swiper-item
			.swiperImg
				width 100%
				height 300rpx
				border-radius 20rpx 60rpx 20rpx 20rpx
	.centerImg1
		width 100%
		height 194rpx
	.centerImg2
		width 100%
		height 127rpx
	.recommend
		background-color #ffffff
		border-radius 20rpx 60rpx 20rpx 20rpx
		padding 20rpx 10rpx
		.title
			font-size 30rpx
			color #333
			font-weight 700
			padding-left 10rpx
		.recommendItem
			display flex
			border-radius 20rpx 60rpx 20rpx 20rpx
			margin-top 20rpx
			.leftImg
				width 380rpx
				height 230rpx
				border-radius 20rpx
			.item
				flex 1
				padding 13.5rpx
				background-color #f7f7f7
				border-radius 0 60rpx 20rpx 0
				.itemTitle
					height 64rpx
					line-height 32rpx
					font-size 28rpx
				.itemBottom
					display flex
					margin-top 20rpx
					box-sizing border-box
					.rightImg
						width 100rpx
						height 100rpx
					.itemRight
						display flex
						flex-direction column
						margin 20rpx 0 0 20rpx
						.price
							font-size 28rpx
							font-weight 700
						.num
							font-size 20rpx
							color #999999
							margin-top 10rpx
	.discount
		background-color #fff
		margin-top 50rpx
		border-radius 20rpx 60rpx 20rpx 20rpx
		padding 20rpx 0
		.title
			font-size 35rpx
			font-weight 700
			padding-bottom 10rpx
			margin-left 20rpx
		.discountList
			display flex
			justify-content space-around
			.discountItem
				.itemImg
					width 186rpx
					height 186rpx
					padding 10rpx
					border 1rpx solid #aaa
					border-radius 20rpx
					.img
						width 186rpx
						height 186rpx
				.itemText
					width 208rpx
					font-size 24rpx
					display -webkit-box
					-webkit-box-orient vertical
					-webkit-line-clamp 1 /* * 多行文本溢出... */
					overflow hidden
					margin 10rpx 0
				.itemPrice
					.nPrice
						font-size 28rpx
						font-weight 700
						margin-right 10rpx
					.oPrice
						text-decoration line-through
						font-size 20rpx
						color #cdcdcd
	.like
		.title
			font-size 30rpx
			font-weight 700
			margin 30rpx 0
		.likeList
			display flex
			flex-wrap wrap
			margin-top 10rpx
			.likeItem
				width 48%
				background-color #fff
				margin-top 20rpx
				padding 0 20rpx
				box-sizing border-box
				margin-right 15rpx
				border-radius 20rpx
				.itemTitle
					font-size 28rpx
					display -webkit-box
					-webkit-box-orient vertical
					-webkit-line-clamp 1 /* * 多行文本溢出... */
					overflow hidden
					margin 10rpx 0
				.cateList
					display flex
					font-size 20rpx
					color #aaa
					margin 10rpx 0
					.cateItem
						width 80rpx
						height 30rpx
						border 1rpx solid #aaa
						line-height 30rpx
						text-align center
				.itemPrice
					display flex
					align-items center
					.price
						font-size 28rpx
						font-weight 700
						color #fd8383
					.tag_content
						width 70rpx
						height 30rpx
						background-color #fd8383
						color #FFFFFF
						font-size 20rpx
						line-height 30rpx
						text-align center
						margin-left 20rpx
				.itemImg
					width 326rpx
					height 326rpx
				.itemTop
					display flex
					justify-content center
					align-items center
					margin-top 20rpx
					.topImg
						width 24rpx
						height 26rpx
					.topTitle
						width 85%
						font-size 26rpx
						font-weight 700
						text-align center
					.topImgRight
						width 8rpx
						height 14rpx
				.itemBottom
					.buttomImg
						width 100%
						height 50rpx
</style>
