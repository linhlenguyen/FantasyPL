const dataLoader = (function(){
	let loadData = function(url){
		$.ajax({
			type: "GET",
			dataType:"jsonp",
			url: url,
			jsonp: false,
			jsonpCallback : 'callback',
			success: (data) => {
				console.log(data);
			}
		});
	};

	let loadJson = function(url){
		$.getJSON(url, (data) =>{
			console.log(data);
		})
	}
	return {
		loadData : loadData,
		loadJson : loadJson
	}
}());
