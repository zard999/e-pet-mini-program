function request(url, data = {}, methods = 'GET') {
	return new Promise((resolve, reject) => {
		wx.request({
			url: 'http://localhost:3003' + url,
			methods,
			data,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default request
