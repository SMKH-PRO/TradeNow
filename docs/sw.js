// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
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
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();












var filesToCache  = [
  '',
  'index.html',

'Ads.html',
'bike.html',
'car.html',
'laptop.html',
'mobile.html',
'other.html',
'login.html',
'publish.html',
'userads.html',
'WishList.html',
'js/WishList.js',
'bike.jpg',
'allads.jpg',
'car.jpg',
'mobiles.jpg',
'other.jpg',
'laptop.png',
'favii.png',
'loading.gif',
'logo.png',
'defaultuser.png',
'fakecar1.jpg',
'fakecar2.jpg',
'fakecar3.jpg',
'fakelaptop1.jpg',
'fakelaptop2.jpg',
'fakelaptop3.jpeg',
'fakemobile1.jpg',
'fakemobile2.jpg',
'fakemobile3.jpg',
'fakebike1.jpg',
'fakebike2.jpg',
'fakebike3.jpg',
'offlineError.png',
'offlinemode.jpg',
'share.png',
'small-logo.png',
'productpic.png',
'upload/checkmark.svg',
'upload/syncing.svg',
'upload/upload.css',
'upload/upload.js',
'upload/upload.svg',
'js/adfromlink.js',
'js/ads.js',
'js/AllAds.js',
'js/AllAdsOffline.js',
'js/bike.js',
'js/BikeOffline.js',
'js/car.js',
'js/CarOffline.js',
'js/laptop.js',
'js/LaptopOffline.js',
'js/mobile.js',
'js/MobileOffline.js',
'js/changeprofile.js',
'js/home.js',
'js/index.js',

'js/localforage.js',
'js/login-signup.js',
'js/offlineadsmodal.js',
'js/publish.js',
'js/search.js',
'js/updatead.js',
'js/UserAds.js',
'js/BigPicture.js',
  'js/bootstrap.js',
  'js/firebaseintialize.js',
  'js/jquery.js',
  'js/notifications.js',
  'js/Popper.js',
  'js/shownotifications.js',
  'js/time.js',
  'js/userinfo.js',
'fonts/AmaranthBold.ttf',
'fonts/Bungee-Regular.ttf',
'fonts/fontawesome-webfont.woff',
'fonts/fontawesome-webfont.woff2?v=4.4.0',
'font/fa/fontawesome-webfont.woff',
'font/fa/fontawesome-webfont.woff2',
'font/roboto/Roboto-Bold.woff',
'font/roboto/Roboto-Bold.woff2',
'font/roboto/Roboto-Light.woff',
'font/roboto/Roboto-Light.woff2',
'font/roboto/Roboto-Regular.woff',
'font/roboto/Roboto-Regular.woff2',

'css/index.css',
'css/search.css',
  
  'css/fa.css',
  'css/animate.css',
  'css/bootstrap.css',
  'css/mdbs.css',
  

  'CHAT',
  'CHAT/',
  'CHAT/favicon.png',
  'CHAT/index.html',
  'CHAT/ignoredusers.html',
  'CHAT/css/hamburger.css',
  'CHAT/css/loading.css',
  'CHAT/css/style.css',
  'CHAT/css/reset.css',
  'CHAT/js/blockedusers.js',
  'CHAT/js/hamburgers.js',
  'CHAT/js/push.js',
  'CHAT/js/idle.js',
  'CHAT/js/main.js',
  'CHAT/js/userdetails.js',
  
  
  'CHAT/admin.png',
  'CHAT/blocked.png',
  'CHAT/invitefriend.png',
  'CHAT/loadingicon.gif',
  'CHAT/loadingicon2.gif',
  
  'CHAT/only-login.js',
  'CHAT/defaultuser.png',
  'CHAT/play-button.png',
  'CHAT/send.png',
  'CHAT/stop.png',
  'CHAT/upload/checkmark.svg',
  'CHAT/upload/syncing.svg',
  'CHAT/upload/upload.svg',
  'CHAT/upload/upload.css',
  'CHAT/upload/upload.js',
  'CHAT/upload/uploadfiles.js',
  'CHAT/fonts/Amaranth.ttf',
  'CHAT/fonts/AmaranthBold.ttf',
  'CHAT/fonts/Amaranth-BoldItalic.ttf',
  'CHAT/fonts/Amaranth-Italic.ttf',
  'CHAT/fonts/Amaranth-Regular.ttf',
 'CHAT/fileicons/defaultfile.png',
 'CHAT/dropdown/dropdown.css',
 'CHAT/dropdown/dropdown.js',
 'CHAT/dropdown/ripples.css'
  
  
  
];


var staticCacheName = 'TradeNowPakistan';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});






self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});





self.addEventListener('fetch', function(event) {
  //console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
       // console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      //console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    }).then(function(response) {

  // TODO 5 - Respond with custom 404 page

  return caches.open(staticCacheName).then(function(cache) {
    if (event.request.url.indexOf('test') < 0) {
     // cache.put(event.request.url, response.clone());
      //Not Supported in Chrome..!
    }
    return response;
  })
})
    
  );
});
