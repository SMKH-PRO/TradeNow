


var  imgcounter =0;
var offimg = localStorage.getItem("img1_"+imgcounter)
var OfflineDiv = document.getElementById("OfflineAds");
var savedalladss = localStorage.getItem("OfflineAllAds");
var offlinealladss = JSON.parse(savedalladss);
var HowManyTimeHasThisFunctionRunned = 0;
var isUserOnline = "NO"
var SavedAds = localforage.createInstance({ name: "AdsData" , storeName: "Ads" });
//console.log(offlinealladss)
var AllAdsData = []

var connectedRef = firebase.database().ref(".info/connected");





//Offline Images
function toDataURL(src, callback, outputFormat) {

    
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL("data:image/png;base64,");
      callback(dataURL);

      
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;

      console.log(src)
    }
  }
  
  

  //Offline Images





connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    
    
//Deleting Ads As they are deleted from database

firebase.database().ref(`TradeNow/Mobile`).on('child_removed',function(data){


    key = "Mobile_img1_"+data.key;
console.log("Removed: ",data.key)
    
  localforage.removeItem(key).then(function() {
                // Run this code once the key has been removed.
            
                console.log("Deleted Mobile Img: "+data.key)
         }).catch(function(err) {
                // This code runs if there were any errors
               console.log(err);
           });

 SavedAds.removeItem(data.key).then(function() {
            // Run this code once the key has been removed.
        
            console.log("Deleted Offline Ad: "+data.key)

     }).catch(function(err) {
            // This code runs if there were any errors
           console.log(err);
       });

    })


    firebase.database().ref(`TradeNow/Laptop`).on('child_removed',function(data){


        key = "Laptop_img1_"+data.key;
    console.log("Removed: ",data.key)
        
      localforage.removeItem(key).then(function() {
                    // Run this code once the key has been removed.
                
                    console.log("Deleted Laptop IMg: "+data.key)
             }).catch(function(err) {
                    // This code runs if there were any errors
                   console.log(err);
               });
    
     SavedAds.removeItem(data.key).then(function() {
                // Run this code once the key has been removed.
            
                console.log("Deleted Offline Ad: "+data.key)
    
         }).catch(function(err) {
                // This code runs if there were any errors
               console.log(err);
           });
    
        })

        
    firebase.database().ref(`TradeNow/Bike`).on('child_removed',function(data){


        key = "Bike_img1_"+data.key;
    console.log("Removed: ",data.key)
        
      localforage.removeItem(key).then(function() {
                    // Run this code once the key has been removed.
                    console.log("Deleted Bike IMG : "+data.key)
                    
             }).catch(function(err) {
                    // This code runs if there were any errors
                   console.log(err);
               });
    
     SavedAds.removeItem(data.key).then(function() {
                // Run this code once the key has been removed.
            
                console.log("Deleted Offline Ad: "+data.key)
    
         }).catch(function(err) {
                // This code runs if there were any errors
               console.log(err);
           });
    
        })




        firebase.database().ref(`TradeNow/Car`).on('child_removed',function(data){


            key = "Car_img1_"+data.key;
        console.log("Removed: ",data.key)
            
          localforage.removeItem(key).then(function() {
                        // Run this code once the key has been removed.
                        console.log("Deleted Car IMG : "+data.key)
                        
                 }).catch(function(err) {
                        // This code runs if there were any errors
                       console.log(err);
                   });
        
         SavedAds.removeItem(data.key).then(function() {
                    // Run this code once the key has been removed.
                
                    console.log("Deleted Offline Ad: "+data.key)
        
             }).catch(function(err) {
                    // This code runs if there were any errors
                   console.log(err);
               });
        
            })



            firebase.database().ref(`TradeNow/Other`).on('child_removed',function(data){


                key = "Other_img1_"+data.key;
            console.log("Removed: ",data.key)
                
              localforage.removeItem(key).then(function() {
                            // Run this code once the key has been removed.
                            console.log("Deleted Other IMG : "+data.key)
                            
                     }).catch(function(err) {
                            // This code runs if there were any errors
                           console.log(err);
                       });
            
             SavedAds.removeItem(data.key).then(function() {
                        // Run this code once the key has been removed.
                    
                        console.log("Deleted Offline Ad: "+data.key)
            
                 }).catch(function(err) {
                        // This code runs if there were any errors
                       console.log(err);
                   });
            
                })

    //Deleting Ads Ends Above^^



///Removing Old Data That Is No More Availabble on Online Database, also saving number of ads available to show it on homepage




