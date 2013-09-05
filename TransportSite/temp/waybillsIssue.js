//
// координаты строки = координаты ошибки - 1
//

//
// сообщения о клавишах
//
var helpArray = new Array();
helpArray[0] = "<i>[Enter]</i>-перемещение между выделенными полями";
helpArray[1] = "<i>[Enter]</i>-выдать путевой лист";
helpArray[2] = "<i>[вверх/вниз]</i>-перемещение по полям ввода";
helpArray[3] = "<i>[Insert][Delete]</i>-добавить/удалить водителя <i>[пробел]</i>-отметить";
helpArray[4] = "<i>[влево]</i>-выбор бланка";
helpArray[5] = "<i>[вправо]</i>-кнопка ВЫДАТЬ";
helpArray[6] = "<i>[Enter]</i>-открыть форму для гар.номера";
helpArray[7] = "<i>[Enter]</i>-выбрать водителя";


function showHelp(ASet) {
	var obj = document.getElementById("help");
	obj.innerHTML = "";

	if (ASet) {
		var ahelps = ASet.split(",");
		for (var i=0; i<ahelps.length; i++) {
			obj.innerHTML += " "+helpArray[parseInt(ahelps[i])];
		}
	}

}

//
// битовый флаг для распознавания перехода к след.пред.
// полю если курсор на первом.последнем элем.в списке
// ххх
// |||_крайнее верхнее положение
// ||__крайнее нижнее положение
// |___признак нажатия клавиши и если при след. нажатии не произойдёт смена позиции
//     и флаг не сбросится => нажата таже клавиша что и прежде, то происходит передача фокуса
//
var driverListSpecFlag = 0; 

//
function setDriverListSpecFlag() {
	driverListSpecFlag=0;

	if (document.forms[0].driversList.options.length <= 1) {
		driverListSpecFlag=7;
		return;
	}
	else {
		if (document.forms[0].driversList.selectedIndex==0)
    	driverListSpecFlag=1;
    else if (document.forms[0].driversList.selectedIndex==(document.forms[0].driversList.options.length-1))
    	driverListSpecFlag=2;
	}

}

//
//  клавиши ***************************
//
var selectedItemPrefix = "[X]";
var unselectedItemPrefix = "[_]";

function keyPressed() {
	switch(event.srcElement.id) {
		case "formNumber":
			if (event.keyCode==38) { // up
				document.forms[0].garageNumber.focus();
			}
			else if (event.keyCode==40) { // dn
				document.forms[0].ScheduleBlock.focus();
			}
			break;
		case "ScheduleBlock":
			if (event.keyCode==38) { // up
				document.forms[0].garageNumber.focus();
			}
			else if (event.keyCode==40) { // dn
				document.forms[0].shift.focus();
			}
			break;
		case "shift":
			if (event.keyCode==38) { // up
				document.forms[0].ScheduleBlock.focus();
			}
			else if (event.keyCode==40) { // dn
				document.forms[0].daysCount.focus();
			}
			break;
		case "daysCount":
			if (event.keyCode==38) { // up
				document.forms[0].shift.focus();
			}
			else if (event.keyCode==40) { // dn
				// document.getElementById("buttonIssue").focus();
				document.forms[0].driversList.focus();
			}
			break;
		case "driversList":
			if (event.keyCode==32) { // space
				var ind = event.srcElement.selectedIndex;
				var obj = event.srcElement.options[event.srcElement.selectedIndex];

				// выбран или не выбран
				if (obj.text.substring(0,3) == selectedItemPrefix) {
					obj.text = unselectedItemPrefix + obj.text.substring(3);
				}
				else {
					obj.text = selectedItemPrefix + obj.text.substring(3);
				}

        event.srcElement.selectedIndex = ind;

			}
			else if (event.keyCode==13) { // enter
				// document.getElementById("buttonIssue").focus();
				if (event.srcElement.selectedIndex >= 0) {
        	document.getElementById("buttonChooseDrivers").click();
        }
			}
			else if (event.keyCode==45) { // ins
				document.forms[0].buttonSetDriver.click();
			}
			else if (event.keyCode==46) { // del
				SubmitEnabled = true;
				document.forms[0].buttonExcludeDriver.click();
			}
			else if (event.keyCode==38 || event.keyCode==33) { // up pgUp
				if ((driverListSpecFlag & 5)==5) {
					document.forms[0].daysCount.focus();
				}
				driverListSpecFlag |= 4; // признак - нажата клавиша и если в след.раз не будет смены позиции и будет нажата клавиша, то произойдет передача фокуса
			}
			else if (event.keyCode==40 || event.keyCode==34) { // dn pgDn
				if ((driverListSpecFlag & 6)==6) {
					document.getElementById("buttonIssue").focus();
				}
				driverListSpecFlag |= 4; // признак - нажата клавиша и если в след.раз не будет смены позиции и будет нажата клавиша, то произойдет передача фокуса
			}
			break;
		case "buttonIssue":
			if (event.keyCode==38) { // up
				// document.forms[0].daysCount.focus();
				document.forms[0].driversList.focus();
			}
			else if (event.keyCode==40) { // dn
				document.forms[0].way.focus();
			}
			else if (event.keyCode==45) { // ins
				document.forms[0].buttonSetDriver.click();
			}
			else if (event.keyCode==37) { // left
				document.forms[0].waybillTypesList.focus();
			}
			break;
		case "way":
			if (event.keyCode==38) { // up
				document.getElementById("buttonIssue").focus();
			}
		case "waybillTypesList":
			if (event.keyCode==13) { // enter
				document.getElementById("buttonIssue").click();
			}
			else if (event.keyCode==39) { // right
				document.getElementById("buttonIssue").focus();
			}
	}
	return true;
}

