
// a setview
FED2.Setview = Backbone.View.extend({
    tagName: "tr",
    
    template: _.template( $("#setTemplate").html() ),
    
    
    // what function to execute?
    events: {
        'click .remove' : 'destroy',
        'click .edit' : 'editItem' 
    },
    // edit an item, works with pormpt for now
    editItem: function(){
        var editedSet = prompt("score team 1", this.model.get('team1Score'));
        this.model.set("team1Score", editedSet);
        
    },
    
    //first we will destroy a model
    destroy: function(){
        this.model.destroy();
    },
    //only when the model is succesfully destroyed, we can remove the element containing the model 
    remove: function(){
        this.$el.remove();
    },
    
    initialize: function(){
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.remove, this);
    },
    
    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    } 
});

FED2.Gameview = Backbone.View.extend({
    tagName: "table",
    
    initialize: function(){
        //put the top on the table with jQuery
        this.$el.prepend("<tr><th>Set</th><th>Team</th><th>Points</th><th>Team</th></tr>");
        this.collection.on('add', this.addOne, this);
    },
     
    render: function() {
        // the render function adds one model for each model in the collection with the addOne function
        this.collection.each(this.addOne, this);
        return this;
    },
    // a function for adding one model, so when we want to add just one model, we only render the new model
    addOne: function (set){
        var setNr = this.collection.length;
        var setView = new FED2.Setview({
            model:set
            
        });
        //not perfect, but this adds a new set and checks how many sets there are in the collection
        if (!setView.model.get("set")) {
            setView.model.set("set", setNr);
        }
        
        this.$el.append(setView.render().el);
    }
});
// create a viewobject for the overall scores
FED2.Totalview = Backbone.View.extend({
    
    tagName: "table",
    
    template: _.template( $("#totalsTemplate").html() ),
    
    initialize: function(){
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);
        this.collection.on("change", this.render, this);
    },
    
    render: function(){
        
        var totalScore = {
            team1: 0,
            team2: 0
        };
        // check which team wins the set and give them a point
        this.collection.each(function(set){
            if(set.attributes.team1Score > set.attributes.team2Score){
                totalScore.team1 ++;
                
            } else if(set.attributes.team2Score > set.attributes.team1Score){
                totalScore.team2 ++;
            }

        },this)
        console.log(this.collection);
        var team1Name = this.collection.models[0].attributes.team1;
        var team2Name = this.collection.models[0].attributes.team2;
        

        this.$el.html(this.template({
            team1Name:team1Name, 
            team2Name:team2Name, 
            totalScore:totalScore
        }));
        return this;
    }
});

FED2.Addset = Backbone.View.extend({
    
    el: "#addset",
    
    events: {
        "submit" : "submit"
    },
    initialize: function() {
       
    },
    
    submit: function(e){
        e.preventDefault();
        var scoreTeam1 = $(e.currentTarget).find("#team1").val();
        var scoreTeam2 = $(e.currentTarget).find("#team2").val();
        var set = new Set({
            team1: this.collection.models[0].attributes.team1,
            team2: this.collection.models[0].attributes.team2,
            team1Score: scoreTeam1, 
            team2Score:scoreTeam2
        });
        this.collection.add(set);
    }
})
