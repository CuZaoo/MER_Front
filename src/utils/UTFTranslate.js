//UTF字符转换
	var UTFTranslate = {
	    Change: function(pValue) {
	        return pValue.replace(/[^\u0000-\u00FF]/g, function($0) {
	            return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;")
	        });
	    },
	    ReChange: function(pValue) {
	        return unescape(pValue.replace(/&#x/g, '%u').replace(/\\u/g, '%u').replace(/;/g, ''));
	    }
	};
export default UTFTranslate;