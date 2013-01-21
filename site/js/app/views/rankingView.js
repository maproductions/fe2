// define individual tournament view
FED2.rankingView = Backbone.View.extend({

    tagName: "tr",
    template: $("#tournamentTemplate").html(),
	
	// Attach event handler to view elements
	events: {
	    "click a.delete": "deleteTournament"
	},
	
	// Delete tournament model
	deleteTournament: function (e) {
		e.preventDefault();
	    
		var removedType = this.model.get("team").toLowerCase();
	    
		this.model.destroy();
	    this.remove();
	    //selecteer van de collectie
		if (_.indexOf(FED2.masterview.getTypes(), removedType) === -1) {
	        FED2.masterview.$el.find("#filter select").children("[value='" + removedType + "']").remove();
	    }
	},
	
	// Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});