// запрещается SUBMIT - разрешается для определенных элементов
var SubmitEnabled = false;
// обнуление полей при первом нажатии клав.в поле гар.номер
var ClearFields = true;
// флаг печати
var PrintEnabled = false;

// 

// -----------------------------------------------------------------------
//
//
function Loaded() {



  if (PrintEnabled) { 
  
  
  
  var f = document.getElementById('printFrame').src = "http://localhost:6612/Transport/waybillsIssue/Bus.aspx?garageNumber=980&ownerId=1&waybillNumber=2062809800";

  
	PrintEnabled = false;
    clearPrinting();    
  	



  

//window.print();
  // document.getElementById("printButton").style.display = "";			// /* */

         
  
  
  	//printWayBill();
	
	//alert('test');
	
  	return;
  }


document.getElementById("departureTime").onfocus=function() {document.getElementById("garageNumber").focus();}
document.getElementById("returnTime").onfocus=function() {document.getElementById("garageNumber").focus();}

  // инициализация спец. полей формы, требующие submit
  initSubmitElement(document.forms[0].buttonPrintWaybill, "garageNumber", true);
  
  // будет разрешена операция submit если нажата Enter и фокус на этих элементах
  // установка tab - order
  //
  // вводим свой onfocus / onblur- дополнение к стандартной обработке для навигации
  document.forms[0].garageNumber.onfocus = function() { setClassName(); showHelp("6"); }
  document.forms[0].garageNumber.onblur = clearClassName;
  initSubmitElement(document.forms[0].garageNumber, "formNumber", true); 
	initSubmitElement(document.forms[0].openFormButton, "formNumber", true);

  document.forms[0].formNumber.onfocus = setClassName;
  document.forms[0].formNumber.onblur = clearClassName;
  document.forms[0].formNumber.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].formNumber, "buttonIssue", false);

  document.forms[0].ScheduleBlock.onfocus = setClassName
  document.forms[0].ScheduleBlock.onblur = clearClassName;
  document.forms[0].ScheduleBlock.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].ScheduleBlock, "shift", false);
  
  document.forms[0].shiftB_H.onfocus = setClassName
  document.forms[0].shiftB_H.onblur = clearClassName;
  document.forms[0].shiftB_H.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].shiftB_H, "shiftB_M", false);
  
  document.forms[0].shiftB_M.onfocus = setClassName
  document.forms[0].shiftB_M.onblur = clearClassName;
  document.forms[0].shiftB_M.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].shiftB_M, "shiftD_H", false);
  
  document.forms[0].shiftD_H.onfocus = setClassName
  document.forms[0].shiftD_H.onblur = clearClassName;
  document.forms[0].shiftD_H.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].shiftD_H, "shiftD_M", false);
  
  document.forms[0].shiftD_M.onfocus = setClassName
  document.forms[0].shiftD_M.onblur = clearClassName;
  document.forms[0].shiftD_M.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].shiftD_M, "daysCount", false);

  document.forms[0].shift.onfocus = setClassName;
  document.forms[0].shift.onblur = clearClassName;
  document.forms[0].shift.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].shift, "daysCount", false);

  document.forms[0].daysCount.onfocus = setClassName;
  document.forms[0].daysCount.onblur = clearClassName;
  document.forms[0].daysCount.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].daysCount, "buttonIssue", false);
  //
   
  
  initSubmitElement(document.forms[0].buttonClearDrivers, "driversList", true);
  initSubmitElement(document.forms[0].buttonChooseDrivers, "driversList", true);
  initSubmitElement(document.forms[0].buttonExcludeDriver, "buttonIssue", true);
  initSubmitElement(document.forms[0].buttonSetDriver, "buttonIssue", true);

  document.forms[0].driversList.onkeyup = keyPressed;
  document.forms[0].driversList.onchange = setDriverListSpecFlag;
  document.forms[0].driversList.onclick = function() { driverListSpecFlag |=4; }
	document.forms[0].driversList.onfocus = function() { if (document.forms[0].driversList.selectedIndex<0) { document.forms[0].driversList.selectedIndex=0; } document.forms[0].driversList.onchange(); driverListSpecFlag |=4; document.forms[0].driversList.offsetParent.className="dfocus"; document.forms[0].driversList.className="sfocus"; showHelp("2,3,7");}
	document.forms[0].driversList.onblur = function() { document.forms[0].driversList.offsetParent.className="dblur"; document.forms[0].driversList.className="sblur"; }
  initSubmitElement(document.forms[0].driversList,"buttonIssue", true);

  //
  document.forms[0].waybillTypesList.onkeyup = keyPressed;
  document.forms[0].waybillTypesList.onfocus = function() { document.forms[0].waybillTypesList.className="s1focus"; document.forms[0].waybillTypesList.offsetParent.className="d1focus"; showHelp("5,1"); }
  document.forms[0].waybillTypesList.onblur = function() { document.forms[0].waybillTypesList.className="s1blur"; document.forms[0].waybillTypesList.offsetParent.className="d1blur"; }
  initSubmitElement(document.forms[0].waybillTypesList,"garageNumber", true);

  //
  document.getElementById("buttonIssue").onfocus = function() { showHelp("2,3,4"); }
  document.getElementById("buttonIssue").onkeyup = keyPressed;
  initSubmitElement(document.getElementById("buttonIssue"), "garageNumber", true);

