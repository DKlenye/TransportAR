//  *************************************
//  COOKIES
//  *************************************

var cookieExpire = "Mon, 22 Jan 2080 00:00:01 UTC";

function setCookie(AName, AValue, AExp) {
  var str = AName+"="+AValue+";"
  if (AExp) str += "Expires="+AExp;
  document.cookie = str;
}

//
function getCookie(AName, ADefault) {
  var ret = ADefault;
  var str = document.cookie;

  var pos = str.indexOf(AName+"=")
  if (pos>=0) {
    var pos1=str.indexOf(";",pos);
    if (pos1<0) pos1=document.cookie.length;
    ret = str.substring(pos+AName.length+1,pos1);
  }
  return ret;
}
