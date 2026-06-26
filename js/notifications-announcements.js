document.addEventListener('DOMContentLoaded',()=>{
  const modal=document.getElementById('announcementModal');
  const rows=[...document.querySelectorAll('.announce-row')];
  const title=document.querySelector('.na-table-head h3');
  const sort=document.getElementById('sortAnnouncements');
  const search=document.getElementById('annSearch');
  const type=document.getElementById('annType');
  const audience=document.getElementById('annAudience');
  let activeTab='active';

  function showModal(){ modal?.classList.add('show'); document.body.classList.add('modal-open'); }
  function hideModal(){ modal?.classList.remove('show'); document.body.classList.remove('modal-open'); }
  document.getElementById('createAnnouncement')?.addEventListener('click',showModal);
  document.getElementById('quickCreate')?.addEventListener('click',e=>{e.preventDefault();showModal();});
  modal?.querySelectorAll('.close-modal').forEach(b=>b.addEventListener('click',hideModal));
  modal?.addEventListener('click',e=>{if(e.target===modal) hideModal();});

  const msg=modal?.querySelector('textarea[name="message"]');
  const msgCount=modal?.querySelector('.char-count');
  msg?.addEventListener('input',()=>{msgCount.textContent=`${msg.value.length}/2000`;});
  const titleInput=modal?.querySelector('input[name="title"]');
  const limit=modal?.querySelector('.limit-count');
  titleInput?.addEventListener('input',()=>{limit.textContent=`${titleInput.value.length}/150`;});

  function desiredStatus(row){
    const status=(row.dataset.status||'active').toLowerCase();
    if(activeTab==='all') return true;
    if(activeTab==='scheduled') return status==='scheduled';
    if(activeTab==='archived') return status==='archived';
    return status==='active';
  }
  function applyFilters(){
    const q=(search?.value||'').trim().toLowerCase();
    const t=type?.value||'All Types';
    const a=audience?.value||'All Audiences';
    let visible=0;
    rows.forEach(r=>{
      const okTab=desiredStatus(r);
      const okText=!q || r.textContent.toLowerCase().includes(q);
      const okType=t==='All Types' || r.dataset.type===t;
      const okAud=a==='All Audiences' || r.dataset.audience===a;
      const show=okTab && okText && okType && okAud;
      r.style.display=show?'grid':'none';
      if(show) visible++;
    });
    const names={all:'All Announcements',active:'Active Announcements',scheduled:'Scheduled Announcements',archived:'Archived Announcements'};
    if(title) title.textContent=`${names[activeTab]} (${visible})`;
    const foot=document.querySelector('.table-footer > span');
    if(foot) foot.textContent=`Showing 1 to ${Math.min(visible,10)} of ${visible} announcements`;
  }
  document.querySelectorAll('[data-ann-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-ann-tab]').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    activeTab=btn.dataset.annTab||'active';
    if(sort){
      sort.innerHTML = activeTab==='archived' ? '<option>Archived Date (Latest)</option><option>Title A-Z</option><option>Created By</option>' : '<option>Published Date (Latest)</option><option>Title A-Z</option><option>Created By</option>';
    }
    applyFilters();
  }));
  document.getElementById('applyAnn')?.addEventListener('click',applyFilters);
  [search,type,audience].forEach(el=>{el?.addEventListener('input',applyFilters);el?.addEventListener('change',applyFilters);});
  document.getElementById('resetAnn')?.addEventListener('click',()=>{ if(search)search.value=''; if(type)type.value='All Types'; if(audience)audience.value='All Audiences'; applyFilters(); });
  sort?.addEventListener('change',()=>{
    const list=document.querySelector('.announcement-list');
    if(!list) return;
    const all=[...list.querySelectorAll('.announce-row')];
    all.sort((a,b)=> sort.value.includes('Title') ? a.querySelector('.ann-title b').textContent.localeCompare(b.querySelector('.ann-title b').textContent) : 0).forEach(r=>list.appendChild(r));
    applyFilters();
  });
  document.getElementById('announcementForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.currentTarget;
    if(!f.checkValidity()){f.reportValidity();return;}
    const formData=new FormData(f);
    const annType=formData.get('type')||'Announcement';
    const aud=formData.get('audience')||'All Members';
    const newRow=document.createElement('div');
    newRow.className='announce-row';
    newRow.dataset.status='active'; newRow.dataset.type=annType; newRow.dataset.audience=aud;
    newRow.innerHTML=`<div class="row-icon teal"><i class="fa-solid fa-bullhorn"></i></div><div class="ann-title"><b>${formData.get('title')}</b><p>${formData.get('message')||'New announcement published.'}</p></div><span class="pill green">${annType}</span><span>${aud}</span><span><b>Today</b><small>Now</small></span><span><b>Parish Office</b><small>Admin</small></span><div class="row-actions"><button type="button" class="view-announcement"><i class="fa-regular fa-eye"></i></button><i class="fa-solid fa-ellipsis-vertical"></i></div>`;
    document.querySelector('.announcement-list')?.prepend(newRow);
    rows.unshift(newRow);
    f.reset(); if(msgCount)msgCount.textContent='0/2000'; if(limit)limit.textContent='0/150'; hideModal(); applyFilters();
  });
  applyFilters();
});
