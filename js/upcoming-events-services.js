(function(){
  const events = [
    ['MAY','20','TUE','06:00 PM','Youth Fellowship Meeting','A time of worship, fellowship and bible study for youth.','Meeting','Youth Hall','Youth Ministry','45 / 60',75,'Upcoming','teal'],
    ['MAY','25','SUN','09:30 AM','Sunday School Anniversary','Thanksgiving service for Sunday School Anniversary.','Special Service','Main Auditorium','Sunday School','120 / 150',80,'Upcoming','purple'],
    ['JUN','01','SUN','08:00 AM','Holy Communion Service','Holy Communion Service & Worship.','Service','Main Church','Worship Committee','–',0,'Upcoming','orange'],
    ['JUN','07','SAT','04:00 PM','Women’s Fellowship Meeting','Monthly fellowship and prayer meeting for women.','Meeting','Fellowship Hall','Women’s Fellowship','35 / 50',70,'Upcoming','green'],
    ['JUN','15','SUN','05:00 PM','Parish Council Meeting','Monthly Parish Council Committee Meeting.','Meeting','Conference Room','Parish Council','18 / 20',90,'Upcoming','purple'],
    ['JUN','21','SAT','09:00 AM','Prayer Retreat','One day prayer retreat for spiritual growth.','Retreat','Retreat Center','Prayer Ministry','60 / 80',75,'Upcoming','green'],
    ['JUN','29','SUN','06:00 PM','Gospel Music Night','An evening of gospel music and worship.','Program','Main Auditorium','Choir & Worship Team','200 / 250',80,'Upcoming','purple'],
    ['JUL','05','SAT','10:00 AM','Bible Convention 2025','Annual Bible Convention with various speakers.','Event','Convention Center','Parish Office','350 / 500',70,'Upcoming','green'],
    ['JUL','13','SUN','08:00 AM','Youth Sunday Service','Youth led worship service.','Service','Main Church','Youth Ministry','–',0,'Upcoming','purple'],
    ['AUG','02','SAT','04:00 PM','Family Retreat','Retreat for all families of the church.','Retreat','Hill View Resort','Family Ministry','75 / 100',75,'Upcoming','teal']
  ];
  const tbody = document.querySelector('#eventsTable tbody');
  function catClass(cat){ if(cat==='Special Service') return 'cat-Special'; return 'cat-'+cat.replace(/\s/g,''); }
  function renderRows(filter='all'){
    if(!tbody) return;
    tbody.innerHTML='';
    events.filter(e=>filter==='all'||e[6]===filter).forEach(e=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td><div class="date-cell"><div class="date-badge ${e[12]}"><span>${e[0]}</span><strong>${e[1]}</strong><small>${e[2]}</small></div><div class="date-time">${e[3]}</div></div></td><td><div class="event-name"><b>${e[4]}</b><small>${e[5]}</small></div></td><td><span class="cat-badge ${catClass(e[6])}">${e[6]}</span></td><td>${e[7]}</td><td>${e[8]}</td><td class="reg-cell"><span>${e[9]}</span>${e[10]?`<div class="progress"><i style="width:${e[10]}%"></i></div>`:''}</td><td><span class="status-upcoming">${e[11]}</span></td><td><button class="action-dots" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button></td>`;
      tbody.appendChild(tr);
    });
  }
  renderRows();
  document.querySelectorAll('.events-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.events-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderRows(btn.dataset.filter)}));

  const modal=document.getElementById('eventWizardModal');
  const addBtn=document.getElementById('addEventBtn');
  const closeBtns=document.querySelectorAll('.event-modal-close');
  const steps=[...document.querySelectorAll('.wizard-step')];
  const tabs=[...document.querySelectorAll('.step-tab')];
  const next=document.getElementById('wizardNext');
  const back=document.getElementById('wizardBack');
  const save=document.getElementById('wizardSave');
  const form=document.getElementById('eventWizardForm');
  const errors=document.getElementById('wizardErrors');
  let current=0;
  function openModal(){modal.classList.add('show');modal.setAttribute('aria-hidden','false');setStep(0)}
  function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');errors.textContent=''}
  function setStep(i){current=Math.max(0,Math.min(i,steps.length-1));steps.forEach((s,idx)=>s.classList.toggle('active',idx===current));tabs.forEach((t,idx)=>t.classList.toggle('active',idx===current));back.style.visibility=current===0?'hidden':'visible';next.style.display=current===steps.length-1?'none':'inline-flex';save.style.display=current===steps.length-1?'inline-flex':'none';errors.textContent=''}
  function validateStep(){
    errors.textContent=''; let ok=true;
    steps[current].querySelectorAll('[required]').forEach(el=>{el.classList.remove('invalid'); if(!el.value.trim()){ok=false; el.classList.add('invalid')}});
    if(!ok) errors.textContent='Please fill all required fields before continuing.';
    return ok;
  }
  addBtn && addBtn.addEventListener('click',openModal);
  closeBtns.forEach(b=>b.addEventListener('click',closeModal));
  modal && modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  tabs.forEach(t=>t.addEventListener('click',()=>{ if(+t.dataset.step<=current || validateStep()) setStep(+t.dataset.step); }));
  next && next.addEventListener('click',()=>{if(validateStep())setStep(current+1)});
  back && back.addEventListener('click',()=>setStep(current-1));

  const sessionRows=document.getElementById('sessionRows');
  const seed=[['20/05/2025','Tuesday','06:00 PM','08:00 PM','Opening Worship'],['27/05/2025','Tuesday','06:00 PM','08:00 PM','Bible Study Session'],['03/06/2025','Tuesday','06:00 PM','08:00 PM','Prayer & Fellowship'],['10/06/2025','Tuesday','06:00 PM','08:00 PM','Closing Service']];
  function addSession(row){
    const idx=sessionRows.children.length+1;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${idx}</td><td><input value="${row?.[0]||''}" placeholder="dd/mm/yyyy"></td><td><select><option>${row?.[1]||'Tuesday'}</option><option>Sunday</option><option>Monday</option><option>Wednesday</option></select></td><td><input value="${row?.[2]||'06:00 PM'}"></td><td><input value="${row?.[3]||'08:00 PM'}"></td><td><input value="${row?.[4]||''}" placeholder="Session title"></td><td><button type="button" class="delete-session"><i class="fa-regular fa-trash-can"></i></button></td>`;
    sessionRows.appendChild(tr);
    tr.querySelector('.delete-session').addEventListener('click',()=>{tr.remove();[...sessionRows.children].forEach((r,i)=>r.children[0].textContent=i+1)});
  }
  seed.forEach(addSession);
  document.getElementById('addSessionBtn')?.addEventListener('click',()=>addSession());

  const organizers=[['JS','John Samuel','Parish Secretary','+91 98765 43210','#dff4ff'],['MS','Mary Samuel','Worship Committee','+91 98765 43211','#ffe3ee'],['DS','David Samuel','Youth Ministry','+91 98765 43212','#ffdfe5'],['RS','Ruth Samuel','Women’s Fellowship','+91 98765 43213','#dff3d8'],['AS','Anna Samuel','Sunday School','+91 98765 43214','#fff0c8'],['PT','Peter Thomas','Finance Committee','+91 98765 43215','#dceaff'],['JM','Joseph Mathew','Event Committee','+91 98765 43216','#fff0d6']];
  const organizerList=document.getElementById('organizerList');
  function renderOrganizers(q=''){
    if(!organizerList)return; organizerList.innerHTML='';
    organizers.filter(o=>(o[1]+o[2]).toLowerCase().includes(q.toLowerCase())).forEach(o=>{
      const div=document.createElement('div'); div.className='organizer-row';
      div.innerHTML=`<input type="checkbox"><span class="avatar-mini" style="background:${o[4]}">${o[0]}</span><span><b>${o[1]}</b><small>${o[2]}</small></span><em>${o[3]}</em>`;
      organizerList.appendChild(div);
    });
  }
  renderOrganizers();
  document.getElementById('organizerSearch')?.addEventListener('input',e=>renderOrganizers(e.target.value));

  document.querySelectorAll('.drop-area').forEach(area=>{
    area.addEventListener('dragover',e=>{e.preventDefault();area.classList.add('drag')});
    area.addEventListener('dragleave',()=>area.classList.remove('drag'));
    area.addEventListener('drop',e=>{e.preventDefault();area.classList.remove('drag');area.querySelector('strong').textContent='File ready';});
  });
  form && form.addEventListener('submit',e=>{
    e.preventDefault(); if(!validateStep()) return;
    const title=form.eventTitle.value || 'New Church Event';
    events.unshift(['MAY','18','SUN',form.startTime.value || '06:00 PM',title,form.description.value || 'New event added from popup.',form.eventCategory.value || 'Event','Main Church',form.organizedBy.value || 'Parish Office','0 / '+(form.registrationLimit.value||100),10,'Upcoming','teal']);
    renderRows('all'); document.querySelectorAll('.events-tab').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));
    closeModal();
  });
})();


