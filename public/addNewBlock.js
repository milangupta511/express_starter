var addBlockForm = document.getElementById('addBlockForm')
addBlockForm.addEventListener('submit', onBlockSubmit);
function onBlockSubmit(event){
	event.preventDefault();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/blocks", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 201){ // status 201 for created
			onReceivingData(this.responseText)
		}
	}
	xhr.send(serialize(addBlockForm))
}
