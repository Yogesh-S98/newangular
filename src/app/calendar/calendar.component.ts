import { Component, OnInit } from '@angular/core';
import { Day } from './day.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  date: any = moment();
  daysArr: any = [];
  weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthName: any = moment();
  today: any = moment();
  showTooltip(value: any) {
    const seeDate = moment().year(this.monthName.year()).month(this.monthName.month()).date(value);
    return seeDate.format('MMMM dddd DD YYYY');
  }
  copy(value: any) {
    const textarea = document.createElement('textarea');
    const date: any = moment().year(this.monthName.year()).month(this.monthName.month()).date(value)
    textarea.value = date.format('MMMM dddd DD YYYY');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
  }
  shiftMonth(i: any, day: any) {
    if (day > 0 && day < 7) {
      this.monthInc();
    }
    if (day > 20 && day < 32) {
      this.monthDec();
    }
  }
  isToday(day: any) {
    return moment().isSame(moment().date(day).month(this.monthName.month()).year(this.monthName.year()), 'day');
  }
  showMonth() {
    return moment(this.monthName).format('MMMM YYYY');
  }
  monthDec() {
    this.monthName = moment(this.monthName).subtract(1, 'M');
    this.daysArr = [].concat.apply([], this.getWeekDays(this.monthName.year(), this.monthName.month()));
  }
  monthInc() {
    this.monthName = moment(this.monthName).add(1, 'M');
    this.daysArr = [].concat.apply([], this.getWeekDays(this.monthName.year(), this.monthName.month()));
  }
  weekOfMonth(m: any) {
    return m.week() - moment(m).startOf('month').week() + 1;
  }
  getWeeks (year: any, month: any) {
    const m = moment();
    m.set({ year, month, date: 1 }); // (months are 0-based, days are 1-based)
    console.log('dsafsafaf', year, month)
    const decNumDays = m.daysInMonth();
    const result = [];
    // eslint-disable-next-line
    for (let date = 1; date <= decNumDays; date++) {
      m.set('date', date);
      result.push({
        dayName: m.format('dddd'),
        dayOfMonth: date,
        weekOfMonth: this.weekOfMonth(m),
        // date: m.format('dddd, MMMM Do YYYY')
      });
    }
    const weeks: any = [];
    const objectKeys = _.groupBy(result, 'weekOfMonth');
    const week = Object.values(objectKeys);
    // eslint-disable-next-line
    for(let i=0; i < week.length; i++) {
      weeks.push(week[i].map(x => 
        x.dayOfMonth,
        ));
    }
    return weeks;
  };
  showDate(date: any) {
    if (typeof date !== 'object') {
        return date;
    }
    return { day: moment(date).format('D') };
  }
  getWeekDays(year: any, month: any) {
    // eslint-disable-next-line
    let dates: any = this.getWeeks(year, month);
    // eslint-disable-next-line
    if (Array.isArray(dates[0])) {
      const empty = new Array(7 - dates[0].length).fill(null);
      // eslint-disable-next-line
      const previousMonthDates = empty.map((x, i) => moment(this.monthName).date(-i));
      dates[0] = [...previousMonthDates.reverse(), ...dates[0]];
    }
    if (Array.isArray(dates[dates.length - 1])) {
      const lastDay = moment(this.monthName).endOf('month');
      // eslint-disable-next-line
      let lastWeek = dates[dates.length - 1];
      while (lastWeek.length < 7) {
        if (!lastWeek.includes(Number(lastDay.format('D')))) {
          lastWeek.push(lastDay.format('D'));
        } else {
          lastWeek.push(null);
        }
      }
      // eslint-disable-next-line
      const nextMonthDates = lastWeek.filter((item: any) => item === null).map((x: any, i: any) => moment(lastDay).add(i+1, 'd'));
      dates[dates.length - 1] = [...lastWeek.filter((item: any) => item !== null), ...nextMonthDates];
    }
    return dates;
  }
  ngOnInit(): void {
    this.daysArr = [].concat.apply([], this.getWeekDays(moment().year, moment().month()));
    console.log('adfasf', this.daysArr);
    // this.daysArr = this.getWeekDays(moment().year, moment().month());
  }
}