(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const panel=$('#eventsCalendarPanel');
  const toggle=$('#calendarViewBtn');
  const grid=$('#eventsCalendarGrid');
  const title=$('#eventsCalTitle');
  const prev=$('#eventsCalPrev');
  const next=$('#eventsCalNext');
  const monthBody=$('#eventsMonthView');
  const dayBody=$('#eventsDayView');
  const dayList=$('#dayEventList');
  const dayLabel=$('#selectedDayLabel');
  const dayCount=$('#selectedDayCount');
  if(!panel || !grid) return;

  const items=[
    {date:'2025-05-20',time:'06:00 PM',title:'Youth Fellowship Meeting',type:'Meeting',location:'Youth Hall'},
    {date:'2025-05-25',time:'09:30 AM',title:'Sunday School Anniversary',type:'Special Service',location:'Main Auditorium'},
    {date:'2025-06-01',time:'08:00 AM',title:'Holy Communion Service',type:'Service',location:'Main Church'},
    {date:'2025-06-07',time:'04:00 PM',title:'Women’s Fellowship Meeting',type:'Meeting',location:'Fellowship Hall'},
    {date:'2025-06-15',time:'05:00 PM',title:'Parish Council Meeting',type:'Meeting',location:'Conference Room'},
    {date:'2025-06-21',time:'09:00 AM',title:'Prayer Retreat',type:'Retreat',location:'Retreat Center'},
    {date:'2025-06-29',time:'06:00 PM',title:'Gospel Music Night',type:'Program',location:'Main Auditorium'},
    {date:'2025-07-05',time:'10:00 AM',title:'Bible Convention 2025',type:'Event',location:'Convention Center'},
    {date:'2025-07-13',time:'08:00 AM',title:'Youth Sunday Service',type:'Service',location:'Main Church'},
    {date:'2025-08-02',time:'04:00 PM',title:'Family Retreat',type:'Retreat',location:'Hill View Resort'}
  ];
  let cal=new Date(2025,4,1);
  let selected='2025-05-20';
  let view='month';
  const key=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const nice=(k)=>new Date(k+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
  function eventsFor(k){return items.filter(x=>x.date===k);}
  function renderDay(k=selected){
    selected=k; const evs=eventsFor(k);
    if(dayLabel) dayLabel.textContent=nice(k);
    if(dayCount) dayCount.textContent=`${evs.length} event${evs.length===1?'':'s'}`;
    if(dayList) dayList.innerHTML=evs.length?evs.map(ev=>`<div class="day-event-item"><i class="fa-regular fa-calendar-check"></i><span><b>${ev.title}</b><span>${ev.location}</span></span><em>${ev.time}</em></div>`).join(''):'<div class="day-event-item"><i class="fa-regular fa-calendar"></i><span><b>No events scheduled</b><span>Select another day or add a new event.</span></span><em>Free</em></div>';
  }
  function renderMonth(){
    title.textContent=cal.toLocaleString('en-US',{month:'long',year:'numeric'});
    grid.innerHTML='';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(w=>{const d=document.createElement('div');d.className='weekday';d.textContent=w;grid.appendChild(d);});
    const first=new Date(cal.getFullYear(),cal.getMonth(),1).getDay();
    const days=new Date(cal.getFullYear(),cal.getMonth()+1,0).getDate();
    for(let i=0;i<first;i++){const blank=document.createElement('button');blank.type='button';blank.className='events-calendar-day muted';blank.disabled=true;blank.innerHTML='<span class="date-num">&nbsp;</span>';grid.appendChild(blank);} 
    for(let d=1;d<=days;d++){
      const k=key(cal.getFullYear(),cal.getMonth(),d); const evs=eventsFor(k); const btn=document.createElement('button');
      btn.type='button'; btn.className='events-calendar-day'+(k===selected?' selected':'');
      btn.innerHTML=`<span class="date-num">${d}</span>${evs.slice(0,2).map(ev=>`<span class="event-pill">${ev.title}</span>`).join('')}${evs.length>2?`<span class="more-events">+${evs.length-2} more</span>`:''}`;
      btn.addEventListener('click',()=>{selected=k;renderMonth();renderDay(k);});
      grid.appendChild(btn);
    }
    renderDay(selected);
  }
  function setView(v){
    view=v; $$('.view-switch button',panel).forEach(b=>b.classList.toggle('active',b.dataset.calendarView===v));
    monthBody?.classList.toggle('active',v==='month'); dayBody?.classList.toggle('active',v==='day');
    renderMonth(); renderDay(selected);
  }
  toggle?.addEventListener('click',e=>{e.preventDefault();const show=!panel.classList.contains('show');panel.classList.toggle('show',show);panel.setAttribute('aria-hidden',show?'false':'true');toggle.setAttribute('aria-expanded',show?'true':'false');if(show)renderMonth();});
  prev?.addEventListener('click',e=>{e.preventDefault(); if(view==='month'){cal.setMonth(cal.getMonth()-1); selected=key(cal.getFullYear(),cal.getMonth(),1);} else {const d=new Date(selected+'T12:00:00');d.setDate(d.getDate()-1);selected=key(d.getFullYear(),d.getMonth(),d.getDate());cal=new Date(d.getFullYear(),d.getMonth(),1);} renderMonth();});
  next?.addEventListener('click',e=>{e.preventDefault(); if(view==='month'){cal.setMonth(cal.getMonth()+1); selected=key(cal.getFullYear(),cal.getMonth(),1);} else {const d=new Date(selected+'T12:00:00');d.setDate(d.getDate()+1);selected=key(d.getFullYear(),d.getMonth(),d.getDate());cal=new Date(d.getFullYear(),d.getMonth(),1);} renderMonth();});
  $$('.view-switch button',panel).forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.calendarView)));
  renderMonth();
})();


