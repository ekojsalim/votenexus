Template.pollmg.helpers({
	polls: function() {
		return Polls.find();
	},
	date: function() {
		return moment(this.createdAt).fromNow();
	}
});
