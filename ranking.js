
FED2.scores = [
{
    set: "1", 
    team1: "Boomsquad", 
    team1Score: "4", 
    team2: "Burning Snow", 
    team2Score: "1"
},

{
    set: "2", 
    team1: "Boomsquad", 
    team1Score: "3", 
    team2: "Burning Snow", 
    team2Score: "4"
},

{
    set: "3", 
    team1: "Boomsquad", 
    team1Score: "0", 
    team2: "Burning Snow", 
    team2Score: "4"
},

{
    set: "4", 
    team1: "Boomsquad", 
    team1Score: "2", 
    team2: "Burning Snow", 
    team2Score: "4"
},

{
    set: "5", 
    team1: "Boomsquad", 
    team1Score: "4", 
    team2: "Burning Snow", 
    team2Score: "3"
}
];


//makes a new collection of sets 
 FED2.setCollection = new FED2.Game(FED2.scores);
    
FED2.gameView = new FED2.Gameview({
    collection:FED2.setCollection
});
FED2.totalView = new FED2.Totalview({
    collection:FED2.setCollection
});
    
FED2.addSet = new FED2.Addset({
    collection:FED2.setCollection
});
FED2.leagueView = new FED2.LeagueView({
    collection:FED2.setLeague
});
    
$("article").append(FED2.totalView.render().el);
$("article").append(FED2.gameView.render().el);
$("article").append(FED2.leagueView.render().el);
    