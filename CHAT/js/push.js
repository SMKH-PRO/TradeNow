var nickname;




var date = new Date();
 

var fulldate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });


var textarea = document.getElementById("message-to-send")
//Setting up variables
  // console.log(firebase.auth().currentUser)

  function userinfo(){

    if(firebase.auth().currentUser === null){
        // console.log("checking current user in 500ms ")
        setTimeout(function(){userinfo()},500)
    }
    
else{
  name = firebase.auth().currentUser.displayName;
  email = firebase.auth().currentUser.email;
  profilepic = firebase.auth().currentUser.photoURL;
  userid = firebase.auth().currentUser.uid;
  // console.log(firebase.auth().currentUser)
}
  }
  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     
        //Setting up variables
         name = firebase.auth().currentUser.displayName;
         email = firebase.auth().currentUser.email;
         profilepic = firebase.auth().currentUser.photoURL;
         userid = firebase.auth().currentUser.uid;
        //Variables ends
        userinfo()

  

        
    } else {
      // No user is signed in.
      
     
    }
  });
 //Variables ends

 
 
 function onclickpushdata(){
    if(textareabox.value.length>1){ pushdata()}
 else{shownotif("Warning!","Please write something before submitting. Dont Submit Blank Message.!","danger","1")}
 }

 $("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
 
function pushdata(){
    
    
    
if(name === null || name === undefined){

    shownotif("Error!","Name Is Not Set, Cannot Send Message.","danger","4")
}



else if( email === null || email === undefined){
    shownotif("Error!","User Email Is Missing, Cannot Send Message.","danger","4")
}



else if(profilepic === null || profilepic === undefined) {

shownotif("Error!","Profile Picture Is Missing, Cannot Send Message.If Reloading does not help then upload your profile picture by clicking the setting gear at top right corner.","danger","6")

setTimeout(function(){location.reload()},1000)
}



else{

    if(isOnline == "No") {

        shownotif("Oops!","There is no connection between server and you, The message will not be delivered.","warning","2")
        event.preventDefault();
                textarea.disabled = false;
                $("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
                setTimeout(function(){textarea.focus(); textarea.select()},30)
document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"
        return false;
    }

    

else{



textarea.disabled = true;
document.getElementById("sendbtnimage").className= "animated zoomOut sendbtn"
  $("#sendbtnimage").unbind('click')

    firebase.database().ref(`CHATROOM/ONLINEUSERS`).once('value',(childss)=>{

if(childss.child("status") != "Active"){
    

    firebase.database().ref(`CHATROOM/ONLINEUSERS/${firebase.auth().currentUser.uid}`).set({ParentID:firebase.auth().currentUser.uid+"ParentStatus",UserID:firebase.auth().currentUser.uid+"Status",Name:firebase.auth().currentUser.displayName,Photo:firebase.auth().currentUser.photoURL,status:"Active"});
}

    })


    var currentUserID = firebase.auth().currentUser.uid;


    firebase.database().ref(`CHATROOM/CONTACTLIST/${window.location.hash.replace(/\#/g,'')}`).once('value',(contacts)=>{

if(contacts.hasChild(currentUserID) === false){
    firebase.database().ref(`CHATROOM/CONTACTLIST/${window.location.hash.replace(/\#/g,'')}/${currentUserID}`).set({

        Name: firebase.auth().currentUser.displayName,
        Pic: firebase.auth().currentUser.photoURL,
        ID: currentUserID,
        LastMsg: fulldate+", "+currentTimeStringforCheckout

    })
}

else{
    firebase.database().ref(`CHATROOM/CONTACTLIST/${window.location.hash.replace(/\#/g,'')}/${currentUserID}`).update({

        LastMsg:  currentTimeStringforCheckout+", "+fulldate,
        Pic: firebase.auth().currentUser.photoURL

    })

}


    })






var msgwithlinks = textarea.value.replace(/(https?:\/\/[^\s]+)/g, "<a class='sentlinks' target='_blank' href='$1'>$1</a>");



firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).once('value',function(data){
    
    
    if(data.hasChild(window.location.hash.replace(/\#/g,''))){
        textarea.disabled = false;
        $("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
        setTimeout(function(){textarea.focus(); textarea.select()},30)
document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"
        shownotif("Warning! ","You have ignored this user, it means you cannot send or recieve messages from this user, you can go to your ignore list to un-ignore this user","warning","3");
        return false;
    }
    else{
        
        firebase.database().ref(`CHATROOM/IGNORED/${window.location.hash.replace(/\#/g,'')}`).once('value',function(reciever){
            
            if(reciever.hasChild(firebase.auth().currentUser.uid)){
                        textarea.disabled = false;
                        $("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
                        setTimeout(function(){textarea.focus(); textarea.select()},30)
                        
document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"
                  shownotif("Warning! ","This user has ignored your messages, you cannot send a message to this user untill the user un-ignore you.","warning","3");
                  return false;
            }
            
            else{
                if(firebase.auth().currentUser.uid == window.location.hash.replace(/\#/g,'')){
                            textarea.disabled = false;
                            $("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
                            setTimeout(function(){textarea.focus(); textarea.select()},30)
document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"
                    shownotif('Err','Cannot Send Message To Your Self!','warning','5')
                    return false;
                }
                else{
                
                   firebase.database().ref(`CHATROOM/MESSAGES/`).push({RecieverID: window.location.hash.replace(/\#/g,''),Name: name,EMAIL: email,UserImage:profilepic , UserId: userid,Ip: userip,Message:msgwithlinks,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
        var textarea = document.getElementById("message-to-send");
        textarea.value = "";
        
        textarea.value = ""
        setTimeout(function(){
            textarea.value = ""
            document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"
                textarea.disabled = false;
                setTimeout(function(){textarea.focus(); textarea.select()},30)
setTimeout(function(){$("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});},1500)
},50)
    
      }).catch(function(){
                  textarea.disabled = false;
                  setTimeout(function(){textarea.focus(); textarea.select()},30)
document.getElementById("sendbtnimage").className= "animated zoomIn sendbtn"

$("#sendbtnimage").click( function(){moderatewords(); onclickpushdata()});
      })
                
                }
            }
            
        })
        
        
    }
})

 
    
    
  
    event.preventDefault();}
}

   
}