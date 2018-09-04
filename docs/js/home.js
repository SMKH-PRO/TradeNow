var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {



firebase.database().ref(`TradeNow/Laptop`).on('value',function(data){


   console.log("LaptopAdsCount", data.numChildren());


document.getElementById("count-laptopads").innerHTML = data.numChildren()-1+ "+ Ads";
 
})

firebase.database().ref(`TradeNow/Mobile`).on('value',function(data){


    console.log("MobileAdsCount", data.numChildren());
 
 
 document.getElementById("count-mobileads").innerHTML = data.numChildren()-1+ "+ Ads";
  
 })

 firebase.database().ref(`TradeNow/Bike`).on('value',function(data){


    console.log("BikeAdsCount", data.numChildren());
 
 
 document.getElementById("count-bikeads").innerHTML = data.numChildren()-1+ "+ Ads";
  
 })



 firebase.database().ref(`TradeNow/Car`).on('value',function(data){


    console.log("CarAdsCount", data.numChildren());
 
 
 document.getElementById("count-carads").innerHTML = data.numChildren()-1+ "+ Ads";
  
 })
 firebase.database().ref(`TradeNow/Other`).on('value',function(data){


    console.log("OtherAdsCount", data.numChildren());
 
 
 document.getElementById("count-otherads").innerHTML = data.numChildren()-1+ "+ Ads";
  
 })


  } else {

if(localStorage.getItem("OfflineLaptop") !== null  &&  localStorage.getItem("OfflineLaptop") != "null" ){
    document.getElementById("count-laptopads").innerHTML = localStorage.getItem("OfflineLaptop") + " Offline Ads";
}

if(localStorage.getItem("OfflineMobile") !== null &&  localStorage.getItem("OfflineMobile") != "null" ){
    document.getElementById("count-mobileads").innerHTML = localStorage.getItem("OfflineMobile") + " Offline Ads";}


    
    if(localStorage.getItem("OfflineBike") !== null &&  localStorage.getItem("OfflineBike") != "null" ){

    document.getElementById("count-bikeads").innerHTML = localStorage.getItem("OfflineBike") + " Offline Ads";
  }
  if(localStorage.getItem("OfflineCar") !== null &&  localStorage.getItem("OfflineCar") != "null" ){
    document.getElementById("count-carads").innerHTML = localStorage.getItem("OfflineCar") + " Offline Ads";
}
if(localStorage.getItem("OfflineOther") !== null &&  localStorage.getItem("OfflineOther") != "null" ){
    document.getElementById("count-otherads").innerHTML = localStorage.getItem("OfflineOther") + " Offline Ads";
}
  }
});