(function(){
  const rows=[
    ['John Samuel','STJ/M/2020/0158','St. John\'s Church','St. Thomas Church, Kochi','30 Apr 2025','Transfer','Completed'],
    ['Mary George','STJ/F/2019/0098','St. John\'s Church','CSI Christ Church, Dubai','28 Apr 2025','Relocation','Completed'],
    ['Thomas Mathew','STJ/M/2018/0045','St. John\'s Church','St. Peter\'s Church, Bangalore','25 Apr 2025','Job Transfer','Completed'],
    ['Anita Varghese','STJ/F/2021/0223','St. John\'s Church','Holy Trinity Church, Mumbai','20 Apr 2025','Relocation','Completed'],
    ['Jacob Joseph','STJ/M/2017/0032','St. John\'s Church','CSI Cathedral Church, Delhi','18 Apr 2025','Family','Pending Confirmation'],
    ['Lydia Daniel','STJ/F/2016/0011','St. John\'s Church','St. John\'s Mar Thoma, Sharjah','15 Apr 2025','Relocation','Pending Confirmation'],
    ['Steven Philip','STJ/M/2015/0102','St. John\'s Church','Bethel CSI Church, Hyderabad','12 Apr 2025','Job Transfer','Awaiting Details'],
    ['Raji Abraham','STJ/F/2014/0077','St. John\'s Church','St. Luke\'s Church, Chennai','10 Apr 2025','Marriage','Awaiting Details']
  ];
  const tbody=document.querySelector('#migratedTable tbody');
  const search=document.getElementById('migratedSearch');
  const toChurch=document.getElementById('toChurchFilter');
  const fromChurch=document.getElementById('fromChurchFilter');
  const status=document.getElementById('migrationStatusFilter');
  const sort=document.getElementById('sortMigrated');
  const toastEl=document.getElementById('migratedToast');
  function cls(s){return s==='Completed'?'completed':s==='Pending Confirmation'?'pending':'awaiting'}
  function render(data=rows){
    if(!tbody)return;
    tbody.innerHTML=data.map((r,i)=>`<tr data-index="${i}"><td><input type="checkbox"></td><td><span class="mmt-member-name">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td><span class="mmt-status ${cls(r[6])}">${r[6]}</span></td><td><div class="mmt-row-actions"><button class="mmt-action view" title="View"><i class="fa-regular fa-eye"></i></button><button class="mmt-action note" title="Follow-up"><i class="fa-regular fa-note-sticky"></i></button></div></td></tr>`).join('');
    bindActions(data);
    const showing=document.getElementById('migratedShowing'); if(showing) showing.textContent=`Showing 1 to ${data.length} of 96 entries`;
  }
  function filtered(){
    let q=(search?.value||'').toLowerCase().trim();
    let to=toChurch?.value||'All', from=fromChurch?.value||'All', st=status?.value||'All';
    let data=rows.filter(r=>(!q||r.join(' ').toLowerCase().includes(q))&&(to==='All'||r[3]===to)&&(from==='All'||r[2]===from)&&(st==='All'||r[6]===st));
    if(sort?.value==='name') data=data.slice().sort((a,b)=>a[0].localeCompare(b[0]));
    if(sort?.value==='oldest') data=data.slice().reverse();
    if(sort?.value==='status') data=data.slice().sort((a,b)=>a[6].localeCompare(b[6]));
    return data;
  }
  function toast(msg){if(!toastEl)return; toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1800)}
  document.getElementById('applyMigratedFilters')?.addEventListener('click',()=>{render(filtered());toast('Filters applied')});
  [search,toChurch,fromChurch,status,sort].forEach(el=>el?.addEventListener(el.tagName==='INPUT'?'input':'change',()=>render(filtered())));
  document.getElementById('clearMigratedFilters')?.addEventListener('click',()=>{document.querySelectorAll('.mmt-filter-grid select').forEach(s=>s.selectedIndex=0);document.querySelectorAll('.mmt-filter-grid input').forEach(i=>i.value='');render(rows);toast('Filters cleared')});
  document.getElementById('exportMigrated')?.addEventListener('click',()=>toast('Migration report exported'));
  document.getElementById('selectAllMigrated')?.addEventListener('change',e=>document.querySelectorAll('#migratedTable tbody input[type=checkbox]').forEach(c=>c.checked=e.target.checked));
  document.querySelectorAll('.mmt-tabs button').forEach(btn=>btn.addEventListener('click',()=>{const scope=btn.closest('.mmt-list-card'); if(!scope)return; scope.querySelectorAll('.mmt-tabs button').forEach(b=>b.classList.remove('active')); scope.querySelectorAll('.mmt-tab-panel').forEach(p=>p.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab)?.classList.add('active')}));
  document.querySelectorAll('.mmt-page-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.mmt-page-btn').forEach(b=>b.classList.remove('active')); if(/^[0-9]+$/.test(btn.dataset.page||'')) btn.classList.add('active'); toast('Page '+(btn.dataset.page||'next')+' loaded')}));
  function sortNotes(order){const list=document.getElementById('migratedNotesList'); if(!list)return; [...list.querySelectorAll('.mmt-note-item')].sort((a,b)=>order==='oldest'?new Date(a.dataset.date)-new Date(b.dataset.date):new Date(b.dataset.date)-new Date(a.dataset.date)).forEach(i=>list.appendChild(i));}
  document.getElementById('noteSort')?.addEventListener('change',e=>sortNotes(e.target.value));
  const modal=document.getElementById('migratedModal'), title=document.getElementById('migratedModalTitle'), body=document.getElementById('migratedModalBody');
  function openModal(kind,row){ if(!modal||!body||!title)return; if(kind==='note'){title.textContent='Add Migration Follow-up Note';body.innerHTML=`<label style="font-weight:900;color:#071351">Member / Church</label><input value="${row?row[0]+' - '+row[3]:''}" readonly><br><br><label style="font-weight:900;color:#071351">Note</label><textarea placeholder="Enter follow-up note"></textarea>`} else {title.textContent='Migrated Member Details';body.innerHTML=`<div class="mmt-detail-grid">${['Member Name','Membership No.','From Church / Diocese','Migrated To','Migrated On','Reason','Status'].map((k,i)=>`<p><span>${k}</span>${row[i]}</p>`).join('')}</div>`} modal.classList.add('show');modal.setAttribute('aria-hidden','false');}
  function closeModal(){modal?.classList.remove('show');modal?.setAttribute('aria-hidden','true')}
  document.getElementById('closeMigratedModal')?.addEventListener('click',closeModal);document.getElementById('cancelMigratedModal')?.addEventListener('click',closeModal);document.getElementById('confirmMigratedModal')?.addEventListener('click',()=>{closeModal();toast('Action saved')});modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  function bindActions(data){document.querySelectorAll('#migratedTable tbody tr').forEach((tr,idx)=>{tr.querySelector('.view')?.addEventListener('click',()=>openModal('view',data[idx]));tr.querySelector('.note')?.addEventListener('click',()=>openModal('note',data[idx]));});}
  document.getElementById('addMigrationNote')?.addEventListener('click',()=>openModal('note',['']));
  document.querySelectorAll('.mmt-quick-list button').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action; if(a==='followup'||a==='confirmation') openModal('note',['']); else toast(btn.textContent.trim())}));
  document.getElementById('viewMigrationReport')?.addEventListener('click',()=>toast('Full migration report opened'));
  render(rows);
})();