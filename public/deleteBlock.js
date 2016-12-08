
function onDeleteClick(event){
	event.preventDefault();
	var deleteBlock = event.target.dataset.block;
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/blocks/'+deleteBlock, true);
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			onReceivingData(this.responseText)
		}
	}
	xhr.send()
}