//
 document.forms[0].ScheduleBlock.onclick = Block;

  //
  document.forms[0].way.onfocus = setClassName;
  document.forms[0].way.onblur = clearClassName;
  document.forms[0].way.onkeyup = keyPressed;
  initSubmitElement(document.forms[0].way, "buttonIssue", false);

  // обнулить поля принадл. автомобилю
  document.forms[0].garageNumber.onkeypress = clearAllInputs;

  // иницииализация полей, треб. расчетов клиент.
	document.forms[0].shift.onchange = calcShift;
	document.forms[0].shiftB_H.onchange = leaveB_H;
	document.forms[0].shiftB_M.onchange = leaveB_M;
	document.forms[0].shiftD_H.onchange = leaveD_H;
	document.forms[0].shiftD_M.onchange = leaveD_M;
	document.forms[0].daysCount.onchange = calcReturnDate;
	// document.forms[0].departureDate.value = document.forms[0].basicDate.value;
	//
	calcShift();
leaveB_H();
leaveD_H();
leaveD_M();
leaveB_M();
  // устанавливаем фокус на нужный элемент
  setFormFocus();

}

//
// установить/стереть класс для элементов когда он в фокусе
//
function setClassName() {
	var obj = event.srcElement;
	obj.className = "focus";
	showHelp("0,2");
}
//
function clearClassName() {
	var obj = event.srcElement;
	obj.className = "";
	showHelp();
}

