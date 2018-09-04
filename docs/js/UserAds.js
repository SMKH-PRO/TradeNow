var TotalAdsByThisUser;
var functioncounter = 0;
var HowManyTimeFuncWillRun;
var dataAvailable = "No";
var DoesThisUserHasAds = "No";
var AmIOnline = "DontKnow";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
   
      isLoggedIn= "Yes";
  

      
      // ...
    } else {
      // User is signed out.
      // ...
      isLoggedIn= "No";
 

      
    }
  });


  var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
if(dataAvailable != "YES"){
    showUserADdata()}
    
    AmIOnline = "YES";
  } else {
    console.log("Offline")
    AmIOnline = "NO";

    setTimeout(() => {
        
    
  if(dataAvailable != "YES" && AmIOnline == "NO"){

    $("#FakeAd").fadeOut('slow',function(){
        document.getElementById("LoadingAds").className= "animated zoomOut"
    document.getElementById("mainbody").innerHTML = "<br><br><h2>You Need Internet Connection To View Ads On This Page..!</h2><br><br><br><br><br><br><br><br><br>"

    document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
    })


  }
}, 8000);
    
  }
});


function showUserADdata(){




TotalAdsByThisUser = 0;


firebase.database().ref(`TradeNow/Laptop`).orderByChild('PostedBy').equalTo(window.location.hash.replace(/\#/g,'')).once('value',function(userlaptop){
       TotalAdsByThisUser += userlaptop.numChildren(); 
}).then(function(){
    
        
firebase.database().ref(`TradeNow/Mobile`).orderByChild('PostedBy').equalTo(window.location.hash.replace(/\#/g,'')).once('value',function(usermobile){
    TotalAdsByThisUser += usermobile.numChildren(); 
    
    
    }).then(function(){
        
        firebase.database().ref(`TradeNow/Bike`).orderByChild('PostedBy').equalTo(window.location.hash.replace(/\#/g,'')).once('value',function(userbike){
    TotalAdsByThisUser += userbike.numChildren(); 
    
    
    }).then(function(){
        
        firebase.database().ref(`TradeNow/Car`).orderByChild('PostedBy').equalTo(window.location.hash.replace(/\#/g,'')).once('value',function(usercar){
    TotalAdsByThisUser += usercar.numChildren(); 
    
    
    }).then(function(){
       firebase.database().ref(`TradeNow/Other`).orderByChild('PostedBy').equalTo(window.location.hash.replace(/\#/g,'')).once('value',function(userother){
    TotalAdsByThisUser += userother.numChildren(); 
    
    console.log("Total Ads By ThiS User: " +TotalAdsByThisUser )
    
    
    
    
    
    
    
    if( TotalAdsByThisUser < 1  ){
    //console.log("User got no ads ")
    if(DoesThisUserHasAds != "Yes"){ //Check again if this user has ads.
        $("#FakeAd").fadeOut('slow',function(){
            document.getElementById("LoadingAds").className= "animated zoomOut"
        document.getElementById("mainbody").innerHTML = "<br><br><h2>This User Has Not Yet Posted Any Ad</h2><br><br><br><br><br><br><br><br><br>"
    
        document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
        })
        
        return false;
    }
}
    
    
    
    
    
    
    
    
    
    
    }) 
        
        
    })
        
    })
    })
})

















    
firebase.database().ref(`USERDETAILS`).once('value',function(userdata){
    dataAvailable = "YES"

if(window.location.hash){
if(userdata.hasChild(window.location.hash.replace(/\#/g,''))){

  
  
  var userdataname=   userdata.child(window.location.hash.replace(/\#/g,'')).child("Name").val();
  var userdatapic=   userdata.child(window.location.hash.replace(/\#/g,'')).child("ProfilePic").val();
  document.getElementById("AdsBy").innerHTML = "Ads By "+`<img src="${userdatapic}" onclick="BigPicture({ el: this, imgSrc: '${userdatapic}' })" class="useradsuserimg"> `+ userdataname;

firebase.database().ref(`TradeNow`).on('child_added',function(data2){
    
    //console.log(functioncounter+"/"+data2.numChildren())

    data2.forEach(data => {
    
  
        functioncounter  += 1;
        HowManyTimeFuncWillRun  = data2.numChildren();
      //  console.log(functioncounter+"/"+HowManyTimeFuncWillRun)
        //console.log(data.child("Description").val())
        //console.log("lastloop: "+data.numChildren())

//data3.forEach(data => {
    


    if(data.child("PostedBy").val() ==  window.location.hash.replace(/\#/g,'')){

        document.getElementById("LoadingAds").className= "animated zoomOut"
        DoesThisUserHasAds = "Yes"
    
    
    
    
    
 
             
                var WishListBtn = "";
    var CurrentUserIfLoggedIn;

    if(isLoggedIn =="Yes"){
        
        CurrentUserIfLoggedIn = firebase.auth().currentUser.uid;
    }
    else{
        CurrentUserIfLoggedIn = "UserIsNotLoggedInDontShowWishListBtn"
    }

  firebase.database().ref(`WishList/${CurrentUserIfLoggedIn}/`).once('value',function(wishlist){
      
      //console.log("TotalNumber Of WishList items:- "+wishlist.numChildren())
      
      
          if(CurrentUserIfLoggedIn !="UserIsNotLoggedInDontShowWishListBtn"){
              if(data.child("PostedBy").val() == firebase.auth().currentUser.uid){
                  
                  //PostedBy Current User
      WishListBtn = `&nbsp; <i style="filter: drop-shadow(0px 0px 0px black);text-shadow: 0px 0px 0.1px black;" WishList="${data.key}" onclick="shownotif('Ops!','You cannot add your own Ad into wishlist','warning','5')" class="fa wishlist fa-heart-o animated zoomIn"></i>`
                  
              }
              else{
              if(wishlist.hasChild(data.key)){
        WishListBtn = "";
        
  //  console.log("Ad Found In Wish List, Button for this add should be displayed!!")
    }
    else{
        //  console.log("Ad Not Found In Wish List, Button for this add should not be displayed!!")
        WishListBtn = `&nbsp; <i WishList="${data.key}" onclick="AddToWishList('${data.child("category").val()}','${data.key}')" class="fa wishlist fa-heart animated zoomIn"></i>`
        }
  }
          };

        $("#FakeAd").fadeOut('slow',function(){
    
     
        document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"




        if(data.child("Description").val().length >= 65){

    
            Description =  data.child("Description").val().replace(/&lt;br&gt;/g," ").slice(0,60)+'....';
         
            
         }else if(data.child("Description").val().length <= 65){
         
             Description = data.child("Description").val().replace(/&lt;br&gt;/g," ");
         };
         
         if(data.child("product").val().length >= 15){
         
         NameOfItem =  data.child("product").val().slice(0,15)+'....';
         
         //console.log("Name:- "+ data.child("product").val() +", length: "+NameOfItem.length+" condition:  " +(NameOfItem.length > 15))
         }else if(data.child("product").val().length <= 15){
         
             
         
             NameOfItem = data.child("product").val();
             
         }; var PriceOfThis  = data.child("Price").val() 

    if(PriceOfThis.length > 10){

        PriceOfThis = data.child("Price").val().slice(0,8)+"...";
    }

    else if(PriceOfThis < 10 ){

        PriceOfThis  = data.child("Price").val()
    };
    
         
             if(isLoggedIn == "Yes"){
                 showadfunc = `showthisad('${data.key}','${data.child("PostedBy").val()}', '${data.child("category").val()}'); `
             }
             else if(isLoggedIn != "Yes"){
         
         
                 var AdDes  = data.child("Description").val()
                 var AdName = data.child("product").val() 
                 var AdTime  = data.child("PostTime").val() +', '+data.child("PostDate").val(); 
                 var AdCat  = data.child("category").val() 
                 var AdOwner  = data.child("PostedBy").val() 
                 var AdPrice  = data.child("Price").val() 
                 var AdModel  = data.child("Model").val() 
                 var AdYEar  = data.child("Year").val() 
                 var AdPic  = data.child("img1").val() 
         
         
                 showadfunc = "showofflinead("+'`'+AdTime+'`,`'+AdName+'`,`'+AdDes+'`,`'+AdCat+'`,`'+AdOwner+'`,`'+AdPrice+'`,`'+AdModel+'`,`'+AdYEar+'`,`'+AdPic+'`,`'+data.key+'`'+") ";
             };
         
//console.log(data.numChildren());
             

             //console.log(data.val())
             document.getElementById("mainbody").innerHTML += `<!-- Card --> <div description="${data.child("Year").val()+" "+data.child("Model").val()+" "+data.child("product").val()+" "+ data.child("Description").val().replace(/<(.|\n)*?>/g, '')}" removed="${data.key}" class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${data.child("img1").val()}' })" > <img    class="card-img-top cardimg" src="${data.child("img1").val()}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
             margin-left: -2px !important;" onclick="${showadfunc}" class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${data.child("product").val()}" class="card-title"> ${NameOfItem} </h4> <hr>  <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${data.child("Description").val()}"> ${Description.replace(/<(.|\n)*?>/g, '')} </p><p class="cardviewPrice"  title="${'Rs. '+data.child("Price").val()}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${data.child("PostTime").val()+', '+data.child("PostDate").val()+WishListBtn} </li> </ul> </div> </div> <!-- Card -->`
         






        })
})


    

    }
    else{
        
        //console.log("This ad is not from "+window.location.hash.replace(/\#/g,'')+"\n and it is from "+data.child("PostedBy").val())
    }

//});


   




});//ForEach Ends



})
}else{
    if(isLoggedIn == "Yes"){
        location.replace("/userads.html#"+firebase.auth().currentUser.uid);
    
    setTimeout(function(){location.reload()},400)
    }
        $("#FakeAd").fadeOut('slow',function(){
            document.getElementById("LoadingAds").className= "animated zoomOut"
        document.getElementById("mainbody").innerHTML = "<br><br><h1 style='text-align:center'>No Ads Found! <br> <text style='font-size:12px' class='text-muted'>Wrong URL, Couldnt Find This User.</text></h1><br><br><br><br><br><br><br><br><br>"
    
        document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
        })
        console.log("No User Reference Given")


}

}

else{
if(isLoggedIn == "Yes"){
    location.replace("/userads.html#"+firebase.auth().currentUser.uid);

setTimeout(function(){location.reload()},400)
}
    $("#FakeAd").fadeOut('slow',function(){
        document.getElementById("LoadingAds").className= "animated zoomOut"
    document.getElementById("mainbody").innerHTML = "<br><br><h1>No Ads Found!</h1><br><br><br><br><br><br><br><br><br>"

    document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
    })
    console.log("No User Reference Given")
}
})
}