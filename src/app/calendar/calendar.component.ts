import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core'; // include this line
import { CalendarOptions , FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // Events = [{'title' : 'Event name', 'start' : '2022-04-05', }];
  Events =  [
    {
      title: 'Meeting',
      start: '2022-04-12T14:30:00',
      end : '2022-04-12T18:30:00',
    },
    {
      title: 'Birthday Party',
      start: '2022-04-13T07:00:00',
      backgroundColor: 'green',
      borderColor: 'green'
    }
  ];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  
  constructor() {  const name = Calendar.name}

  onDateClick(res:any) {
    alert('You clicked on : ' + res.dateStr)
  }

  ngOnInit(){
    
    setTimeout(() => {
      console.log("CALLED THIS FUNC");
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events : this.Events
      };
    }, 3500);
        
    }  

}