//
// очистить все поля ввода
//
function clearAllInputs() {
	if (ClearFields) {
		ClearFields = false;
		//
    document.forms[0].openFormButton.className = "buttonActive";
    //
		document.forms[0].model.value = "";
    document.forms[0].registrationNumber.value = "";
    document.forms[0].licenceCartNo.value = "";
    document.forms[0].waybillNumber.value = "";
//    document.forms[0].formNumber.value = "";
    document.forms[0].customerId.value = "";
    document.forms[0].customerName.value = "";
    document.forms[0].waybillTypesList.selectedIndex = -1;
    document.forms[0].trailerGarageNumber.value = "";
    document.forms[0].trailerModel.value = "";
    document.forms[0].trailerRegistrationNumber.value = "";
    document.forms[0].departureKm.value = "";
    document.forms[0].departureMh.value = "";
    // водители
    while(document.forms[0].driversList.options.length >0) {
    	document.forms[0].driversList.options.remove(document.forms[0].driversList.options.length-1);
    }
    // остатки
    while(document.forms[0].fuelRemains.options.length >0) {
    	document.forms[0].fuelRemains.options.remove(document.forms[0].fuelRemains.options.length-1);
    }
	}
}

// -----------------------------------------------------------------------
// инициализация спец. полей формы, требующие submit
//
function initSubmitElement(AElement, ANextElemName, AEnable) {

	if (AElement.onfocus != null) {
		AElement._onfocus = AElement.onfocus;
	}
	if (AElement.onblur != null) {
		AElement._onblur = AElement.onblur;
	}

	if (AEnable)
		AElement.onfocus 	= new Function("var obj=event.srcElement; if (obj._onfocus!=null) obj._onfocus();  _setSubmitEnabled('"+ANextElemName+"', true);");
	else
		AElement.onfocus 	= new Function("var obj=event.srcElement; if (obj._onfocus!=null) obj._onfocus();  _setSubmitEnabled('"+ANextElemName+"', false);");

	AElement.onblur 	= new Function("showHelp(); var obj=event.srcElement; if (obj._onblur!=null) obj._onblur();  _setSubmitDisabled();");

}
	//
	function _setSubmitEnabled(AObjName, AEnable) {
	  try {
    	event.srcElement.select();
    }
    catch(ex) {
    	;
    }
		document.forms[0].activeField.value=AObjName;
		SubmitEnabled = AEnable;
	}
	//
	function _setSubmitDisabled() {
		SubmitEnabled = false;
	}


// -----------------------------------------------------------------------
// на основании значений поля activeField устанавливаем фокус на элемент 
//
function setFormFocus() {
	try {
	  document.getElementById(document.getElementById('activeField').value).focus();
	}
	catch(ex) {
		document.forms[0].garageNumber.focus();	
	}
}

// ---------------------------------------------------------------------------
//  проверяем значение флага и разрешаем или не разрешаем отправку формы
//
function OnFormSubmit() {

	if (SubmitEnabled) {
		// сделать select for document.forms[0].driversList
		makeDriversListSelection(); // 
		return true;
	}

	// если отсылка формы запрещена, то проверить и установить фокус
  setFormFocus();

	return false;
}


