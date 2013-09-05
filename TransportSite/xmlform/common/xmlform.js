//
//  ERRORS
//
var errmsg = document.getElementById('__ERRORMESSAGE');
if (errmsg != null) {
  alert("ОШИБКА\n\n"+errmsg.innerText);
}

//
//  READONLY
//
var ddobjectreadonly = document.getElementsByTagName("input");
for (var i=0; i<ddobjectreadonly.length; i++) {
  if (ddobjectreadonly[i].readOnly)   {
    ddobjectreadonly[i].style.backgroundColor = document.styleSheets[0].rules(0).style.inputReadonlyBackgroundColor; //"THREEDFACE";
    ddobjectreadonly[i].style.color = document.styleSheets[0].rules(0).style.inputReadonlyColor; // "BUTTONTEXT";
  }
}

//
//  SERVICES
//

//==================================================================================
//  getList.aspx
//
function getListParams() {

  this.caption = "список";

  this.value  = "";
  this.text   = "";

  this.table  = "";  // list
  this.search = "";

  this.order  = "";

  this.beforeDialogOpen = null;
  this.afterDialogOpen = null;

}
//
function openGetListDialog(AGetListParams) {

//  if (AGetListParams.beforeDialogOpen != null) 
//    AGetListParams.beforeDialogOpen(AGetListParams);
    
//  var tm    = new Date().getTime();
  //var res = showModalDialog("getList.aspx?time="+tm+"&list="+AGetListParams.table+"&value="+AGetListParams.value+"&text="+AGetListParams.text+"&caption="+AGetListParams.caption+(AGetListParams.search.lentgh==0,"","&search="+AGetListParams.search)+(AGetListParams.order.lentgh==0,"","&order="+AGetListParams.order) , null , "dialogWidth:500px;dialogHeight:420px;center:yes;status=0");

  var res = showModalDialog(getUrlGetListDialog(AGetListParams)  , null , "dialogWidth:500px;dialogHeight:420px;center:yes;status=0");
  
  return res;
}
//
function getUrlGetListDialog(AGetListParams) {

  if (AGetListParams.beforeDialogOpen != null) 
    AGetListParams.beforeDialogOpen(AGetListParams);
    
  var tm    = new Date().getTime();

  return "getList.aspx?time="+tm+
          "&list="+AGetListParams.table+
          "&value="+AGetListParams.value+
          "&text="+AGetListParams.text+
          "&caption="+AGetListParams.caption+
          (AGetListParams.search.lentgh==0,"","&search="+AGetListParams.search)+
          (AGetListParams.order.lentgh==0,"","&order="+AGetListParams.order);
  
}

//-----------------------------------------------------------------
// find item (use getList)
//
function createSearchingElementInput() {

  var input = document.createElement("input");
  input.type = "text";
  input.size = 50;
  input.id = "__SearchingElement";
  input.className = "searchElement";

  return input;
}
//
function createSearchingElementButton() {
  var input = document.createElement("input");

  input.type = "button";
  input.value = "найти"
  input.id = "__SearchingElementButton";
  input.className = "searchButton";

  return input;
}
// OLD
function createSearchingElement(AGetListParams, AResultFunction, AElement, ACaption) {

  var selem = document.createElement((AElement == null ? "div" : AElement));
  selem.noWrap = true;
  selem.appendChild(document.createTextNode((ACaption == null ? "поиск: " : ACaption)));

  var input = createSearchingElementInput();
  input.resultFunction = AResultFunction;

  selem.appendChild(input);

  input = createSearchingElementButton();
  //---------------------------------------------------------------
  //
  input.onclick = function() {

    var fvalue = document.getElementById("__SearchingElement").value;
    if (fvalue.substring(0,1) < "9" && fvalue.substring(0,1) != " ")
      document.getElementById("__SearchingElement").value = " "+fvalue;

    res = openGetListDialog(AGetListParams);
    if (res != null) {
      document.getElementById("__SearchingElement").resultFunction(res);
    }

  }
  //
  //---------------------------------------------------------------

  selem.appendChild(input);

  return selem;
}

//
//
//
function createSearchingLink(AGetListParams, AResultFunction, AElement) {

  var selem = document.createElement((AElement == null ? "div" : AElement));
  selem.noWrap = true;
  selem.appendChild(document.createTextNode("поиск: "));

  var input = document.createElement("input");
  input.type = "text";
  input.size = 50;
  input.id = "__SearchingElement";
  input.style.border="1px solid ACTIVECAPTION";
  input.resultFunction = AResultFunction;

  selem.appendChild(input);

  input = document.createElement("input");
  input.type = "button";
  input.value = "найти"
  input.id = "__SearchingElementButton";
  input.style.border="0px solid ACTIVECAPTION";
  input.style.backgroundColor = "WINDOW";
  input.style.Color = "WINDOWTEXT";
  input.style.textDecoration = "underline";
  //---------------------------------------------------------------
  //
  input.onclick = function() {

    var fvalue = document.getElementById("__SearchingElement").value;
    if (fvalue.substring(0,1) < "9" && fvalue.substring(0,1) != " ")
      document.getElementById("__SearchingElement").value = " "+fvalue;

    res = openGetListDialog(AGetListParams);
    if (res != null) {
      document.getElementById("__SearchingElement").resultFunction(res);
    }

  }
  //
  //---------------------------------------------------------------

  selem.appendChild(input);

  return selem;
}

//**************************************************************
//  1-st
//
function firstInputFocus() {

  var inpt = document.getElementsByTagName("input");
  for (var i=0; i<inpt.length; i++) {
    if (inpt[i].type == "text") {
      if (inpt[i].id.substring(0,2) != "__" && inpt[i].readOnly==false && inpt[i].disabled==false && inpt[i].style.display != "none" && inpt[i].style.visibility != "hidden") {
        try {
          inpt[i].select();
          inpt[i].focus();
          break;
        }
        catch(ex) { ; }
      }
    }
  }

  try {
    document.getElementById("__loadingMessage").style.display = "none";
    document.getElementsByTagName("form")[0].style.visibility = "visible";
  }
  catch(ex) { ; }

}

//
//  PARAMETERS - SUBMIT - AUTORELOAD ...
//
function __onSubmit() {

  var obj = document.getElementById("__submitParametersTable");
  if (obj != null) {

    var tags = Array("input", "select");

    for (var t=0; t<tags.length; t++) {

      var inp = obj.getElementsByTagName(tags[t]);

      for (var i=0; i<inp.length; i++) {
        if (String(inp[i].originalValue) != "undefined") {
          if (inp[i].originalValue != inp[i].value) {
            // не даем submit т.к. нужно обновить все
            // поля, которые могут зависеть от изменения 
            // autopostback
  
            // *** SUBMIT is available when EVERY input has not been changed

            return false;
          }
        }
      }

    }
  }

  return true;

}

//
//
//
function setForm1Visible() {
  document.getElementById("__loadingMessage").style.display = "none";
  document.getElementsByTagName("form")[0].style.visibility = "visible";
}