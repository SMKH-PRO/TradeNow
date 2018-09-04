var closebtn = document.getElementById("CloseThisAd")


function deletethiad(category,adkey){

    if (confirm("Do You Want To Delete This Ad? \n Click ''Ok'' To Confirm. ") == true ) {
        firebase.database().ref(`TradeNow/${category}/${adkey}`).remove().then(function(){

            shownotif('Done!','This Ad Has Been Deleted From Our Database.','success','3')
            closethisad()
        });

        
    } else {
        //do nothing
    }
}



function showthisad(adkey,ownerid,category){
var AdPic1= document.getElementById("productpic1");
var AdPic2= document.getElementById("productpic2");
var AdPic3= document.getElementById("productpic3");

$('[title]').tooltip('hide');

    firebase.database().ref(`USERDETAILS/${ownerid}`).once('value',function(AdOwnerData){
       document.getElementById("addetailsusername").innerHTML =  AdOwnerData.child('FirstName').val();

       document.getElementById("addetailuserlink").setAttribute('href',`/userads.html#${ownerid}`)
       document.getElementById("addetailuserlink").setAttribute('target',`'_blank'`)
       document.getElementById("addetailsusername").style="cursor:pointer;"
       document.getElementById("addetailsuserimg").src =  AdOwnerData.child('ProfilePic').val();
       document.getElementById("bigimageofthisaduser").addEventListener('click',function(){ BigPicture({ el: this, imgSrc: AdOwnerData.child('ProfilePic').val()})});







       
//Here ad data calling:
        firebase.database().ref(`TradeNow/${category}/${adkey}`).once('value',function(AdData){
            
document.getElementById("adLink").value = window.location.origin+"/"+category.toLowerCase()+".html#"+AdData.key;

            document.getElementById("shareadbtn").addEventListener('click',function(){  copylink() })




document.getElementById("addetailtime").innerHTML=  AdData.child("PostTime").val()+", "+AdData.child('PostDate').val()

document.getElementById("addetailsproductname").innerHTML = AdData.child('product').val()

document.getElementById("addetailmodel").innerHTML = AdData.child('Model').val();
document.getElementById("addetailyear").innerHTML = AdData.child('Year').val();
document.getElementById("addetailcategory").innerHTML = AdData.child('category').val();

document.getElementById("addetailprice").innerHTML = AdData.child('Price').val();
document.getElementById("addetailsdescription").innerHTML = AdData.child('Description').val();
//SET SRC 
AdPic1.src= AdData.child("img1").val();
AdPic2.src= AdData.child("img2").val();
AdPic3.src= AdData.child("img3").val();
//SET BIG PICTURE ON CLICK 
AdPic1.addEventListener('click',function(){BigPicture({ el: this, imgSrc: AdData.child("img1").val() })});
AdPic2.addEventListener('click',function(){BigPicture({ el: this, imgSrc: AdData.child("img2").val() })});
AdPic3.addEventListener('click',function(){BigPicture({ el: this, imgSrc: AdData.child("img3").val() })});
//SET ICONS/INDICATORS
document.getElementById("productpic1icon").src= AdData.child("img1").val();
document.getElementById("productpic2icon").src= AdData.child("img2").val();
document.getElementById("productpic3icon").src= AdData.child("img3").val();

        })//ad data calling ends here

    })//owner data calling ends here









       if(ownerid === firebase.auth().currentUser.uid){
      
  
      
$("#ChatNowBtn").fadeOut(5,function(){
    $("#EditAd").fadeIn();
    $("#DeleteAd").fadeIn();
    $('#theparentofalldom').attr('style' ,  'filter: blur(55px);') 
    document.getElementById("EditAd").setAttribute('onclick', "updatethisad('"+adkey+"','"+category+"')");
    document.getElementById("DeleteAd").setAttribute('onclick',"deletethiad('"+category+"','"+adkey+"')");
    
    $('#ThisAdInfo').modal({backdrop: 'static', keyboard: false})
});



      


      
      
 
       }

       else{
        $("#DeleteAd").fadeOut(10,function(){
            $("#EditAd").fadeOut(10,function(){
                
                $("#ChatNowBtn").fadeIn();
        document.getElementById("ChatNowBtn").href =  'CHAT/#'+ownerid;
        $('#theparentofalldom').attr('style' ,  'filter: blur(55px);') 
                $('#ThisAdInfo').modal({backdrop: 'static', keyboard: false})
            });
        });
        
        
       }
 
    




} //Here ShowData Function Ends

function closethisad(){
    
      
      $('#theparentofalldom').attr('style' ,  'animation: unblurbody 1000ms ease-in-out; filter: blur(0px);')
      setTimeout(function(){$('#ThisAdInfo').modal('hide')},500)

}

closebtn.addEventListener('click',closethisad)





document.getElementById("updateadclose").addEventListener('click',function(){
    $('#updateAd').modal('hide');
    
    
    $('#ThisAdInfo').modal({backdrop: 'static', keyboard: false})


    setTimeout(function(){
    document.getElementById("dom-body").className = "modal-open"
},500)
})













function updatethisad(adkey,category){

    document.getElementById('updateadbtn').setAttribute('onclick',`updatead('${adkey}','${category}')`)


    firebase.database().ref(`TradeNow/${category}/${adkey}`).once('value',function(data){
//console.log(data.val())

//console.log('adkey: '+adkey+' Cate:- '+category)
        if(data.child('PostedBy').val()  == firebase.auth().currentUser.uid){

          $('#ThisAdInfo').modal('hide');


          setTimeout(function(){
            document.getElementById("dom-body").className = "modal-open"

          },500)
           
           

            $('#updateAd').modal({backdrop: 'static', keyboard: false})

           document.getElementById("ProductPic1img").src=data.child("img1").val();
           document.getElementById("ProductPic2img").src=data.child("img2").val();
           document.getElementById("ProductPic3img").src=data.child("img3").val();
           document.getElementById("ProductName").value = data.child("product").val()

           
           
           
           document.getElementById("ProductPrice").value=data.child("Price").val();
           document.getElementById("ProductYear").value=data.child("Year").val();
           document.getElementById("ProductModel").value = data.child("Model").val()
           document.getElementById("ProductDescription").value = data.child("Description").val().replace(/<br\s?\/?>/g,"\n");

        }

        else{

            shownotif('Warning!','You are not the owner of this ad,You dont have permission to edit this ad','danger','5')
        }


    })
}








function copylink(){



    document.getElementById("adLink").select();  document.execCommand("copy");

    
shownotif("Copied! ","Link to this ad has been copied,You can share it now",'info','5')

    
}