function makeDriversListSelection() {

  var obj =  document.forms[0].driversList;
	// если есть такие элементы
	var selXFlg = false;
	for (var i=0; i< obj.options.length; i++) {	
		if (obj.options[i].text.substring(0,3) == selectedItemPrefix) {
			selXFlg = true;
			break;
		}
	}

	if (selXFlg == true) {
		// выделяем только те, что отмечены
		for (var i=0; i< obj.options.length; i++) {
			if (obj.options[i].text.substring(0,3) == selectedItemPrefix) {
				obj.options[i].selected = true;
			}
			else {
				obj.options[i].selected = false;
			}
		}
	}
}

// -----------------------------------------------------------------------
// поиск с использ. диалоговых окон
//
function setTrailer() {

  var res=window.showModalDialog("waybillsGetTrailers.html", new Array(), "dialogWidth:580px;dialogHeight:460px;center:yes;status=0");

  if (res != null) {
    document.getElementById("trailerGarageNumber").value = res.value;
    document.getElementById("trailerModel").value = res.text.substring(res.text.lastIndexOf("|")+1);
    document.getElementById("trailerRegistrationNumber").value = res.text.substring(res.text.indexOf("|")+1, res.text.lastIndexOf("|")-1);
  }

  document.getElementById("buttonIssue").focus();

	return false;
}
//
//
//
function setCustomer() {

    var res=window.showModalDialog("waybillsGetCustomers.html", new Array(), "dialogWidth:580px;dialogHeight:460px;center:yes;status=0");

    if (res != null) {
      document.getElementById("customerId").value = res.value;
      document.getElementById("customerName").value = res.text;
    }

    document.getElementById("buttonIssue").focus();

	  return false;
}
//
//
//
function setDriver() {

    var res=window.showModalDialog("waybillsGetDrivers.html", new Array(), "dialogWidth:580px;dialogHeight:460px;center:yes;status=0");

    if (res != null) {
      document.getElementById("newDriverId").value = res.value;
      document.getElementById("newDriverString").value = res.text;

      _setSubmitEnabled("buttonIssue", true);

      document.getElementById("buttonIncludeDriver").click();
    }

	  return false;
}

//
// расчет графика работы - дата выезда, дата возвр., прод.смены, кол-во дней
//
function calcShift() {
  var shift = parseInt(document.forms[0].shift.value,10);
  if (isNaN(shift) || shift==0) {
    shift = 1;
    document.forms[0].shift.value = 1;
  }

  var shiftBeginStr = document.forms[0].shiftBegin.value.replace(/,/,".");
  var shiftBegin    = parseFloat(shiftBeginStr, 10);
  var shiftDuration = parseInt(document.forms[0].shiftDuration.value, 10);

  var depTime = shiftBegin + (shiftDuration * (shift-1));
  if (depTime >= 24) {
    document.forms[0].shift.value = 1;
    calcShift();
    return;
  }

  document.forms[0].departureTime.value = formatTime(depTime);
  if(!document.forms[0].ScheduleBlock.checked)
  {
  document.forms[0].shiftB_H.value=formatTime(depTime).split(":")[0];
  document.forms[0].shiftB_M.value=formatTime(depTime).split(":")[1];
  var tmp=parseInt(formatTime(depTime).split(":")[0],10)+parseInt(document.forms[0].shiftDuration.value, 10);
  if (tmp>23)
  {
  document.forms[0].shiftD_H.value=String(tmp-24);
  }
  else
  {
   document.forms[0].shiftD_H.value=String(tmp);
  }
  document.forms[0].shiftD_M.value=formatTime(depTime).split(":")[1];
  leaveB_H();
leaveD_H();
leaveD_M();
leaveB_M();
  }
   
  calcReturnDate();

}

