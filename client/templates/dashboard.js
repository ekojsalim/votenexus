Template.dashboard.helpers({
	name: function() {
		var user = Meteor.user();
		return user;
	}
});
