//************************************************************
//
//
function TGridInlineEditorEvent(ACode, AMethod) {
  this.keyCode = ACode;
  this.method  = AMethod;
}
//
//
//
function TGridInlineEditor(ATable, AForm, AFunction) {

  this.table  = ATable;
  this.form   = AForm;
  this.funct = AFunction;
  //
  this.events = new Array();
  //
  this.form.TGridInlineEditor = this;

  this.selected       = new Object();
  this.selected.row   = null;
  this.selected.input = null;
  this.selected.mode  = 0;
  this.selected.keyUp  = true;
  this.selected.submit = false;

  this.input = new Array();

  this.colorActive = new Object();
  this.colorActive.background = "highlight";
  this.colorActive.color = "highlighttext";

  this.colorEdit = new Object();
  this.colorEdit.background = "black";
  this.colorEdit.color = "white";

  this.colorChanged = new Object();
  this.colorChanged.background = "lightgrey";
  this.colorChanged.color = "blue";

  this.buildInputForm = function() {

                                  if (this.input.length == 0) {
                                    for(var i=0; i<this.table.rows(0).cells.length; i++) {
                                      var inp = document.createElement("input");
                                      inp.type = "text";
                                      this._setInputAttr(inp, i);
                                      this.input[i] = inp;
                                      this.form.appendChild(inp);
                                    }
                                  }

  }

  this.setInput = function(AInput, AColInd) {
                                    this.input[this.input.length] = AInput;
                                    this._setInputAttr(AInput, AColInd);
  }
  //
  this._setInputAttr = function(AInput, AColInd) {
                                    AInput.index = AColInd;
                                    AInput.oldOnfocus = AInput.onfocus;
                                    AInput.onfocus = new Function("TGridInlineEditor_onFocus(this)");
                                    AInput.onblur = new Function("TGridInlineEditor_onBlur(this)");
                                    AInput.onkeydown = new Function("TGridInlineEditor_onKeyDn(this)");
                                    AInput.onkeyup = new Function("TGridInlineEditor_onKeyUp(this)");
                                    AInput.TGridInlineEditor = this;
  }

  this.setSelectedRow = function(ARow, ACol) {

                                  //if (this.selected.row != null) { // ?!?!?!
                                  //}
                              
                                  this.selected.row = ARow;
                                  //
                                  for (var i=0; i<this.input.length; i++) {
                                    this.input[i].value = ARow.cells(this.input[i].index).innerText;
                                    this.input[i].oldValue = this.input[i].value+"";
                                    //
                                    if (!this.input[i].readOnly) {
                                      ARow.cells(this.input[i].index).style.backgroundColor = ARow.cells(this.input[i].index).__bgColor;
                                      ARow.cells(this.input[i].index).style.color = ARow.cells(this.input[i].index).__fgColor;
                                    }
                                  }

                                  if (ACol != null) {
                                    // ***
                                    for (var i=0; i<this.input.length; i++) {
                                      if (!this.input[i].readOnly) {
                                        if ( ARow.cells(this.input[i].index) == ACol ) {
                                          this.selected.input = this.input[i];
                                          break;
                                        }
                                      }
                                    }
                                  }
                                  else {
                                    // ***
                                    if (this.selected.input == null) {
                                      for (var i=0; i<this.input.length; i++) {
                                        if (!this.input[i].readOnly) {
                                          this.selected.input = this.input[i];
                                          break;
                                        }
                                      }
                                    }
                                    // ***
                                  } 

                                  this.selected.input.focus();
    
  }

  //
  //
  //
  this.getInputOrderIndex = function(AInput) {
          var ind = -1;
          for (var i=0; i<this.input.length; i++) {
            if (AInput.index == this.input[i].index) {
              ind = i;
              break;
            }
          }
          return ind;
  }

  //
  //
  //
  this.setActiveCell = function(AInput) {
                                            this._setClassNameCell(AInput, this.colorActive);
                                            this.selected.input = AInput;
  }
  //
  this.setPassiveCell = function(AInput) {
                                            this._setClassNameCell(AInput, null);
  }
  //
  this.setEditCell =  function(AInput) {
                                            this._setClassNameCell(AInput, this.colorEdit);
  }
  //
  this._setClassNameCell = function(AInput,AClass) {
    
    if (AClass) {
      this.selected.row.cells(AInput.index).style.backgroundColor = AClass.background;
      this.selected.row.cells(AInput.index).style.color = AClass.color;
    }
    else {
      this.selected.row.cells(AInput.index).style.backgroundColor = this.selected.row.cells(AInput.index).__bgColor;
      this.selected.row.cells(AInput.index).style.color = this.selected.row.cells(AInput.index).__fgColor;

      if (AInput.value != AInput.oldValue) {
        this.selected.row.cells(AInput.index).style.backgroundColor = this.colorChanged.background;
        this.selected.row.cells(AInput.index).style.color = this.colorChanged.color;
      }

    }

  }

}

