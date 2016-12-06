var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		onReceivingData(this.responseText)
	}
}
xhr.open("GET", "/blocks?limit=3", true);
xhr.send()

function onReceivingData(response){
	console.log(response)
	var listItems = JSON.parse(response).join('</li><li>')
	document.getElementsByClassName('block-list')[0].innerHTML = '<li>' +listItems + '</li>';
}
