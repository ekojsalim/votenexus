Router.configure({
	layoutTemplate: "layout",
	progressSpinner: false,
	progressDelay: 100
});

Router.route("/", {
	name: "home"
});
