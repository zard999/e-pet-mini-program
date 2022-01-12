import request from '../../utils/request.js'

const state = {
	categoryData:{}
}

const mutations = {
	'SET_CATEGORYDATA'(state,categoryData){
		state.categoryData = categoryData
	}
}

const actions ={
	// 请求获取首页数据
	async getCategoryData({commit}){
		const result = await request('/getCateList')
		commit('SET_CATEGORYDATA', result)
	}
}

const getters = {
	categoryList(state){
		return state.categoryData.categorys || []
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}