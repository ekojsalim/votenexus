Template.dashboard.helpers({
	name: function() {
		var user = Meteor.user().emails[0].address;
		return user;
	},
	hits: function() {
		var x = Polls.find({ownerId: Meteor.user()._id}).fetch();
		var y = x.length > 0 ? x.map(function(item) {
			return item.hits;
		}).reduce(function(a, b) {
			return a + b;
		}) : 0;
		return y;
	}
});
