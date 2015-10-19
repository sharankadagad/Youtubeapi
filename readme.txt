Design details:

1. Used express framework for nodejs. Embedded js was used as the view in our express framework.
The WWW js file create a local server which listens on port 3000. After creating the server it calls the app.js, which has bindings of URL and the respective js file to handle it.
2. In index.js we require express, googleapis, r-json, Google-auth-library, openurl. The installs should be stored in the node_modules. 
3. To access Google API's we have to follow OAuth2 authentication. The path of the credentials.json should be given in the file index.js. Credentials.json can be downloaded from Google API console.
4. Once the authentication mechanism is in place. In the search.list we search for only playlist for a given keyword. The search result gives us a few playlist details. From these playlist details we extract their playlist ID and the respective title. And render the list of playlist as a drop down list.
5. By default first option is selected. If we change the option we load a new playlist video. If the search box is empty and we click on the search then a error message is shown.
6. The basic features of the project are shown as a video. The link is as follows.
   https://www.youtube.com/watch?v=Z911vwaIp6Q

How to run:

1. The whole project is uploaded on to the git. Please get a copy of the project on your local system. Import the project to a IDE, I used WebStorm IDE.
2. Change the credentials.json file path in index.js to your locally stored credentials json file. The credentials.json should be downloaded from Google API console and should be enabled for youtube API. Also in your default browser you should have the respective gmail logged in.
3. Now just run the project www file. It will load a URL for confirming user authentication. Once authentication is successful the homepage i.e., http://localhost:3000 is loaded. 