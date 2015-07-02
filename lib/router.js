//Router configuration
Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound",
	progressSpinner: false,
	progressDelay: 100
});

//Main route
Router.route("/", {
	name: "home"
});

//Poll management
Router.route("/pollmg", {
	name: "pollmg",
	waitOn: function() {
		return Meteor.subscribe("userPolls");
	}
});

//Dashboard
Router.route("/dashboard", {
	name: "dashboard",
	waitOn: function() {
		return Meteor.subscribe("userPolls");
	}
});

//User setting
Router.route("userset", {
	name: "userset"
});

//All polls
Router.route("/allPolls", {
	name: "allPolls",
	waitOn: function() {
		return Meteor.subscribe("allPolls");
	}
});

//Polls page
Router.route("/polls/:_id", {
	name: "pollPage",
	waitOn: function() {
		return Meteor.subscribe("singlePoll", this.params._id);
	},
	onRun: function() {
		Meteor.call("viewIncrement", this.params._id);
	},
	data: function() {
		return Polls.findOne(this.params._id);
	}
});

Router.route("/polls/edit/:_id", {
	name: "pollEdit",
	waitOn: function() {
		return Meteor.subscribe("singlePoll", this.params._id);
	},
	data: function() {
		return Polls.findOne(this.params._id);
	}
});

Router.route("/poll/new", {
	name: "newPoll"
});

//Poll"s stats
Router.route("/stats/:_id", {
	name: "pollStats",
	waitOn: function() {
		return Meteor.subscribe("singlePoll", this.params._id);
	},
	data: function() {
		return Polls.findOne(this.params._id);
	}
});

//API
Router.route("/apipage", {
	name: "api"
});


Router.onBeforeAction("dataNotFound", {only: ["pollPage", "pollStats"]});

Router.plugin("ensureSignedIn", {
    only: ["dashboard", "newPoll"]
});


