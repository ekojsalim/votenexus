//Router configuration
Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound",
	progressSpinner: false,
	progressDelay: 100
});



//Controller
PollsController = RouteController.extend({
	template: "allPolls",
	increment: 8,
	pollsLimit: function() {
		return parseInt(this.params.pollLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.pollsLimit()};
	},
	subscriptions: function() {
		this.pollsSub = Meteor.subscribe("allPolls", this.findOptions());
	},
	polls: function() {
		return Polls.find({}, this.findOptions());
	},
	data: function() {
	var hasMore = this.polls().count() === this.pollsLimit();
	var nextPath = this.route.path({pollLimit: this.pollsLimit() + this.increment});
	return {
		polls: this.polls(),
		ready: this.pollsSub.ready,
		nextPath: hasMore ? nextPath : null
	};
	}
});

NewPollsController = PollsController.extend({
	sort: {createdAt: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newPolls.path({pollLimit: this.pollsLimit + this.increment});
	}
});

ViewsPollsController = PollsController.extend({
	sort: {hits: -1},
	nextPath: function() {
		return Router.routes.viewsPolls.path({pollLimit: this.pollsLimit + this.increment});
	}
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
Router.route("/allPolls/:pollLimit?", {
	name: "allPolls",
	controller: NewPollsController
});

Router.route("/allPollsViews/:pollLimit?", {
	name: "viewsPolls",
	controller: ViewsPollsController
});

SubsControl = RouteController.extend({
	waitOn: function() {
		return Meteor.subscribe("singlePoll", this.params._id);
	},
	data: function() {
		return Polls.findOne(this.params._id);
	}
});

//Polls page
Router.route("/polls/:_id", {
	name: "pollPage",
	controller: SubsControl,
	onRun: function() {
		Meteor.call("viewIncrement", this.params._id);
	}
});

Router.route("/polls/edit/:_id", {
	name: "pollEdit",
	controller: SubsControl
});

Router.route("/poll/new", {
	name: "newPoll"
});

//Poll"s stats
Router.route("/stats/:_id", {
	name: "pollStats",
	controller: SubsControl
});

//API
Router.route("/apipage", {
	name: "api"
});


Router.onBeforeAction("dataNotFound", {only: ["pollPage", "pollStats"]});

Router.plugin("ensureSignedIn", {
    only: ["dashboard", "newPoll"]
});


