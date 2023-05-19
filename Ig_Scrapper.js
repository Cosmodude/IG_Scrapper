const Insta = require('scraper-instagram');
const InstaClient = new Insta();
const SessionId = "59643156337%3ABy7vFfQ1z8oGKZ%3A5%3AAYfm29FXAL6jXESFwv4URTFmzOQivp2k0mzJzOzCGA";  // should be changed
username="anddudeabides"

InstaClient.authBySessionId(SessionId)
	.then(account => console.log(account))
	.catch(err => console.error(err));

InstaClient.getProfile(username)
	.then(profile => console.log(profile))
	.catch(err => console.error(err));