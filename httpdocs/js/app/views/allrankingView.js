// define tournaments view
FED2.allrankingView = Backbone.View.extend({
    el: $("#league"),
	
    initialize: function () {
	
		this.list = this.$el.find("#tournaments");
        this.collection = new FED2.RankingCollection(FED2.rankingData);

		this.render();	
		
		this.$el.find("#filter").append(this.createSelect());
		
		// Attach custom event handler
		this.on("change:filterType", this.filterByType, this);
		
		// Attach eventhandlers to collection
        this.collection.on("reset", this.render, this);
		this.collection.on("add", this.renderLeague, this);
		this.collection.on("remove", this.removeTournament, this);
    },

	// Attach event handlers to view elements
	events: {
	    "change #filter select": "setFilter",
		"click #add": "addTournament",
		"click #showForm": "showForm"
	},
	
	// Render the view
    render: function () {
		this.$el.find("#tournaments").html('');

		_.each(this.collection.models, function (item) {
        	this.renderLeague(item);
        }, this);
    },

    renderLeague: function (item) {
        var RankingView = new FED2.rankingView({
            model: item
        });

        this.list.append(RankingView.render().el);
    },
	
	// Add tournament model
	addTournament: function (e) {
	    e.preventDefault();
	    var newModel = {};
	    $("#addTournament").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	            newModel[el.id] = $(el).val();
	      }
	    });
	    FED2.rankingData.push(newModel);
	    
	    if (_.indexOf(this.getTypes(), newModel.team) === -1) {
	         this.collection.add(new FED2.RankingModel(newModel));
	        this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
	    } else {
	        this.collection.add(new FED2.RankingModel(newModel));
	    }
	    
	    this.collection.reset(FED2.rankingData);
	},
	
	// Remove tournament model
	removeTournament: function (removedModel) {
	    var removed = removedModel.attributes;
	    _.each(FED2.rankingData, function (item) {
	        if (_.isEqual(item, removed)) {
	            FED2.rankingData.splice(_.indexOf(FED2.rankingData, item), 1);
	        }
	    });
	},

	// Get types for schedulingFormat select box
	getTypes: function () {
	    return _.uniq(this.collection.pluck("team"), false, function (type) {
	        return type.toLowerCase();
	    });
	},
	
	// Create schedulingFormat select box
	createSelect: function () {
	    var filter = this.$el.find("#filter"),
	        select = $("<select/>", {
	            html: "<option value='all'>all</option>"
	        });
	    _.each(this.getTypes(), function (item) {
	        var option = $("<option/>", {
	            value: item.toLowerCase(),
	            text: item.toLowerCase()
	        }).appendTo(select);
	    });
	    return select;
	},
	
	// Set filter
	setFilter: function (e) {
	    this.filterType = e.currentTarget.value;
	    
		// Trigger custom event handler
		this.trigger("change:filterType");
	},
	
	// Filter the collection
	filterByType: function () {
	    if (this.filterType === "all") {
	        this.collection.reset(FED2.rankingData);
	    } else {
	        this.collection.reset(FED2.rankingData, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("team").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	},
	
	showForm: function (e) {
		e.preventDefault();
	    this.$el.find("#addTournament").slideToggle();
	}
});


//create instance of master view
FED2.masterview = new FED2.allrankingView();