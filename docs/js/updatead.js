var currendate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });
var currenttime = currentTimeStringforCheckout;
var ProductModel = document.getElementById("ProductModel");
var ProductPrice = document.getElementById("ProductPrice");
var yearvalidation = /^(199\d|200\d|2018)$/
var ProductYear = document.getElementById("ProductYear");
ProductPrice.addEventListener('keydown',   function (e) {

    if(ProductPrice.value.length > 10 && e.keyCode!=8 && e.keyCode!=46){
        shownotif("Error!","Price does not seems to be valid, Please Recheck","danger","3");
        e.preventDefault()
    }
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

ProductYear.addEventListener('keydown',   function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl/cmd+A
   (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
   (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
   (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right
   (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
}
// Ensure that it is a number and stop the keypress
if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
   e.preventDefault();
}
    if(ProductYear.value.length === 4 && e.keyCode!=8 && e.keyCode!=46){
        e.preventDefault()
    }
    setTimeout(function(){ProductYear.value = ProductYear.value.slice(0,4); },100)
    setTimeout(function(){ProductYear.value = ProductYear.value.slice(0,4); },500)

})
ProductYear.addEventListener('keydown',   function (ev) {
var year=  ProductYear.value;
    var text = /^[0-9]+$/;
    if(ev.type=="blur" || year.length==4 && ev.keyCode!=8 && ev.keyCode!=46) {
      if (year != 0) {
          if ((year != "") && (!text.test(year))) {
  
              shownotif("Error!","Please Enter Numeric Values Only","danger","3");
              ev.preventDefault()
              return false;
          }
  
         
          var current_year=new Date().getFullYear();
          if((year < 1920) || (year > current_year))
              {
                ev.preventDefault()
                shownotif("Error!","Year should be in range 1920 to current year","danger","3");
              return false;
              }
              
          return true;
          
      } }
})







//PUBLISH AD:-
var yetyear=new Date().getFullYear();
var productdescription = document.getElementById("ProductDescription");
var productname = document.getElementById("ProductName");
var publishbtn = document.getElementById("updateadbtn");





firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
 



    
    // ...
  } else {
    // User is signed out.
    // ...
  

  }
});













//UPLOAD FILE CODE

//PIC 1:- 
  
  var productpic1 = document.getElementById("ProductPic1");
  var productpic1img = document.getElementById("ProductPic1img");
  var productbtn1 = document.getElementById("ProductBtn1")
  productpic1.addEventListener('change'||'drop', function(e){  
      

    
    //console.log("function upload file started")
  
  var file = e.target.files[0];
  filename = e.target.files[0].name;
  
   // console.log(file)
   // console.log("file type : "+file.type)
    
  
     
    if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
  
  
  
  
  var storageRef = firebase.storage().ref();
  
  // File or Blob named mountains.jpg
  
  var file = e.target.files[0];
  // Create the file metadata
  
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child(`UPLOADEDPRODUCTS/${firebase.auth().currentUser.uid}/${file.name}`).put(file);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // uploadertwo.value = progress;
    productbtn1.innerHTML  = Math.round(progress)+"%";
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        // console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        // console.log('Upload is running');
        break;
    }
  }, function(error) {
      
      
  
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  
  
 productbtn1.innerHTML = '<span >Choose file</span> <input id="ProductPic1" type="file">'
  switch (error.code) {
    case 'storage/unauthorized':
    shownotif("Error!!","Upload Limit Exceeded, Upload image with smaller file size. "+error.code,"danger","3") 
      // User doesn't have permission to access the object
      break;
  
    case 'storage/canceled':
    shownotif("Error!!","Upload Cancelled "+error.code,"danger","3") 
      break;
  
    case 'storage/unknown':
  shownotif("Error!!",error.code,"danger","3") 
      break;
  }
  
  }, function() {
    
    
    var downloadURL = uploadTask.snapshot.downloadURL.toString();
     var user = firebase.auth().currentUser;
  var quoted = "'"+downloadURL+"'";
  
  productpic1img.src = downloadURL;
  productbtn1.innerHTML = "UPLOADED!"
 setTimeout(function(){productbtn1.className = "animated fadeOut"},500)
         var user = firebase.auth().currentUser;

  
  
   /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/
  
   
   
  
    shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")
  

      
  
  
  
  // console.log(downloadURL)
  
  
  
  });
  
  
  
  
  
  
  
  }
  
  
  else{
    
   shownotif("Error!","The file you selected is not an image file, Please Select File With Valid Image Format Such As .png, .jpg","danger","6")
  }//Else Ends here
    
    
  
    
  });
  
  
  
  //PIC 1 ENDS ABOVE
  


  

