function buildUrl(url, objParams){
	if (Object.keys(objParams).length > 0) {
		var serializedParams = [];
		Object.keys(objParams).forEach(function(val){
			serializedParams.push(`${val}=${objParams[val]}`);
		})
		url += ((url.indexOf('?') === -1) ? '?' : '&') + serializedParams.join('&');
	}
	return url;
};


module.exports = {
  buildUrl: buildUrl
}
