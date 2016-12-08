var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		onReceivingBlockLocation(this.responseText)
	}
}
xhr.open("GET", "/blocks/location/rotating", true);
xhr.send()

function onReceivingBlockLocation(response){
	document.getElementsByClassName('block-location')[0].innerHTML = JSON.parse(response)
}
