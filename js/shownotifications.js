var fadeout = 'animated fadeOutDown'
function shownotif(title,msg,type,time){
$.notify({
	// options
	icon: 'glyphicon glyphicon-warning-sign',
	title: title+': ',
	message: msg,
	target: '_blank'
},{
	// settings
	element: 'body',
	position: null,
	type: type,
	allow_dismiss: true,
	newest_on_top: false,
	showProgressbar: false,
	placement: {
		from: "top",
		align: "right"
	},
	offset: 20,
	spacing: 10,
	z_index: 1031,
	delay: time+"000",
	timer: 1000,
	url_target: '_blank',
	mouse_over: null,
	animate: {
		enter: 'animated fadeInDown',
		exit: 'animated fadeOutDown'
	},
	onShow: null,
	onShown: null,
	onClose: null,
	onClosed: null,
	icon_type: 'class',
	template: '<div data-notify="container" onclick="this.className += fadeout" style="z-index:9999" class="col-md-5 alert alert-{0}" role="alert">' +
		'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
		'<span data-notify="icon"></span> ' +
		'<span style="font-weight:800" data-notify="title">{1}</span> ' +
		'<span data-notify="message">{2}</span>' +
		'<div class="progress" data-notify="progressbar">' +
			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
		'</div>' +
		'<a href="{3}" target="{4}" data-notify="url"></a>' +
	'</div>' 
});
}




function pushnotif(title,msg,time,url,imglink){
$.notify({
	// options
	icon: 'glyphicon glyphicon-warning-sign',
	title: title+': ',
	message: msg,
    url: url,
	target: '_self'

},{
	// settings
	element: 'body',
	position: null,
	type: "info",
	allow_dismiss: true,
	newest_on_top: false,
	showProgressbar: false,
	placement: {
		from: "top",
		align: "left"
	},
		offset: {
		x: 5,
		y: 220
	},
	spacing: 10,
	z_index: 1031,
	delay: time+"000",
	timer: 1000,
	url_target: '_blank',
	mouse_over: null,
	animate: {
		enter: 'animated fadeInDown',
		exit: 'animated fadeOutDown'
	},
	onShow: null,
	onShown: null,
	onClose: null,
	onClosed: null,
	icon_type: 'class',
	template: `

  <div onclick="this.className +='animated fadeOutDown' " class="toast">
    <div class="box">
      <img class="avatarimg" src="${imglink}">
      <div class="info">
        <strong class="notifname">${title}</strong><br><text class="notifmsg">${msg}</text>
      </div>
      <div class="actions">
        <a onclick="location.href='${url}'; setTimeout(function(){ location.href='${url}'; location.reload()},500) " href="${url}" class="button"> View</a>
        
      </div>
    </div>
    
  </div>
` 
});
}






















function ToastAlert(Ad,msg){
$.notify({
	// options
	icon: 'glyphicon glyphicon-warning-sign',

},{
	// settings
	element: 'body',
	position: null,
	type: "info",
	allow_dismiss: true,
	newest_on_top: false,
	showProgressbar: false,
	placement: {
		from: "bottom",
		align: "left"
	},
		offset: {
		x: 10,
		y:1
		
	},
	spacing: 10,
	z_index: 1031,
	delay: "3000",
	timer: 1500,
	url_target: '_blank',
	mouse_over: null,
	animate: {
		enter: 'animated fadeInDown',
		exit: 'animated fadeOutUp'
	},
	onShow: null,
	onShown: null,
	onClose: null,
	onClosed: null,
	icon_type: 'class',
	template: `

      <div class="TheToastAlert" id="${Ad}"><div id="img" ><img  id="Toast2Img" class="toast2-img" src="complete.png"></div><div id="desc">${msg}</div></div>
` 


});


  var x = $(`#${Ad}`)
  
  
    x.attr('class', "TheToastAlert show")
    setTimeout(function(){ document.getElementById(Ad).style += "display:none !important;" }, 5000);
}