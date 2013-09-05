//  *************************************
//  COOKIES
//  *************************************
var cookieName   = "gridselectedrowId";

//  *****************************************************************************
//  MOUSE NAVIGATION
//  *****************************************************************************
function setMouseNavigation(AGrid, ABgColor,AFgColor , ABgSelect,AFgSelect, AArrayKeyCols) {

  AGrid.onmouseover = mouseNavigationOver;
  AGrid.onmouseout  = mouseNavigationOut;
  AGrid.onclick     = mouseNavigationClick;
  AGrid.selectedRow = null;
  AGrid.allowNullSelection = true;
  AGrid.arrayKeyCols  = AArrayKeyCols;

  AGrid.AfterClick = null;

  AGrid.__bgColor  =  ABgColor; 
  AGrid.__fgColor  =  AFgColor; 
  AGrid.__bgSelect =  ABgSelect;
  AGrid.__fgSelect =  AFgSelect;

  //
  if (AArrayKeyCols == null) {
    AGrid.arrayKeyCols = new Array(1);
    AGrid.arrayKeyCols[0] = 0;
  }
  //
  var cook = getCookie(cookieName,"");
  for (var i=0; i<AGrid.rows.length; i++) {
    var cvalue = "";

    for (var c=0; c<AGrid.arrayKeyCols.length; c++) {
      cvalue += AGrid.rows.item(i).childNodes.item(AGrid.arrayKeyCols[c]).innerText;
    }

    if (cook == cvalue) {
      AGrid.rows.item(i).scrollIntoView();
      mouseNavigationClick(AGrid.rows.item(i));
      break;
    }
  }

}

//
var mouseNavigationClickObject = null;
function mouseNavigationClick(AObjEvent) {
  
  // ?!?!?!?!?!
  try { event.cancelBubble = true; }
  catch(ex) { ; }

  var isActive = false;

  var obj;
  if (AObjEvent!=null) {
    // TR
    obj = AObjEvent.cells.item(0);
  }
  else {
    obj = event.srcElement;
  }


  if (obj.tagName == "TD") {
    mouseNavigationClickObject = obj;
    // отменяем актив. восст. цвет
    //
    if (obj.offsetParent.selectedRow) {
      if (obj.offsetParent.selectedRow == obj.parentElement) isActive = true;
      mouseNavigationSetColor(obj.offsetParent.selectedRow, null, null, true);
      obj.offsetParent.selectedRow = null;
    }
    // назначаем актив. устан. цвет
    //
    if (!isActive || !obj.offsetParent.allowNullSelection) {
      mouseNavigationSetColor(obj.parentElement, null, null);
      mouseNavigationSetColor(obj.parentElement, obj.offsetParent.__bgSelect, obj.offsetParent.__fgSelect);
      obj.offsetParent.selectedRow = obj.parentElement;

      // cookies
      var cvalue = "";
      for (var c=0; c<obj.offsetParent.arrayKeyCols.length; c++) {
        cvalue += obj.parentElement.childNodes.item(obj.offsetParent.arrayKeyCols[c]).innerText;
      }
      setCookie(cookieName,cvalue,cookieExpire);

      if (obj.offsetParent.AfterClick != null) {
        obj.offsetParent.AfterClick(obj.offsetParent.selectedRow);
      }
    }
  }
}
//
function mouseNavigationOver() {
  event.cancelBubble = true;
  var obj = event.srcElement;
  mouseNavigationSetColor(obj.parentElement, obj.offsetParent.__bgColor, obj.offsetParent.__fgColor);
}
//
function mouseNavigationOut() {
  event.cancelBubble = true;
  var obj = event.srcElement;
  mouseNavigationSetColor(obj.parentElement, null, null);
}
//
function mouseNavigationSetColor(AObj, AColor, BColor, AParam)  {

  if (AObj.tagName == "TR") {
    if (AObj != AObj.offsetParent.selectedRow || AParam) {
      if (AColor==null) {
        for (var i=0; i<AObj.childNodes.length; i++) {
          obj = AObj.childNodes.item(i)
          obj.style.backgroundColor = obj.__bgColor;
          obj.style.color = obj.__fgColor;
        }
      }
      else {
        for (var i=0; i<AObj.childNodes.length; i++) {
          obj = AObj.childNodes.item(i)
          obj.__bgColor = obj.style.backgroundColor;
          obj.__fgColor = obj.style.color;
          obj.style.backgroundColor = AColor;
          obj.style.color = BColor;
        }
      }
    }
  }

}

