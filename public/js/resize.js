//http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
//angular
$(window).resize(function(){
    var w = $(window).width();
    if(w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
}); 

$(window).resize(function(){ //Update dimensions on resize
  sw = document.documentElement.clientWidth;
  sh = document.documentElement.clientHeight;
  checkMobile();
});

//variable for client side
var windowWidth = window.screen.width < window.outerWidth ?
                  window.screen.width : window.outerWidth;
var mobile = windowWidth < 500;

  
//Check if Mobile
function checkMobile() {
  mobile = (sw > breakpoint) ? false : true;

  if (!mobile) { //If Not Mobile
    $('[role="tabpanel"],#nav,#search').show(); //Show full navigation and search
  } else { //Hide 
    if(!$('#nav-anchors a').hasClass('active')) {
      $('#nav,#search').hide(); //Hide full navigation and search
    }
  }
}

//mobile
function isDeviceMobile(){
 var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/mobile|Mobile/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/BB10; Touch/);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/webOS/i) ;
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};      
 return isMobile.any()
}


// don't work on ie8/9
$( document ).ready(function() {      
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {
        //Conditional script here
    }
 });