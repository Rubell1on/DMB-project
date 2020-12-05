class Block {
    constructor(parentName, title, className, headerSize, data) {
        this._parent = parentName;
        this._blockString = '<div class="block"></div>';
        this._titleString = `<h3><b>${title}</b></h3>`;
        this._bodyString = `<h${headerSize} class="${className}">${data}</h${headerSize}>`;

        this._Create();
        this.Hide();
    }

    _Create() {
        $(`.${this._parent}`).append(this._blockString);
        this.objectHandle = $(`.${this._parent} > div:last-child`);
        $(this.objectHandle).append(this._titleString);
        $(this.objectHandle).append(this._bodyString);
        const children = this.objectHandle.children();
        this.titleHandle = children[0];
        this.bodyHandle = children[1];
    }

    Hide() {
        $(this.objectHandle).css('opacity', 0);
    }

    ShowAnimation(duration, complete) {
        $(this.objectHandle).animate({'opacity': 1}, duration, complete);
    }

    SetTitle(title) {
        $(this.titleHandle).html(title);
        return this;
    }

    SetBody(data) {
        $(this.bodyHandle).html(data);
        return this;
    }
}

class Fields {
    constructor() {
        this.isExpired = false;
        this.targetTime = moment('2020-12-05');
        this.fullDateHandle = $('.full-date');
        this.monthsHandle = new Block('wrapper', 'В месяцах', 'months', 1, 0);
        this.daysHandle = new Block('wrapper', 'В днях', 'days', 2, 0);
        this.hoursHandle = new Block('wrapper', 'В часах', 'hours', 3, 0);
        this.minutesHandle = new Block('wrapper', 'В минутах', 'minutes', 4, 0);
        this.secondsHandle = new Block('wrapper', 'В секундах', 'seconds', 5, 0);
    }

    SetData() {
        const currentTime = moment();
        const parsed = this.getDateObject(currentTime.format('YYYY-MM-DDTHH:mm:ss'));
        this.isExpired = this.targetTime.clone().diff(currentTime, 'd') <= 0 ? true : false;

        if (!this.isExpired) {
            const fullDate = this.targetTime.clone().subtract(parsed).format('MM месяцев DD дней HH часов mm минут ss секунд');
            const months = this.targetTime.diff(currentTime, 'months');
            const days = this.targetTime.diff(currentTime, 'days');
            const hours = this.targetTime.diff(currentTime, 'hours');
            const minutes = this.targetTime.diff(currentTime, 'minutes');
            const seconds = this.targetTime.diff(currentTime, 'seconds');
        
            this.fullDateHandle.html(fullDate);
            this.monthsHandle.SetBody(months);
            this.daysHandle.SetBody(days);
            this.hoursHandle.SetBody(hours);
            this.minutesHandle.SetBody(minutes);
            this.secondsHandle.SetBody(seconds);
        } else {
            $('h1.main-title').html('ДМБ настал:D');
        }

        return this;
    }

    ShowAll() {
        if (!this.isExpired) {
            const duration = 500;
            this.monthsHandle.ShowAnimation(duration, () => {
                this.daysHandle.ShowAnimation(duration, () => {
                    this.hoursHandle.ShowAnimation(duration, () => {
                        this.minutesHandle.ShowAnimation(duration, () => {
                            this.secondsHandle.ShowAnimation(duration, () => {});
                        });
                    });
                });
            });
        }

        return this;
    }

    getDateObject(dateString) {
        const splitted = dateString.split('T');
        const date = splitted[0].split('-');
        const time = splitted[1].split(':');
    
        return {years: date[0], months: date[1], days: date[2], hours: time[0], minutes: time[1], seconds: time[2]};
    }
}