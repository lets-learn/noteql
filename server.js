const express = require('express');
const app = express();
const { note, graphQLNote } = require('./schemas');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { handleError } = require('./utils');


app.use(bodyParser.json());
app.use(express.static("./public/"));

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

app.use('/api/graphql/notes', graphqlHTTP({schema: graphQLNote}));

app.listen('3500');