//UPLOAD FILE CODE

//PIC 2:- 
  
var productpic2 = document.getElementById("ProductPic2");
var productpic2img = document.getElementById("ProductPic2img");
var productbtn2 = document.getElementById("ProductBtn2")
productpic2.addEventListener('change'||'drop', function(e){  
    




  
    
  

  
  //console.log("function upload file started")

var file = e.target.files[0];
filename = e.target.files[0].name;

 // console.log(file)
 // console.log("file type : "+file.type)
  

   
  if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){




var storageRef = firebase.storage().ref();

// File or Blob named mountains.jpg

var file = e.target.files[0];
// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(`UPLOADEDPRODUCTS/${firebase.auth().currentUser.uid}/${file.name}`).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function(snapshot) {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // uploadertwo.value = progress;
  productbtn2.innerHTML  = Math.round(progress)+"%";
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      // console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      // console.log('Upload is running');
      break;
  }
}, function(error) {
    
    

// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors


productbtn2.innerHTML = '<span >Choose file</span> <input id="ProductPic2" type="file">'
switch (error.code) {
    

  case 'storage/unauthorized':
  shownotif("Error!!","Upload Limit Exceeded, Upload image with smaller file size. "+error.code,"danger","3") 
    // User doesn't have permission to access the object
    break;

  case 'storage/canceled':
  shownotif("Error!!","Upload Cancelled "+error.code,"danger","3") 
    break;

  case 'storage/unknown':
shownotif("Error!!",error.code,"danger","3") 
    break;
}

}, function() {
  
  
  var downloadURL = uploadTask.snapshot.downloadURL.toString();
   var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

productpic2img.src = downloadURL;
productbtn2.innerHTML = "UPLOADED!"
setTimeout(function(){productbtn2.className = "animated fadeOut"},500)
       var user = firebase.auth().currentUser;



 /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/

 
 

  shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")


    



// console.log(downloadURL)



});







}


else{
  
 shownotif("Error!","The file you selected is not an image file, Please Select File With Valid Image Format Such As .png, .jpg","danger","6")
}//Else Ends here
  
  

  
});



//PIC 2 ENDS ABOVE















//PIC 2:- 
  
var productpic3 = document.getElementById("ProductPic3");
var productpic3img = document.getElementById("ProductPic3img");
var productbtn3 = document.getElementById("ProductBtn3")
productpic3.addEventListener('change'||'drop', function(e){  
    




  
    
  

  
  //console.log("function upload file started")

var file = e.target.files[0];
filename = e.target.files[0].name;

 // console.log(file)
 // console.log("file type : "+file.type)
  

   
  if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){




var storageRef = firebase.storage().ref();

// File or Blob named mountains.jpg

var file = e.target.files[0];
// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(`UPLOADEDPRODUCTS/${firebase.auth().currentUser.uid}/${file.name}`).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function(snapshot) {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // uploadertwo.value = progress;
  productbtn3.innerHTML  = Math.round(progress)+"%";
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      // console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      // console.log('Upload is running');
      break;
  }
}, function(error) {
    
    

// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors


productbtn3.innerHTML = '<span >Choose file</span> <input id="ProductPic2" type="file">'
switch (error.code) {
    

  case 'storage/unauthorized':
  shownotif("Error!!","Upload Limit Exceeded, Upload image with smaller file size. "+error.code,"danger","3") 
    // User doesn't have permission to access the object
    break;

  case 'storage/canceled':
  shownotif("Error!!","Upload Cancelled "+error.code,"danger","3") 
    break;

  case 'storage/unknown':
shownotif("Error!!",error.code,"danger","3") 
    break;
}

}, function() {
  
  
  var downloadURL = uploadTask.snapshot.downloadURL.toString();
   var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

productpic3img.src = downloadURL;
productbtn3.innerHTML = "UPLOADED!"
setTimeout(function(){productbtn3.className = "animated fadeOut"},500)
       var user = firebase.auth().currentUser;



 /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/

 
 

  shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")


    



// console.log(downloadURL)



});







}


