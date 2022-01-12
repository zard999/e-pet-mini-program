import request from '../../utils/request.js'

const state = {
	indexData:{}
}

const mutations = {
	'SET_INDEXDATA'(state,indexData){
		state.indexData = indexData
	}
}

const actions ={
	// 请求获取首页数据
	async getIndexData({commit}){
		const result = await request('/getIndexData')
		commit('SET_INDEXDATA', result)
	}
}

const getters = {
	indexList(state){
		return state.indexData.list || []
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}