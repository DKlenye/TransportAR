function numToStr(ASrc) {

  //
  // значение цифровое преобразовать в символьное
  //
  var m100 = new Array("","сто ","двести ","триста ","четыреста ","п€тьсот ","шестьсот ","семьсот ","восемьсот ","дев€тьсот ");
  var m10 = new Array ("","дес€ть ","двадцать ","тридцать ","сорок ","п€тьдес€т ","шестьдес€т ","семьдес€т ","восемьдес€т ","дев€носто ");
  var m1x = new Array("","","","","","","","","","","дес€ть ","одиннадцать ","двенадцать ","тринадцать ","четырнадцать ","п€тнадцать ","шестнадцать ","семнадцать ","восемнадцать ","дев€тнадцать ");
  var m1 = new Array("","один ","два ","три ","четыре ","п€ть ","шесть ","семь ","восемь ","дев€ть ");
  var m1t = new Array("","одна ","две ");

  var pref = new Array('', 'тыс€ч','миллион','миллиард','триллион');
			  // ¬јƒ–»Ћ№ќЌ
			  //
			  //сиксильен

  var tx='';
  var nx;

  var jd=0; pd=0;
  var num_text = new String(ASrc);
  var prf='';

  for (var i=num_text.length-1; i>=0; i--) {

    tx = prf + tx;
    prf='';

    if (jd==0) {
      if (num_text.substring(i-1,i)=='1') {
        // до 20 больше 10
			  i--;
			  jd++;
  			nx = m1x[parseInt(num_text.substring(i,i+2))];
      }
      else {
        // один одна  два две ... тысч
  			tmp = parseInt(num_text.substring(i,i+1));
  			if (pd==1 && tmp < 3)
    			nx = m1t[tmp];
  			else
			    nx = m1[tmp];
      	}
    	}
	  else if (jd==1)
	  	nx = m10[ parseInt(num_text.substring(i,i+1))];
    else if (jd==2)
    	nx = m100[ parseInt(num_text.substring(i,i+1))];

    tx = nx + tx;

    // проверка - какой разр€д 
    jd++;
    if (jd == 3) { 
		  jd=0;
      pd++;
      prf = pref[pd];

  		// проверка окончани€
		  //
		  tmp = num_text.substring(i-1,i);
		  if (pd == 1) {
		    // тыс€чи
		    if (tmp == '1')
			    prf+='а';
    		else if (tmp == '2' || tmp == '3' || tmp == '4')
			    prf+='и';

        prf+=' ';
			}
  		else if (pd > 1) {
		    // миллионы ...
		    if (tmp == '2' || tmp == '3' || tmp == '4')
			    prf+='а';
		    else if (tmp > '4')
			    prf+='ов';
		    prf+=' ';
  		}
    }

  }

  return tx;

}