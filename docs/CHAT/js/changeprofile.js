
document.getElementById("changepicbtn").addEventListener('click',function(){
    updateprofilebtnfunction()

})


//Two:
var uploadboxclosetwo = document.getElementById("uploadboxclosetwo");
var uploadertwo = document.getElementById("uploadertwo");
var percentagetexttwo =document.getElementById("percentagetexttwo");
var fileButtontwo = document.getElementById("uploadfilestwo");

function updateprofilebtnfunction(){
  if(IsThisUserOnlineNow == "NO"){

    shownotif("Opps! ","Your internet is currently not accesible,Please connect and then try again.","warning","4")
    e.preventDefault();
    return false;
    
    }else{
    $('#picprofile').modal({backdrop: 'static', keyboard: false})
  document.getElementById('uploadimgtwo').style='display:block;' ;
  document.getElementById('uploadfilestwo').value =''; 
  document.getElementById('percentagetexttwo').value = 'Drop Files Or Click Browse.'; 
  document.getElementById('percentagetexttwo').style="display:none;"
  document.getElementById('uploadertwo').value = '0';
    document.getElementById('uploadertwo').style='display:none;'
  $(".the2ndfilename").html("")
    }
  }
  


  

fileButtontwo.addEventListener('change'||'drop', function(e){  
    




		
    
  
    uploadboxclosetwo.style="display:none;"
      var useripstring = userip.replace(/\./g,'')
      //console.log("function upload file started")
    
    var file = e.target.files[0];
    filename = e.target.files[0].name;
    
     // console.log(file)
     // console.log("file type : "+file.type)
      uploadertwo.style="display:block;";
      document.getElementById('percentagetexttwo').style="outline-width: 0px; border: 0px solid black; background: transparent; color: silver; font-weight: 800; width: 100%; text-align: center; position: absolute; left: 0px; bottom: 45px; font-size: 25px; display:block"
      
      
    
    
       
      if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
    
    uploadertwo.style ="display:block; transition:all 3000ms ease;";
    
    
    var storageRef = firebase.storage().ref();
    
    // File or Blob named mountains.jpg
    
    var file = e.target.files[0];
    // Create the file metadata
    
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(`MFS/${useripstring}/${file.name}`).put(file);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadertwo.value = progress;
        percentagetexttwo.value = Math.round(progress)+"%";
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          // console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          // console.log('Upload is running');
          break;
      }
    }, function(error) {
        
        
    uploadboxclosetwo.style="display:block;"
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    
    
    percentagetexttwo.style="outline-width: 0px; border: 0px solid black; background: transparent; color: red; font-weight: 800; width: 100%; text-align: center; position: absolute; bottom: 45px; font-size: 14px;"
    switch (error.code) {
      case 'storage/unauthorized':
      percentagetexttwo.value = "File Size Limit Exceeded."+error.code;
      shownotif("Error!","Your File Upload Limit Is Smaller Than 5 MB,So Upload files smaller than 5MB. ","danger","3")
      
      shownotif("Offer!","If you want to upload files larger than 5 MB then please buy premium membership from admin.","info","8")
        // User doesn't have permission to access the object
        break;
    
      case 'storage/canceled':
      percentagetexttwo.value = "Error..!! Upload Cancelled "+error.code;
        break;
    
      case 'storage/unknown':
      percentagetexttwo.value = "  Unknown Error:  "+error.code;
        break;
    }
    
    }, function() {
      
      
      var downloadURL = uploadTask.snapshot.downloadURL.toString();
       var user = firebase.auth().currentUser;
    var quoted = "'"+downloadURL+"'";
    
      uploadertwo.value = "100"
    percentagetexttwo.value = "Upload Completed.";
    
    
           var user = firebase.auth().currentUser;
    
    user.updateProfile({
     
      photoURL: downloadURL.toString()
      
    }).then(function() {
    
      
    setTimeout(function(){  location.reload();  $("#picprofile").modal("hide"); uploadboxclosetwo.style="display:block;"  ; }, 2000);
    
    shownotif("Task Completed!","Your Profile Picture Has Been Changed Successfully, We are reloading page to make sure that the profile update take effect.","info","5")
    })
    
    
    
     /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/
    
     
     
    
      shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")
    
    
        
    
    
    
    // console.log(downloadURL)
    
    
    
    });
    
    
    
    
    
    
    
    }
    
    
    else{
      updateprofilebtnfunction()
     shownotif("Error!","The file you selected is not an image file, Please Select File With Valid Image Format Such As .png, .jpg","danger","6")
    }//Else Ends here
      
      
    
      
    });
    
    
    
    
    