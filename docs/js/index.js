    var WishListAds = localforage.createInstance({ name: "WishListAds" , storeName: "WishList" });


        setInterval(function(){
          setTimeout(function(){
            
           

            $('[title]').tooltip();
        
        },100)},500)
          

var userid;
var searchboxOpen = "NO";
var HasAdLoaded = "NO";
var isLoggedIn= "No";

  window.onscroll = function() {fixnavbar()};
  var spacer = document.getElementById("spacer");
var header = document.getElementById("mynavbar");
var sticky = header.offsetTop;

function fixnavbar() {

  if(searchboxOpen == "NO"){
  if (window.pageYOffset > sticky) {
    header.classList.add("fixed-top");
    spacer.style="display:block;"
  } else {
    header.classList.remove("fixed-top");
    spacer.style="display:none;"
  }}
}


function getmoredetails(){
  var  LastName = document.getElementById("UserLastName")
   var FirstName = document.getElementById("UserFirstName")
   var fullname= FirstName.value +" "+LastName.value;


   if(FirstName.value.length <2){
shownotif("Warning!","Please Write Your First Name.","danger","2")
return false;
   }
   
  else if(FirstName.value.length >10){
       shownotif("Warning!","User First Name Must Not Exceed 10 Characters..!","danger","2")
       return false;
           }
else if(LastName.value.length <2){
shownotif("Warning!","Please Write Your Last Name.","danger","2")
return false;
   }
   
  else if(LastName.value.length >10){
       shownotif("Warning!","User Last Name Must Not Exceed 10 Characters..!","danger","2")
       return false;
           }
           
           

   else{
       firebase.database().ref(`USERDETAILS/${userid}`).on('value',(data)=>{

        var moredetails = {Name:fullname,FirstName:FirstName.value,LastName: LastName.value,ProfilePic:firebase.auth().currentUser.photoURL,RegisteredWithArea: usercity+", "+usercountry ,LastLoginArea: usercity+", "+usercountry,RegisteredWithIP: userip,LastIP:userip,RegisteredWithISP: isp,LastISP: isp, Email:firebase.auth().currentUser.email}


       firebase.database().ref(`/USERDETAILS/${firebase.auth().currentUser.uid}`).set(moredetails).then(()=>{
           $("#modalmoreinfo").modal("hide");



          // setTimeout(function(){location.reload()},500)
                  })//then ends here

       })


       firebase.auth().currentUser.updateProfile({
           displayName:  FirstName.value,
           photoURL: "/defaultuser.png"
         }).then(function() {
           // console.log(user.displayName)
     
     
       console.log("Name Updated..!")
         }).catch(function(error) {
           // An error happened.
           shownotif("Error",error,"danger","1")
         });
             

   }


}


           
           
           
           function setIP(){
            firebase.database().ref(`/USERDETAILS/${userid}`).once('value',(data)=>{
            
            if(data.hasChild("LastIP") != true || data.child(useripstring).val() != useripstring){
        
              firebase.database().ref(`/USERDETAILS/${userid}`).update({LastIP:userip,LastISP:isp,LastLoginArea:usercity+", "+usercountry})

        
        } 
        
            })
        
        }
           
           function checkforuserdetails(){
            setIP()
            
        
        
        
            firebase.database().ref(`/USERDETAILS/${firebase.auth().currentUser.uid}`).on('value',(data)=>{
        
                if(data.hasChild("FirstName") == false || data.hasChild("Name") == false || data.child("Name").val() === null ||data.child("Name").val() == "null"){
                    $("#modalmoreinfo").modal({backdrop: 'static', keyboard: false})  
        
                }

        else{
        
            $("#modalmoreinfo").modal('hide')  
        
        }
                
        
        
            
            })
        }
        
         
        function getmoredetailskeydown() {
          if (event.keyCode == 13) { 
              getmoredetails()
                    }
                 }
        document.getElementById("UserFirstName").addEventListener("keydown",getmoredetailskeydown)
        document.getElementById("UserLastName").addEventListener("keydown",getmoredetailskeydown)
        document.getElementById("senddetails-btn").addEventListener("click",getmoredetails)
       
                   

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              
              
              var connected= firebase.database().ref(".info/connected");
connected.on("value", function(snap) {
  if (snap.val() === true) {
      
      /*Deleting Ads from online wish list if they are removed from Ads online Database*/
      
      
      firebase.database().ref(`TradeNow/Laptop`).on('value',function(ReloadFunctionIfUpdateFound){
      firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}`).once('value',function(dataa){
    
          dataa.forEach(data => {           




/* DELETE LAPTOP ADS FROM WISH LIST IF IT WAS REMOVED FROM REAL DATABASE */
if(data.val()  == "Laptop"){
  firebase.database().ref(`TradeNow/Laptop`).once('value',function(laptops){
if(laptops.hasChild(data.key)  === false){
  firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${data.key}`).remove().then(function(){console.log("Laptop ad was removed from database")})
}
  })
}
/*Removing Laptop from wish list ends above  */
/* DELETE Mobile ADS FROM WISH LIST IF IT WAS REMOVED FROM REAL DATABASE */
if(data.val()  == "Mobile"){
  firebase.database().ref(`TradeNow/Mobile`).once('value',function(mobiles){
if(mobiles.hasChild(data.key)  === false){
  firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${data.key}`).remove().then(function(){console.log("Mobile ad was removed from database")})
}
  })
}
/*Removing Mobile from wish list ends above  */

/* DELETE Other ADS FROM WISH LIST IF IT WAS REMOVED FROM REAL DATABASE */
if(data.val()  == "Other"){
  firebase.database().ref(`TradeNow/Other`).once('value',function(others){
if(others.hasChild(data.key)  === false){
  firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${data.key}`).remove().then(function(){console.log("Other ad was removed from database")})
}
  })
}
/*Removing Other from wish list ends above  */

