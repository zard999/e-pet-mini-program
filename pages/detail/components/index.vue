<template>
	<view class="base_count_down"></view>
</template>

<script>
export default {
	props:{
		time: {
			type:[Number, String],
			default:0
		},
		isMilliSecond:{ // 这用来告诉组件这个time是毫秒还是秒为单位
			type:Boolean,
			default:false
		}
	}
	data() {
		return {};
	},
	
	mounted() {
		this.countDown()
	},
	
	methods:{
		countDown(){
			// this.
		}
	}

	computed:{
		// 不管time是毫秒还是秒都转化为秒
		duration(){
			const time = this.isMilliSecond ? Math.round(+this.time / 1000) : Math.round(+this.time)
			return time
		}
	}
};
</script>

<style lang="stylus">

</style>