/* Robust calendar view/date actions fallback */
(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const panel=$('#eventsCalendarPanel');
  const toggle=$('#calendarViewBtn');
  const grid=$('#eventsCalendarGrid');
  const title=$('#eventsCalTitle');
  const prev=$('#eventsCalPrev');
  const next=$('#eventsCalNext');
  const monthBody=$('#eventsMonthView');
  const dayBody=$('#eventsDayView');
  const dayList=$('#dayEventList');
  const dayLabel=$('#selectedDayLabel');
  const dayCount=$('#selectedDayCount');
  if(!panel || !toggle || !grid || !title) return;
  const items=[
    {date:'2025-05-20',time:'06:00 PM',title:'Youth Fellowship Meeting',type:'Meeting',location:'Youth Hall'},
    {date:'2025-05-25',time:'09:30 AM',title:'Sunday School Anniversary',type:'Special Service',location:'Main Auditorium'},
    {date:'2025-06-01',time:'08:00 AM',title:'Holy Communion Service',type:'Service',location:'Main Church'},
    {date:'2025-06-07',time:'04:00 PM',title:'Women’s Fellowship Meeting',type:'Meeting',location:'Fellowship Hall'},
    {date:'2025-06-15',time:'05:00 PM',title:'Parish Council Meeting',type:'Meeting',location:'Conference Room'},
    {date:'2025-06-21',time:'09:00 AM',title:'Prayer Retreat',type:'Retreat',location:'Retreat Center'}
  ];
  let cal=new Date(2025,4,1), selected='2025-05-20', view='month';
  const key=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const nice=k=>new Date(k+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
  const eventsFor=k=>items.filter(x=>x.date===k);
  function renderDay(k=selected){
    selected=k; const evs=eventsFor(k);
    if(dayLabel) dayLabel.textContent=nice(k);
    if(dayCount) dayCount.textContent=`${evs.length} event${evs.length===1?'':'s'}`;
    if(dayList) dayList.innerHTML=evs.length ? evs.map(ev=>`<div class="day-event-item"><i class="fa-regular fa-calendar-check"></i><span><b>${ev.title}</b><span>${ev.location}</span></span><em>${ev.time}</em></div>`).join('') : '<div class="day-event-item"><i class="fa-regular fa-calendar"></i><span><b>No events scheduled</b><span>Select another day or add a new event.</span></span><em>Free</em></div>';
  }
  function renderMonth(){
    title.textContent=cal.toLocaleString('en-US',{month:'long',year:'numeric'});
    grid.innerHTML='';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(w=>{const d=document.createElement('div');d.className='weekday';d.textContent=w;grid.appendChild(d);});
    const first=new Date(cal.getFullYear(),cal.getMonth(),1).getDay();
    const days=new Date(cal.getFullYear(),cal.getMonth()+1,0).getDate();
    for(let i=0;i<first;i++){const blank=document.createElement('button');blank.type='button';blank.className='events-calendar-day muted';blank.disabled=true;blank.innerHTML='<span class="date-num">&nbsp;</span>';grid.appendChild(blank);}
    for(let d=1;d<=days;d++){
      const k=key(cal.getFullYear(),cal.getMonth(),d), evs=eventsFor(k);
      const btn=document.createElement('button'); btn.type='button'; btn.className='events-calendar-day'+(k===selected?' selected':'');
      btn.innerHTML=`<span class="date-num">${d}</span>${evs.slice(0,2).map(ev=>`<span class="event-pill">${ev.title}</span>`).join('')}${evs.length>2?`<span class="more-events">+${evs.length-2} more</span>`:''}`;
      btn.addEventListener('click',()=>{selected=k;renderMonth();renderDay(k); if(view==='day') setView('day');});
      grid.appendChild(btn);
    }
    renderDay(selected);
  }
  function setView(v){
    view=v;
    $$('.view-switch button',panel).forEach(b=>b.classList.toggle('active',b.dataset.calendarView===v));
    monthBody?.classList.toggle('active',v==='month');
    dayBody?.classList.toggle('active',v==='day');
    renderMonth(); renderDay(selected);
  }
  toggle.onclick=e=>{e.preventDefault(); const show=!panel.classList.contains('show'); panel.classList.toggle('show',show); panel.setAttribute('aria-hidden',show?'false':'true'); toggle.setAttribute('aria-expanded',show?'true':'false'); if(show)renderMonth();};
  prev && (prev.onclick=e=>{e.preventDefault(); if(view==='month'){cal.setMonth(cal.getMonth()-1); selected=key(cal.getFullYear(),cal.getMonth(),1);} else {const d=new Date(selected+'T12:00:00');d.setDate(d.getDate()-1);selected=key(d.getFullYear(),d.getMonth(),d.getDate());cal=new Date(d.getFullYear(),d.getMonth(),1);} renderMonth();});
  next && (next.onclick=e=>{e.preventDefault(); if(view==='month'){cal.setMonth(cal.getMonth()+1); selected=key(cal.getFullYear(),cal.getMonth(),1);} else {const d=new Date(selected+'T12:00:00');d.setDate(d.getDate()+1);selected=key(d.getFullYear(),d.getMonth(),d.getDate());cal=new Date(d.getFullYear(),d.getMonth(),1);} renderMonth();});
  $$('.view-switch button',panel).forEach(btn=>btn.onclick=()=>setView(btn.dataset.calendarView || 'month'));
  renderMonth();
})();

