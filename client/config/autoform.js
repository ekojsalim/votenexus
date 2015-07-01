AutoForm.setDefaultTemplate("materialize");

var postHooks = {
  before: {
    insert: function(doc) {
        doc.ownerId = Meteor.userId();
        doc.hits = 0;
        doc.options = doc.options.map(function(item) {
          return {
            optionName: item.optionName,
            votes: 0
          };
        });
      return doc;
    }
  },
  after: {
	insert: function() {
		Router.go("dashboard");
		Materialize.toast("Poll Submitted!", 4000);
	}
  }
};

AutoForm.addHooks("newPollForm", postHooks);

