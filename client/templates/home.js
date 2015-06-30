Template.home.onRendered(function() {
	$(".button-collapse").sideNav();
	$(".parallax").parallax();
});

Template.home.helpers({
	loggedIn: function() {
		var user = Meteor.user();
		return user ? true : false;
	}
});
