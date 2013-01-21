// define tournament model
FED2.RankingModel = Backbone.Model.extend({ //FED2.Tournament
    defaults: {
        "team": "unknown",
        "Win":"0",
        "Lost":"0",
        "Sw":"0",
        "Sl":"0",
        "Pw":"0",
        "Pl":"0"
      },
      		// Initialize model *(backbone method)*
		initialize: function () {
                    // Calculate
            var won = this.get("Pw");
            var lost = this.get("Pl");
            
            var saldo = won - lost;
            this.set("saldo", saldo);


            var setwon = this.get("Sw");
            var setlost = this.get("Sl");
            
            var setsaldo = setwon - setlost;
            this.set("setsaldo", setsaldo);


		}

		  
});


