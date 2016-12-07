var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		onReceivingLimitBlock(this.responseText)
	}
}
xhr.open("GET", "/blocks?limit=2", true);
xhr.send()

function onReceivingLimitBlock(response){
	var listItems = JSON.parse(response).join('</div><div>')
	document.getElementsByClassName('block-limit')[0].innerHTML = '<div>' +listItems + '</div>';
}
