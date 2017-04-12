const express = require('express');
const app = express();
const { note } = require('./schemas');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static("./public/"));

function handleError(err,res) {
	res.status(400)
		.send({
			error: err
		});
	return;
}

app.get('/api/notes',(req,res) => {
	note.find({},{__v: 0},(err,docs) => {
		if(err) {
			return handleError(err,res);
		}
		res.status(200)
			.send({
				notes: docs
			});
	});
});

app.post('/api/notes', (req,res) => {
	const model = req.body;
	new note(model).save((err,doc) => {
		if(err) {
			return handleError(err,res);
		}
		res.status(200)
			.send({
				note: doc
			});
	});
});

app.put('/api/notes/:id', (req,res) => {
	const data = req.body;
	const id = req.params.id;
	note.findOneAndUpdate({_id: id},data,{new: true},(err,doc) => {
		if(err) {
			return handleError(err,res);
		}
		res.status(200)
			.send({
				note: doc
			});
	});
});

app.delete('/api/notes/:id', (req,res) => {
	const id = req.params.id;
	note.findOneAndRemove({_id: id},(err,doc) => {
		if(err) {
			return handleError(err,res);
		}
		res.status(200)
			.send();
	});
});

app.listen('3500');