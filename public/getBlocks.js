var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(this.readyState === 4 && this.status === 200){
		onReceivingData(this.responseText)
	}
}
xhr.open("GET", "/blocks", true);
xhr.send()

function onReceivingData(response){
	var listItems = JSON.parse(response);
	for(var i in listItems){
		listItems[i] = '<li> '+listItems[i]+' <a href="#" data-block='+listItems[i]+'> Delete </a></li>';
	}
	document.getElementsByClassName('block-list')[0].innerHTML = listItems.join('');
	var deleteLinks = document.querySelectorAll('[data-block]');
	for(var i = 0, l = deleteLinks.length; i < l; i++) {
		deleteLinks[i].addEventListener('click', onDeleteClick)
	}

}
