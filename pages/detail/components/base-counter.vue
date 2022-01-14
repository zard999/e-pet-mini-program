<template>
	<div class="_base-count-down">
		<slot :d="days" :hh="`00${hours}`.slice(-2)" :mm="`00${mins}`.slice(-2)" :ss="`00${seconds}`.slice(-2)"></slot>
		
		<!-- v-bind="{
				d: days,
				h: hours,
				m: mins,
				s: seconds,
				hh: `00${hours}`.slice(-2),
				mm: `00${mins}`.slice(-2),
				ss: `00${seconds}`.slice(-2)
			}" -->
	</div>
</template>
<script>
import durationFormatter from '../../../utils/durantionFormatter.js';
export default {
	name: 'BaseCounter',
	props: {
		// 剩余时间
		time: {
			type: [Number, String],
			default: 0
		},
		// 传入的时间是毫秒还是秒，false代表是秒
		isMilliSecond: {
			type: Boolean,
			default: false
		},
		// 到期时间
		end: {
			type: [Number, String],
			default: 0
		}
	},
	data() {
		return {
			days: '0',
			hours: '00',
			mins: '00',
			seconds: '00',
			timer: null
		};
	},

	mounted() {
		this.countDown();
	},
	// watch: {
	// 	// 监听duration，如果发现duration变化，说明新的时间time传入组件，这时就要重新调用this.countDown()。
	// 	duration() {
	// 		this.countDown();
	// 	}
	// },

	methods: {
		countDown() {
			this.getTime(this.duration);
		},
		
		getTime(duration) {
			// 如果组件一秒内就被重新调用，那就需要清除上一个组件的延时器
			this.timer && clearTimeout(this.timer);
			if (duration < 0) {
				return;
			}
			const { dd, hh, mm, ss } = durationFormatter(duration);
			this.days = dd || 0;
			this.hours = hh || 0;
			this.mins = mm || 0;
			this.seconds = ss || 0;
			this.timer = setTimeout(() => {
				this.getTime(duration - 1);
			}, 1000);
		}
	},
	computed: {
		duration() {
			// 到期时间
			if (this.end) {
				// end的长度大于等于13就是豪秒，小于13就是秒
				let end = String(this.end).length >= 13 ? +this.end : this.end * 1000;
				end -= Date.now();
				return end;
			}
			// 剩余时间
			const time = this.isMiniSecond ? Math.round(+this.time / 1000) : Math.round(+this.time);
			return time;
		}
	},
	
	beforeDestroy() {
		this.timer && clearTimeout(this.timer);
	}
};
</script>
<style lang="stylus"></style>
