Template.pollmg.helpers({
	polls: function() {
		return Polls.find();
	},
	date: function() {
		return moment(this.createdAt).fromNow();
	}
});

Template.pollmg.events({
	"click .delete": function() {
		Session.set("deleteId", this._id);
		$("#modal1").openModal();
	},
	"click #agree": function() {
		Polls.remove({_id: Session.get("deleteId")});
		Session.set("deleteId", null);
		Materialize.toast("Poll removed!", 4000);
	},
	"click #disagree": function() {
		Session.set("deleteId", null);
	},
	"click .url-button": function() {
		$("#url").html("http://" + window.location.hostname + "/polls/" + this._id);
		$("#modalurl").openModal();
	}
});
