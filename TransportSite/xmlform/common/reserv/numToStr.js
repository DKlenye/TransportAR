function numToStr(ASrc) {

  //
  // �������� �������� ������������� � ����������
  //
  var m100 = new Array("","��� ","������ ","������ ","��������� ","������� ","�������� ","������� ","��������� ","��������� ");
  var m10 = new Array ("","������ ","�������� ","�������� ","����� ","��������� ","���������� ","��������� ","����������� ","��������� ");
  var m1x = new Array("","","","","","","","","","","������ ","����������� ","���������� ","���������� ","������������ ","���������� ","����������� ","���������� ","������������ ","������������ ");
  var m1 = new Array("","���� ","��� ","��� ","������ ","���� ","����� ","���� ","������ ","������ ");
  var m1t = new Array("","���� ","��� ");

  var pref = new Array('', '�����','�������','��������','��������');
			  //����������
			  //
			  //���������

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
        // �� 20 ������ 10
			  i--;
			  jd++;
  			nx = m1x[parseInt(num_text.substring(i,i+2))];
      }
      else {
        // ���� ����  ��� ��� ... ����
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

    // �������� - ����� ������ 
    jd++;
    if (jd == 3) { 
		  jd=0;
      pd++;
      prf = pref[pd];

  		// �������� ���������
		  //
		  tmp = num_text.substring(i-1,i);
		  if (pd == 1) {
		    // ������
		    if (tmp == '1')
			    prf+='�';
    		else if (tmp == '2' || tmp == '3' || tmp == '4')
			    prf+='�';

        prf+=' ';
			}
  		else if (pd > 1) {
		    // �������� ...
		    if (tmp == '2' || tmp == '3' || tmp == '4')
			    prf+='�';
		    else if (tmp > '4')
			    prf+='��';
		    prf+=' ';
  		}
    }

  }

  return tx;

}