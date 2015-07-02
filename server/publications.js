Meteor.publish("allPolls", function() {
	return Polls.find({isPublic: true});
});

Meteor.publish("userPolls", function() {
	return Polls.find({ownerId: this.userId});
});

Meteor.publish("singlePoll", function(id) {
	return Polls.find(id);
});

