Router.configure({
	layoutTemplate: "layout",
	progressSpinner: false,
	progressDelay: 100
});

Router.route("/", {
	name: "home"
});

Router.route("/dashboard", {
	name: "dashboard"
});

Router.plugin("ensureSignedIn", {
    only: ["dashboard"]
});
