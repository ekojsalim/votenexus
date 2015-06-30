Router.configure({
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	progressSpinner: false,
	progressDelay: 100
});

Router.route("/", {
	name: "home",
	//Testing
	waitOn: function() {
		return Meteor.subscribe("polls");
	}
});

Router.route("/pollmg", {
	name: "pollmg"
});

Router.route("/dashboard", {
	name: "dashboard"
});

Router.route("userset", {
	name: "userset"
});

Router.route("/allPolls", {
	name: "allPolls"
});

Router.route("/api", {
	name: "api"
});

Router.plugin("ensureSignedIn", {
    only: ["dashboard"]
});
