// define league, a collection of tournaments
//a collections of rankings
FED2.RankingCollection = Backbone.Collection.extend({ //FED.League
    model: FED2.RankingModel, //lees het model van 1 item uit
	
	initizialize:function() {
		

	},
	
	comparator : function(league) {
		return -league.get("saldo");
	}

	
});