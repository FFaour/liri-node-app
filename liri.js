var env = require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");
var fs = require("fs");
// Here we incorporate the "axios" npm package
var axios = require("axios");
// Store the arguments entered into node
var nodeArgs = process.argv;
// Store the command used as a variable
var command = nodeArgs[2];
var query = nodeArgs.slice(3);
console.log("Command = " + command);
console.log("Query = " + query);
// Create an empty variable for holding the movie name
var movieName = "";

// List of useable commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
//const result = dotenv.config()
 
// if (result.error) {
//   throw result.error
// } 
// console.log(result.parsed)


var getMovie = function(query) {
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  if (query.length === 0) {
    query = ["Mr. Nobody"];
  };
  for (var i = 0; i < query.length; i++) {
  
    if (i > 0 && i < query.length) {
      movieName += "+" + query[i];
    }
    else {
      movieName += query[i];
    }
  };
  console.log(movieName);
  
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  axios.get(queryUrl).then(
    function(response) {
      
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
      console.log("Produced in: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  );
};

// Switch command to utilize the correct function ansd pass the command
switch
(command) {
  case
    "concert-this":
    // do a thing
  break;
    
  case
    "spotify-this-song":
    // do a thing
  break;
  
  case
    "movie-this":
    getMovie(query);
  break;
  
  case
    "do-what-it-says":
    // do a thing
  break;
}
