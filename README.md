# liri-node-app

# What does it do?
Liri is a Node.js command line interface for looking up concerts, music, and movies.

# How does it do it?
Liri-Bot utilizes Node.js, Axios, and the Node FileSystem(fs) to make API calls that retrieve the information you are looking for. It also utilizes moment.js for time/date information.

# Where is this information coming from?
The API's utilized in this program are: OMDB, Bands in Town, and Spotify. You can also add commands in a random.txt file.  

# How do I use it?
At your terminal screen type node and then one of the commands below 
// List of useable commands | Space | Followed by a
--------------------------- | ----- | -------------------------------------------------------
concert-this | <space> | <band> 
spotify-this-song | <space> | <song title>
movie-this | <space> | <movie name>
do-what-it-says | <space> | <leave blank(pulls commands from the random.txt file)>

# Check out the screenshots folder for examples of how Liri works and what the output will look like after running commands
