function openPrintForm() {

  // Calculate a random "handle" so that we can open multiple "printer friendly"
  // instances.
  var d = new Date();
  var h = "Window"+getTime();
  var wnd = window.open("../common/printform.htm", h ,"toolbar=no, scrollbars=yes, resizable=yes");
  return null;
}

//
//  interface
//
function getGrid() {
  tbl = document.all.tags('TABLE');
  return tbl[0];
}
function getHeader() {
  return document.all.GridTitle;
}
