

var connectedRef = firebase.database().ref(".info/connected");



function copylink2(){



    document.getElementById("adLink2").select();  document.execCommand("copy");

    
shownotif("Copied! ","Link to this ad has been copied,You can share it now",'info','5')

    
}

document.getElementById("shareadbtn2").addEventListener('click',function(){  copylink2() })


function closethisad2(){
    
    
    
          $('#theparentofalldom').attr('style' ,  'animation: unblurbody 1000ms ease-in-out; filter: blur(0px);')


setTimeout(function(){
    $('#ThisOfflineAdInfo').modal('hide') },100)
        


    

    
}

document.getElementById("CloseThisAd2").addEventListener('click',closethisad2)

//showofflinead('"+AdData.product+"','"+AdData.Description+"','"+AdData.Model+"','"+AdData.Year+"','offlineError.png')

function showofflinead(time,adname,description,category,ownerid,price,model,year,pic,adkey){



    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            if(window.location.pathname == "/WishList.html"){
                      $('#OfflineChatNowBtn').attr('onclick',`location.href='CHAT/#${ownerid}'`)
            }
            else{
          $('#OfflineChatNowBtn').attr('onclick',`shownotif('Opss! ','Chat is only available when you are logged in!, Please Login.. ','warning','5'); closethisad2(); setTimeout(function(){$('#modalLRForm').modal('show');},500)`)
            }
        } else {
          $('#OfflineChatNowBtn').attr('onclick',`shownotif('No Internet!','Chat is only available when you are Online & Logged In, Please Connect Internet! ','danger','5');`)
        }
      });


    var AdPic1= document.getElementById("productpic12");
    



    $('[title]').tooltip('hide')



    document.getElementById("adLink2").value = window.location.origin+"/"+category.toLowerCase()+".html#"+adkey;


    document.getElementById("addetailtime2").innerHTML=  time;

document.getElementById("addetailsproductname2").innerHTML = adname;

document.getElementById("addetailmodel2").innerHTML = model;
document.getElementById("addetailyear2").innerHTML = year;
document.getElementById("addetailcategory2").innerHTML = category;

document.getElementById("addetailprice2").innerHTML = price;
document.getElementById("addetailsdescription2").innerHTML =  description;



AdPic1.src= pic;


AdPic1.addEventListener('click',function(){BigPicture({ el: this, imgSrc: pic })});





     $('#theparentofalldom').attr('style' ,  'filter: blur(55px);') 

    setTimeout(function(){
    $('#ThisOfflineAdInfo').modal({backdrop: 'static', keyboard: false})
},100)



}

