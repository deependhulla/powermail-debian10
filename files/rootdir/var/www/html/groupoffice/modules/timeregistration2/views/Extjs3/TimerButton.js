/**
 * The server side code in still in projects2
 * Should refactor when API changes to JMAP
 */
GO.timeregistration2.TimerButton = Ext.extend(Ext.Button, {

    startTime: false,
    intervalId: null,

    initComponent: function () {

        Ext.apply(this, {
            iconCls: 'ic-alarm',
            enableToggle: true,
            pressed: this.startTime > 0,
            text: t("Start timer", "projects2"),
            toggleHandler: function (btn, pressed) {
                if (!pressed) {
                    if (this.fireEvent('beforestoptimer', this)) {
                        this.stopTimer();
                    } else
                        this.toggle(true); //do not unpress the button when the timer isn't stopped
                } else {
                    this.startTimer();
                }
            },
            scope: this

        });

        if (this.startTime) {
            this.setRunning(this.startTime);
        }

        go.Notifier.addStatusIcon('timer','ic-alarm');

        this.addEvents({
            stoptimer: true,
            beforestoptimer: true,
            starttimer: true,
            aftersave: true,
        });

        GO.timeregistration2.TimerButton.superclass.initComponent.call(this);
    },

    setRunning: function (time) {
        this.startTime = Date.parseDate(parseInt(time), 'U');
        go.Notifier.toggleIcon('timer', true);
        this.notifyMsg = go.Notifier.msg({
            title: t('Timer running', 'timeregistration2'),
            iconCls: 'ic-alarm',
            description: t('Running since') +' '+this.startTime.format(GO.settings.time_format),
            persistent: true,
            buttons:['->',{text:t('Save'), handler: this.stopTimer, scope:this}]
        }, 'timer');
        var running = +Date.now() - this.startTime,
        interval = 1000;

        clearInterval(this.intervalId);
        this.intervalId = setInterval(function(){
            running += interval;
            if(this.notifyMsg && this.notifyMsg.getContentTarget())
                this.notifyMsg.update(this.secondsToTime(running/1000));
        }.bind(this),interval);
        this.setText(t("Timer running since", "projects2") + ': ' + this.startTime.format(GO.settings.time_format));
       // this.setTooltip(t("Timer running since", "projects2") + ': ' + this.startTime.format(GO.settings.time_format));

    },

    secondsToTime: function(amount) {
        var time = parseInt(amount);
        var hours = Math.floor( time / 3600);
        var minutes = Math.floor(time / 60 % 60);
        var seconds = time % 60;
        minutes = (minutes < 10) ? "0"+minutes : minutes;
        seconds = (seconds < 10) ? "0"+seconds : seconds;
        return hours+':'+minutes+':'+seconds
    },

    afterRender: function () {
        GO.request({
            url: 'projects2/timer/read',
            success: function (options, success, response) {
                if (response.time && response.time != 0) {
                    setTimeout(function() {
                        this.setRunning(response.time);
                    }.bind(this),2000);

                    this.toggle(true, true);
                }
            },
            scope: this
        });
        GO.timeregistration2.TimerButton.superclass.afterRender.call(this);
    },

    stopTimer: function () {

        var elapsed = GO.util.round(this.startTime.getElapsed() / 60000, GO.timeregistration2.roundMinutes, !GO.timeregistration2.roundUp);
        var startTime = this.startTime,
            start = startTime.getHours()*60+startTime.getMinutes();

        var dlg = new GO.timeregistration2.TimeDialog({
                id: 'timer-timeentry-dialog'
            });
        dlg.show();
        dlg.setValues({
            date: this.startTime.format('Y-m-d'),
            start: start,
            duration: elapsed,
            end: start + elapsed
        })
        dlg.on('close', function(){
            this.fireEvent('aftersave', this, this.startTime);
        }, this);
        this.fireEvent('stoptimer', this, elapsed, startTime);

        GO.request({
            url: "projects2/timer/stop",
            success: function (response, options, result) {
                this.setText(t("Start timer", "projects2"));
                go.Notifier.toggleIcon('timer', false);
                clearInterval(this.intervalId);
                if(this.notifyMsg) {
                    go.Notifier.remove(this.notifyMsg);
                }
                this.startTime = false;
                this.toggle(false, true);
            },
            scope: this
        });

        return elapsed;
    },
    startTimer: function () {
        GO.request({
            url: "projects2/timer/start",
            success: function (response, options, result) {
                var data = Ext.decode(response.responseText);
                this.setRunning(data.time);
                this.fireEvent('starttimer', this, this.startTime);
            },
            scope: this
        });
    }

});
