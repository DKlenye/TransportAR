//
//
//
var FormMode = "";
//
function _notify(AParam) {

  if (parent.NotifyTopFrame) { parent.NotifyTopFrame(AParam, window);  }
  return true;

}

//
//
//
function hideButton(AName) {
  if (document.getElementById(AName)) {
    document.getElementById(AName).style.display = 'none';
  }
}
//
function setMode(AMode) {


  FormMode = AMode;

  hideButton('xmlformsavebutton');
  hideButton('xmlformdeletebutton');
  hideButton('xmlformnewbutton');
  hideButton('xmlformcancelbutton');


  try {
    if (AMode=="UPDATE") {
      document.getElementById('xmlformsavebutton').style.display = 'block';
    }
    else if (AMode=="INSERT") {
      try {
        document.getElementsByTagName("form")[0].style.visibility = "visible";
        document.getElementById('xmlformnewbutton').click();
      }
      catch(ex) { ; }
    }
    else if (AMode=="DELETE") {
      document.getElementById('xmlformdeletebutton').style.display = 'block';
      document.getElementById('xmlformdeletebutton').onclick = submitDelete;
    }
  }
  catch(ex) { ; }

}

//
//
//
function submitDelete() {
  document.getElementById("__ACTION").value = "DELETE";
}

//
//
//
var __prologue = false;
function Prologue() {

  Loaded();

}
//
function Loaded() {

	try {
		LoadedStart();
	}
	catch(ex) { ; }

  if (__prologue) return;


  __prologue = true;

//  document.getElementById("__loadingMessage").style.display = "none";
//  document.getElementsByTagName("form")[0].style.visibility = "visible";

  setMode(); // close all


  var errmsg = document.getElementById('__ERRORMESSAGE');
  if (errmsg == null) {
    _notify("load");
  }

  firstInputFocus(); // ?!?!?!

	try {
		LoadedFinish();
	}
	catch(ex) { ; }

}

//
//
//
function setFormEditSize(AHeight, AWidth) {

  if (AHeight != null) {
    parent.document.getElementById("resultframe").height = AHeight;
    document.getElementById("resulttable").parentElement.style.posHeight = AHeight-74;
  }

  if (AWidth != null) {
    parent.document.getElementById("resultframe").width = AWidth;
    document.getElementById("resulttable").parentElement.style.posWidth = AWidth-30;
  }

}