// Shared Upcoming Events calendar panel: month/day view, prev/next, no select box.
document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('eventsCalendarPanel');
  const toggle = document.getElementById('calendarViewBtn');
  if (!panel || !toggle || panel.dataset.calendarReady === 'true') return;
  panel.dataset.calendarReady = 'true';

  const controls = panel.querySelector('.events-calendar-controls') || panel.querySelector('.events-calendar-head')?.appendChild(document.createElement('div'));
  if (controls) {
    controls.classList.add('events-calendar-controls');
    controls.querySelectorAll('select').forEach(select => select.remove());
    let title = document.getElementById('eventsCalTitle');
    if (!title) {
      title = document.createElement('strong');
      title.id = 'eventsCalTitle';
      controls.appendChild(title);
    }
    if (!document.getElementById('eventsCalPrev')) {
      const prev = document.createElement('button');
      prev.id = 'eventsCalPrev';
      prev.type = 'button';
      prev.className = 'calendar-nav';
      prev.setAttribute('aria-label', 'Previous');
      prev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      controls.insertBefore(prev, title);
    }
    if (!document.getElementById('eventsCalNext')) {
      const next = document.createElement('button');
      next.id = 'eventsCalNext';
      next.type = 'button';
      next.className = 'calendar-nav';
      next.setAttribute('aria-label', 'Next');
      next.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
      title.insertAdjacentElement('afterend', next);
    }
    if (!controls.querySelector('.view-switch')) {
      const views = document.createElement('div');
      views.className = 'view-switch';
      views.setAttribute('role', 'tablist');
      views.innerHTML = '<button class="active" data-calendar-view="month" type="button">Month View</button><button data-calendar-view="day" type="button">Day View</button>';
      controls.appendChild(views);
    }
  }

  const monthBody = document.getElementById('eventsMonthView');
  const dayBody = document.getElementById('eventsDayView');
  const grid = document.getElementById('eventsCalendarGrid');
  const title = document.getElementById('eventsCalTitle');
  const dayLabel = document.getElementById('selectedDayLabel');
  const dayCount = document.getElementById('selectedDayCount');
  const dayList = document.getElementById('dayEventList');
  const prevBtn = document.getElementById('eventsCalPrev');
  const nextBtn = document.getElementById('eventsCalNext');
  let current = new Date(2025, 4, 1);
  let selected = new Date(2025, 4, 18);
  let view = 'month';
  const data = [
    {date:'2025-05-20', title:'Youth Fellowship Meeting', time:'06:00 PM', location:'Youth Hall'},
    {date:'2025-05-25', title:'Sunday School Anniversary', time:'09:30 AM', location:'Main Auditorium'},
    {date:'2025-06-01', title:'Holy Communion Service', time:'08:00 AM', location:'Main Church'},
    {date:'2025-06-07', title:'Women’s Fellowship Meeting', time:'04:00 PM', location:'Fellowship Hall'},
    {date:'2025-06-15', title:'Parish Council Meeting', time:'05:00 PM', location:'Conference Room'}
  ];
  const key = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const parse = s => { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); };
  const eventsFor = d => data.filter(ev => ev.date === key(d));
  function renderDay(){
    const evs = eventsFor(selected);
    if (dayLabel) dayLabel.textContent = selected.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    if (dayCount) dayCount.textContent = `${evs.length} event${evs.length === 1 ? '' : 's'}`;
    if (dayList) dayList.innerHTML = evs.length ? evs.map(ev => `<div class="day-event-item"><i class="fa-regular fa-calendar-check"></i><div><b>${ev.title}</b><span>${ev.time}</span></div><em>${ev.location}</em></div>`).join('') : '<div class="day-event-empty">No events for this date</div>';
  }
  function renderMonth(){
    if (title) title.textContent = current.toLocaleDateString('en-US', { month:'long', year:'numeric' });
    if (!grid) return;
    grid.innerHTML = '';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'weekday';
      cell.textContent = day;
      grid.appendChild(cell);
    });
    const first = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const days = new Date(current.getFullYear(), current.getMonth()+1, 0).getDate();
    for (let i=0; i<first; i++) {
      const blank = document.createElement('button');
      blank.type = 'button';
      blank.className = 'events-calendar-day muted';
      blank.disabled = true;
      grid.appendChild(blank);
    }
    for (let d=1; d<=days; d++) {
      const date = new Date(current.getFullYear(), current.getMonth(), d);
      const evs = eventsFor(date);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'events-calendar-day' + (key(date) === key(selected) ? ' selected' : '');
      cell.innerHTML = `<span class="date-num">${d}</span>${evs.slice(0,2).map(ev => `<span class="event-pill">${ev.title}</span>`).join('')}${evs.length > 2 ? `<span class="more-events">+${evs.length-2} more</span>` : ''}`;
      cell.addEventListener('click', () => { selected = date; renderMonth(); renderDay(); });
      grid.appendChild(cell);
    }
    renderDay();
  }
  function setView(nextView){
    view = nextView;
    panel.querySelectorAll('.view-switch button').forEach(btn => btn.classList.toggle('active', btn.dataset.calendarView === view));
    monthBody?.classList.toggle('active', view === 'month');
    dayBody?.classList.toggle('active', view === 'day');
    renderMonth();
  }
  toggle.addEventListener('click', e => {
    e.preventDefault();
    const open = !panel.classList.contains('show');
    panel.classList.toggle('show', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) renderMonth();
  });
  prevBtn?.addEventListener('click', e => {
    e.preventDefault();
    if (view === 'month') current.setMonth(current.getMonth()-1);
    else selected.setDate(selected.getDate()-1), current = new Date(selected.getFullYear(), selected.getMonth(), 1);
    renderMonth();
  });
  nextBtn?.addEventListener('click', e => {
    e.preventDefault();
    if (view === 'month') current.setMonth(current.getMonth()+1);
    else selected.setDate(selected.getDate()+1), current = new Date(selected.getFullYear(), selected.getMonth(), 1);
    renderMonth();
  });
  panel.querySelectorAll('.view-switch button').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.calendarView || 'month')));
  renderMonth();
});
