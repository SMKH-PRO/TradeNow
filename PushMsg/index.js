var AlertDisplayed = false;
  var config = {
    apiKey: "AIzaSyCejWmwJ2nr1MHjPk7Q7Vu9SNLdRknD6tA",
    authDomain: "tradenowpakistan.firebaseapp.com",
    databaseURL: "https://tradenowpakistan.firebaseio.com",
    projectId: "tradenowpakistan",
    storageBucket: "tradenowpakistan.appspot.com",
    messagingSenderId: "350561974381"
  };
  firebase.initializeApp(config);
  
var countsent = 0;  
  var islink = /^(?:(?:(?:https?|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
var YourName = document.getElementById("YourName");
var YourID =  document.getElementById("YourID");
var RecieverID = document.getElementById("RecieverID");
var msg = document.getElementById("Message");
var sendbtn = document.getElementById("sendmsg");
var ClickAction = document.getElementById("ClickAction") ;


function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function sendmsg(){
    
    
    AlertDisplayed = false;
    countsent = 0;
if(YourName.value.length <= 2){
shownotif("Ops! ","Write Title before submitting notification","danger","5")
return false;
}
else if(islink.test(ClickAction.value)=== false ){
    shownotif("Error!: ","Please Write Correct Link ","danger","5")
    return false;
}
else if(msg.value.length <5 ){
    shownotif("Ops! ","Please Write message with atleast 5 characters","danger","5")
    return false;
}

else{
//When all validation true,then push msg/notif



 if(RecieverID.value !="" && RecieverID.value !="All"  ){
    //Notification will not be sent to all
    
    
var sendtoone= confirm("Are You Sure You Want To Send Message To Single User, \n You Selected User: "+RecieverID.value+"\n If you are not sure please click cancel");

if(sendtoone === true ){
    
    
sendbtn.className ="btn btn-info animated zoomOut"
sendbtn.setAttribute("onclick","")


    firebase.database().ref("fcmTokens").once("value", function(snapshot) {
        
        

        
        
       // console.log(snapshot);
        snapshot.forEach(function(token) {
     if(token.val() == RecieverID.value){
countsent += 1;
                   

        // console.log(token.key)   

        
         $.ajax({        
            type : 'POST',
            url : "https://fcm.googleapis.com/fcm/send",
            headers : {
                Authorization : 'key=' + 'AIzaSyAb7TiLNyoZlOLRMyY0DcPiHFbXo0tN-_0'
            },
            contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify({"to": token.key, "notification": {
                "title": YourName.value,
                "body": msg.value,
                "icon": `/logowithbg.png` ,
      "click_action": ClickAction.value,
      "senderID": "AdminPushNotif"

            }
            
            
            }),
            success : function(response) {
                //console.log(response);
                launch_toast()
                
                firebase.database().ref(`USERDETAILS/${RecieverID.value}`).once('value',function(SingleUser){
                    
                    if(AlertDisplayed === false){
                    shownotif("Success! ","Notification Sent To "+SingleUser.child("Name").val()+" On "+countsent+"Devices","success","5")
                    
                     AlertDisplayed = true;
                    
                    }
                })
                
                
                
                YourName.value = ''
                msg.value ='';
                
                setTimeout(function(){
sendbtn.className ="btn btn-info animated zoomIn"
sendbtn.setAttribute("onclick","sendmsg()")

                    
                },500)
                
                
            },
            error : function(xhr, status, error) {
                countsent = 0;
                sendbtn.className ="btn btn-info animated zoomIn"
sendbtn.setAttribute("onclick","sendmsg()")
                console.log(xhr.error);                   
            }
        });
     }
        });
    });
    


    
}
    
}


else if( RecieverID.value == "" || RecieverID.value == "All"){
    
       
    
var sendtoall= confirm("Are You Sure You Want To Send Notification To All Users??");

if(sendtoall === true ){
    
    
sendbtn.className ="btn btn-info animated zoomOut"
sendbtn.setAttribute("onclick","")


    firebase.database().ref("fcmTokens").once("value", function(snapshot) {
        
        

        
        
       // console.log(snapshot);
        snapshot.forEach(function(token) {
     

                   countsent +=1;

        // console.log(token.key)   

        
         $.ajax({        
            type : 'POST',
            url : "https://fcm.googleapis.com/fcm/send",
            headers : {
                Authorization : 'key=' + 'AIzaSyAb7TiLNyoZlOLRMyY0DcPiHFbXo0tN-_0'
            },
            contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify({"to": token.key, "notification": {
                "title": YourName.value,
                "body": msg.value,
                "icon": `/logowithbg.png` ,
      "click_action": ClickAction.value,
      "senderID": "AdminPushNotif"

            }
            
            
            }),
            success : function(response) {
                //console.log(response);
                launch_toast()
                
                
                    
                    if(AlertDisplayed === false){
                    shownotif("Success! ","Notification Sent To "+countsent+" Registered Devices","success","5")
                        AlertDisplayed = true;
                    }
                       YourName.value = ''
                msg.value ='';
                
                setTimeout(function(){
sendbtn.className ="btn btn-info animated zoomIn"
sendbtn.setAttribute("onclick","sendmsg()")

                    
                },500)
                
            },
            error : function(xhr, status, error) {
                countsent = 0;
                console.log(xhr.error);              
                sendbtn.className ="btn btn-info animated zoomIn"
sendbtn.setAttribute("onclick","sendmsg()")
            }
        });
     
        });
    });
    


    
}
    
    
    
}




}
}




















///CHECKING FOR USER LOGIN:= 
 
                


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
                firebase.database().ref(`ADMINS`).on('value',(details)=>{
            
            
            if(details.hasChild(firebase.auth().currentUser.uid)){
      
//Thori faltu styling from js
$(window).load(function() {if (window.matchMedia("(min-width: 750px)").matches) {$("html, body").animate({ scrollTop: $(document).height() }, 1000);}});


      sendbtn.setAttribute("onclick","sendmsg()")
document.getElementById("sendnotifdiv").className ="";

$("#modalLRForm").modal('hide');



YourID.value = user.uid;



firebase.database().ref(`USERDETAILS/`).on('child_added',function(users){


    

//console.log(users.val())

    
    RecieverID.innerHTML +=  ` <option value="${users.key}" >${users.child("Name").val() +": " + users.key} </option>`;

})



}

else{
    //USER IS NOT ADMIN
    
    document.getElementById("bodyy").innerHTML =`<img src="/accessdenied.jpg" class="NotAdmin" >`
    
    document.getElementById("TheBody").style="background: url(body.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;  text-align: -webkit-center" 
}


})



      // ...
    } else {
      // User is signed out.
      document.getElementById("sendnotifdiv").className ="fade";

      location.replace('/login.html#PushMsg');
location.replace('/login.html#PushMsg');
      // ...
    }
  });





firebase.messaging().onMessage(function(payload) {
 

   // alert(payload.notification.title);
//console.log(payload)


console.log(payload)
   var notifsound = new Audio('/notification.m4a');
notifsound.play()

  pushnotif(payload.notification.title,payload.notification.body,"7",payload.notification.click_action ,payload.notification.icon)
  
  //function pushnotif(title,msg,type,time,url,imglink)
  
  
  //console.log(payload.data["gcm.notification.senderID"])
 
  // ...
});

