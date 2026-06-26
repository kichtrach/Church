(function(){
  'use strict';

  const $=(selector,scope=document)=>scope.querySelector(selector);
  const $$=(selector,scope=document)=>Array.from(scope.querySelectorAll(selector));
  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let calendarDate=new Date();
  let selectedDate=new Date();

  const calendarEvents={
    '2025-05-04':[
      {time:'07:00 AM',title:'Holy Communion Service'},
      {time:'10:30 AM',title:'Sunday School'}
    ],
    '2025-05-06':[
      {time:'05:00 PM',title:'Choir Practice'}
    ],
    '2025-05-11':[
      {time:'08:00 AM',title:'Morning Prayer'},
      {time:'06:00 PM',title:'Youth Fellowship'}
    ],
    '2025-05-18':[
      {time:'09:00 AM',title:'Women’s Fellowship'},
      {time:'05:30 PM',title:'Bible Study'},
      {time:'07:00 PM',title:'Committee Follow-up'}
    ],
    '2025-05-25':[
      {time:'08:30 AM',title:'Baptism Service'},
      {time:'04:00 PM',title:'Pastoral Visit'}
    ]
  };

  function ready(callback){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',callback,{once:true});
    else callback();
  }

  function formatKey(date){
    const y=date.getFullYear();
    const m=String(date.getMonth()+1).padStart(2,'0');
    const d=String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function notify(message){
    let toast=$('.csi-toast');
    if(!toast){
      toast=document.createElement('div');
      toast.className='csi-toast';
      document.body.appendChild(toast);
    }
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer=setTimeout(()=>toast.classList.remove('show'),1700);
  }

  function initSidebar(){
    // Sidebar behavior is handled globally in js/sidebar.js.
  }

  function initStatCards(){
    $$('.dashboard-stats .stat-card a').forEach(link=>{
      const text=link.textContent.replace('→','').trim();
      link.innerHTML=`${text} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>`;
    });
  }

  function eventsForDate(date){
    const exact=calendarEvents[formatKey(date)] || [];
    if(exact.length) return exact;
    const day=date.getDate();
    const weekday=date.getDay();
    const fallback=[];
    if(weekday===0) fallback.push({time:'08:00 AM',title:'Sunday Service'});
    if(day===selectedDate.getDate() && date.getMonth()===selectedDate.getMonth()) fallback.push({time:'06:00 PM',title:'Parish Office Follow-up'});
    return fallback;
  }

  function updateCalendarEvents(pop,date){
    const box=$('.topbar-calendar-events',pop);
    if(!box) return;
    const events=eventsForDate(date);
    if(!events.length){
      box.innerHTML='<p><i class="fa-regular fa-calendar-check"></i><span><strong>No events</strong>No scheduled activity for this date.</span></p>';
      return;
    }
    box.innerHTML=events.map(item=>`<p><i class="fa-solid fa-circle"></i><span><strong>${item.time}</strong>${item.title}</span></p>`).join('');
  }

  function renderCalendar(pop){
    if(!pop) return;
    const grid=$('.cal-grid',pop);
    const title=$('.cal-title',pop);
    if(!grid || !title) return;

    title.textContent=`${monthNames[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;
    grid.innerHTML='';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day=>{
      const label=document.createElement('b');
      label.textContent=day;
      grid.appendChild(label);
    });

    const firstDay=new Date(calendarDate.getFullYear(),calendarDate.getMonth(),1).getDay();
    const totalDays=new Date(calendarDate.getFullYear(),calendarDate.getMonth()+1,0).getDate();
    for(let index=0; index<firstDay; index++) grid.appendChild(document.createElement('span'));

    const today=new Date();
    for(let day=1; day<=totalDays; day++){
      const date=new Date(calendarDate.getFullYear(),calendarDate.getMonth(),day);
      const button=document.createElement('button');
      button.type='button';
      const eventCount=eventsForDate(date).length;
      button.innerHTML=`<span>${day}</span>${eventCount?`<em class="event-dots">${Array.from({length:Math.min(eventCount,3)},()=>'<i></i>').join('')}</em>`:''}`;
      button.setAttribute('aria-label',`Select ${date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}`);
      if(day===today.getDate() && calendarDate.getMonth()===today.getMonth() && calendarDate.getFullYear()===today.getFullYear()) button.classList.add('today');
      if(day===selectedDate.getDate() && calendarDate.getMonth()===selectedDate.getMonth() && calendarDate.getFullYear()===selectedDate.getFullYear()) button.classList.add('active');
      button.addEventListener('click',event=>{
        event.stopPropagation();
        selectedDate=date;
        $$('.cal-grid button',pop).forEach(item=>item.classList.remove('active'));
        button.classList.add('active');
        updateCalendarEvents(pop,date);
      });
      grid.appendChild(button);
    }
    updateCalendarEvents(pop,selectedDate);
  }

  function closeCalendar(){
    const pop=$('.topbar .calendar-pop');
    const toggle=$('.topbar .calendar-toggle');
    pop?.classList.remove('show');
    toggle?.setAttribute('aria-expanded','false');
  }

  function initTopbarCalendar(){
    // Topbar calendar is handled globally in js/header.js to avoid duplicate click handlers.
  }

  function refreshMemberChart(){
    const panel=$('.member-chart-panel');
    if(!panel) return;
    const month=$('.chart-month',panel)?.value || 'Last 6 Months';
    const year=$('.chart-year',panel)?.value || '2025';
    const seed=(month+year).split('').reduce((sum,char)=>sum+char.charCodeAt(0),0);
    const series={
      total:$$('polyline.total',panel)[0],
      active:$$('polyline.active',panel)[0],
      newMembers:$$('polyline.new',panel)[0]
    };
    const pointGroups={
      total:$('.points.total',panel),
      active:$('.points.active',panel),
      newMembers:$('.points.new',panel)
    };
    const xValues=[20,155,290,425,560,700];
    const build=(offset,spread)=>xValues.map((x,index)=>({x,y:64+offset+((seed+(index*23)+offset)%spread)}));
    const data={total:build(8,58),active:build(45,55),newMembers:build(104,62)};
    Object.entries(data).forEach(([key,points])=>{
      const line=series[key];
      if(line) line.setAttribute('points',points.map(point=>`${point.x},${point.y}`).join(' '));
      const group=pointGroups[key];
      if(group){
        group.innerHTML='';
        points.forEach(point=>{
          const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
          circle.setAttribute('cx',point.x);
          circle.setAttribute('cy',point.y);
          group.appendChild(circle);
        });
      }
    });
  }

  function initMemberStatistics(){
    $$('.member-chart-panel .chart-month,.member-chart-panel .chart-year').forEach(select=>{
      if(select.dataset.dashboardBound==='true') return;
      select.dataset.dashboardBound='true';
      select.addEventListener('change',()=>{
        refreshMemberChart();
        notify('Member Statistics updated');
      });
    });
    refreshMemberChart();
  }

  function initQuickActions(){
    $$('.quick-grid .btn').forEach(button=>{
      if(button.dataset.dashboardBound==='true') return;
      button.dataset.dashboardBound='true';
      button.addEventListener('click',event=>{
        event.preventDefault();
        const label=button.textContent.trim();
        const modal=$('#recordModal');
        if(modal){
          modal.classList.add('show');
          modal.removeAttribute('hidden');
          const heading=$('.modal-head h3',modal);
          if(heading) heading.textContent=label;
          $('input,select,textarea,button',modal)?.focus();
        }else{
          notify(`${label} opened`);
        }
      });
    });
  }

  function initDropdowns(){
    // Notification/profile dropdowns are handled globally in js/header.js.
  }

  function initMiniCalendar(){
    $$('.mini-cal-days span').forEach(day=>{
      if(day.dataset.dashboardBound==='true') return;
      day.dataset.dashboardBound='true';
      day.addEventListener('click',()=>{
        $$('.mini-cal-days .active').forEach(active=>active.classList.remove('active'));
        (day.querySelector('.circle')||day).classList.add('active');
      });
    });
  }

  ready(()=>{
    // Sidebar and topbar calendar are centralized in sidebar.js/header.js.
    initStatCards();
    initMemberStatistics();
    initQuickActions();
    initDropdowns();
    initMiniCalendar();
  });
})();
