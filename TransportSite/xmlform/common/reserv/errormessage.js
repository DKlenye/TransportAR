var errmsg = document.getElementById('__ERRORMESSAGE');
if (errmsg != null) {
  alert("Œÿ»¡ ¿\n\n"+errmsg.innerText);
}

var ddobjectreadonly = document.getElementsByTagName("input");
for (var i=0; i<ddobjectreadonly.length; i++) {
  if (ddobjectreadonly[i].readOnly)   { ddobjectreadonly[i].style.backgroundColor = "MENU"; ddobjectreadonly[i].style.color = "MENUTEXT"; };
}