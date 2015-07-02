AutoForm.setDefaultTemplate("materialize");

var postHooks = {
  before: {
    insert: function(doc) {
        doc.ownerId = Meteor.userId();
        doc.hits = 0;
        doc.options = doc.options.map(function(item, index) {
          return {
            optionNum: index,
            optionName: item.optionName,
            votes: 0
          };
        });
        doc.voters = [];
        if(doc.showAuthor) {
          var y = Meteor.user().profile;
          doc.authorName = y ? y.name : Meteor.user().emails[0].address;
        }
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

var editHooks = {
  before: {
    update: function(doc) {
      if(doc.$set.showAuthor) {
        doc.$set.authorName = Meteor.user().profile.name || Meteor.user().emails[0].address;
      }
      return doc;
    }
  },
  after: {
    update: function() {
      Router.go("pollmg");
      Materialize.toast("Poll Edited!", 4000);
    }
  }
};

AutoForm.addHooks("newPollForm", postHooks);
AutoForm.addHooks("editPollForm", editHooks);

