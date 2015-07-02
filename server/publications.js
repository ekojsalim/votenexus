Meteor.publish("allPolls", function(option) {
	return Polls.find({isPublic: true}, option);
});

Meteor.publish("userPolls", function() {
	return Polls.find({ownerId: this.userId});
});

Meteor.publish("singlePoll", function(id) {
	return Polls.find(id);
});

