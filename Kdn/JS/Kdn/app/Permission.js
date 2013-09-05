//	permission : {
//		 g:[], - группы разрешённые 
//		_g:[], - группы запрещённые
//		 u:[], - пользователи разрешённые 
//		_u:[]  - пользователи запрещённые
//	}

Kdn.app.permission = {

    check : function(e) {
        var p = e['permission'],
		     d = Ext.isDefined;
        if (!d(p)) return true;

        var A = Kdn.toArray,
		     g = A(p['g']),
		    _g = A(p['_g']),
		     u = A(p['u']),
		    _u = A(p['_u']),
		    ui = Kdn.getUser(),
		    Ug = [],
		    U = ui['UserId'];

        //Если permission установлен, то проверяются группы g и _g
        var f = false;
        //Если g установлена то пропускаются группы, прошедшие проверку
        if (d(g) || d(_g)) {
            for (var i = 0, l = Ug.length; i < l; i++) {
                if (d(g)) {
                    f = false;
                    if (g.indexOf(Ug[i]) != -1) {
                        f = true;
                        break;
                    }
                }
                else {
                    f = true;
                    if (_g.indexOf(Ug[i]) != -1) {
                        f = false;
                        break;
                    }
                }
            }
        }

        if (d(u)) {
            if (u.indexOf(U) != -1) f = true
        }
        else if (d(_u)) {
            if (_u.indexOf(U) != -1) f = false
        }

        return f;
    }

};



