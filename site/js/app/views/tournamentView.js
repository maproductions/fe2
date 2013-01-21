// define individual tournament view
FED2.TournamentView = Backbone.View.extend({
    tagName: "li",
    template: $("#tournamentTemplate").html(),
	
	// Attach event handler to view elements
	events: {
	    "click a.delete": "deleteTournament"
	},
	
	// Delete tournament model
	deleteTournament: function (e) {
		e.preventDefault();
	    //Als je gaat vergelijken in je model, dan wil je dat alles lowercase is zodat het te vergelijken is
		var removedType = this.model.get("date").toLowerCase();
	    
		this.model.destroy();
	    this.remove();
	    
		
	},
	
	// Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});