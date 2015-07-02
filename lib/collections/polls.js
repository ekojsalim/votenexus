Polls = new Mongo.Collection("polls");

Meteor.methods({
	viewIncrement: function(id) {
		this.unblock();
		Polls.update({_id: id}, {
			$inc: {
				hits: 1
			}
		}, function(err, res) {
			return err || res;
		});
	},
	incrementVotes: function(pollId, optionNum) {
		if(Polls.findOne({_id: pollId}).voters.indexOf(this.userId) === -1) {
			var query = {};
			query["options." + optionNum + ".votes"] = 1;
			Polls.update({_id: pollId}, {
				$push: {
					voters: this.userId
				}
			}, {
				validate: false
			});
			Polls.update({_id: pollId, options: {
				$elemMatch: {
					optionNum: optionNum
				}
			}}, {
				$inc: {
					"options.$.votes": 1
				}
			}, {
				validate: false
			});
			return "Vote submitted!";
		}
		return "You have voted before! Please don't try to cheat the system!";
	}
});

Schema = {};

Schema.Poll = new SimpleSchema({
	title: {
		type: String,
		label: "Poll's title",
		max: 40
	},
	ownerId: {
		type: String,
		label: "Owner's id"
	},
	description: {
		type: String,
		max: 80,
		label: "Poll's description"
	},
	authorName: {
		type: String,
		label: "Author name/email",
		optional: true
	},
	hits: {
		type: Number,
		label: "Poll's hit count"
	},
	isPublic: {
		type: Boolean,
		label: "Public"
	},
	showAuthor: {
		type: Boolean,
		label: "Show author's name/e-mail"
	},
	options: {
		type: [Object],
		minCount: 2
	},
	voters: {
		type: [Object]
	},
	"voters.$": {
		type: "String",
		optional: true
	},
	"options.$.optionNum": {
		type: Number,
		autoform: {
			type: "hidden"
		}
	},
	"options.$.optionName": {
		type: String
	},
	"options.$.votes": {
		type: Number,
        autoform: {
			type: "hidden"
		}
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
