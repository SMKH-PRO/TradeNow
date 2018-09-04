      
      firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

                  
                  WishListAds.length().then(function(numberOfKeys) {
    
    
      if(numberOfKeys <= 0){
                  //  alert("No Ads saved in wish list.!")
                    $("#FakeAd").fadeOut('slow',function(){
                   // console.log("All Images Loaded")

                   document.getElementById("LoadingAds").className= "animated zoomOut"
                   $("#FakeAd").fadeOut()
                    document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
                    document.getElementById("mainbody").innerHTML = "<br><br><center><h3>Your Wish List Is Empty</h3></center><br><br><br><br><br><br><br><br>"
                   // console.log(iterationOfFunctionCar+"/"+numberOfKeys);
    
                });//FakeAd FadeOut
                 }})
  } else {
    // User is signed out.
    // ...
    
    location.replace("login.html#WishList");
  }
});


var canUserDeleteWishList = "NO"
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
      
      
      
      
  if (isLoggedIn == "Yes") {

canUserDeleteWishList = "YES"
  } else {
    // User is signed out.
    // ...
    
    canUserDeleteWishList ="NO"
  }


    
  } else {
    
    canUserDeleteWishList = "NO"
  }
});




function DeleteWishList(AdId){
    
    
    if(canUserDeleteWishList == "YES"){
        
        var DoYouWantToDelete = confirm("Are You Sure? \n You Want To Delete This Item From Your Wish List??");
        
        if(DoYouWantToDelete=== true){
            
            
            firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${AdId}`).remove().then(function(){
                
                
                location.reload()
            })
            
            
        }else{return false;}
        
    }
    else{
        shownotif('Error!: ','You Need Internet Connection To Remove An Item From WishList.','warning','5');
    }
} 







var MainBody =  document.getElementById("mainbody");

    var SavedAds = localforage.createInstance({ name: "AdsData" , storeName: "Ads" });


          WishListAds.iterate(function(value, key, iterationNumber) {
              
              
              SavedAds.getItem(key).then(function(AdData) {
                  
                  
                  
                  
                  
                  
                  
                  WishListAds.length().then(function(numberOfKeys) {
    
    
  if(iterationNumber >= numberOfKeys){
                    
                    $("#FakeAd").fadeOut('slow',function(){
                   // console.log("All Images Loaded")

                   document.getElementById("LoadingAds").className= "animated zoomOut"
                   $("#FakeAd").fadeOut()
                    document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
                   // console.log(iterationOfFunctionCar+"/"+numberOfKeys);
    
                });//FakeAd FadeOut
                 }
        else{//console.log(iterationOfFunctionCar+"/"+numberOfKeys);
    }
        //}
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                     
    
    var OfflineDes;
    var OfflineName;
    
    //Settings 
    
    
    if(AdData.Description.length >= 65){
    
        
        OfflineDes =  AdData.Description.slice(0,65)+'........';
    
       
    }else if(AdData.Description.length <= 65){
    
        OfflineDes = AdData.Description;
    };
    
    if(AdData.product.length >= 15){
    
        OfflineName =  AdData.product.slice(0,15)+'....';
    
    
    }else if(AdData.product.length <= 15){
    
        
    
        OfflineName = AdData.product;
        
    };
    
    var PriceOfThis  = AdData.Price
    
    if(PriceOfThis.length > 10){
    
        PriceOfThis = AdData.Price.slice(0,8)+"...";
    }
    
    else if(PriceOfThis < 10 ){
    
        PriceOfThis  = AdData.Price
    };
    
    var img1ofproduct;
    //Settings Ends above
    localforage.getItem(AdData.category+'_img1_'+key).then(function(value) {
        // This code runs once the value has been loaded
        // from the offline store.    
        
        
        var offlineshowadfunc ;
    
    if(value !== null){
    
        offlineshowadfunc = "showofflinead("+'`'+AdData.PostTime+", "+AdData.PostDate+'`,`'+AdData.product+'`,`'+AdData.Description+'`,`'+AdData.category+'`,`'+AdData.PostedBy+'`,`'+AdData.Price+'`,`'+AdData.Model+'`,`'+AdData.Year+'`,`'+value+'`,`'+key+'`'+")";
    
    
        MainBody.innerHTML += `<!-- Card --> <div wishlist="${key}" description="${AdData.Year+" "+AdData.Model+" "+AdData.product+" "+ AdData.Description.replace(/<(.|\n)*?>/g, '')}"  class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${value}' })" > <img    class="card-img-top cardimg" src="${value}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
        margin-left: -2px !important;" onclick="${offlineshowadfunc}" class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${AdData.product}" class="card-title"> ${OfflineName} </h4> <hr> <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${AdData.Description}"> ${OfflineDes.replace(/<(.|\n)*?>/g, '')} </p> <p class="cardviewPrice"  title="${'Rs. '+AdData.Price}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${AdData.PostTime+', '+AdData.PostDate} &nbsp;<i  onclick="DeleteWishList('${key}')"  style="font-size:18px;filter: drop-shadow(0px 0px 0px black);text-shadow: 0px 0px 1px black;" class="fa animated zoomIn wishlist fa-trash"></i> </li> </ul> </div> </div> <!-- Card -->`}
    
    else{
    console.log("iimg not found")
    
    offlineshowadfunc = "showofflinead("+'`'+AdData.PostTime+", "+AdData.PostDate+'`,`'+AdData.product+'`,`'+AdData.Description+'`,`'+AdData.category+'`,`'+AdData.PostedBy+'`,`'+AdData.Price+'`,`'+AdData.Model+'`,`'+AdData.Year+'`,`'+"offlineError.png"+'`,`'+key+'`'+")";
    
    
    MainBody.innerHTML += `<!-- Card --> <div wishlist="${key}" description="${AdData.Year+" "+AdData.Model+" "+AdData.product+" "+ AdData.Description.replace(/<(.|\n)*?>/g, '')}"  class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${'offlineError.png'}' })" > <img    class="card-img-top cardimg" src="${'offlineError.png'}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
    margin-left: -2px !important;"   onclick="${offlineshowadfunc}"  class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${AdData.product}" class="card-title"> ${OfflineName} </h4> <hr> <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${AdData.Description}"> ${OfflineDes.replace(/<(.|\n)*?>/g, '')} </p><p class="cardviewPrice"  title="${'Rs. '+AdData.Price}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${AdData.PostTime+', '+AdData.PostDate} &nbsp;<i  style="filter: drop-shadow(0px 0px 0px black);text-shadow: 0px 0px 1px black; font-size:18px;" onclick="DeleteWishList('${key}')" class="fa animated zoomIn wishlist fa-trash"></i></li> </ul> </div> </div> <!-- Card -->`
    
    }
    
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
        
    });
    
    
            
                  
                  
                  
                  
                  
                  
    
    
    console.log(AdData)

}).catch(function(err) {
  console.log(err)
});
              
          })