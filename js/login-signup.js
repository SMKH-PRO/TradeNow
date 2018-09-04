var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;







//Login SignUp
function signup(){

    
    
    e_address = document.getElementById("modalLRInput12").value;
    
    namebox = document.getElementById("name").value;
    
    pass=document.getElementById("modalLRInput13").value;
    pass_cnfrm=document.getElementById("modalLRInput14").value;
    
    
    if(namebox.length > 12){
        
        shownotif("Warning!","Name Should Be Shorter Than 11 Characters","danger","1");
        return false;
    }
    else if(namebox.length < 3){
        
        shownotif("Warning!","Name Should Be Atleast 3 Characters Long","danger","1"); 
         return false;
    }
    else if(/^[a-zA-Z ]+$/.test(namebox) !== true){
        
        shownotif("Warning!","Invalid Name, Only Alphabets Allowed (A-z)","danger","1"); 
         return false;
    }
    else if(e_address.length<6){
        shownotif("Warning!","Please Write Valid Email Address.","danger","1"); 
         return false;
    }
    else if(pass<6 ){
        shownotif("Warning!","Password Needs To Be 6 Characters Long..","danger","1"); 
    }
    
    else if(pass==pass_cnfrm ){
    if(re.test(e_address)){
    shownotif("Loading","Please Wait While We Are Signing You Up On Our Website..!","info","1");
    }
     var username = localStorage.setItem('Name', namebox);
    
    //FireBase SignUp
    var signup= firebase.auth().createUserWithEmailAndPassword(e_address, pass);
    signup.catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      
      shownotif("Error",errorMessage+", "+errorCode,"danger","3")
      // ...
    });
    
    signup.then(function() {
      // Handle Errors here.
      shownotif("Success!","You are now our registered user, you are now logged in.","success","2")
      
    // console.log('%c'+firebase.auth().currentUser, 'font-weight: bold; font-size: 20px;color: red; text-shadow: 0px 0px 10px black; border: 2px Solid black; padding:6px; border-radius:10px; display:block;');
    
    if(window.location.pathname != "/login.html"){
        location.reload();
    }
    
    
    updatename()  
      // ...
    });
    
   
    function updatename(){
    
    
        var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName:  localStorage.getItem("Name"),
      photoURL: "/defaultuser.png"
    }).then(function() {
      // console.log(user.displayName)


      
    }).catch(function(error) {
      // An error happened.
      shownotif("Error",error,"danger","1")
    });
        
        
        
    }
    
    
    //firebase signup above
    
    
    
    
    }
    else{
       shownotif("Error","Password didn't matched, try again","danger","1")
    
    }
    }



    document.getElementById("signup-btn").addEventListener("click", signup);


    document.getElementById("modalLRInput12").addEventListener("keydown",function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    
    document.getElementById("name").addEventListener("keydown",function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    
    document.getElementById("modalLRInput13").addEventListener("keydown", function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    document.getElementById("modalLRInput14").addEventListener("keydown", function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
     
   
   



function login(){
	

	
    var email = document.getElementById('modalLRInput10').value;
	var pass = document.getElementById('modalLRInput11').value;
	
	 var n = localStorage.getItem("email_address");
   	var p =localStorage.getItem("password");
	
		if(re.test(email) === true && pass.length > 5){
		    
		    shownotif("Loading!","Please Wait While We Are Logging You In..!","info","1")
		
		var signin =firebase.auth().signInWithEmailAndPassword(email, pass);
		signin.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  shownotif("Error: ",errorMessage+", "+errorCode,"danger","2")
  // ...
});
signin.then(function(user) {
  // Handle Errors here.

  
  shownotif("Welcome! "+user.displayName,"Successfully Logged in as "+user.email,"success","5")
  

  if(window.location.pathname != "/login.html"){
      location.reload();
  }
  // ...
});

	}
	
	else{
	    
	    if (email == "" || email == null || email == " "){
	        shownotif("Oops..!"," Email Is Missing, Please write email to login.","danger","1")
	    }
	    
	     else if (pass == "" || pass == null || pass == " "){
	        shownotif("Oops..! ","Password Box Is Empty, Please write Password to login.","danger","1")
        }
        else if(re.test(email)=== false){
            shownotif("Error","Invalid Email","danger","1")
        }
        else if(pass.length < 6){
            shownotif("Error","Password incorrect. ","danger","1")
        }
     
	    else{
 shownotif("Alert!"," Email or Password is invalid, Please write a valid email & password","danger","1")}
	}
    
    
}//login function ends here	













document.getElementById("modalLRInput10").addEventListener("keydown", function(event){ if (event.keyCode == 13) { console.log('only enter pressed') 
       login()
              }});
              
              
              
    document.getElementById("modalLRInput11").addEventListener("keydown", function(event){
        
         if (event.keyCode == 13) { console.log('only enter pressed') 
       login()
              }
        
    });
    document.getElementById("btn-login").addEventListener("click", login);