firebase.database().ref(`TradeNow/Other`).on('value',function(data){
           
    SavedAds.iterate(function(AdData, key, iterationNumber) {
if(AdData.category == "Other"){

if(data.hasChild(key) === false){
//The Ad is No more available on online database so deleting from local database too..!
console.log("Dont Have This Child In Other ",key)

localforage.removeItem(AdData.category+"_img1_"+key).then(function() {console.log("Deleted Img:",key)})
SavedAds.removeItem(key).then(function() {
// Run this code once the key has been removed.
console.log("Deleted ",key," Because it wasnt available online!")
}).catch(function(err) {
// This code runs if there were any errors
console.log(err);
});
} } })
   
    var keyof = data.key;
    isUserOnline = "YES"
    localStorage.setItem('OfflineOther',data.numChildren()) //Settings Offline Ads..!
})

firebase.database().ref(`TradeNow/Mobile`).on('value',function(data){
    SavedAds.iterate(function(AdData, key, iterationNumber) {
        if(AdData.category == "Mobile"){
        
        if(data.hasChild(key) === false){
            console.log("Dont Have This Child In Mobile ",key)
            localforage.removeItem(AdData.category+"_img1_"+key).then(function() {console.log("Deleted Img:",key)})
            SavedAds.removeItem(key).then(function() {
                // Run this code once the key has been removed.
                console.log("Deleted ",key," Because it wasnt available online!")
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        } } })


    var keyof = data.key;
    isUserOnline = "YES"
    localStorage.setItem('OfflineMobile',data.numChildren()) //Settings Offline Ads..!
})
firebase.database().ref(`TradeNow/Car`).on('value',function(data){
    SavedAds.iterate(function(AdData, key, iterationNumber) {
        if(AdData.category == "Car"){
        
        if(data.hasChild(key) === false){
            //The Ad is No more available on online database so deleting from local database too..!
            console.log("Dont Have This Child In Car ",key)
        
            localforage.removeItem(AdData.category+"_img1_"+key).then(function() {console.log("Deleted Img:",key)})
            SavedAds.removeItem(key).then(function() {
                // Run this code once the key has been removed.
                console.log("Deleted ",key," Because it wasnt available online!")
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        } } })
    var keyof = data.key;
    isUserOnline = "YES"
    localStorage.setItem('OfflineCar',data.numChildren()) //Settings Offline Ads..!
})
firebase.database().ref(`TradeNow/Laptop`).on('value',function(data){
    SavedAds.iterate(function(AdData, key, iterationNumber) {
        if(AdData.category == "Laptop"){
        
        if(data.hasChild(key) === false){
            //The Ad is No more available on online database so deleting from local database too..!
            console.log("Dont Have This Child In Laptop ",key)
        
            localforage.removeItem(AdData.category+"_img1_"+key).then(function() {console.log("Deleted Img:",key)})
            SavedAds.removeItem(key).then(function() {
                // Run this code once the key has been removed.
                console.log("Deleted ",key," Because it wasnt available online!")
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        } } })
    var keyof = data.key;
    isUserOnline = "YES"
    localStorage.setItem('OfflineLaptop',data.numChildren()) //Settings Offline Ads..!
})
firebase.database().ref(`TradeNow/Bike`).on('value',function(data){
    SavedAds.iterate(function(AdData, key, iterationNumber) {
        if(AdData.category == "Bike"){
        
        if(data.hasChild(key) === false){
            //The Ad is No more available on online database so deleting from local database too..!
            console.log("Dont Have This Child In Bike ",key)
        
            localforage.removeItem(AdData.category+"_img1_"+key).then(function() {console.log("Deleted Img:",key)})
            SavedAds.removeItem(key).then(function() {
                // Run this code once the key has been removed.
                console.log("Deleted ",key," Because it wasnt available online!")
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        } } })
    var keyof = data.key;
    isUserOnline = "YES"
    localStorage.setItem('OfflineBike',data.numChildren()) //Settings Offline Ads..!
})
















firebase.database().ref("TradeNow").on('value',function(data3){
    //console.log(data3.child("img1").val())
    
data3.forEach(data => {

    data.forEach(data2 => {
   // console.log("data: ", data2.key)

    
    var keyof = data2.key;
    isUserOnline = "YES"

   

    

    

    
    //Saving to indexed db
    SavedAds.setItem( data2.key ,data2.val()  );



    


    //Images starts below:

//First Delete the old saved images then after 1sec cache new images..!
    setTimeout(function(){
        localforage.getItem(data2.child("category").val()+'_img1_'+data2.key).then(function(value) {

        if(value === null){
        toDataURL(
            data2.child("img1").val(),
            function(dataUrl) {

                
 
                
               localforage.setItem(data2.child("category").val()+'_img1_'+data2.key, dataUrl).then(function
                (){
                imgcounter += 1;
console.log("Made "+imgcounter+" Picture Offline")
               }).catch(console.log)
            
             // localStorage.setItem('img1_'+imgcounter,dataUrl)

              
            }
          )

        }

        else{
        //    console.log("Img Found Already")
        }

        })
},500)



});

})

});



  } else {
    
    isUserOnline = "NO"

    //OFFLINE


    
    setTimeout(function(){

        if(HasAdLoaded == "NO"){
shownotif('Please Wait! ','It Looks Like You Are Offline, We Are Loading Offline Ads, Please Allow Few Minutes...','info','3')





//Settting Search For Offline Ads


document.getElementById("search-field").addEventListener('keydown',function(e){
    
    if(e.keyCode === 13){

        

        search(document.getElementById("search-field").value.replace(/\s\s+/g, ' '),'OfflineAds')//replacing multiple lines or spaces..!
    }
    else{

        document.getElementById("searchbody").innerHTML = '';
        document.getElementById("NoDataFound").innerHTML = "Result Will Include Offline Ads."
    }
})
document.getElementById("searchitemsbtn").addEventListener('click',function(){

    
    
    search(document.getElementById("search-field").value.replace(/\s\s+/g, 'OfflineAds'))
    

})


//Setting Search Ends



            

    

            OfflineDiv.innerHTML += '<center><h1 title="These ads are offline and saved in your browser cache, these ads may not be up to date.! "> Offline Ads: </h1></center>'

           OfflineDiv.style="opacity:0; position; absolute;"
            
//FOr Accessing 

SavedAds.iterate(function(AdData, key, iterationNumber) {
    // console.log(key+" , "+iterationNumber)
      //  console.log("Key: "+key+" Des: "+AdData.Description );

//console.log(AdData)









HowManyTimeHasThisFunctionRunned =iterationNumber;



SavedAds.length().then(function(numberOfKeys) {

   //UNBLUR THE MAIN DIV ONCE THE LOOP HAS FINISHED and all ads are added to dom...!
   // if(key.startsWith("Mobile")){
    //console.log(numberOfKeys)
//    console.log(HowManyTimeHasThisFunctionRunned+"/"+numberOfKeys)
//console.log("TotalNumber Of AllAds Saved Images"+numberOfKeys)
            if(HowManyTimeHasThisFunctionRunned >= numberOfKeys){
                setTimeout(function(){OfflineDiv.style=""; $('#OfflineAds').fadeIn()},200)
                $("#FakeAd").fadeOut('slow',function(){
               // console.log("All Images Loaded")

               
               document.getElementById("LoadingAds").className= "animated zoomOut"
                document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"
               // console.log(HowManyTimeHasThisFunctionRunned+"/"+numberOfKeys);

            });//FakeAd FadeOut
             }
    else{//console.log(HowManyTimeHasThisFunctionRunned+"/"+numberOfKeys);
}
    //}
}).then(function() {
    
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


    OfflineDiv.innerHTML += `<!-- Card --> <div description="${AdData.Year+" "+AdData.Model+" "+AdData.product+" "+ AdData.Description.replace(/<(.|\n)*?>/g, '')}"  class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${value}' })" > <img    class="card-img-top cardimg" src="${value}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
    margin-left: -2px !important;" onclick="${offlineshowadfunc}" class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${AdData.product}" class="card-title"> ${OfflineName} </h4> <hr> <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${AdData.Description}"> ${OfflineDes.replace(/<(.|\n)*?>/g, '')} </p> <p class="cardviewPrice"  title="${'Rs. '+AdData.Price}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${AdData.PostTime+', '
    +AdData.PostDate} </li> </ul> </div> </div> <!-- Card -->`}

else{
console.log("iimg not found")

offlineshowadfunc = "showofflinead("+'`'+AdData.PostTime+", "+AdData.PostDate+'`,`'+AdData.product+'`,`'+AdData.Description+'`,`'+AdData.category+'`,`'+AdData.PostedBy+'`,`'+AdData.Price+'`,`'+AdData.Model+'`,`'+AdData.Year+'`,`'+"offlineError.png"+'`,`'+key+'`'+")";


OfflineDiv.innerHTML += `<!-- Card --> <div description="${AdData.Year+" "+AdData.Model+" "+AdData.product+" "+ AdData.Description.replace(/<(.|\n)*?>/g, '')}"  class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${'offlineError.png'}' })" > <img    class="card-img-top cardimg" src="${'offlineError.png'}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
margin-left: -2px !important;"   onclick="${offlineshowadfunc}"  class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${AdData.product}" class="card-title"> ${OfflineName} </h4> <hr> <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${AdData.Description}"> ${OfflineDes.replace(/<(.|\n)*?>/g, '')} </p><p class="cardviewPrice"  title="${'Rs. '+AdData.Price}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${AdData.PostTime+', '+AdData.PostDate} </li> </ul> </div> </div> <!-- Card -->`

}

}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
    
});


        

    
    });//EachFunction Ends


        }

    },9000) //Load offline ad after 9 Seconds
    
 



  }
});



