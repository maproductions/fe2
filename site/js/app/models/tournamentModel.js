// define tournament model
FED2.Tournament = Backbone.Model.extend({
    defaults: {
        "date": "unknown",
		"teamOne": "unknown",
		"result": "unknown",
		"teamTwo": "unknown"
    }
});