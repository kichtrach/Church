(() => {
  const $ = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

  document.getElementById('globalSearch')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()) alert('Search demo: ' + e.target.value.trim());
  });

  // Sidebar toggle is centralized in js/sidebar.js.

  // Header dropdowns
  $$('.notify-toggle,.profile-toggle').forEach(btn => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const wrap = btn.closest('.dropdown-wrap');
      $$('.dropdown-wrap.open').forEach(w => { if (w !== wrap) w.classList.remove('open'); });
      wrap?.classList.toggle('open');
      closeTopbarCalendar();
      closePageDateMenus();
    });
  });

  const calendarEvents = {
    1:[{title:'Holy Communion Service',time:'08:00 AM'},{title:'Choir Practice',time:'04:00 PM'}],
    5:[{title:'Sunday School Classes',time:'09:30 AM'}],
    12:[{title:'Prayer Meeting',time:'06:00 PM'}],
    18:[{title:'Parish Council Meeting',time:'05:00 PM'},{title:'Youth Fellowship',time:'06:30 PM'},{title:'Finance Review',time:'07:15 PM'}],
    20:[{title:'Bible Study',time:'06:00 PM'},{title:'Women Fellowship',time:'04:00 PM'}],
    25:[{title:'Special Service',time:'08:00 AM'}]
  };
  let calDate = new Date(2025,4,1);
  let selectedDay = 18;

  function drawTopbarCalendar(pop){
    if(!pop) return;
    const grid = $('.cal-grid', pop), title = $('.cal-title', pop), eventBox = $('.topbar-calendar-events', pop);
    if(!grid || !title) return;
    title.textContent = calDate.toLocaleString('en-US',{month:'long',year:'numeric'});
    grid.innerHTML = '';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>{ const b=document.createElement('b'); b.textContent=d; grid.appendChild(b); });
    const first = new Date(calDate.getFullYear(),calDate.getMonth(),1).getDay();
    const days = new Date(calDate.getFullYear(),calDate.getMonth()+1,0).getDate();
    for(let i=0;i<first;i++) grid.appendChild(document.createElement('span'));
    for(let d=1; d<=days; d++){
      const btn = document.createElement('button');
      btn.type='button'; btn.dataset.day=d; btn.setAttribute('aria-label','Select '+d);
      btn.innerHTML = `<span>${d}</span>`;
      const today = new Date();
      if(d===today.getDate() && calDate.getMonth()===today.getMonth() && calDate.getFullYear()===today.getFullYear()) btn.classList.add('today');
      if(d===selectedDay) btn.classList.add('active');
      const evs = calendarEvents[d] || [];
      if(evs.length){ const dots=document.createElement('em'); dots.className='event-dots'; evs.slice(0,3).forEach(()=>dots.appendChild(document.createElement('i'))); btn.appendChild(dots); }
      btn.addEventListener('click', e=>{ e.stopPropagation(); selectedDay=d; drawTopbarCalendar(pop); });
      grid.appendChild(btn);
    }
    if(eventBox){
      const evs = calendarEvents[selectedDay] || [];
      eventBox.innerHTML = evs.length ? evs.map(ev=>`<p><i class="fa-regular fa-calendar-check"></i><span><strong>${ev.title}</strong>${ev.time}</span></p>`).join('') : '<p><i class="fa-regular fa-calendar"></i><span><strong>No events</strong>Selected date is free</span></p>';
    }
  }

  function closeTopbarCalendar(){
    $$('.topbar .calendar-pop.show').forEach(pop=>pop.classList.remove('show'));
    $$('.topbar .topbar-calendar-toggle[aria-expanded="true"]').forEach(btn=>btn.setAttribute('aria-expanded','false'));
  }
  function closePageDateMenus(){
    $$('.page-date-menu.show').forEach(menu=>{menu.classList.remove('show'); menu.setAttribute('aria-hidden','true');});
    $$('.page-actions .date-btn[aria-expanded="true"]').forEach(btn=>btn.setAttribute('aria-expanded','false'));
  }

  // Topbar calendar opens only from the topbar calendar button.
  $$('.topbar .topbar-calendar-toggle').forEach(btn=>{
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', e=>{
      e.preventDefault(); e.stopPropagation();
      const topbar = btn.closest('.topbar');
      const pop = $('.calendar-pop', topbar);
      if(!pop) return;
      const willShow = !pop.classList.contains('show');
      closeTopbarCalendar(); closePageDateMenus();
      $$('.dropdown-wrap.open').forEach(w=>w.classList.remove('open'));
      if(willShow){ drawTopbarCalendar(pop); pop.classList.add('show'); btn.setAttribute('aria-expanded','true'); }
    });
  });

  // Page title date dropdowns: .page-actions .date-btn.calendar-toggle.
  $$('.page-actions .date-btn.calendar-toggle, .page-actions .date-btn').forEach(btn=>{
    if (btn.dataset.pageDateBound === 'true') return;
    btn.dataset.pageDateBound = 'true';
    btn.setAttribute('type','button');
    btn.addEventListener('click', e=>{
      e.preventDefault(); e.stopPropagation();
      const actions = btn.closest('.page-actions');
      const menu = $('.page-date-menu', actions);
      if(!menu) return;
      const willShow = !menu.classList.contains('show');
      closePageDateMenus(); closeTopbarCalendar();
      $$('.dropdown-wrap.open').forEach(w=>w.classList.remove('open'));
      if(willShow){ menu.classList.add('show'); menu.setAttribute('aria-hidden','false'); btn.setAttribute('aria-expanded','true'); }
    });
  });

  document.addEventListener('click', e=>{
    const pop = e.target.closest('.topbar .calendar-pop');
    if(pop && e.target.closest('.cal-prev,.cal-next')){
      e.preventDefault(); e.stopPropagation();
      if(e.target.closest('.cal-prev')) calDate.setMonth(calDate.getMonth()-1);
      if(e.target.closest('.cal-next')) calDate.setMonth(calDate.getMonth()+1);
      selectedDay = 1; drawTopbarCalendar(pop); return;
    }
    const dateChoice = e.target.closest('.page-date-menu button');
    if(dateChoice){
      e.preventDefault(); e.stopPropagation();
      const menu = dateChoice.closest('.page-date-menu');
      const actions = menu?.closest('.page-actions');
      const btn = $('.date-btn', actions);
      $$('.page-date-menu button', actions).forEach(b=>b.classList.remove('active'));
      dateChoice.classList.add('active');
      const label = dateChoice.querySelector('span')?.textContent || dateChoice.querySelector('b')?.textContent || dateChoice.textContent.trim();
      if(btn) btn.innerHTML = `<i class="fa-regular fa-calendar"></i><span>${label}</span><i class="fa-solid fa-chevron-down"></i>`;
      closePageDateMenus();
      document.dispatchEvent(new CustomEvent('page-date-range-change',{detail:{range:dateChoice.dataset.range || '', label}}));
      return;
    }
    if(!e.target.closest('.topbar .calendar-pop,.topbar .topbar-calendar-toggle')) closeTopbarCalendar();
    if(!e.target.closest('.page-actions')) closePageDateMenus();
    if(!e.target.closest('.dropdown-wrap')) $$('.dropdown-wrap.open').forEach(w=>w.classList.remove('open'));
  });

  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeTopbarCalendar(); closePageDateMenus(); $$('.dropdown-wrap.open').forEach(w=>w.classList.remove('open')); }});
})();


