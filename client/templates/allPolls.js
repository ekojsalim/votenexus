Template.allPolls.helpers({
	polls: function() {
		return Polls.find({}, {
			sort: {
				createdAt: -1
			}
		});
	}
});
