(function(){
  'use strict';

  const COLORS = {
    teal: '#007f72',
    blue: '#5a61ff',
    orange: '#ff7a2c',
    red: '#f35269',
    grid: '#e7edf6',
    text: '#030b5d'
  };

  function showToast(message){
    let toast = document.querySelector('.committee-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'committee-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(()=> toast.style.display = 'none', 1800);
  }

  function ensureModal(){
    let modal = document.querySelector('.committee-modal');
    if(modal) return modal;
    modal = document.createElement('div');
    modal.className = 'committee-modal';
    modal.innerHTML = `
      <div class="committee-modal-card" role="dialog" aria-modal="true">
        <div class="committee-modal-head"><h3>Committee Details</h3><button type="button" class="committee-modal-close" aria-label="Close">&times;</button></div>
        <div class="committee-modal-body"></div>
        <div class="committee-modal-foot"><button type="button" class="committee-modal-ok">Close</button></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => {
      if(e.target === modal || e.target.closest('.committee-modal-close') || e.target.closest('.committee-modal-ok')) modal.classList.remove('active');
    });
    return modal;
  }

  function openModal(title, body){
    const modal = ensureModal();
    modal.querySelector('h3').textContent = title;
    modal.querySelector('.committee-modal-body').innerHTML = body;
    modal.classList.add('active');
  }

  function destroyChart(canvas){
    if(!canvas || !window.Chart || canvas.tagName !== 'CANVAS') return;
    const existing = Chart.getChart(canvas);
    if(existing) existing.destroy();
  }


  function renderPerformanceChart(target){
    if(!target) return;
    const labels = ['Dec 2024','Jan 2025','Feb 2025','Mar 2025','Apr 2025','May 2025'];
    const series = [
      {name:'Activities Completed', values:[80,92,110,125,138,144], color:COLORS.teal},
      {name:'New Activities', values:[34,47,47,58,58,52], color:COLORS.blue},
      {name:'Cancelled Activities', values:[15,16,16,16,21,25], color:COLORS.orange}
    ];
    const w = 620, h = 218, left = 46, right = 16, top = 14, bottom = 42, max = 150;
    const plotW = w - left - right;
    const plotH = h - top - bottom;
    const x = i => left + (plotW/(labels.length-1))*i;
    const y = v => top + plotH - (v/max)*plotH;
    const gridVals = [0,25,50,75,100,125,150];
    const grid = gridVals.map(v=>`<g><line x1="${left}" y1="${y(v)}" x2="${w-right}" y2="${y(v)}" stroke="#e7edf6" stroke-width="1"/><text x="8" y="${y(v)+4}" fill="#030b5d" font-size="11" font-family="Open Sans">${v}</text></g>`).join('');
    const xLabels = labels.map((lab,i)=>`<text x="${x(i)}" y="${h-12}" text-anchor="middle" fill="#030b5d" font-size="11" font-family="Open Sans">${lab}</text>`).join('');
    const lines = series.map(s=>{
      const pts = s.values.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
      const circles = s.values.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${s.color}" stroke="#fff" stroke-width="2"/>`).join('');
      return `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${circles}`;
    }).join('');
    target.innerHTML = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Committee performance trend">${grid}${xLabels}${lines}</svg>`;
  }


  function initCharts(){
    if(!window.Chart) return;

    const line = document.getElementById('committeePerformanceChart') || document.getElementById('committeeLine');
    if(line){
      renderPerformanceChart(line);
    }

    const donutOptions = {responsive:true,maintainAspectRatio:false,cutout:'62%',radius:'96%',plugins:{legend:{display:false},tooltip:{enabled:true}},animation:{duration:250}};
    const activity = document.getElementById('activityStatusChart') || document.getElementById('activityDonut');
    if(activity){
      destroyChart(activity);
      new Chart(activity,{type:'doughnut',data:{labels:['Completed','In Progress','Pending','Cancelled'],datasets:[{data:[142,27,21,6],backgroundColor:[COLORS.teal,COLORS.blue,COLORS.orange,COLORS.red],borderWidth:0}]},options:donutOptions});
    }
    const member = document.getElementById('memberParticipationChart') || document.getElementById('memberDonut');
    if(member){
      destroyChart(member);
      new Chart(member,{type:'doughnut',data:{labels:['Active','Moderate','Low','Inactive'],datasets:[{data:[268,66,24,10],backgroundColor:[COLORS.teal,COLORS.blue,COLORS.orange,COLORS.red],borderWidth:0}]},options:donutOptions});
    }
  }

  function initTabs(){
    const tabs = document.querySelectorAll('.committee-tabs button');
    const layout = document.querySelector('.committee-layout');
    if(!tabs.length || !layout) return;

    const overviewHtml = layout.innerHTML;
    const tabData = {
      committees: ['Committee Name','Chairperson','Members','Status','Actions'],
      activities: ['Activity','Committee','Date','Status','Actions'],
      meetings: ['Meeting','Date & Time','Venue','Status','Actions'],
      tasks: ['Task','Assigned To','Due Date','Priority','Actions'],
      reports: ['Report','Generated By','Period','Status','Actions']
    };

    function placeholder(name){
      const title = name.charAt(0).toUpperCase() + name.slice(1);
      const heads = tabData[name] || tabData.committees;
      const rows = [
        ['Worship Committee','Rev. Michael','24','Active'],
        ['Finance Committee','John Samuel','18','Active'],
        ['Youth Ministry Committee','Mary Samuel','22','In Progress'],
        ['Social Service Committee','David Joseph','26','Active']
      ];
      return `<section class="committee-tab-panel active"><div class="committee-placeholder"><h3>${title}</h3><div class="table-responsive"><table><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}<td><button class="icon-action" type="button" data-view="${title}"><i class="fa-regular fa-eye"></i></button><button class="dots" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button></td></tr>`).join('')}</tbody></table></div></div></section>`;
    }

    tabs.forEach(btn=>btn.addEventListener('click',()=>{
      tabs.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tabTarget || 'overview';
      if(target === 'overview'){
        layout.innerHTML = overviewHtml;
        initCharts();
        bindActions(layout);
      }else{
        layout.innerHTML = placeholder(target);
        bindActions(layout);
      }
    }));
  }

  function bindActions(scope=document){
    scope.querySelectorAll('.committee-export').forEach(btn=>btn.addEventListener('click',()=>showToast('Committee report exported')));
    scope.querySelectorAll('.side-card a').forEach(link=>link.addEventListener('click',e=>{
      e.preventDefault();
      const text = link.textContent.trim();
      openModal(text, `<p>${text} form/action is ready for demo use.</p>`);
    }));
    scope.querySelectorAll('.icon-action,[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
      const row = btn.closest('tr');
      const name = row ? row.children[0].textContent.trim() : 'Committee Activity';
      openModal('View Details', `<p><strong>${name}</strong></p><p>Status, activity count, member participation and schedule details are shown here.</p>`);
    }));
    scope.querySelectorAll('.dots').forEach(btn=>btn.addEventListener('click',()=>showToast('Action menu opened')));
    scope.querySelectorAll('.full-btn').forEach(btn=>btn.addEventListener('click',()=>openModal('All Activities','<p>Full activity list is available in this section.</p>')));
    scope.querySelectorAll('.mini-select').forEach(sel=>sel.addEventListener('change',()=>{initCharts();showToast('Committee chart refreshed');}));
  }

  function setActiveSidebar(){
    const path = location.pathname.split('/').pop() || 'committee-activity-overview.html';
    document.querySelectorAll('.sub-link').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === path);
      if(a.classList.contains('active')) a.closest('.nav-group')?.classList.add('open');
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setActiveSidebar();
    initCharts();
    initTabs();
    bindActions();
    window.addEventListener('resize',()=>{ clearTimeout(window.__committeeResize); window.__committeeResize=setTimeout(initCharts,160); });
  });
})();
