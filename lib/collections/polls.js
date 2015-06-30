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
	hits: {
		type: Number,
		label: "Poll's hit count"
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

Polls.allow({
  insert: function (userId, doc) {
    return true;
  }
});
