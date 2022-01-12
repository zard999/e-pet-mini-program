import request from '../../utils/request.js'

const state = {
	centerData:{}
}

const mutations = {
	'SET_CENTERDATA'(state,centerData){
		state.centerData = centerData
	}
}

const actions ={
	// 请求获取首页数据
	async getCenterData({commit}){
		const result = await request('/getCenterData')
		commit('SET_CENTERDATA', result)
	}
}

const getters = {
	centerList(state){
		return state.centerData.list || []
	},
	
	avatar(state){
		return state.centerData.avatar || ''
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}