function calcReturnDate() {


var form = document.forms[0],
	date = Ext.Date,
	depDate = date.parse(form.departureDate.value+' '+form.departureTime.value,"d.m.Y H:i"),
	daysCount = parseInt(form.daysCount.value,10),
	duration = form.shiftDuration.value.split(',');
	
	if (isNaN(daysCount) || daysCount <=0) {
		daysCount = 1;
		form.daysCount.value = daysCount;
	}
	try{
	depDate=date.add(depDate,date.DAY,daysCount-1);
	depDate=date.add(depDate,date.HOUR,parseInt(duration[0]));
	depDate=date.add(depDate,date.MINUTE,parseInt(duration[1]));
		
	}
	catch(ex){}
	
	
	
  // дата возвр.
  // время возвр. 

  
  var dp = String(document.forms[0].departureDate.value).split(".");
  
if(!document.forms[0].ScheduleBlock.checked)
{
  
  try{	
	form.returnDate.value = date.format(depDate,"d.m.Y");
	form.returnTime.value = date.format(depDate,"H:i");	
  } catch(ex){}
  
  
}

else
{
if (parseInt(document.forms[0].shiftD_H.value, 10)<parseInt(document.forms[0].shiftB_H.value, 10) && parseInt(document.forms[0].daysCount.value, 10)==1)
daysCount++;
var date = new Date(parseInt(dp[2], 10),parseInt(dp[1], 10)-1, (parseInt(dp[0], 10)+daysCount-1) );
document.forms[0].returnDate.value = date.getDate()+"."+(date.getMonth()+1)+"."+date.getYear();
document.forms[0].returnTime.value = document.forms[0].shiftD_H.value + ":" + document.forms[0].shiftD_M.value;
document.forms[0].departureTime.value=document.forms[0].shiftB_H.value  + ":" + document.forms[0].shiftB_M.value;
}
}


function Block()
{
if(!document.forms[0].ScheduleBlock.checked){
 document.getElementById("transparant").style.visibility = "hidden";

  var tmp = document.forms[0].shiftBegin.value.replace(/,/,".");
  
  document.forms[0].shiftB_H.value=tmp.split(".")[0];
  leaveB_H();
  document.forms[0].shiftB_M.value=tmp.split(".")[1];
  leaveB_M();
  document.forms[0].shiftD_H.value=String(parseInt(tmp.split(".")[0], 10)+parseInt(document.forms[0].shiftDuration.value, 10));
  leaveD_H();
  document.forms[0].shiftD_M.value="00";  
  document.forms[0].shift.value="1";

}


 else {

  document.getElementById("transparant").style.visibility = "visible";
  document.forms[0].shiftB_H.focus();
  }
  document.forms[0].departureTime.value = formatTime(parseFloat(document.forms[0].shiftBegin.value.replace(/,/,"."), 10));
  calcReturnDate();
}

