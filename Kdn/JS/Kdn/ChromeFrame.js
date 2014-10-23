Kdn.ChromeFrame = function(){
  
  var isAvailable = function() {

    var ua = navigator.userAgent.toLowerCase();    
    if (ua.indexOf("chromeframe") >= 0) {
      return true;
    }

    if (typeof window['ActiveXObject'] != 'undefined') {
      try {
        var obj = new ActiveXObject('ChromeTab.ChromeFrame');
        if (obj) {
          obj.registerBhoIfNeeded();
          return true;
        }
      } catch(e) {}
    }
    return false;
  };  
  
  var ua = navigator.userAgent;
  var ieRe = /MSIE (\S+); Windows NT/;
  var bail = false;
  if (ieRe.test(ua)) {
      if (parseFloat(ieRe.exec(ua)[1]) < 6 &&
          ua.indexOf('SV1') < 0) {
        bail = true;
      }
  } else {
      // Not IE
      bail = true;
    }
  if (bail) {
      return;
    }
    
  var loc = "GoogleChromeframeStandaloneEnterprise.msi"
  
  if(!isAvailable()){
        Ext.Msg.notify({
            title:"Установка Google Frame",
            html:'Для более комфортной работы с программой <br/>разработчик программного обеспечения <br/>рекомендует установить дополнение.<br/><a href="'+loc+'">Установить Google Frame!</a>',
            width:350,
            height:120,
            autoHide:false,
            cls:'CFnotify'
        })
  }   
  
};