var loggedinornot =  "DontKnow";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      loggedinornot = "Yes"

      // ...
    } else {
      // User is signed out.
      // ...
      loggedinornot= "Not"
    }

  });







  function showadfromlink(){

    if(loggedinornot !=  "DontKnow"){

      //  console.log("DontKnow")

  if(window.location.hash){

    
    


        

        




firebase.database().ref(`TradeNow`).once('value',function(data2){
 //console.log(data2.val())



 
   
    if(loggedinornot == "Yes"){  //Checking if user is logged in or not?


data2.forEach(data3 => {
    data3.forEach(data => {
    

  console.log(data.numChildren());
  
  
  
      
    if(data.key == window.location.hash.replace(/\#/g,'') ){

      

      showthisad(data.key,data.child("PostedBy").val(),data.child("category").val())


}
  


});
});





}// If condition for login check ends here, Else Starts below
else{

    //Show this messsage if user is not logged in..

firebase.database().ref(`TradeNow`).once('value',function(data2){



    data2.forEach(data3 => {
        
  

data3.forEach(data => {

if(data.key == window.location.hash.replace(/\#/g,'') ){
   var AdDes  = data.child("Description").val() 
   var AdName = data.child("product").val() 
   var AdTime  = data.child("PostTime").val() +', '+data.child("PostDate").val(); 
   var AdCat  = data.child("category").val() 
   var AdOwner  = data.child("PostedBy").val() 
   var AdPrice  = data.child("Price").val() 
   var AdModel  = data.child("Model").val() 
   var AdYEar  = data.child("Year").val() 
   var AdPic  = data.child("img1").val() 


    showofflinead(AdTime,AdName,AdDes,AdCat,AdOwner,AdPrice,AdModel,AdYEar,AdPic,window.location.hash.replace(/\#/g,''))

}




})

});//ForEach Ends



})

}




   
})






   
}

    }
    else{

        

        setTimeout(function(){showadfromlink()},500)
    }
  }
  
 setTimeout(function(){showadfromlink()},500) 