Template.pollPage.helpers({
	voted: function() {
		if(Polls.find().fetch()[0].voters.indexOf(Meteor.user()._id) > -1) {
			return "disabled";
		}
	}
});

Template.pollPage.events({
	"click .option-poll": function() {
		if(Polls.find().fetch()[0].voters.indexOf(Meteor.user()._id) === -1) {
			Meteor.call("incrementVotes", Polls.findOne()._id, this.optionNum, function(err, res) {
				if(err){
					throw err;
				}
				Materialize.toast(res, 2000);
				Router.go("pollStats", {
					_id: Polls.findOne()._id
				});
			});
		}
	}
});
