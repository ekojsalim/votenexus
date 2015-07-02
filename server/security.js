Security.defineMethod("ifIsOwner", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.ownerId;
  }
});

Security.defineMethod("ifIdMatch", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.ownerId;
  }
});

Security.defineMethod("ifHitAndVotesAreEmpty", {
	fetch: [],
	transform: null,
	deny: function(type, arg, userId, doc) {
		return doc.hits !== 0 || doc.options.some(function(item) {
			return item.votes !== 0;
		});
	}
});

Polls.permit("insert").ifLoggedIn().ifIdMatch().ifHitAndVotesAreEmpty().apply();
Polls.permit("remove").ifIsOwner().apply();
Polls.permit("update").ifLoggedIn().ifIsOwner().exceptProps(["options", "createdAt", "voters", "hits", "ownerId"]).apply();
