
var searchmatched;
var Description;
var NameOfItem;
var closebtn = document.getElementById("CloseThisAd")
var showadfunc;



var array = [];
HasMobileAds = "No"

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
   
      isLoggedIn= "Yes";
  

      
      // ...
    } else {
      // User is signed out.
      // ...
      isLoggedIn= "No";
      $('#modalLRForm').modal('hide');

      
    }
  });
  



  var connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
        if(HasMobileAds != "Yes"){
            showADdata()
          }
    } else {
      
    }
  });



  function showADdata(){
    $('[title]').tooltip('hide');

HasMobileAds= "Yes"

firebase.database().ref(`TradeNow/Mobile`).on('child_added',function(data){
    $('[title]').tooltip('hide');
    document.getElementById("OfflineAds").innerHTML = '';
    HasAdLoaded = "Yes";
    document.getElementById("LoadingAds").className= "animated zoomOut"

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
        WishListBtn = `&nbsp; <i WishList="${data.key}" onclick="AddToWishList('${data.child("category").val()}','${data.key}')" class="fa animated zoomIn wishlist fa-heart"></i>`
        }
  }
          }

      
    $("#FakeAd").fadeOut('slow',function(){

 
    document.getElementById("mainbody").style="animation: unblur 1000ms ease-in-out; filter:blur(0px); pointer-events: auto;"

Description = data.child("Description").val().replace(/<br\s*\/?>/gi,'&nbsp;');

NameOfItem = data.child("product").val();

    


if(data.child("Description").val().length >= 65){

    
   Description =  data.child("Description").val().replace(/<br\s*\/?>/gi,'&nbsp;').slice(0,60)+'....';

   
}else if(data.child("Description").val().length <= 65){

    Description = data.child("Description").val().replace(/<br\s*\/?>/gi,'&nbsp;');
};

if(data.child("product").val().length >= 15){

NameOfItem =  data.child("product").val().slice(0,15)+'....';

//console.log("Name:- "+ data.child("product").val() +", length: "+NameOfItem.length+" condition:  " +(NameOfItem.length > 15))
}else if(data.child("product").val().length <= 15){

    

    NameOfItem = data.child("product").val();
    
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

    
    var PriceOfThis  = data.child("Price").val() 

    if(PriceOfThis.length > 10){

        PriceOfThis = data.child("Price").val().slice(0,8)+"...";
    }

    else if(PriceOfThis < 10 ){

        PriceOfThis  = data.child("Price").val()
    }
    





    //console.log(data.val())
    document.getElementById("mainbody").innerHTML += `<!-- Card --> <div description="${data.child("Year").val()+" "+data.child("Model").val()+" "+data.child("product").val()+" "+ data.child("Description").val().replace(/<(.|\n)*?>/g, '')}" removed="${data.key}" class="card mainbodycard animated fadeIn" > <div class="view overlay cardimg" onclick="BigPicture({ el: this, imgSrc: '${data.child("img1").val()}' })" > <img    class="card-img-top cardimg" src="${data.child("img1").val()}" alt="Card image cap"> <a> <div class="mask rgba-white-slight"></div> </a> </div> <a class="btn-floating btn-action ml-auto mr-4 mdb-color lighten-3"><i style="font-size: 35px;
    margin-left: -2px !important;" onclick="${showadfunc}" class="fa fa-eye pl-1"></i></a> <div class="card-body"> <h4 title="${data.child("product").val()}" class="card-title"> ${NameOfItem} </h4> <hr> <p class="card-text TheDescription" data-animation="true" data-toggle="tooltip" data-html="true" data-trigger="click" title="${data.child("Description").val()}"> ${Description.replace(/<(.|\n)*?>/g, '')} </p><p class="cardviewPrice"  title="${'Rs. '+data.child("Price").val()}"> Rs ${PriceOfThis} </p> </div> <!-- Card footer --> <div class="rounded-bottom mdb-color lighten-3 text-center pt-3"> <ul class="list-unstyled list-inline font-small"> <li class="list-inline-item pr-2 white-text"><i class="fa fa-clock-o pr-1"></i>  ${data.child("PostTime").val()+', '+data.child("PostDate").val()+WishListBtn } </li> </ul> </div> </div> <!-- Card -->`

})
  })
})


firebase.database().ref(`TradeNow/Mobile`).on('child_removed',function(data){
    console.log(data)
    
    
   // console.log("removed item:- " + data.key)
        //fade out and remove the child which was delted from database
    $(`.card[removed="${data.key}"]`).fadeOut('slow',function(){ $(`.card[removed="${data.key}"]`).remove(); })
    })

}






//SEARCH

function search(value,id){

    if(value.length < 1 || value == "" || value == " "){
shownotif("Warning! ","Please write Product Name,Year or Model and then click search","warning","5")
        return false;
    }


    searchmatched ="NO"
    document.getElementById("searchbody").innerHTML = '';
//var ptrn= document.getElementById("searchbox").value;
var ptrn = value; 
$( "#"+id+" div" ).each(function( dataa ) {
  


  var des=   this.getAttribute("description");

  var desre = new RegExp(value.toLowerCase(), 'g');

//console.log(des +" ID:"+ this.id);


if( des !== null && des.toLowerCase().search(desre) != -1){

    searchmatched = "YES";

   // console.log(this.outerHTML)

document.getElementById("NoDataFound").innerHTML = "";
    document.getElementById("searchbody").innerHTML += this.outerHTML

   //pushing data offline.. array.push(this.outerHTML)

    // Test TO Save data offline, tomor work localStorage.setItem('offlinedata',JSON.stringify(array))

//console.log("Matched Product Id: "+this.getAttribute("removed")+" Desc: "+desre )

}
else{

    if(searchmatched == "NO"){
        document.getElementById("NoDataFound").innerHTML = "No Data Found"
    }
}





});
}//search function ends here
document.getElementById("search-field").addEventListener('keydown',function(e){

    if(e.keyCode === 13){

        

        search(document.getElementById("search-field").value.replace(/\s\s+/g, ' '),'mainbody')//replacing multiple lines or spaces..!
    }
})
document.getElementById("searchitemsbtn").addEventListener('click',function(){
    search(document.getElementById("search-field").value.replace(/\s\s+/g, 'mainbody'))

})