function leaveB_H()
{
document.forms[0].shiftB_H.value=document.forms[0].shiftB_H.value.substring(0,2);

if (isNaN(parseInt(document.forms[0].shiftB_H.value, 10) ))
      document.forms[0].shiftB_H.value="00";
	  else if (isNaN(parseInt(document.forms[0].shiftB_H.value.substring(1,2), 10) ) && document.forms[0].shiftB_H.value.length !=1)
document.forms[0].shiftB_H.value="00";  
else if (parseInt(document.forms[0].shiftB_H.value, 10)>23)
document.forms[0].shiftB_H.value="23";
else if (parseInt(document.forms[0].shiftB_H.value, 10)<10 && document.forms[0].shiftB_H.value.length ==1)
document.forms[0].shiftB_H.value="0"+document.forms[0].shiftB_H.value;
else if (parseInt(document.forms[0].shiftB_H.value, 10)<0)
 document.forms[0].shiftB_H.value="00";
calcReturnDate();
}
function leaveB_M()
{
document.forms[0].shiftB_M.value=document.forms[0].shiftB_M.value.substring(0,2);

if (isNaN(parseInt(document.forms[0].shiftB_M.value, 10) ))
      document.forms[0].shiftB_M.value="00";
	  else if (isNaN(parseInt(document.forms[0].shiftB_M.value.substring(1,2), 10) ) && document.forms[0].shiftB_M.value.length !=1)
document.forms[0].shiftB_M.value="00";  
else if (parseInt(document.forms[0].shiftB_M.value, 10)>59)
document.forms[0].shiftB_M.value="59";
else if (parseInt(document.forms[0].shiftB_M.value, 10)<10 && document.forms[0].shiftB_M.value.length ==1)
document.forms[0].shiftB_M.value="0"+document.forms[0].shiftB_M.value;
else if (parseInt(document.forms[0].shiftB_M.value, 10)<0)
 document.forms[0].shiftB_M.value="00";
calcReturnDate();
}
function leaveD_H()
{
document.forms[0].shiftD_H.value=document.forms[0].shiftD_H.value.substring(0,2);

if (isNaN(parseInt(document.forms[0].shiftD_H.value, 10) ))
      document.forms[0].shiftD_H.value="00";
	  else if (isNaN(parseInt(document.forms[0].shiftD_H.value.substring(1,2), 10) ) && document.forms[0].shiftD_H.value.length !=1)
document.forms[0].shiftD_H.value="00";  
else if (parseInt(document.forms[0].shiftD_H.value, 10)>23)
document.forms[0].shiftD_H.value="23";
else if (parseInt(document.forms[0].shiftD_H.value, 10)<10 && document.forms[0].shiftD_H.value.length ==1)
document.forms[0].shiftD_H.value="0"+document.forms[0].shiftD_H.value;
else if (parseInt(document.forms[0].shiftD_H.value, 10)<0)
 document.forms[0].shiftD_H.value="00";
calcReturnDate();
}
function leaveD_M()
{
document.forms[0].shiftD_M.value=document.forms[0].shiftD_M.value.substring(0,2);

if (isNaN(parseInt(document.forms[0].shiftD_M.value, 10) ))
      document.forms[0].shiftD_M.value="00";
	  else if (isNaN(parseInt(document.forms[0].shiftD_M.value.substring(1,2), 10) ) && document.forms[0].shiftD_M.value.length !=1)
document.forms[0].shiftD_M.value="00";  
else if (parseInt(document.forms[0].shiftD_M.value, 10)>59)
document.forms[0].shiftD_M.value="59";
else if (parseInt(document.forms[0].shiftD_M.value, 10)<10 && document.forms[0].shiftD_M.value.length ==1)
document.forms[0].shiftD_M.value="0"+document.forms[0].shiftD_M.value;
else if (parseInt(document.forms[0].shiftD_M.value, 10)<0)
 document.forms[0].shiftD_M.value="00";
calcReturnDate();
}



//
//
//
function formatTime(ATime) {

	if (isNaN(ATime)) return "";

	var tm = String(ATime).split(".");

	if (tm[0].length < 2) tm[0] = "0"+tm[0];

	if (tm.length>1) {
		if (tm[1].length < 2) tm[1] += "0";
		return tm[0]+":"+tm[1].substring(0,2);
	}
	else {
		return tm[0]+":00";
	}


}

//
// задание даты
//
function datePlus() {
	return dateDiff(1);
}
//
function dateMinus() {
	return dateDiff(-1);
}
function dateDiff(ADiff) {

	var currDate = new Date();

  var dp = String(document.forms[0].departureDate.value).split(".");
  var date = new Date(parseInt(dp[2],10), parseInt(dp[1],10)-1, parseInt(dp[0],10)+ADiff);

  if ( (date.getYear()*100+date.getMonth()) < (currDate.getYear()*100+currDate.getMonth()) ) {
  	alert("Нельзя выдавать путевой лист за прошлый период");
  	return false;
  }

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  //
  document.forms[0].departureDate.value = (dd<10 ? "0"+dd : ""+dd) +"."+(mm<10 ? "0"+mm : ""+mm )+"."+date.getYear();
  //
	document.forms[0].garageNumber.value = "";
	clearAllInputs();

  document.forms[0].garageNumber.focus();

  return false;

}
//
// печать формы пут.листа
// 
prnTmo = null;
function printWayBill() {

	var obj = document.getElementById("screen");
	obj.style.display = "none";
	document.getElementById("print").style.display = "";

	// установить новые координаты с учетом смещения
	setPrintOffset();
	PrintEnabled = false;



  // document.getElementById("printButton").style.display = "none";  // /* */
  
  var fact = document.getElementById("factory");  
  //fact.printing.portrait = false;   
fact.printing.topMargin=0;
fact.printing.bottomMargin=0;
fact.printing.leftMargin=0;
fact.printing.rightMargin=0;
    
    //печать ActiveX
    if (document.forms[0].PrintFlag.checked) 
    window.print();
	else fact.printing.Print(false,top);
 


	//window.print();
  // document.getElementById("printButton").style.display = "";			// /* */

  clearPrinting();                             // 
	//prnTmo = setTimeout('clearPrinting()', 5000);   // /* */

}
//
function cancelPrinting() {
	clearTimeout(prnTmo);
	event.srcElement.value="закрыть";
	event.srcElement.onclick=clearPrinting;
}