// dashboardDateMenuAutoPatch: keep dashboard page-date menu consistent with other pages.
document.addEventListener('DOMContentLoaded', () => {
  const actions = document.querySelector('.page-actions');
  const btn = actions?.querySelector('.date-btn');
  if (btn && !btn.classList.contains('calendar-toggle')) btn.classList.add('calendar-toggle');
});

// Shared page action date dropdown initializer.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-actions').forEach(actions => {
    const btn = actions.querySelector('.date-btn');
    const menu = actions.querySelector('.page-date-menu');
    if (!btn || !menu || btn.dataset.pageActionsReady === 'true') return;
    btn.dataset.pageActionsReady = 'true';
    btn.classList.add('calendar-toggle');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const open = !menu.classList.contains('show');
      document.querySelectorAll('.page-date-menu.show').forEach(m => {
        if (m !== menu) { m.classList.remove('show'); m.setAttribute('aria-hidden', 'true'); }
      });
      document.querySelectorAll('.page-actions .date-btn[aria-expanded="true"]').forEach(b => {
        if (b !== btn) b.setAttribute('aria-expanded', 'false');
      });
      menu.classList.toggle('show', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('button').forEach(option => {
      option.setAttribute('type', 'button');
      option.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        menu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        option.classList.add('active');
        const label = option.querySelector('span')?.textContent?.trim() || option.querySelector('b')?.textContent?.trim() || option.textContent.trim();
        btn.innerHTML = `<i class="fa-regular fa-calendar"></i><span>${label}</span><i class="fa-solid fa-chevron-down"></i>`;
        menu.classList.remove('show');
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        document.dispatchEvent(new CustomEvent('page-date-range-change', { detail: { range: option.dataset.range || '', label } }));
      });
    });
  });
});
