Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound",
	progressSpinner: false,
	progressDelay: 100
});

Router.route("/", {
	name: "home"
	//Testing

});

Router.route("/pollmg", {
	name: "pollmg",
	waitOn: function() {
		return Meteor.subscribe("polls");
	}
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
