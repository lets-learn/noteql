const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');

const noteSchema = new Schema({
	title: String,
	body: String,
	created_at: {
		default: Date.now,
		type: Number
	}
});

const Note = mongoose.model("Note", noteSchema);

const NoteType = new graphql.GraphQLObjectType({
	name: "Note",
	fields: {
		title: {
			type: graphql.GraphQLString
		},
		body: {
			type: graphql.GraphQLString
		},
		created_at: {
			type: graphql.GraphQLInt
		}
	}
});

const QueryType = new graphql.GraphQLObjectType({
	name: "Query",
	fields: {
		notes : {
			type: new graphql.GraphQLList(NoteType),
			resolve() {
				return new Promise((resolve,reject) => {
					Note.find({},(err,docs) => {
						if(err) {
							reject(err);
						}
						resolve(docs);
					});
				});
			}
		}
	}
});

module.exports = {
	Note,
	graphQlNote: new graphql.GraphQLSchema({
		query: QueryType
	})
};