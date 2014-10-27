$.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    events: [
      {
        title: 'Practice',
        start: new Date(y, m, 1)
      },
      {
        title: 'Competition',
        start: new Date(y, m, d-5),
        end: new Date(y, m, d-2)
      },
      {
        id: 999,
        title: 'Friendly meet between the teams',
        start: new Date(y, m, d-3, 16, 0),
        allDay: false
      },
      // {
        // id: 999,
        // title: 'Repeating Event',
        // start: new Date(y, m, d+4, 16, 0),
        // allDay: false
      // },
      {
        title: 'Game vs SLB',
        start: new Date(y, m, d, 10, 30),
        allDay: false
      },
      // {
        // title: 'Lunch',
        // start: new Date(y, m, d, 12, 0),
        // end: new Date(y, m, d, 14, 0),
        // allDay: false
      // },
      {
        title: 'Practice',
        start: new Date(y, m, d+1, 19, 0),
        end: new Date(y, m, d+1, 22, 30),
        allDay: false
      },
      {
        title: 'Lunch with the President',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
      }
    ]
  });
})