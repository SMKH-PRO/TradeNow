



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

