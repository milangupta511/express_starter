var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		onReceivingParamBlocks(this.responseText)
	}
}
xhr.open("GET", "/blocks/status/fiXed", true);
xhr.send()

function onReceivingParamBlocks(response){
	document.getElementsByClassName('block-param')[0].innerHTML = JSON.parse(response);
}
