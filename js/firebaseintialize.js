console.log('%c'+"STOP..! , THIS CONSOLE IS ONLY FOR ADMIN USE, YOU MAY GET BLOCKED FROM OUR CHATROOM IF YOU USE THIS CONSOLE.", 'font-weight: bold; font-size: 14px;color: red; text-shadow: 0px 0px 5px black; border: 2px Solid black; padding:6px; border-radius:10px; display:block;');
var foradmin='You are an admin & thats why you cannot ignore a user because your duty is to block users who violate, and if you ignore someone so you will not be able to see his messages.';        
        
// Initialize Firebase
  // Initialize Firebase
// Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCejWmwJ2nr1MHjPk7Q7Vu9SNLdRknD6tA",
    authDomain: "tradenowpakistan.firebaseapp.com",
    databaseURL: "https://tradenowpakistan.firebaseio.com",
    projectId: "tradenowpakistan",
    storageBucket: "tradenowpakistan.appspot.com",
    messagingSenderId: "350561974381"
  };
  firebase.initializeApp(config);

//alert("Hello")



var IsThisUserOnlineNow;

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
  IsThisUserOnlineNow ="YES"
  } else {

  IsThisUserOnlineNow = "NO"
  
  }
});