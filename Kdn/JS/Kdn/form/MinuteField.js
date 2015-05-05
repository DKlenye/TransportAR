Kdn.form.MinuteField = Ext.extend(Ext.form.TextField, {
    selectOnFocus:true,
    getValue : function(){
        var v = Kdn.form.MinuteField.superclass.getValue.call(this);
        console.log("get1", v);
        console.log("get2", this.timeToMinute(v));

        return this.timeToMinute(v);
    },

    setValue: function (value) {


        console.log("set1", value);
        
        if (Ext.isNumber(value)) {
            value = this.minuteToTime(value);
        }

        console.log("set2", value)

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

        minutes = parseInt(time.substr(time.length - 2, 2));
        hours = parseInt(time.substring(0, time.length - 2));
    }

        minutes = Math.min(minutes, 60);

        return hours * 60 + minutes;
    }
});

Ext.reg('minutefield', Kdn.form.MinuteField);