//
//
function TGridInlineEditor_onKeyDn(AInput) {

  AInput.TGridInlineEditor.selected.keyUp = true;

  if (AInput.TGridInlineEditor.selected.row != null) {

    if (event.keyCode == 37) { // Left
      var mi = 1;
      var prev;
      while(true) {
        prev = AInput.TGridInlineEditor.getInputOrderIndex(AInput)-mi;
        if (prev >= 0) {
          if (AInput.TGridInlineEditor.input[prev].readOnly) {
            mi++;
            continue;
          }
          AInput.TGridInlineEditor.input[prev].focus();
        }
        event.returnValue=false;
        AInput.TGridInlineEditor.selected.keyUp = false;
        break;
      }
    }
    else if (event.keyCode == 39) { // Right
      var pi = 1;
      var next;
      while(true) {
        next = AInput.TGridInlineEditor.getInputOrderIndex(AInput)+pi;
        if (next < AInput.TGridInlineEditor.input.length) {
          if (AInput.TGridInlineEditor.input[next].readOnly) {
            pi++;
            continue;
          }
          AInput.TGridInlineEditor.input[next].focus();
        }
        event.returnValue=false;
        AInput.TGridInlineEditor.selected.keyUp = false;
        break;
      }
    }
    else if (event.keyCode == 13) {
      event.returnValue=false;
      AInput.TGridInlineEditor.selected.submit = true;
    }
    else if (event.keyCode == 38) { // Up

      event.returnValue=false;
      AInput.TGridInlineEditor.selected.keyUp = false;

      var obj = AInput.TGridInlineEditor;
      if (obj.selected.mode == 1) {
        obj.table.AfterClick = null;  // не присваивать новых значений  input ...
        AInput.TGridInlineEditor.selected.submit = true;
      }
      if (obj.selected.row.previousSibling) {
        mouseNavigationClick(obj.selected.row.previousSibling);
        if (obj.selected.mode == 0) { // глюк ... нужно вот так, что бы перегрузить фокус
          obj.selected.input.blur();
          obj.selected.input.focus();
        }
      }

    }
    else if (event.keyCode == 40) { // Dn

      event.returnValue=false;
      AInput.TGridInlineEditor.selected.keyUp = false;

      var obj = AInput.TGridInlineEditor;
      if (obj.selected.mode == 1) {
        obj.table.AfterClick = null;  // не присваивать новых значений  input ...
        AInput.TGridInlineEditor.selected.submit = true;
      }
      if (obj.selected.row.nextSibling) {
        mouseNavigationClick(obj.selected.row.nextSibling);
        if (obj.selected.mode == 0) { // глюк ... нужно вот так, что бы перегрузить фокус
          obj.selected.input.blur();
          obj.selected.input.focus();
        }
      }

    }
    else if (AInput.TGridInlineEditor.events.length > 0 && AInput.TGridInlineEditor.selected.mode >= 0) {
      //
      //  CUSTOM EVENT  ***********************
      //
      for (var i=0; i<AInput.TGridInlineEditor.events.length; i++) {
        if (event.keyCode == AInput.TGridInlineEditor.events[i].keyCode) {

          event.returnValue=false;
          AInput.TGridInlineEditor.selected.keyUp = false;

          AInput.TGridInlineEditor.events[i].method(AInput);
          break;

        }
      }

    }

    //
    // LOCKED
    //
    if (event.keyCode == 33 || event.keyCode == 34
          || event.keyCode == 35 || event.keyCode == 36
          || event.keyCode == 45 || event.keyCode == 46
          || event.keyCode == 116) {
      event.returnValue=false;
      AInput.TGridInlineEditor.selected.keyUp = false;
    }

  }
}
//
//
//
function TGridInlineEditor_onKeyUp(AInput) {

  if (AInput.TGridInlineEditor.selected.submit) {
    if (AInput.TGridInlineEditor.funct == null) {
      AInput.TGridInlineEditor.form.submit();
    }
    else {
      AInput.TGridInlineEditor.funct();
    }
  }

  if (AInput.TGridInlineEditor.selected.row != null
        && AInput.TGridInlineEditor.selected.keyUp == true
        && event.keyCode != 116 && event.keyCode != 13)
  {
                                                
    AInput.TGridInlineEditor.setEditCell(AInput);
    AInput.TGridInlineEditor.selected.mode = 1;
    //
    AInput.TGridInlineEditor.selected.row.cells(AInput.index).innerText = AInput.value;

    // if (AInput.onclick) AInput.onclick(AInput);
    if (AInput.paint) AInput.paint(AInput.TGridInlineEditor.selected.row.cells(AInput.index), AInput);

  }

  AInput.TGridInlineEditor.selected.keyUp = true;

}

//
//
//
function TGridInlineEditor_onBlur(AInput) {

  var obj = AInput.TGridInlineEditor;
  obj.setPassiveCell(AInput);
  
}
//
//
//
function TGridInlineEditor_onFocus(AInput) {

  if (AInput.readOnly) {
    var next = AInput.TGridInlineEditor.getInputOrderIndex(AInput)+1;
    if (next < AInput.TGridInlineEditor.input.length) {
      AInput.TGridInlineEditor.input[next].focus();
    }
    return;
  }

  AInput.select();
  var obj = AInput.TGridInlineEditor;

  obj.setActiveCell(AInput);

  if (AInput.oldOnfocus) AInput.oldOnfocus(AInput);
  
}
