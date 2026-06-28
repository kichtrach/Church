(function(){
  const rows=[
    ['John Samuel','STJ/M/2020/0158','+91 98765 43210','15 Dec 2024','4 Months','Choir','Inactive'],
    ['Mary George','STJ/F/2019/0098','+91 98765 43211','10 Nov 2024','5 Months',"Women's Fellowship",'Inactive'],
    ['Thomas Mathew','STJ/M/2018/0045','+91 98765 43212','05 Oct 2024','6 Months',"Men's Fellowship",'Inactive'],
    ['Anita Varghese','STJ/F/2021/0223','+91 98765 43213','18 Aug 2024','8 Months','Sunday School','Inactive'],
    ['Jacob Joseph','STJ/M/2017/0032','+91 98765 43214','22 Jul 2024','9 Months','Ushering','Inactive'],
    ['Lydia Daniel','STJ/F/2016/0011','+91 98765 43215','12 Apr 2024','12 Months','Choir','Inactive'],
    ['Steven Philip','STJ/M/2015/0102','+91 98765 43216','03 Mar 2024','13 Months','Youth Ministry','Very Inactive'],
    ['Raji Abraham','STJ/F/2014/0077','+91 98765 43217','15 Jan 2024','15 Months',"Women's Fellowship",'Very Inactive']
  ];
  const tbody=document.querySelector('#inactiveTable tbody');
  const search=document.getElementById('inactiveSearch');
  const ministry=document.getElementById('ministryFilter');
  const status=document.getElementById('statusFilter');
  const sort=document.getElementById('sortInactive');
  function render(data=rows){
    if(!tbody) return;
    tbody.innerHTML=data.map((r,i)=>`<tr data-index="${i}"><td><input type="checkbox"></td><td><span class="imt-member-name">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="imt-inactive-months">${r[4]}</span></td><td>${r[5]}</td><td><span class="imt-status ${r[6]==='Very Inactive'?'very':'inactive'}">${r[6]}</span></td><td><div class="imt-row-actions"><button class="imt-action call" title="Call"><i class="fa-solid fa-phone"></i></button><button class="imt-action mail" title="Email"><i class="fa-regular fa-envelope"></i></button><button class="imt-action note" title="Add Note"><i class="fa-regular fa-note-sticky"></i></button></div></td></tr>`).join('');
    bindActions(data);
    const showing=document.getElementById('inactiveShowing');
    if(showing) showing.textContent=`Showing 1 to ${data.length} of 128 entries`;
  }
  function filtered(){
    let q=(search?.value||'').toLowerCase().trim();
    let min=ministry?.value||'All';
    let st=status?.value||'All';
    let data=rows.filter(r=>(!q||r.join(' ').toLowerCase().includes(q))&&(min==='All'||r[5]===min)&&(st==='All'||r[6]===st));
    if(sort?.value==='name') data=data.slice().sort((a,b)=>a[0].localeCompare(b[0]));
    if(sort?.value==='months') data=data.slice().sort((a,b)=>parseInt(a[4])-parseInt(b[4]));
    return data;
  }
  function apply(){render(filtered()); toast('Filters applied');}
  function toast(msg){let t=document.querySelector('.imt-toast'); if(!t){t=document.createElement('div');t.className='imt-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
  document.getElementById('applyInactiveFilters')?.addEventListener('click',apply);
  [search,ministry,status,sort].forEach(el=>el?.addEventListener(el.tagName==='INPUT'?'input':'change',()=>render(filtered())));
  document.getElementById('clearInactiveFilters')?.addEventListener('click',()=>{document.querySelectorAll('.imt-filter-grid select').forEach(s=>s.selectedIndex=0);document.querySelectorAll('.imt-filter-grid input').forEach(i=>{if(i.type==='date') i.value=i.id==='lastAttend'?'2025-04-30':''; else i.value=''});render(rows);toast('Filters cleared')});
  document.getElementById('exportInactive')?.addEventListener('click',()=>toast('Inactive member report exported'));
  document.getElementById('selectAllInactive')?.addEventListener('change',e=>document.querySelectorAll('#inactiveTable tbody input[type=checkbox]').forEach(c=>c.checked=e.target.checked));
  document.querySelectorAll('.imt-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.imt-tabs button').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.imt-tab-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');document.getElementById(btn.dataset.tab)?.classList.add('active')}));
  document.querySelectorAll('.imt-page-btn,.imt-page-next').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.imt-page-btn').forEach(b=>b.classList.remove('active')); if(/^[0-9]+$/.test(btn.dataset.page||'')) btn.classList.add('active'); toast('Page '+(btn.dataset.page||'next')+' loaded')}));

  function sortNotes(order){
    const list=document.getElementById('inactiveNotesList');
    if(!list) return;
    [...list.querySelectorAll('.imt-note-item')]
      .sort((a,b)=> order==='oldest' ? new Date(a.dataset.date)-new Date(b.dataset.date) : new Date(b.dataset.date)-new Date(a.dataset.date))
      .forEach(item=>list.appendChild(item));
  }
  document.getElementById('noteSort')?.addEventListener('change',e=>sortNotes(e.target.value));
  document.getElementById('addFollowupNote')?.addEventListener('click',()=>openModal('note',['']));
  const modal=document.getElementById('inactiveModal'), title=document.getElementById('inactiveModalTitle'), body=document.getElementById('inactiveModalBody');
  function openModal(kind,row){
    if(!modal||!body||!title)return;
    if(kind==='note'){title.textContent='Add Follow-up Note'; body.innerHTML=`<label style="font-weight:900;color:#071351">Member</label><input value="${row?row[0]:''}" readonly><br><br><label style="font-weight:900;color:#071351">Follow-up Note</label><textarea placeholder="Enter follow-up note"></textarea>`}
    else if(kind==='call'){title.textContent='Call Member'; body.innerHTML=`<div class="imt-detail-grid"><p><span>Member</span>${row[0]}</p><p><span>Phone</span>${row[2]}</p></div><br><p style="font-weight:800;color:#536083">Call action opened. Add call notes after completing the call.</p>`}
    else if(kind==='mail'){title.textContent='Send Reminder'; body.innerHTML=`<label style="font-weight:900;color:#071351">To</label><input value="${row[0]}" readonly><br><br><label style="font-weight:900;color:#071351">Message</label><textarea>Dear ${row[0]}, we missed you at church services. Please join us this Sunday.</textarea>`}
    else {title.textContent='Inactive Member Details'; body.innerHTML=`<div class="imt-detail-grid">${row.map((v,i)=>`<p><span>${['Name','Membership No.','Phone','Last Attended On','Inactive Since','Ministry / Group','Status'][i]}</span>${v}</p>`).join('')}</div>`}
    modal.classList.add('show');modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){modal?.classList.remove('show');modal?.setAttribute('aria-hidden','true')}
  document.getElementById('closeInactiveModal')?.addEventListener('click',closeModal);document.getElementById('cancelInactiveModal')?.addEventListener('click',closeModal);document.getElementById('confirmInactiveModal')?.addEventListener('click',()=>{closeModal();toast('Action saved')});modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  function bindActions(data){document.querySelectorAll('#inactiveTable tbody tr').forEach((tr,idx)=>{tr.querySelector('.call')?.addEventListener('click',()=>openModal('call',data[idx]));tr.querySelector('.mail')?.addEventListener('click',()=>openModal('mail',data[idx]));tr.querySelector('.note')?.addEventListener('click',()=>openModal('note',data[idx]));});}
  document.querySelectorAll('.imt-quick-list button').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action; if(a==='note') openModal('note',['']); else toast(btn.textContent.trim())}));
  document.getElementById('viewFullReport')?.addEventListener('click',()=>toast('Full report opened'));
  render(rows);
})();
