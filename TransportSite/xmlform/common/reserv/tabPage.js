function setActiveTab(AHref, AInd) {

  // ���� ������
  var objTd = AHref.parentElement;
  var objTr = objTd.parentElement;
  for (var i=0; i<objTr.childNodes.length; i++) {
    objTr.childNodes.item(i).className = "passivetab"; 
  }
  // ���� �����
  objTd.className = "activetab";

  // ***
  // *** VIRTUAL
  // ***
  openCurrentFrame(AInd); 

  return false;
}

//
function showCurrentFrame(AFrame, AUrl) {

  var ifr = document.getElementById(AFrame);
  ifr.src = AUrl;
  ifr.style.visibility="visible";
  
}