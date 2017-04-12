fetch('/api/notes',{
	method: "GET",
	headers: {
		'Content-Type': 'application/json'
	}
})	
.then(res => res.json())
.then(console.log);