else{
  
 shownotif("Error!","The file you selected is not an image file, Please Select File With Valid Image Format Such As .png, .jpg","danger","6")
}//Else Ends here
  
  

  
});



//PIC 2 ENDS ABOVE














//PUSH TO DATABASE






function updatead(adkey,category){







    if(productname.value == "" || productname.value.length < 3){
        shownotif("Error!","Please Write Valid Product Name ","danger","3");
        return false;
    }
    else if(ProductPrice.value.length < 2){
        shownotif("Error!","The Price Does Not Seems To Be Valid,Please write valid price for your product","danger","3");
    return false;
    
    }
    
    
         else  if((ProductYear.value < 1920) || (ProductYear.value  > yetyear))
              {
                
                shownotif("Error!","Year should be in range 1920 to current year","danger","3");
              return false;
              }
else if(ProductYear.value  == "" || ProductYear.value.length < 4){
    shownotif("Error!","Please Write Year ","danger","3");
    return false;
}

else if(ProductModel.value  == "" || ProductModel.value.length <2){
  shownotif("Error!","Please Write Model Number Having More Than 2 Characters.! ","danger","3");
  return false;
}

else if(ProductModel.value.length > 30){
  shownotif("Error!","Please Write Model No. With Less than 30 Characters. ","danger","3");
  return false;
}
else if(productdescription.value =="" || productdescription.value.length < 100){

    shownotif("Error!","You Have To Write 100 Characters Description Of Product.","danger","3");
    return false;

}




else{

  shownotif("Loading..!","Please wait while we are processing your ad update..","warning","4")

    var pushdata = {
product: productname.value.replace(/\s\s+/g, ' ').replace(/<(.|\n)*?>/g, ''),

Price: ProductPrice.value.replace(/\s\s+/g, ' ').replace(/<(.|\n)*?>/g, ''),
Year: ProductYear.value.replace(/<(.|\n)*?>/g, ''),
Model: ProductModel.value.replace(/<(.|\n)*?>/g, '').replace(/ +(?= )/g,'').replace(/\r\n|\r|\n/g,"<br />"),
Description: productdescription.value.replace(/<(.|\n)*?>/g, '').replace(/ +(?= )/g,'').replace(/\r\n|\r|\n/g,"<br />"),
PostedBy:firebase.auth().currentUser.uid,
LastTimeUpdated: currenttime+', '+currendate,
img1: document.getElementById("ProductPic1img").getAttribute('src'),
img2: document.getElementById("ProductPic2img").getAttribute('src'),
img3: document.getElementById("ProductPic3img").getAttribute('src')

    }

    console.log(pushdata);

    firebase.database().ref(`TradeNow/${category}/${adkey}`).update(pushdata).then(function(){


      productname.value = '';
      
      ProductPrice.value = '';
      ProductYear.value = '';
      ProductModel.value = '';
      productdescription.value = '';

      
        shownotif("Success!","You ad has been succesfully updated...","success","3")
        setTimeout(function(){location.reload()},1000)
    })

}



}



