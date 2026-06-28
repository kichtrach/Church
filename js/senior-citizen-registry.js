(function(){
  const rows=[
    ['Mrs. Leela Daniel','STJ/F/1942/0021','12 Mar 1942',83,'Female','Women’s Fellowship','+91 98765 43201','Active'],
    ['Mr. John Varghese','STJ/M/1940/0012','05 Aug 1940',84,'Male','Men’s Fellowship','+91 98765 43202','Active'],
    ['Mrs. Sara Mathew','STJ/F/1945/0034','22 Jan 1945',79,'Female','Choir','+91 98765 43203','Active'],
    ['Mr. K. O. Chacko','STJ/M/1943/0018','18 Sep 1943',81,'Male','Ushering','+91 98765 43204','Active'],
    ['Mrs. Mariamma Thomas','STJ/F/1946/0042','03 Apr 1946',78,'Female','Women’s Fellowship','+91 98765 43205','Active'],
    ['Mr. M. I. Philip','STJ/M/1938/0008','27 Nov 1938',85,'Male','Men’s Fellowship','+91 98765 43206','Active'],
    ['Mrs. Annie George','STJ/F/1947/0050','14 Jul 1947',77,'Female','Sunday School','+91 98765 43207','Active'],
    ['Mr. Abraham Daniel','STJ/M/1944/0025','09 Feb 1944',80,'Male','Maintenance Team','+91 98765 43208','Inactive']
  ];
  const tbody=document.querySelector('#seniorTable tbody');
  const search=document.getElementById('seniorSearch');
  const gender=document.getElementById('genderFilter');
  const ministry=document.getElementById('ministryFilter');
  const status=document.getElementById('statusFilter');
  const sort=document.getElementById('sortSenior');
  const toastEl=document.getElementById('seniorToast');
  function statusClass(s){return s==='Active'?'active':'inactive'}
  function render(data=rows){
    if(!tbody)return;
    tbody.innerHTML=data.map((r,i)=>`<tr data-index="${i}"><td><input type="checkbox"></td><td><span class="src-member-name">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td><span class="src-status ${statusClass(r[7])}">${r[7]}</span></td><td><div class="src-row-actions"><button class="src-action view" title="View"><i class="fa-regular fa-eye"></i></button><button class="src-action note" title="Add note"><i class="fa-regular fa-note-sticky"></i></button></div></td></tr>`).join('');
    bindActions(data);
    const showing=document.getElementById('seniorShowing'); if(showing) showing.textContent=`Showing 1 to ${data.length} of 186 entries`;
  }
  function filtered(){
    let q=(search?.value||'').toLowerCase().trim();
    let g=gender?.value||'All', m=ministry?.value||'All', st=status?.value||'All';
    let data=rows.filter(r=>(!q||r.join(' ').toLowerCase().includes(q))&&(g==='All'||r[4]===g)&&(m==='All'||r[5]===m)&&(st==='All'||r[7]===st));
    if(sort?.value==='youngest') data=data.slice().sort((a,b)=>a[3]-b[3]);
    if(sort?.value==='oldest') data=data.slice().sort((a,b)=>b[3]-a[3]);
    if(sort?.value==='name') data=data.slice().sort((a,b)=>a[0].localeCompare(b[0]));
    if(sort?.value==='status') data=data.slice().sort((a,b)=>a[7].localeCompare(b[7]));
    return data;
  }
  function toast(msg){if(!toastEl)return;toastEl.textContent=msg;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),1800)}
  document.getElementById('applySeniorFilters')?.addEventListener('click',()=>{render(filtered());toast('Filters applied')});
  [search,gender,ministry,status,sort].forEach(el=>el?.addEventListener(el.tagName==='INPUT'?'input':'change',()=>render(filtered())));
  document.getElementById('clearSeniorFilters')?.addEventListener('click',()=>{document.querySelectorAll('.src-filter-grid select').forEach(s=>s.selectedIndex=0);document.querySelectorAll('.src-filter-grid input').forEach(i=>i.value='');render(rows);toast('Filters cleared')});
  document.getElementById('exportSenior')?.addEventListener('click',()=>toast('Senior members report exported'));
  document.getElementById('selectAllSenior')?.addEventListener('change',e=>document.querySelectorAll('#seniorTable tbody input[type=checkbox]').forEach(c=>c.checked=e.target.checked));
  document.querySelectorAll('.src-tabs button').forEach(btn=>btn.addEventListener('click',()=>{const scope=btn.closest('.src-list-card'); if(!scope)return; scope.querySelectorAll('.src-tabs button').forEach(b=>b.classList.remove('active')); scope.querySelectorAll('.src-tab-panel').forEach(p=>p.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab)?.classList.add('active')}));
  document.querySelectorAll('.src-page-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.src-page-btn').forEach(b=>b.classList.remove('active')); if(/^[0-9]+$/.test(btn.dataset.page||'')) btn.classList.add('active'); toast('Page '+(btn.dataset.page||'next')+' loaded')}));
  function sortNotes(order){const list=document.getElementById('seniorNotesList'); if(!list)return; [...list.querySelectorAll('.src-note-item')].sort((a,b)=>order==='oldest'?new Date(a.dataset.date)-new Date(b.dataset.date):new Date(b.dataset.date)-new Date(a.dataset.date)).forEach(i=>list.appendChild(i));}
  document.getElementById('noteSort')?.addEventListener('change',e=>sortNotes(e.target.value));
  const modal=document.getElementById('seniorModal'), title=document.getElementById('seniorModalTitle'), body=document.getElementById('seniorModalBody');
  function openModal(kind,row){ if(!modal||!body||!title)return; if(kind==='note'){title.textContent='Add Senior Member Note';body.innerHTML=`<label style="font-weight:900;color:#071351">Member</label><input value="${row?row[0]:''}" readonly><br><br><label style="font-weight:900;color:#071351">Note</label><textarea placeholder="Enter follow-up or assistance note"></textarea>`} else {title.textContent='Senior Member Details';body.innerHTML=`<div class="src-detail-grid">${['Member Name','Membership No.','Date of Birth','Age','Gender','Ministry / Group','Phone','Status'].map((k,i)=>`<p><span>${k}</span>${row[i]}</p>`).join('')}</div>`} modal.classList.add('show');modal.setAttribute('aria-hidden','false');}
  function closeModal(){modal?.classList.remove('show');modal?.setAttribute('aria-hidden','true')}
  document.getElementById('closeSeniorModal')?.addEventListener('click',closeModal);document.getElementById('cancelSeniorModal')?.addEventListener('click',closeModal);document.getElementById('confirmSeniorModal')?.addEventListener('click',()=>{closeModal();toast('Action saved')});modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  function bindActions(data){document.querySelectorAll('#seniorTable tbody tr').forEach((tr,idx)=>{tr.querySelector('.view')?.addEventListener('click',()=>openModal('view',data[idx]));tr.querySelector('.note')?.addEventListener('click',()=>openModal('note',data[idx]));});}
  document.getElementById('addNote')?.addEventListener('click',()=>openModal('note',['']));
  document.getElementById('addMilestone')?.addEventListener('click',()=>toast('Milestone form opened'));
  document.getElementById('addAssistance')?.addEventListener('click',()=>toast('Assistance form opened'));
  document.querySelectorAll('.src-quick-list button').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action; if(a==='add'||a==='health'||a==='assist') openModal('note',['']); else toast(btn.textContent.trim())}));
  document.getElementById('viewSeniorReport')?.addEventListener('click',()=>toast('Full senior members report opened'));
  render(rows);
})();
