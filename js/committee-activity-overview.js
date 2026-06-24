// Page specific scripts extracted from CommitteeActivityOverview.html
document.addEventListener('DOMContentLoaded',function(){
      const rows=[['Worship Committee',28,22,4,2,78.6],['Christian Education Committee',24,18,3,3,75.0],['Youth Ministry Committee',22,15,4,3,68.2],['Social Service Committee',26,19,5,2,73.1],['Finance Committee',18,14,2,2,77.8],['Property Management Committee',16,10,3,3,62.5]];
      const meetings=[['Finance Committee Meeting','24 May 2025 (Sat) · 10:00 AM','Parish Office Conference Room'],['Worship Committee Meeting','25 May 2025 (Sun) · 11:30 AM','Church Meeting Hall'],['Youth Ministry Meeting','27 May 2025 (Tue) · 06:00 PM','Youth Room'],['Social Service Committee Meeting','28 May 2025 (Wed) · 04:00 PM','Parish Office Conference Room']];
      const recent=[['fa-kit-medical','Medical Camp Organized','Health Committee','23 May 2025'],['fa-person-hiking','Youth Retreat Planning','Youth Ministry Committee','22 May 2025'],['fa-book-open','Sunday School Curriculum Update','Christian Education Committee','21 May 2025'],['fa-music','Choir Practice Session','Worship Committee','20 May 2025'],['fa-seedling','Environment Clean Drive','Social Service Committee','19 May 2025']];
      document.getElementById('committeeRows').innerHTML=rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><div class="completion"><span>${r[5]}%</span><div class="bar"><em style="width:${r[5]}%"></em></div></div></td><td><div class="action-wrap"><button class="table-view-btn" data-view-committee="${r[0]}"><i class="fa-regular fa-eye"></i></button><button class="table-more-btn" data-more-committee="${r[0]}"><i class="fa-solid fa-ellipsis-vertical"></i></button><div class="row-action-menu"><button data-edit-committee="${r[0]}"><i class="fa-regular fa-pen-to-square"></i> Edit</button><button data-delete-committee="${r[0]}"><i class="fa-regular fa-trash-can"></i> Delete</button></div></div></td></tr>`).join('');
      const meetingHTML=meetings.map(m=>`<div class="meeting-item"><div class="meeting-icon"><i class="fa-regular fa-calendar-days"></i></div><div><h4>${m[0]}</h4><p>${m[1]}</p><span>${m[2]}</span></div></div>`).join(''); document.getElementById('meetingList').innerHTML=meetingHTML; document.getElementById('meetingList2').innerHTML=meetingHTML;
      document.getElementById('recentList').innerHTML=recent.map(r=>`<div class="recent-item"><div class="recent-icon"><i class="fa-solid ${r[0]}"></i></div><div><h4>${r[1]}</h4><p>${r[2]}</p></div><span>${r[3]}</span></div>`).join('');
      document.querySelectorAll('#committeeTabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#committeeTabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.committee-panel').forEach(p=>p.classList.remove('active'));document.getElementById(btn.dataset.panel+'Panel')?.classList.add('active')}));
      function openCommitteeModal(title,body){const modal=document.getElementById('modal'),content=document.getElementById('modalContent');content.innerHTML=`<div class="modal-head"><h2>${title}</h2></div><div class="modal-body">${body}</div><div class="modal-foot"><button class="btn" onclick="document.getElementById('modal').classList.remove('show')">Cancel</button><button class="btn primary" onclick="document.getElementById('modal').classList.remove('show')">Save</button></div>`;modal.classList.add('show')}
      document.querySelectorAll('[data-committee-action]').forEach(btn=>btn.addEventListener('click',()=>openCommitteeModal(btn.dataset.committeeAction,`<div class="form-grid"><div class="field"><label>Title</label><input placeholder="Enter title"></div><div class="field"><label>Committee</label><select><option>Worship Committee</option><option>Finance Committee</option><option>Youth Ministry Committee</option></select></div><div class="field"><label>Date</label><input type="date" value="2025-05-23"></div><div class="field"><label>Status</label><select><option>Active</option><option>Pending</option></select></div><div class="field full"><label>Description</label><textarea rows="6" placeholder="Enter details"></textarea></div></div>`)));
      document.addEventListener('click',e=>{
        const more=e.target.closest('[data-more-committee]');
        if(more){e.preventDefault();e.stopPropagation();document.querySelectorAll('.row-action-menu.show').forEach(m=>{if(m!==more.nextElementSibling)m.classList.remove('show')});more.nextElementSibling?.classList.toggle('show');return;}
        if(!e.target.closest('.action-wrap')) document.querySelectorAll('.row-action-menu.show').forEach(m=>m.classList.remove('show'));
        const edit=e.target.closest('[data-edit-committee]');
        if(edit){openCommitteeModal('Edit Committee',`<div class="form-grid"><div class="field"><label>Committee Name</label><input value="${edit.dataset.editCommittee}"></div><div class="field"><label>Status</label><select><option>Active</option><option>Inactive</option></select></div><div class="field full"><label>Description</label><textarea rows="5">Update committee details, activities and responsibilities.</textarea></div></div>`);return;}
        const del=e.target.closest('[data-delete-committee]');
        if(del){openCommitteeModal('Delete Committee',`<p style="margin:0;color:#34456d">Are you sure you want to delete <b>${del.dataset.deleteCommittee}</b>?</p>`);return;}
        const b=e.target.closest('[data-view-committee]');
        if(b)openCommitteeModal('Committee Details',`<div class="summary-list"><div><i class="fa-solid fa-people-group"></i><span>Committee</span><b>${b.dataset.viewCommittee}</b></div><div><i class="fa-regular fa-calendar-check"></i><span>Total Activities</span><b>28</b></div><div><i class="fa-solid fa-clipboard-check"></i><span>Completion</span><b>78.6%</b></div></div><p style="margin-top:18px;color:#34456d;line-height:1.6">This popup displays the selected committee content with activity status, member participation, pending tasks and recent meeting summary.</p>`);
      });
      document.getElementById('committeeExport')?.addEventListener('click',()=>openCommitteeModal('Export Report','<p style="margin:0;color:#34456d">Committee activity report is ready to export.</p>'));document.getElementById('reportGenerate')?.addEventListener('click',()=>openCommitteeModal('Generate Report','<p style="margin:0;color:#34456d">Monthly committee report generated successfully.</p>'));
      setTimeout(()=>{const nav=document.getElementById('navMenu');if(nav){nav.querySelectorAll('.nav-group').forEach(g=>{g.classList.remove('open','active-parent');g.querySelector('.nav-main')?.classList.remove('active');g.querySelectorAll('.subnav a').forEach(a=>a.classList.remove('active','current-subnav'));});const active=[...nav.querySelectorAll('.subnav a')].find(a=>a.textContent.replace(/^[\s\-–—]+/,'').trim()==='Committee Activity Overview');if(active){active.classList.add('active','current-subnav');active.setAttribute('aria-current','page');const g=active.closest('.nav-group');g?.classList.add('open','active-parent');g?.querySelector('.nav-main')?.classList.add('active');}}},160);
    });
  


(function(){
  function clean(v){return String(v||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function forceCommitteeActive(){
    if(!/CommitteeActivityOverview\.html$/i.test(location.pathname)) return;
    var nav=document.getElementById('navMenu'); if(!nav) return;
    nav.querySelectorAll('.subnav a').forEach(function(a){
      if(clean(a.textContent)==='committee activity overview') a.setAttribute('href','CommitteeActivityOverview.html');
    });
    nav.querySelectorAll('.nav-group').forEach(function(g){g.classList.remove('open','active-parent'); var m=g.querySelector(':scope > .nav-main'); if(m)m.classList.remove('active');});
    nav.querySelectorAll('.subnav a').forEach(function(a){a.classList.remove('active','current-subnav');a.removeAttribute('aria-current');});
    var target=[].slice.call(nav.querySelectorAll('.subnav a')).find(function(a){return clean(a.textContent)==='committee activity overview' || /CommitteeActivityOverview\.html$/i.test(a.getAttribute('href')||'');});
    if(target){
      target.classList.add('active','current-subnav'); target.setAttribute('aria-current','page');
      var group=target.closest('.nav-group'); if(group){group.classList.add('open','active-parent'); var main=group.querySelector(':scope > .nav-main'); if(main)main.classList.add('active');}
    }
  }
  document.addEventListener('click',function(e){
    var more=e.target.closest('[data-more-committee]');
    if(more){e.preventDefault();e.stopPropagation();var menu=more.parentElement.querySelector('.row-action-menu');document.querySelectorAll('.row-action-menu.show').forEach(function(m){if(m!==menu)m.classList.remove('show')}); if(menu)menu.classList.toggle('show');}
    else if(!e.target.closest('.row-action-menu')) document.querySelectorAll('.row-action-menu.show').forEach(function(m){m.classList.remove('show')});
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',forceCommitteeActive); else forceCommitteeActive();
  window.addEventListener('load',forceCommitteeActive); window.addEventListener('pageshow',forceCommitteeActive);
  setInterval(forceCommitteeActive,500);
})();



(function(){
  function cleanCommitteeText(v){return String(v||'').replace(/^[\s\-–—•]+/,'').replace(/\s+/g,' ').trim().toLowerCase();}
  function lockCommitteeSidebar(){
    if(!/CommitteeActivityOverview\.html$/i.test(location.pathname)) return;
    var nav=document.getElementById('navMenu');
    if(!nav) return;
    var target=null;
    nav.querySelectorAll('.subnav a').forEach(function(a){
      if(cleanCommitteeText(a.textContent)==='committee activity overview'){
        a.href='CommitteeActivityOverview.html';
        target=a;
      }
    });
    nav.querySelectorAll('.nav-group').forEach(function(g){
      g.classList.remove('open','active-parent');
      var main=g.querySelector(':scope > .nav-main');
      if(main) main.classList.remove('active');
      g.querySelectorAll('.subnav a').forEach(function(a){a.classList.remove('active','current-subnav');a.removeAttribute('aria-current');});
    });
    if(target){
      target.classList.add('active','current-subnav');
      target.setAttribute('aria-current','page');
      var group=target.closest('.nav-group');
      if(group){
        group.classList.add('open','active-parent');
        var main=group.querySelector(':scope > .nav-main');
        if(main) main.classList.add('active');
      }
    }
  }
  document.addEventListener('DOMContentLoaded',function(){
    lockCommitteeSidebar();
    setTimeout(lockCommitteeSidebar,100);
    setTimeout(lockCommitteeSidebar,400);
    setTimeout(lockCommitteeSidebar,1000);
  });
  window.addEventListener('load',lockCommitteeSidebar);
  window.addEventListener('pageshow',lockCommitteeSidebar);
  document.addEventListener('click',function(e){
    var a=e.target.closest('#navMenu .subnav a');
    if(a && cleanCommitteeText(a.textContent)==='committee activity overview'){
      a.href='CommitteeActivityOverview.html';
      var g=a.closest('.nav-group');
      if(g){g.classList.add('open','active-parent');g.querySelector(':scope > .nav-main')?.classList.add('active');}
    }
  },true);
  setInterval(lockCommitteeSidebar,700);
})();