function clearPrinting() {
	document.getElementById("screen").style.display = "";
	document.getElementById("print").style.display="none";
	document.getElementById("printMessage").style.display="none";
	Loaded();
}

// ***********************************************************************************
// ПЕЧАТЬ
//
function setPrintOffset() {

    var _top = document.getElementById("_top").value;
    var _left = document.getElementById("_left").value;
    var _offsetWidth = document.getElementById("_offsetWidth").value;
    var _offsetLength = document.getElementById("_offsetLength").value;
  var paper=document.getElementById("print");
  
  var obj = paper.children;
  for (var i=0; i<obj.length; i++)  {
  	if (obj[i].offset == "true") {
  	obj[i].style.pixelTop = obj[i].offsetTop-(parseInt(_top,10)-parseInt(_offsetWidth,10));
  		obj[i].style.pixelLeft = obj[i].offsetLeft-(parseInt(_left,10)-parseInt(_offsetLength,10));
		obj[i].style.fontWeight = "bold";
  	}
  }

}

//
//
//
function reprintOpen() {

	var rlist = document.forms[0].reprintWaybillType;
	var list  = document.forms[0].waybillTypesList;

	if (list.options.length==0) {
		alert("список форм пут.листов пустой\nВведите правильный гаражный номер.");
    document.forms[0].garageNumber.focus();
    return;
	}

	document.forms[0].reprintGarageNumber.value = document.forms[0].garageNumber.value;

  // clear list
  while(rlist.options.length>0) {
  	rlist.options.remove(0);
  }

	var opt;
  for (var i=0; i<list.options.length; i++) {
    	opt = document.createElement("option");
    	opt.value = list.options[i].value;
      opt.text  = list.options[i].text;
			rlist.options.add(opt);
	}
	rlist.selectedIndex = list.selectedIndex;

	document.getElementById('screen').style.display='none';
	document.getElementById('reprint').style.display='';


}
//
function reprintCancel() {

	document.getElementById('screen').style.display='';
	document.getElementById('reprint').style.display='none';

}
//
function reprint() {

	if (parseInt(document.forms[0].reprintWaybillNumber.value,10)==0 || isNaN(parseInt(document.forms[0].reprintWaybillNumber.value,10))) {
		alert("введите номер пут. листа");
    document.forms[0].reprintWaybillNumber.focus();
    return;
	}
	if (parseInt(document.forms[0].reprintFormNumber.value.length,10)==0 || isNaN(parseInt(document.forms[0].reprintFormNumber.value.length,10))) {
		alert("введите номер бланка");
    document.forms[0].reprintFormNumber.focus();
    return;
	}
	if (document.forms[0].reprintWaybillType.options.selectedIndex <0 ) {
		alert("выберите форму для печати");
    document.forms[0].reprintWaybillType.focus();
    return;
	}

	reprintCancel();

	// document.forms[0].garageNumber.value = document.forms[0].reprintGarageNumber.value;
  document.forms[0].waybillNumber.value = document.forms[0].reprintWaybillNumber.value;
	document.forms[0].formNumber.value = document.forms[0].reprintFormNumber.value;
	document.forms[0].waybillTypesList.selectedIndex = document.forms[0].reprintWaybillType.selectedIndex;

  _setSubmitEnabled("garageNumber", true);
  document.getElementById("buttonPrintWaybill").click();

}
