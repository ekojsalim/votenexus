Polls = new Mongo.Collection("polls");

Schema = {};

Schema.Poll = new SimpleSchema({
	title: {
		type: String,
		label: "Poll's title"
	},
	ownerId: {
		type: String,
		label: "Owner's id"
	},
	description: {
		type: String,
		max: 50,
		label: "Poll's description"
	},
	hits: {
		type: Number,
		label: "Poll's hit count"
	},
	isPublic: {
		type: Boolean,
		label: "Poll's publicity"
	},
	options: {
		type: [Object],
		minCount: 2
	},
	"options.$.optionName": {
		type: String
	},
	"options.$.votes": {
		type: Number
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if(this.isInsert) {
				return new Date();
			}
			else if(this.isUpsert) {
				return {$setOnInsert: new Date()};
			}
			else {
				this.unset();
			}
		}
	}
});

Polls.attachSchema(Schema.Poll);
/*
Polls.allow({
  insert: function (userId, doc) {
    return true;
  },
  remove: function() {
	return true;
  }
});
*/
