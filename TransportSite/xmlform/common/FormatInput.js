
function TFormatInput(AInput, AFormat) {

  this.object = AInput;
  this.object.FormatInput = this;
  this.format = AFormat;
  this.enable = true;

  this.objectOnKeyDown = this.object.onkeydown;

  this.textRange = null;

  this.currentStartIndex = 0;
  this.currentEndIndex = 0;

  this.patternIndex = 0;
  this.formatPatterns = null;

  //
  //
  //
  this.object.onfocus = new Function("this.FormatInput.setPattern(this.FormatInput.patternIndex)");

  //
  //
  //
  this.object.onkeydown = function () {
    
    var obj = event.srcElement.FormatInput;
    var chr = "";

    if (event.keyCode >= 48 && event.keyCode <= 57 && obj.enable) {
      // num pad
      chr = String.fromCharCode(event.keyCode);
    }
    else if (event.keyCode >= 96 && event.keyCode <= 105 && obj.enable) {
      // num pad 1
      chr = String.fromCharCode(event.keyCode-48);
    }
    else if (event.keyCode == 39) { // Right
      obj.setPattern(obj.patternIndex+1);
    }
    else if (event.keyCode == 37) { // Left
      obj.setPattern(obj.patternIndex-1);
    }
    else if (event.keyCode == 13 || event.keyCode==9) { // Enter TAB
      event.returnValue = true;
      return;
    }

    if (chr.length > 0) {
      var tr = obj.textRange.duplicate();
      tr.moveStart("character",1);
      obj.textRange.text = chr+tr.text;

      obj.currentStartIndex++;
      obj.currentEndIndex--;

      if (obj.currentEndIndex == 0) {
        // next - mm or yyyy
        obj.setPattern(obj.patternIndex+1);
      }
      else {
        obj.createTextRange();
      }
   
    }

    event.returnValue = false;

    if (obj.objectOnKeyDown) {
      obj.objectOnKeyDown();
    }
  }

  //
  //
  //
  this.createTextRange = function() {
    
    this.textRange = this.object.createTextRange();
    this.textRange.collapse();
    this.textRange.moveStart("character" , this.currentStartIndex);
    this.textRange.moveEnd("character" , this.currentEndIndex);
    this.textRange.select();
    
  }

  //
  //
  //
  this.setFormat = function(AFormat) {
    // 
    this.formatPatterns = AFormat.split(".");
    this.formatPatterns[this.formatPatterns.length] = "";
    this.setPattern(0);

  }

  //
  //
  //
  this.setPattern = function(AInd) {
    
    if (AInd >= 0 && AInd < this.formatPatterns.length) {

      this.patternIndex = AInd;
      var len = 0;

      for(var i=0; i<this.patternIndex; i++) {
        len += (this.formatPatterns[i].length + 1);
      }

      this.currentStartIndex = len;
      this.currentEndIndex = this.formatPatterns[this.patternIndex].length;

      this.createTextRange();

      this.enable = (this.patternIndex < this.formatPatterns.length-1);

    }
    else {

      this.enable = false;

    }

  }

  //
  //
  //
  this.setFormat(this.format);
  this.createTextRange();
}