/* DELETE cars ADS FROM WISH LIST IF IT WAS REMOVED FROM REAL DATABASE */
if(data.val()  == "Car"){
  firebase.database().ref(`TradeNow/Car`).once('value',function(cars){
if(cars.hasChild(data.key)  === false){
  firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${data.key}`).remove().then(function(){console.log("cars ad was removed from database")})
}
  })
}
/*Removing cars from wish list ends above  */


/* DELETE Bike ADS FROM WISH LIST IF IT WAS REMOVED FROM REAL DATABASE */
if(data.val()  == "Bike"){
  firebase.database().ref(`TradeNow/Bike`).once('value',function(bikes){
if(bikes.hasChild(data.key)  === false){
  firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${data.key}`).remove().then(function(){console.log("Mobile ad was removed from database")})
}
  })
}
/*Removing Mobile from wish list ends above  */


          });
              //Settings Offline Ads..!
      })})
      
      /*Updating the offline wish list by deleting the data which was deleted from database*/
      
      
      
        firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}`).on('value',function(data){

  
  
           
          WishListAds.iterate(function(value, key, iterationNumber) {


if(data.hasChild(key) === false){
  //The Ad is No more available on online database so deleting from local database too..!
 // console.log("Dont Have This Child In Other ",key)

  
  WishListAds.removeItem(key).then(function() {
      // Run this code once the key has been removed.
      console.log("Deleted ",key,"From WishList Because it wasnt available online!")
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  });
} //else{alert("HasThisChild")}


})
         
         //Settings Offline Ads..!
      })
      
      
    /*Setting Up Wishlist Offline..!!*/

firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}`).on('value',function(WishListData){

WishListData.forEach(function(WishList){

WishListAds.setItem(WishList.key,WishList.val()).then(function(){
//console.log("Done")
})

})
})
    
    
  } //if online ends here
});
              
            // User is signed in.
            isLoggedIn= "Yes";
            $(".UserMyOwnAds").show();
            $(".UserMyOwnAds").attr("href",  "/userads.html#"+user.uid);
         

if(window.location.pathname != "/publish.html"){document.getElementById("loginbtn").style="display:none;"}

            
document.getElementById("navbaruserimgavatar").src = user.photoURL;
document.getElementById("navbar-name").innerHTML = user.displayName;

document.getElementById("nav-userdata").style="display: flex;"

if(isLoggedIn == "Yes"){
  $("#nav-userdata").show()
  }
            
            userid = firebase.auth().currentUser.uid
            var displayName = user.displayName;
          firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}`).on('value',function(data){
          
          if(data.child("ProfilePic").val() != firebase.auth().currentUser.photoURL){
              firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}`).update({
                  
                  ProfilePic: firebase.auth().currentUser.photoURL
              })
              
          }
      })
      checkforuserdetails()
      $('.HideWhenNotLoggedIn').show()
            // ...
          } else {
            // User is signed out.
            // ...

            
    setTimeout(function(){if(isLoggedIn !="Yes"){$("#nav-userdata").hide()}},500)
    
    setTimeout(function(){$("#nav-userdata").hide()},500)

            $('.HideWhenNotLoggedIn').hide()
            $(".UserMyOwnAds").hide()
            isLoggedIn= "No";
            
            if(window.location.pathname != "publish.html"){
            document.getElementById("loginbtn").style="display:inline;"
            }
            document.getElementById("nav-userdata").style="display: none;"
            $('#nav-userdata').hide();
          }
        });





        function logout(){

          firebase.auth().signOut().then(function(){

            location.reload();
          })
        }

        document.getElementById("LogOutBtn").addEventListener('click',logout)



        var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
      
      
      
      
      
      
      
      
      
      
      
      
    setTimeout(function(){$('[title]').tooltip('hide');},500)
  } else {
    setTimeout(function(){$('[title]').tooltip('hide');},500)
  }
});

        

$("#FooterInstructions").click(function(){
  $("#InstructionsForUser").modal("show");
})







firebase.messaging().onMessage(function(payload) {
 

   // alert(payload.notification.title);
//console.log(payload)


if(payload.data["gcm.notification.senderID"]  != "AdminPushNotif"){
   var notifsound = new Audio('/notification.m4a');
notifsound.play()

  pushnotif(payload.notification.title.substring(12),payload.notification.body,"7","/CHAT/#"+payload.data["gcm.notification.senderID"],payload.notification.icon)
}
else{
    console.log("Admin Pushed Message Avoided..!")
}
  
  //function pushnotif(title,msg,type,time,url,imglink)
  
  
  //console.log(payload.data["gcm.notification.senderID"])
 
  // ...
});



function AddToWishList(category,AdId){firebase.database().ref(`WishList/${firebase.auth().currentUser.uid}/${AdId}`).set(category).then(function(){
    ToastAlert(AdId,"Successfully Added To Your WishList");
    
    
    $(`i[WishList="${AdId}"]`).attr('class','fa wishlist fa-heart animated zoomOut')
});}

