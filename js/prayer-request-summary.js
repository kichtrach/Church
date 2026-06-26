document.addEventListener('DOMContentLoaded', function(){
  const page = document.querySelector('.prayer-page');
  if(!page) return;
  const table = document.getElementById('prayerTable');
  const tbody = table?.querySelector('tbody');
  const statusFilter = document.getElementById('statusFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const requestedByFilter = document.getElementById('requestByFilter');
  const applyBtn = document.getElementById('applyPrayerFilter');
  const resetBtn = document.getElementById('resetPrayerFilter');
  const dateField = document.querySelector('.prayer-filters .date-field');
  const openBtn = document.getElementById('openPrayerModal');
  const modal = document.getElementById('prayerModal');
  const closeBtn = document.getElementById('closePrayerModal');
  const cancelBtn = document.getElementById('cancelPrayerModal');
  const form = document.getElementById('prayerForm');
  let dateMode = 'year';

  function norm(v){ return String(v||'').trim().toLowerCase(); }
  function rowDate(row){
    const text = row.children[0]?.innerText || '';
    const match = text.match(/(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/);
    if(!match) return null;
    const months={jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11};
    return new Date(Number(match[3]), months[match[2].toLowerCase()] ?? 0, Number(match[1]));
  }
  function inDateMode(row){
    const d=rowDate(row); if(!d) return true;
    if(dateMode==='month') return d.getFullYear()===2025 && d.getMonth()===4;
    if(dateMode==='week') return d>=new Date(2025,4,8) && d<=new Date(2025,4,14);
    return d.getFullYear()===2025;
  }
  function applyFilters(){
    const st=statusFilter?.value || 'All';
    const cat=categoryFilter?.value || 'All';
    const req=requestedByFilter?.value || 'All';
    let shown=0;
    tbody?.querySelectorAll('tr').forEach(row=>{
      if(row.classList.contains('empty-row')) return;
      const requestedByText = row.children[1]?.innerText || '';
      const okS = st==='All' || norm(row.dataset.status)===norm(st);
      const okC = cat==='All' || norm(row.dataset.category)===norm(cat);
      const okR = req==='All' || requestedByText.toLowerCase().includes(req.toLowerCase().replace('parish priest','rev'));
      const okD = inDateMode(row);
      const show=okS && okC && okR && okD;
      row.style.display=show?'':'none'; if(show) shown++;
    });
    let empty=tbody?.querySelector('.empty-row');
    if(!empty && tbody){ empty=document.createElement('tr'); empty.className='empty-row'; empty.innerHTML='<td colspan="8">No prayer requests found for the selected filters.</td>'; tbody.appendChild(empty); }
    if(empty) empty.style.display=shown?'none':'';
    const footer=document.querySelector('.table-footer span');
    if(footer) footer.textContent=shown ? `Showing 1 to ${shown} of ${shown} requests` : 'Showing 0 requests';
  }
  [statusFilter, categoryFilter, requestedByFilter].forEach(el=>el?.addEventListener('change', applyFilters));
  applyBtn?.addEventListener('click', e=>{e.preventDefault(); applyFilters();});
  resetBtn?.addEventListener('click', e=>{e.preventDefault(); if(statusFilter)statusFilter.value='All'; if(categoryFilter)categoryFilter.value='All'; if(requestedByFilter)requestedByFilter.value='All'; dateMode='year'; if(dateField) dateField.innerHTML='<span>01 Jan 2025 - 31 Dec 2025</span><i class="fa-regular fa-calendar"></i>'; applyFilters();});

  // Compact date-range dropdown for the filter bar
  if(dateField){
    dateField.tabIndex=0; dateField.setAttribute('role','button'); dateField.style.cursor='pointer';
    const menu=document.createElement('div'); menu.className='prayer-date-menu';
    const ranges=[['year','01 Jan 2025 - 31 Dec 2025'],['month','01 May 2025 - 31 May 2025'],['week','08 May 2025 - 14 May 2025']];
    menu.innerHTML=ranges.map(r=>`<button type="button" data-range="${r[0]}">${r[1]}</button>`).join('');
    document.body.appendChild(menu);
    function pos(){ const r=dateField.getBoundingClientRect(); menu.style.left=(r.left+scrollX)+'px'; menu.style.top=(r.bottom+scrollY+4)+'px'; menu.style.width=Math.max(r.width,230)+'px'; }
    dateField.addEventListener('click', e=>{e.stopPropagation(); pos(); menu.classList.toggle('show');});
    menu.addEventListener('click', e=>{const b=e.target.closest('button'); if(!b)return; dateMode=b.dataset.range; dateField.innerHTML=`<span>${b.textContent}</span><i class="fa-regular fa-calendar"></i>`; menu.classList.remove('show'); applyFilters();});
    document.addEventListener('click', e=>{ if(!menu.contains(e.target) && !dateField.contains(e.target)) menu.classList.remove('show'); });
    window.addEventListener('resize',pos);
  }

  // Add request modal
  function openModal(){ modal?.classList.add('show'); modal?.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeModal(){ modal?.classList.remove('show'); modal?.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  openBtn?.addEventListener('click', e=>{e.preventDefault(); openModal();});
  closeBtn?.addEventListener('click', closeModal); cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
  form?.querySelectorAll('textarea').forEach(t=>{ const c=document.querySelector(`.char-count[data-for="${t.name}"]`); const u=()=>{ if(c)c.textContent=`${t.value.length} / ${t.maxLength||500}`; }; t.addEventListener('input',u); u(); });
  form?.addEventListener('submit', e=>{
    e.preventDefault();
    let ok=true;
    form.querySelectorAll('[required]').forEach(el=>{ const msg=el.closest('div')?.querySelector('.error-msg'); if(!String(el.value||'').trim()){ok=false; el.classList.add('invalid'); if(msg)msg.textContent='This field is required';} else {el.classList.remove('invalid'); if(msg)msg.textContent='';} });
    if(!ok) return;
    const fd=new FormData(form); const cat=fd.get('category')||'Health'; const person=fd.get('person')||'New Request'; const details=fd.get('details')||'Prayer request submitted.';
    const tr=document.createElement('tr'); tr.dataset.status='Active'; tr.dataset.category=cat;
    tr.innerHTML=`<td>14 May 2025<br><small>09:30 AM</small></td><td><b>Rev. Michael</b><small>Parish Office</small></td><td><b>${person}</b><small>${fd.get('requestFor')||'Self'}</small></td><td><span class="tag ${cat.toLowerCase()}">${cat}</span></td><td>${details}</td><td><span class="status active">Active</span></td><td>Self</td><td><button class="eye-btn" type="button"><i class="fa-regular fa-eye"></i></button><button class="dots-btn" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button></td>`;
    tbody?.prepend(tr); form.reset(); closeModal(); applyFilters();
  });

  // View popup and row actions
  let viewModal=document.getElementById('prayerViewModal');
  if(!viewModal){
    viewModal=document.createElement('div'); viewModal.id='prayerViewModal'; viewModal.className='modal prayer-view-modal';
    viewModal.innerHTML='<div class="modal-card small"><div class="modal-head"><h2>Prayer Request Details</h2><button type="button" class="close-modal"><i class="fa-solid fa-xmark"></i></button></div><div class="detail-grid" id="prayerViewDetails"></div><div class="modal-foot"><button type="button" class="btn outline close-modal">Close</button><button type="button" class="btn primary">Edit Request</button></div></div>';
    document.body.appendChild(viewModal);
  }
  function openView(row){
    if(!row) return;
    const c=row.children;
    document.getElementById('prayerViewDetails').innerHTML=`<p><span>Date</span><b>${c[0]?.innerText||''}</b></p><p><span>Requested By</span><b>${c[1]?.innerText||''}</b></p><p><span>Request For</span><b>${c[2]?.innerText||''}</b></p><p><span>Category</span><b>${row.dataset.category||''}</b></p><p><span>Status</span><b>${row.dataset.status||''}</b></p><p class="full"><span>Details</span><b>${c[4]?.innerText||''}</b></p>`;
    viewModal.classList.add('show');
  }
  table?.addEventListener('click', e=>{
    const eye=e.target.closest('.eye-btn');
    const dots=e.target.closest('.dots-btn');
    if(eye){ e.preventDefault(); openView(eye.closest('tr')); }
    if(dots){
      e.preventDefault(); e.stopPropagation(); document.querySelectorAll('.row-menu').forEach(m=>m.remove());
      const row=dots.closest('tr'); const menu=document.createElement('div'); menu.className='row-menu';
      menu.innerHTML='<button type="button" data-action="view">View</button><button type="button" data-action="edit">Edit</button><button type="button" data-action="delete">Delete</button>';
      document.body.appendChild(menu); const r=dots.getBoundingClientRect(); menu.style.left=(r.right-124+scrollX)+'px'; menu.style.top=(r.bottom+scrollY+6)+'px';
      menu.addEventListener('click', ev=>{const action=ev.target.closest('button')?.dataset.action; if(action==='view'||action==='edit')openView(row); if(action==='delete'){row.remove(); applyFilters();} menu.remove();});
    }
  });
  document.addEventListener('click', e=>{ if(!e.target.closest('.row-menu')) document.querySelectorAll('.row-menu').forEach(m=>m.remove()); });
  document.body.addEventListener('click', e=>{ if(e.target.closest('.close-modal')) e.target.closest('.modal')?.classList.remove('show'); if(e.target.classList.contains('modal')) e.target.classList.remove('show'); });

  // table/grid view buttons
  const tableCard=document.querySelector('.table-card'); const responsive=document.querySelector('.table-card .responsive-table');
  const viewButtons=document.querySelectorAll('.view-icons button');
  let grid=document.querySelector('.prayer-grid'); if(!grid && responsive){ grid=document.createElement('div'); grid.className='prayer-grid'; responsive.insertAdjacentElement('afterend',grid); }
  function buildPrayerGrid(){
    if(!grid || !tbody) return;
    grid.innerHTML=Array.from(tbody.querySelectorAll('tr')).filter(r=>!r.classList.contains('empty-row') && r.style.display!=='none').map(row=>`<article class="prayer-grid-card"><span class="tag ${(row.dataset.category||'').toLowerCase()}">${row.dataset.category||''}</span><h4>${row.children[2]?.querySelector('b')?.textContent||''}</h4><p>${row.children[4]?.innerText||''}</p><small>${row.children[0]?.innerText||''}</small><button type="button" class="btn outline">View</button></article>`).join('');
    grid.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>openView(Array.from(tbody.querySelectorAll('tr')).filter(r=>r.style.display!=='none')[i])));
  }
  viewButtons.forEach((b,i)=>b.addEventListener('click',()=>{ viewButtons.forEach(x=>x.classList.remove('active')); b.classList.add('active'); tableCard?.classList.toggle('grid-mode', i===1); if(i===1) buildPrayerGrid(); }));
  [applyBtn,resetBtn].forEach(el=>el?.addEventListener('click',()=>setTimeout(buildPrayerGrid,0)));
  [statusFilter,categoryFilter,requestedByFilter].forEach(el=>el?.addEventListener('change',()=>setTimeout(buildPrayerGrid,0)));
  applyFilters();
});
