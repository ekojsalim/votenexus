Template.dashboard.helpers({
	name: function() {
		var user = Meteor.user().emails[0].address;
		return user;
	}
});
