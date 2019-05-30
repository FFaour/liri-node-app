var env = require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");

// Store the arguments entered into node
var nodeArgs = process.argv;
// Store the command used as a variable
var command = nodeArgs[2];
var query = nodeArgs.slice(3);
var spotify = new spotify(keys.spotify);
// Create an empty variable for holding the movie name
var movieName = "";
var artist = "";

// List of useable commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

 

var getConcert = function(query) {
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "%20" (spaces)
  for (var i = 0; i < query.length; i++) {
    if (i > 0 && i < query.length) {
      artist += "%20" + query[i];
    }
    else {
      artist += query[i];
    }
  }
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function(response) {    
      if (response.data.length == 0) {
        console.log("There are no upcoming concerts for " + query.join(" ") + "!");
      }
      for (index = 0; index < response.data.length; index++) {
      console.log("Concert Venue: " + response.data[index].venue.name);
      console.log("Venue Location: " + response.data[index].venue.city + ", " + response.data[index].venue.region);
      console.log("Concert Venue: " + moment(response.data[index].datetime).format("MMMM Do YYYY"));
      console.log("====================================================");
      } 
    }
  )
};  

var getSong = function(query) {
  // Use The Sign as the song if nothing is entered
  if (query.length === 0) {
    query = "All that she wants";
  };
  spotify.search({ type: 'track', query: query }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  // console.log(data.tracks.items[0]);
  console.log(data.tracks.items.length + " entries were found for this song title:");

  for (i = 0; i < data.tracks.items.length; i++) {
    console.log("Artists: " + data.tracks.items[i].artists[0].name);
    console.log("Song name: " + data.tracks.items[i].name);
    if (data.tracks.items[i].artists[0].preview_url === null) {
      console.log("No preview URL is given for this entry!");
    } else {
      console.log("Preview link: " + data.tracks.items[i].preview_url);
    }
    console.log("Album name: " + data.tracks.items[i].album.name);
    console.log("==============================================================");
  }

  // Loop through all the words in the query portion of the argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 0; i < query.length; i++) {
  
    if (i > 0 && i < query.length) {
      movieName += "+" + query[i];
    }
    else {
      movieName += query[i];
    }
  };
});
};

var getMovie = function(query) {
  // USe Mr. Nobody as the film if nothing is entered
  if (query.length === 0) {
    query = ["Mr. Nobody"];
  };
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 0; i < query.length; i++) {
  
    if (i > 0 && i < query.length) {
      movieName += "+" + query[i];
    }
    else {
      movieName += query[i];
    }
  };
  
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
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

// Switch command to utilize the correct function and pass the command
switch
(command) {
  case
    "concert-this":
    getConcert(query);
  break;
    
  case
    "spotify-this-song":
    getSong(query);
  break;
  
  case
    "movie-this":
    getMovie(query);
  break;
  
  case
    "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
    
      // We will then print the contents of data
      console.log(data);
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
    
      // We will then re-display the content as an array for later use.
      console.log(dataArr);
      getSong(dataArr[1]);
    });
  break;
}