//  ********************************************************************************
//  GENERAL SCRIPT
//  ********************************************************************************
function Loaded() {

	try {
		LoadedStart();
	}
	catch(ex) { ; }

  closeIframe();
  
  //
  //  SETUP TABLE
  //
  var hGrid = document.getElementById("_headerGrid");
  var dGrid = document.getElementById("_dataGrid");

  //
  //
  //
  dGrid.style.cursor = "hand";
  dGrid.rows.item(dGrid.rows.length-1).style.display="none";
  
  //
  //
  //
  var hTr = document.createElement("tr");
  var hTd;
  var twidth = 0;
  for (var i=0; i<dGrid.rows.item(0).cells.length; i++) {
    hTd = document.createElement("td");
    hTd.style.posWidth = dGrid.rows.item(0).cells.item(i).offsetWidth + 8;

    hTd.style.backgroundColor = "ACTIVECAPTION";
    hTd.style.color = "CAPTIONTEXT";

    dGrid.rows.item(1).cells.item(i).style.posWidth = hTd.style.posWidth;

    // ???
    twidth += hTd.style.posWidth+4; // 4 - !!!!

    hTd.appendChild(document.createTextNode(dGrid.rows.item(0).cells.item(i).innerText));
    hTr.appendChild(hTd);
  }

  //
  //
  //
  dGrid.rows.item(0).style.display="none";

  hGrid.getElementsByTagName("tbody")[0].appendChild(hTr);
  // ???
  if (document.getElementById("datagrid").style.posWidth < (twidth + 32))
    document.getElementById("datagrid").style.posWidth = twidth + 32;

  
  //setMouseNavigation(dGrid, "E9E9E9","black" ,"darkgray","white");
  setMouseNavigation(dGrid, "E9E9E9","BUTTONTEXT" , "HIGHLIGHT","HIGHLIGHTTEXT");
  // "THREEDFACE","BUTTONTEXT");
  // "whitesmoke","black",
  

  document.getElementById("__loadingMessage").style.display = "none";
  document.Form1.style.visibility = "visible";

  // VER 2 для работы во фреймах
  if (parent && parent.GridNotification) {
    parent.GridNotification(window, "loaded");

  }

	try {
		LoadedFinish();
	}
	catch(ex) { ; }

}

//
//
//
function gridButtonClick(AButton) {

  var strVal = "";
  var strPar = "";
  var objNm = document.getElementById("_dataGrid");
  var objTf = objNm.rows.item(objNm.rows.length-1);

  var strSearch = "";

  if (AButton=="INSERT") {
    strSearch = "";
  }
  else {
    // values
    if (objNm.selectedRow) {
      for (var i=0; i<objTf.childNodes.length; i++) {
        if (objTf.childNodes.item(i).innerText.replace(/ /gi,"").length>0) {
          strVal += "&"+objTf.childNodes.item(i).innerText+"="+objNm.selectedRow.childNodes.item(i).innerText;
        }
      }
    }
    strSearch = strVal;
  }

  if (objNm.selectedRow || AButton=="INSERT" ) {

    strPar = "?xml="+document.Form1.__EDITFORM.value;

    // params
    var objPr = document.getElementById("__submitParametersTable");
    var objSl = objPr.getElementsByTagName("select");
    for (var i=0; i<objSl.length; i++) {
      strPar += "&"+objSl[i].name+"="+objSl[i].value;
    }
    var objSl = objPr.getElementsByTagName("input");
    for (var i=0; i<objSl.length; i++) {
      strPar += "&"+objSl[i].name+"="+objSl[i].value;
    }

    strSearch = strPar + strSearch;
    openIframe(AButton, strSearch);

  }
}

//--------------------------------------------------------------
//  IFRAME
//--------------------------------------------------------------
var IFRAMENAME = "resultframe";
var ___atomMode  = "";
var ___loadAfterSubmit = false;
//
function closeIframe() {

  try { beforeCloseIframe(); } catch(ex) { ; }

  document.getElementById("transparant").style.display ="none";
  var ifr = document.getElementById(IFRAMENAME);
  ifr.style.display ="none";
  ifr.src = "";
  ___atomMode  = "";
  ___loadAfterSubmit = false;

}
//
function openIframe(AMode, ASearch) {
  ___atomMode  = AMode;
  document.getElementById("transparant").style.display = 'block';
  var ifr = document.getElementById(IFRAMENAME);
  ifr.src = "xmlformedit.aspx"+ASearch+"&__ACTION=true&__ATOMMODE="+___atomMode;
  ifr.style.display="block";
}                                                            

//========================================================
//
//========================================================
//
var NotifyTopFrame = ___notifyTopFrame;
function ___notifyTopFrame(AParam, AWindow) {

  if (AParam == "submit") {
    ___loadAfterSubmit = true;
  }
  else if (AParam == "load") {
    if (___loadAfterSubmit) {
      // the action is considered to be completed -- close iframe
          closeIframe();
          document.getElementsByTagName("form")[0].submit();
    }
    else {
      // 
      if (AWindow.setMode) AWindow.setMode(___atomMode);
    }
  }
  else if (AParam == "close") {
    closeIframe();
  }
}

//
//
//
function setFormGridSize(AHeight, AWidth) { // depricated

  if (AHeight != null) {
    var h = document.getElementById("datagrid").style.posHeight;
    document.getElementById("datagrid").style.posHeight = AHeight;
    document.getElementById("resultframe").parentElement.style.posTop -=  (AHeight - h);

  }

  if (AWidth != null) {
    document.getElementById("datagrid").style.posWidth = AWidth;
  }

  document.getElementById("transparant").style.posTop = document.getElementById("transparant").style.posTop + h - AHeight;

}
