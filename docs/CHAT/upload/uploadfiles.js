
var uploadfilesdiv = document.getElementById("uploadfilesdiv");
var textmsgarea = document.getElementById("message-to-send");
var filename;
	var fulldate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });
var fulltime = currentTimeStringforCheckout;
    
var filedisplay = "fileicons/defaultfile.png";
var uploadboxclose = document.getElementById("uploadboxclose");
	
var uploader = document.getElementById("uploader");
var percentagetext =document.getElementById("percentagetext");
var fileButton = document.getElementById("uploadfiles");
//Two:








var thenameofuser;

var theemailofuser;
var theprofilepicofuser;
var theuseridofuser;

var thenicknameofuser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     
        //Setting up variables
        thenameofuser = firebase.auth().currentUser.displayName;
        theemailofuser = firebase.auth().currentUser.email;
        theprofilepicofuser = firebase.auth().currentUser.photoURL;
        theuseridofuser = firebase.auth().currentUser.uid;
        //Variables ends
        userinfo()

     
            thenicknameofuser= firebase.auth().currentUser.displayName


        
    } else {
      // No user is signed in.
      
     
    }
  });






function downloadfile(url){
    
      var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

}

fileButton.addEventListener('change'||'drop', function(e){  
    
    
    shownotif("Warning!","Uploading may take some time, Please do not close page, reload page or re-upload files otherwise it will result in an error ","warning","5")
    	var file = e.target.files[0];
	filename = e.target.files[0].name;
	
	if(firebase.auth().currentUser.uid != "Gj5Q9uQOVvZm5T75Y5wsD0ssjT12"){

     if (file.size >= 5242880 && file.type != "image/png" && file.type != "image/jpeg"  && file.type != "image/gif"  && file.type != "image/jpg" ) {
            shownotif("Error! ","You are not allowed to upload files of size greater than 5MB, Please upload file having size less than 5MB, Or Buy Premium Member Ship From Admin To Increase Your Limits.","danger","7");
            return;
        }
else if(file.size >= 2097152 && file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
      shownotif("Error! ","You are not allowed to upload images of size greater than 2MB, Please image file having size less than 2MB, Or Buy Premium Member Ship From Admin To Increase Your Limits.","danger","7");
            return;
}

	}
    
    
uploadboxclose.style="display:none;"
    var useripstring = userip.replace(/\./g,'')
    // console.log("function upload file started")



		// console.log(file)
		// console.log("file type : "+file.type)
		uploader.style="display:block;";
		document.getElementById('percentagetext').style="outline-width: 0px; border: 0px solid black; background: transparent; color: silver; font-weight: 800; width: 100%; text-align: center; position: absolute; left: 0px; bottom: 45px; font-size: 25px; display:block"
		
		
			if(filename.length > 20){
	    filename = "...."+file.name.slice(-18);
	    
	    // console.log(filename)
	}
	
	var filedata= new FormData();
filedata.append('file',file);

		 
		if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
	
	uploader.style ="display:block; transition:all 3000ms ease;";
	





shownotif("Please Wait..!","We are uploading your image, Please wait & Do not close page, once the image is uploaded we will notify you.","warning","4");

axios({
    
    url: "/uploadedfiles/upload.php",
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data: filedata
}).then(function(res){
    
    
    moderatewords()
    
     var downloadURL = "/uploadedfiles/"+res.data.files[0];
     var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

  //	uploader.value = "100"
//percentagetext.value = "Upload Completed.";
	
	
		
		
 setTimeout(function(){    $("#Uploadfiles").modal("hide"); uploadboxclose.style="display:block;"  ; }, 700);



	var quoatedURL = "'"+downloadURL+"'";
   

   var bigimagefunc= "BigPicture({ el: this, imgSrc: '"+downloadURL+"' })"
   
  
   firebase.database().ref(`CHATROOM/MESSAGES`).push({RecieverID: window.location.hash.replace(/\#/g,''),Nickname:thenameofuser,Name: thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:`<p>${textmsgarea.value} </p><br><figure onclick="${bigimagefunc}" ><img class='sentimage' caption='Image Sent By ${thenameofuser}' src='${downloadURL}'> <figcaption title="${file.name}">${filename}</figcaption> </figure>`,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
        textarea.value = "";
        textarea.innerHTML = "";



//Notification Sending

firebase.database().ref("fcmTokens").once("value", function(snapshot) {
  console.log(snapshot);
  snapshot.forEach(function(token) {
if(token.val() == localStorage.getItem("RecieverID")){


   console.log(token.key)   


   $.ajax({        
      type : 'POST',
      url : "https://fcm.googleapis.com/fcm/send",
      headers : {
          Authorization : 'key=' + 'AIzaSyAAi8WTXEyRWBBKiEhj1CUJ8_sbKoQrb3k'
      },
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify({"to": token.key, "notification": {
          "title":`New Msg From ${firebase.auth().currentUser.displayName}`,
          "body":`Sent A Picture...`,
          "icon": `${firebase.auth().currentUser.photoURL}` ,
"click_action": `https://tradenowpakistan.tk/CHAT/${'#'+firebase.auth().currentUser.uid}`,
      "senderID":firebase.auth().currentUser.uid

      
      
      
      }
      
      
      }),
      success : function(response) {
          console.log(response);
      },
      error : function(xhr, status, error) {
          console.log(xhr.error);                   
      }
  });
}
  });
});



//Notification Sending Above
    shownotif("Completed!","Your Image Was Sent Successfully..! ","info","2")
})
  
    
    
    
}).catch(function(err){
    
    shownotif("Couldnt Send Image: ",err,"danger","5");
    console.log(err)
})


    /*
    
   
		*/	

  
  
  // console.log(downloadURL)
  
  //document.getElementById('namebox2').className ='namebox2 animated fadeOutUp';

	
	
	
	

 }
 

 else{
     
 
         axios({
    
       url: "/uploadedfiles/upload.php",
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data: filedata
}).then(function(res){
    moderatewords()
    
    

    
        var downloadURL = "/uploadedfiles/"+res.data.files[0];
     var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

  	uploader.value = "100"
percentagetext.value = "Upload Completed.";



   setTimeout(function(){    $("#Uploadfiles").modal("hide"); uploadboxclose.style="display:block;"  ; }, 700);
     
	 if(file.type == "video/mp4"||file.type == "video/mpeg"||file.type == "video/avi"||file.type == "video/3gp"||file.type == "video/flv"||file.type == "video/wmv"||file.type == "video/mov"||file.name.slice(-4) == ".mp4"||file.name.slice(-4) == ".avi"){



	
		
		

setTimeout(function(){  $("#Uploadfiles").modal("hide"); }, 700);


    

    

    var bigimagefunction= "BigPicture({ el: this, vidSrc: '"+downloadURL+"' })"
   
      firebase.database().ref(`CHATROOM/MESSAGES`).push({RecieverID: window.location.hash.replace(/\#/g,''),Nickname:thenameofuser,Name: thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:`<p>${textmsgarea.value} </p><br><video class="uploadedvideo" onclick="${bigimagefunction}" > <source src="${downloadURL}" > Your browser does not support HTML5 video. </video> <img onclick="${bigimagefunction}"  src="play-button.png" class="avatarimg vidplaybtn"><br> <text class="nameofvideo" title="${file.name}"><text class="redcolor"> Video:</text> ${filename}</text>`,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
          
                  textarea.value = "";
        textarea.innerHTML = "";
  

//Sending notification


firebase.database().ref("fcmTokens").once("value", function(snapshot) {
  console.log(snapshot);
  snapshot.forEach(function(token) {
if(token.val() == localStorage.getItem("RecieverID")){


   console.log(token.key)   


   $.ajax({        
      type : 'POST',
      url : "https://fcm.googleapis.com/fcm/send",
      headers : {
          Authorization : 'key=' + 'AIzaSyAAi8WTXEyRWBBKiEhj1CUJ8_sbKoQrb3k'
      },
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify({"to": token.key, "notification": {
          "title":`New Msg From ${firebase.auth().currentUser.displayName}`,
          "body":`Sent A Video File...`,
          "icon": `${firebase.auth().currentUser.photoURL}` ,
"click_action": `https://tradenowpakistan.tk/CHAT/${'#'+firebase.auth().currentUser.uid}`,
            "senderID":firebase.auth().currentUser.uid

      
      
      }
      
      
      }),
      success : function(response) {
          console.log(response);
      },
      error : function(xhr, status, error) {
          console.log(xhr.error);                   
      }
  });
}
  });
});

//notification send above








   
       shownotif("Completed!","Your Video Was Uploaded Successfully..! ","info","1")
   })
     

      

      
 


	 }
	
    
    
    


    else if(file.type == "audio/mp3"||file.type == "audio/mpeg"||file.type == "audio/avi"||file.type == "audio/3gp"||file.type == "audio/m4a"||file.type == "audio/ogg"||file.type == "audio/mpa"||file.type == "audio/mov"||file.name.slice(-4) == ".m4a" || file.name.slice(-4) == ".mp3"||file.name.slice(-4) == ".ogg"){

      firebase.database().ref(`CHATROOM/MESSAGES`).push({RecieverID: window.location.hash.replace(/\#/g,''),Nickname:thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:"<p>"+textmsgarea.value+" </p><br><audio controls> <source src='"+downloadURL+"' > </audio>",Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
 

        firebase.database().ref("fcmTokens").once("value", function(snapshot) {
          console.log(snapshot);
          snapshot.forEach(function(token) {
       if(token.val() == localStorage.getItem("RecieverID")){
       
        
           console.log(token.key)   
  
  
           $.ajax({        
              type : 'POST',
              url : "https://fcm.googleapis.com/fcm/send",
              headers : {
                  Authorization : 'key=' + 'AIzaSyAAi8WTXEyRWBBKiEhj1CUJ8_sbKoQrb3k'
              },
              contentType : 'application/json',
              dataType: 'json',
              data: JSON.stringify({"to": token.key, "notification": {
                  "title":`New Msg From ${firebase.auth().currentUser.displayName}`,
                  "body":`Sent An Audio File..`,
                  "icon": `${firebase.auth().currentUser.photoURL}` ,
        "click_action": `https://tradenowpakistan.tk/CHAT/${'#'+firebase.auth().currentUser.uid}`,
              "senderID":firebase.auth().currentUser.uid

              
              
              
              }
              
              
              }),
              success : function(response) {
                  console.log(response);
              },
              error : function(xhr, status, error) {
                  console.log(xhr.error);                   
              }
          });
       }
          });
      });
      





        shownotif("Completed!","Your Audio File Was Uploaded Successfully..! ","info","2")
    })
			

    }

    else{
    firebase.database().ref(`CHATROOM/MESSAGES`).push({RecieverID: window.location.hash.replace(/\#/g,''),Nickname:thenameofuser,Name: thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:"<a href="+downloadURL+" target='_blank' download><figure><img class='sentfile' src='"+filedisplay+"'> <figcaption title='"+file.name+"' >"+filename+"</figcaption> </figure></a>",Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {

      firebase.database().ref("fcmTokens").once("value", function(snapshot) {
        console.log(snapshot);
        snapshot.forEach(function(token) {
     if(token.val() == localStorage.getItem("RecieverID")){
     
      
         console.log(token.key)   


         $.ajax({        
            type : 'POST',
            url : "https://fcm.googleapis.com/fcm/send",
            headers : {
                Authorization : 'key=' + 'AIzaSyAAi8WTXEyRWBBKiEhj1CUJ8_sbKoQrb3k'
            },
            contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify({"to": token.key, "notification": {
                "title":`New Msg From ${firebase.auth().currentUser.displayName}`,
                "body":`Sent A File...`,
                "icon": `${firebase.auth().currentUser.photoURL}` ,
      "click_action": `https://tradenowpakistan.tk/CHAT/${'#'+firebase.auth().currentUser.uid}`,
            
                  "senderID":firebase.auth().currentUser.uid

            
            }
            
            
            }),
            success : function(response) {
                console.log(response);
            },
            error : function(xhr, status, error) {
                console.log(xhr.error);                   
            }
        });
     }
        });
    });
    
        shownotif("Completed!","Your File Was Uploaded Successfully..! ","info","1")
    })
			
  }
  
  
  
}).catch(function(err){
    
    shownotif("Couldnt Send Video",err,"danger","4")
    
})
  
  
  //// console.log(downloadURL)

	
	
	
	
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
 }//Else Ends here
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







function uploadbtnfunction(){
    
    $('#Uploadfiles').modal({backdrop: 'static', keyboard: false})
	document.getElementById('uploadimg').style='display:block;' ;
	document.getElementById('uploadfiles').value =''; 
	document.getElementById('percentagetext').value = '0%'; 
	document.getElementById('percentagetext').style="display:none;"
	document.getElementById('uploader').value = '0';
    document.getElementById('uploader').style='display:none;'
$(".filename").html("")
	
}


//UPDATE PROFILE











