			$.get("https://jsonip.com/", function(response) {
    console.log(response.city, response.country);
    
    
     userip = response.ip;
 alert(userip)
  console.log(response)

}, "jsonp");