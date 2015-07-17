Kdn.form.MinuteField = Ext.extend(Ext.form.TextField, {
    selectOnFocus:true,
    getValue : function(){
        var v = Kdn.form.MinuteField.superclass.getValue.call(this);
        return this.timeToMinute(v);
    },

    setValue: function (value) {

        if (Ext.isNumber(value)) {
            value = this.minuteToTime(value);
        }

        return Kdn.form.MinuteField.superclass.setValue.call(this, value);
    },

    minuteToTime: function (min) {
    
        var hours = Math.floor(min / 60),
            minutes = min % 60;
        return String.format("{0}:{1}",hours,minutes);
    },

    timeToMinute: function (time) {

        var hours, minutes;

        if (time.indexOf(":") != -1) {
            hours = parseInt(time.split(":")[0]);
            minutes = parseInt(time.split(":")[1]);
        } else {


            var hours, minutes;
            var strTime = time + "";


            if (strTime.length == 1 || strTime.length == 2) {
                hours = parseInt(strTime);
                minutes = 0;
            } else if (strTime.length == 3) {
                minutes = parseInt(strTime.substr(strTime.length - 2, 2));
                hours = parseInt(strTime.substring(0, strTime.length - 1));
            } else {

                minutes = parseInt(time.substr(time.length - 2, 2));
                hours = parseInt(time.substring(0, time.length - 2));
            }
        }

        minutes = Math.min(minutes, 60);

        return hours * 60 + minutes;
    }
});

Ext.reg('minutefield', Kdn.form.MinuteField);