
(function(){
  const rows=[
    ['Mrs. Leela Daniel','STJ/F/1942/0021','Widow',83,'Late Mr. Daniel','Active','15 Jan 2024','Women’s Fellowship'],
    ['Mr. John Varghese','STJ/M/1940/0012','Widower',84,'Late Mrs. Varghese','Active','10 Jan 2024','Men’s Fellowship'],
    ['Mrs. Sara Mathew','STJ/F/1945/0034','Widow',79,'Late Mr. Mathew','Active','18 Feb 2024','Choir'],
    ['Mr. K. O. Chacko','STJ/M/1943/0018','Widower',81,'Late Mrs. Chacko','Active','02 Mar 2024','Ushering'],
    ['Mrs. Mariamma Thomas','STJ/F/1946/0042','Widow',78,'Late Mr. Thomas','Active','29 Mar 2024','Women’s Fellowship'],
    ['Mr. M. I. Philip','STJ/M/1938/0008','Widower',85,'Late Mrs. Philip','Active','12 Apr 2024','Men’s Fellowship'],
    ['Mrs. Annie George','STJ/F/1947/0050','Widow',77,'Late Mr. George','Inactive','25 Apr 2024','Sunday School'],
    ['Mr. Abraham Daniel','STJ/M/1944/0025','Widower',80,'Late Mrs. Daniel','Active','01 May 2024','Maintenance Team']
  ];
  const tbody=document.querySelector('#widowTable tbody');
  const search=document.getElementById('widowSearch');
  const gender=document.getElementById('genderFilter');
  const age=document.getElementById('ageFilter');
  const ministry=document.getElementById('ministryFilter');
  const status=document.getElementById('statusFilter');
  const sort=document.getElementById('sortWidow');
  const toastEl=document.getElementById('widowToast');
  function toast(msg){if(!toastEl)return;toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1800)}
  function statusClass(s){return s==='Active'?'active':'inactive'}
  function genderClass(s){return s==='Widow'?'widow':'widower'}
  function render(data=rows){
    if(!tbody)return;
    tbody.innerHTML=data.map((r,i)=>`<tr data-index="${i}"><td><input type="checkbox"></td><td><span class="wwr-member-name">${r[0]}</span></td><td>${r[1]}</td><td><span class="wwr-tag ${genderClass(r[2])}">${r[2]}</span></td><td>${r[3]}</td><td>${r[4]}</td><td><span class="wwr-status ${statusClass(r[5])}">${r[5]}</span></td><td>${r[6]}</td><td>${r[7]}</td><td><div class="wwr-row-actions"><button class="wwr-action view" title="View"><i class="fa-regular fa-eye"></i></button><button class="wwr-action note" title="Add note"><i class="fa-regular fa-note-sticky"></i></button><button class="wwr-action phone" title="Call"><i class="fa-solid fa-phone"></i></button></div></td></tr>`).join('');
    bindActions(data);
    const showing=document.getElementById('widowShowing'); if(showing) showing.textContent=`Showing 1 to ${data.length} of 142 entries`;
  }
  function filtered(){
    let q=(search?.value||'').toLowerCase().trim(), g=gender?.value||'All', m=ministry?.value||'All', st=status?.value||'All', ag=age?.value||'All';
    let data=rows.filter(r=>(!q||r.join(' ').toLowerCase().includes(q))&&(g==='All'||r[2]===g)&&(m==='All'||r[7]===m)&&(st==='All'||r[5]===st)&&(ag==='All'||(ag.includes('60')&&r[3]>=60&&r[3]<=69)||(ag.includes('70')&&r[3]>=70&&r[3]<=79)||(ag.includes('80')&&r[3]>=80)));
    if(sort?.value==='age-desc') data=data.slice().sort((a,b)=>b[3]-a[3]);
    if(sort?.value==='name') data=data.slice().sort((a,b)=>a[0].localeCompare(b[0]));
    if(sort?.value==='registered') data=data.slice().sort((a,b)=>new Date(b[6])-new Date(a[6]));
    if(sort?.value==='status') data=data.slice().sort((a,b)=>a[5].localeCompare(b[5]));
    return data;
  }
  document.getElementById('applyWidowFilters')?.addEventListener('click',()=>{render(filtered());toast('Filters applied')});
  [search,gender,age,ministry,status,sort].forEach(el=>el?.addEventListener(el.tagName==='INPUT'?'input':'change',()=>render(filtered())));
  document.getElementById('clearWidowFilters')?.addEventListener('click',()=>{document.querySelectorAll('.wwr-filter-grid select').forEach(s=>s.selectedIndex=0);document.querySelectorAll('.wwr-filter-grid input').forEach(i=>{i.value=''; if(i.type==='date') i.type='text'});render(rows);toast('Filters cleared')});
  document.getElementById('exportWidow')?.addEventListener('click',()=>toast('Widow/Widower registry exported'));
  document.getElementById('selectAllWidow')?.addEventListener('change',e=>document.querySelectorAll('#widowTable tbody input[type=checkbox]').forEach(c=>c.checked=e.target.checked));
  document.querySelectorAll('.wwr-tabs button').forEach(btn=>btn.addEventListener('click',()=>{const scope=btn.closest('.wwr-list-card'); if(!scope)return; scope.querySelectorAll('.wwr-tabs button').forEach(b=>b.classList.remove('active')); scope.querySelectorAll('.wwr-tab-panel').forEach(p=>p.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab)?.classList.add('active')}));
  document.querySelectorAll('.wwr-page-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.wwr-page-btn').forEach(b=>b.classList.remove('active')); if(/^\d+$/.test(btn.textContent.trim())) btn.classList.add('active'); toast('Page loaded')}));
  document.getElementById('toggleCompact')?.addEventListener('click',()=>document.querySelector('.wwr-list-card')?.classList.toggle('compact'));
  const modal=document.getElementById('widowModal'), title=document.getElementById('widowModalTitle'), body=document.getElementById('widowModalBody');
  function openModal(kind,row){ if(!modal||!body||!title)return; if(kind==='note'){title.textContent='Add Support / Assistance Note';body.innerHTML=`<label style="font-weight:900;color:#071351">Member</label><input value="${row?row[0]:''}" readonly><br><br><label style="font-weight:900;color:#071351">Note</label><textarea placeholder="Enter support, pastoral care or follow-up note"></textarea>`} else {title.textContent='Widow/Widower Member Details';body.innerHTML=`<div class="wwr-detail-grid">${['Member Name','Membership No.','Gender','Age','Spouse Name','Membership Status','Registered On','Ministry / Group'].map((k,i)=>`<p><span>${k}</span>${row[i]}</p>`).join('')}</div>`} modal.classList.add('show');modal.setAttribute('aria-hidden','false');}
  function closeModal(){modal?.classList.remove('show');modal?.setAttribute('aria-hidden','true')}
  document.getElementById('closeWidowModal')?.addEventListener('click',closeModal);document.getElementById('cancelWidowModal')?.addEventListener('click',closeModal);document.getElementById('confirmWidowModal')?.addEventListener('click',()=>{closeModal();toast('Action saved')});modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  function bindActions(data){document.querySelectorAll('#widowTable tbody tr').forEach((tr,idx)=>{tr.querySelector('.view')?.addEventListener('click',()=>openModal('view',data[idx]));tr.querySelector('.note')?.addEventListener('click',()=>openModal('note',data[idx]));tr.querySelector('.phone')?.addEventListener('click',()=>toast('Calling '+data[idx][0]))});}
  document.getElementById('addNote')?.addEventListener('click',()=>openModal('note',['']));
  document.querySelectorAll('.wwr-quick-list button').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action; if(['add','update','support','visit'].includes(a)) openModal(a==='support'?'note':'view',rows[0]); else toast(btn.textContent.trim())}));
  render(rows);
})();
