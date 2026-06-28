(function(){
  const members = [
    {name:'John Samuel', email:'john.samuel@example.com', id:'MEM1001', type:'Family Head', branch:"St. John's Church", sub:'Main Church', phone:'+91 98765 43210', status:'Active', joined:'15 Jan 2020', avatar:'https://i.pravatar.cc/80?img=12'},
    {name:'Mary Samuel', email:'mary.samuel@example.com', id:'MEM1002', type:'Spouse', branch:"St. John's Church", sub:'Main Church', phone:'+91 98765 43211', status:'Active', joined:'15 Jan 2020', avatar:'https://i.pravatar.cc/80?img=47'},
    {name:'David Samuel', email:'david.samuel@example.com', id:'MEM1003', type:'Child', branch:"St. John's Church", sub:'Main Church', phone:'+91 98765 43212', status:'Active', joined:'15 Jan 2020', avatar:'https://i.pravatar.cc/80?img=13'},
    {name:'Anna Grace', email:'anna.grace@example.com', id:'MEM1004', type:'Individual', branch:"St. Peter's Church", sub:'North Branch', phone:'+91 98765 43213', status:'Active', joined:'22 Feb 2021', avatar:'https://i.pravatar.cc/80?img=32'},
    {name:'Michael David', email:'michael.david@example.com', id:'MEM1005', type:'Individual', branch:"St. John's Church", sub:'Main Church', phone:'+91 98765 43214', status:'Inactive', joined:'10 Mar 2019', avatar:'https://i.pravatar.cc/80?img=15'},
    {name:'Sarah Elizabeth', email:'sarah.elizabeth@example.com', id:'MEM1006', type:'Family Head', branch:'CSI Church', sub:'West Branch', phone:'+91 98765 43215', status:'Active', joined:'05 Apr 2021', avatar:'https://i.pravatar.cc/80?img=45'},
    {name:'Daniel Varghese', email:'daniel.varghese@example.com', id:'MEM1007', type:'Individual', branch:"St. John's Church", sub:'Main Church', phone:'+91 98765 43216', status:'Active', joined:'18 Jun 2022', avatar:'https://i.pravatar.cc/80?img=11'},
    {name:'George Thomas', email:'george.thomas@example.com', id:'MEM1008', type:'Individual', branch:'St. Thomas Church', sub:'South Branch', phone:'+91 98765 43217', status:'Active', joined:'20 Dec 2021', avatar:'https://i.pravatar.cc/80?img=14'},
    {name:'Reena Mathew', email:'reena.mathew@example.com', id:'MEM1009', type:'Spouse', branch:"St. Peter's Church", sub:'North Branch', phone:'+91 98765 43218', status:'Active', joined:'17 May 2025', avatar:'https://i.pravatar.cc/80?img=24'},
    {name:'Alen Varghese', email:'alen.varghese@example.com', id:'MEM1010', type:'Child', branch:'CSI Church', sub:'West Branch', phone:'+91 98765 43219', status:'Active', joined:'16 May 2025', avatar:'https://i.pravatar.cc/80?img=18'}
  ];
  let current = [...members];
  const rows = document.getElementById('memberRows');
  const grid = document.getElementById('memberGridView');
  const listWrap = document.getElementById('memberListWrap');
  const title = document.getElementById('memberTableTitle');

  function chipClass(type){ return type==='Family Head'?'blue':type==='Spouse'?'cyan':type==='Child'?'green':'purple'; }
  function render(data=current){
    if(!rows || !grid) return;
    rows.innerHTML = data.map((m,i)=>`<tr>
      <td><input type="checkbox" class="member-check"></td>
      <td><div class="mm-person"><img src="${m.avatar}" alt=""><div><b>${m.name}</b><span>${m.email}</span></div></div></td>
      <td>${m.id}</td>
      <td><span class="mm-chip ${chipClass(m.type)}">${m.type}</span></td>
      <td><div class="mm-branch"><b>${m.branch}</b><span>${m.sub}</span></div></td>
      <td>${m.phone}</td>
      <td><span class="mm-status ${m.status.toLowerCase()}">${m.status}</span></td>
      <td>${m.joined}</td>
      <td><div class="mm-row-actions"><button class="mm-action-btn view-member" data-index="${i}" title="View"><i class="fa-regular fa-eye"></i></button><button class="mm-action-btn row-menu" title="Actions"><i class="fa-solid fa-ellipsis-vertical"></i></button></div></td>
    </tr>`).join('');
    grid.innerHTML = data.map((m,i)=>`<article class="mm-member-card"><div class="mm-person"><img src="${m.avatar}" alt=""><div><b>${m.name}</b><span>${m.email}</span></div></div><p><span>ID</span><b>${m.id}</b></p><p><span>Type</span><span class="mm-chip ${chipClass(m.type)}">${m.type}</span></p><p><span>Branch</span><b>${m.branch}</b></p><p><span>Status</span><span class="mm-status ${m.status.toLowerCase()}">${m.status}</span></p><div class="mm-row-actions"><button class="mm-action-btn view-member" data-index="${i}"><i class="fa-regular fa-eye"></i></button><button class="mm-action-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button></div></article>`).join('');
    document.getElementById('memberResultText').textContent = `Showing 1 to ${Math.min(data.length,10)} of 4,732 members`;
  }
  function filterMembers(){
    const q=(document.getElementById('memberSearch')?.value||'').toLowerCase().trim();
    const type=document.getElementById('memberType')?.value||'all';
    const status=document.getElementById('memberStatus')?.value||'all';
    const branch=document.getElementById('memberBranch')?.value||'all';
    current = members.filter(m =>
      (!q || [m.name,m.email,m.phone,m.id].join(' ').toLowerCase().includes(q)) &&
      (type==='all' || m.type===type) &&
      (status==='all' || m.status===status) &&
      (branch==='all' || m.branch===branch)
    );
    title.textContent = `All Members (${current.length ? '4,732' : '0'})`;
    render(current);
  }
  ['memberSearch','memberType','memberStatus','memberBranch','memberAge'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.addEventListener(id==='memberSearch'?'input':'change', filterMembers);
  });
  document.querySelectorAll('[data-member-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-member-tab]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    const tab=btn.dataset.memberTab;
    if(tab==='active'){ document.getElementById('memberStatus').value='Active'; }
    else if(tab==='inactive'){ document.getElementById('memberStatus').value='Inactive'; }
    else { document.getElementById('memberStatus').value='all'; }
    filterMembers();
    const label = btn.textContent.trim(); title.textContent = `${label} (${tab==='inactive'?'642':'4,732'})`;
  }));
  document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    if(btn.dataset.view==='grid'){ listWrap.classList.add('hidden'); grid.classList.add('active'); }
    else{ listWrap.classList.remove('hidden'); grid.classList.remove('active'); }
  }));
  document.getElementById('selectAllMembers')?.addEventListener('change',e=>document.querySelectorAll('.member-check').forEach(c=>c.checked=e.target.checked));
  document.querySelectorAll('.mm-page-btn').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.classList.contains('dots')) return;
    document.querySelectorAll('.mm-page-btn').forEach(b=>b.classList.remove('active'));
    if(!['prev','next'].includes(btn.dataset.page)) btn.classList.add('active');
  }));
  function openModal(){ window.location.href='add-member.html'; }
  function closeModal(){ document.getElementById('memberModal')?.classList.remove('show'); document.getElementById('memberFormError').textContent=''; }
  document.getElementById('openMemberModal')?.addEventListener('click',openModal);
  document.querySelector('[data-action="add"]')?.addEventListener('click',openModal);
  document.getElementById('closeMemberModal')?.addEventListener('click',closeModal);
  document.getElementById('cancelMemberModal')?.addEventListener('click',closeModal);
  document.getElementById('memberModal')?.addEventListener('click',e=>{ if(e.target.id==='memberModal') closeModal(); });
  document.getElementById('memberForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const form=e.currentTarget;
    if(!form.checkValidity()){ document.getElementById('memberFormError').textContent='Please fill all required fields correctly.'; form.reportValidity(); return; }
    const fd=new FormData(form);
    members.unshift({name:fd.get('name'),email:fd.get('email'),id:'MEM'+(1011+members.length),type:fd.get('type'),branch:fd.get('branch'),sub:'Main Church',phone:fd.get('phone'),status:'Active',joined:new Date(fd.get('joined')).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),avatar:'https://i.pravatar.cc/80?img=20'});
    form.reset(); closeModal(); filterMembers(); toast('Member saved successfully');
  });
  document.addEventListener('click',e=>{
    const view=e.target.closest('.view-member');
    if(view){ const m=current[view.dataset.index]; if(m) toast(`${m.name} • ${m.id} • ${m.status}`); }
    if(e.target.closest('#memberExport')) toast('Member report exported');
    if(e.target.closest('#bulkActions')) toast('Select members to use bulk actions');
    if(e.target.closest('#moreFilters')) toast('Advanced filters opened');
  });
  function toast(msg){ const old=document.querySelector('.mm-toast'); if(old) old.remove(); const t=document.createElement('div'); t.className='mm-toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2400); }
  render();
})();


/* Member Management functional patch: reset filters, view modal, row actions, green role cards */
(function(){
  function qs(s,r=document){return r.querySelector(s)}
  function qsa(s,r=document){return Array.from(r.querySelectorAll(s))}
  function toast(msg){let old=qs('.mm-toast'); if(old) old.remove(); let t=document.createElement('div'); t.className='mm-toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200)}
  function getRowData(btn){
    const card=btn.closest('.mm-member-card');
    const tr=btn.closest('tr');
    if(card){
      return {name:qs('.mm-person b',card)?.textContent||'Member', email:qs('.mm-person span',card)?.textContent||'', avatar:qs('.mm-person img',card)?.src||'', id:qsa('p',card)[0]?.querySelector('b')?.textContent||'', type:qsa('p',card)[1]?.innerText.replace('Type','').trim()||'', branch:qsa('p',card)[2]?.querySelector('b')?.textContent||'', status:qsa('p',card)[3]?.innerText.replace('Status','').trim()||'', phone:'', joined:''};
    }
    if(tr){
      const tds=qsa('td',tr); const person=qs('.mm-person',tr);
      return {name:qs('b',person)?.textContent||'Member',email:qs('span',person)?.textContent||'',avatar:qs('img',person)?.src||'',id:tds[2]?.textContent.trim()||'',type:tds[3]?.textContent.trim()||'',branch:qs('.mm-branch b',tr)?.textContent||tds[4]?.textContent.trim()||'',phone:tds[5]?.textContent.trim()||'',status:tds[6]?.textContent.trim()||'',joined:tds[7]?.textContent.trim()||''};
    }
    return null;
  }
  function openView(data){
    const modal=qs('#memberViewModal'), body=qs('#memberViewContent'); if(!modal||!body||!data) return;
    body.innerHTML=`<div class="mm-member-profile-view">
      <div class="mm-view-hero">
        <img src="${data.avatar}" alt="${data.name}">
        <div><h3>${data.name}</h3><p>${data.email||'No email added'}</p><span class="mm-status ${(data.status||'active').toLowerCase()}">${data.status||'Active'}</span></div>
      </div>
      <div class="mm-view-section"><h4>Member Information</h4><div class="mm-view-meta"><p><span>Member ID</span><b>${data.id||'--'}</b></p><p><span>Member Type</span><b>${data.type||'--'}</b></p><p><span>Phone Number</span><b>${data.phone||'--'}</b></p><p><span>Joined On</span><b>${data.joined||'--'}</b></p></div></div>
      <div class="mm-view-section"><h4>Church Details</h4><div class="mm-view-meta"><p><span>Branch / Church</span><b>${data.branch||'--'}</b></p><p><span>Family ID</span><b>FAM-2025-018</b></p><p><span>Sacrament Status</span><b>Baptized</b></p><p><span>Ministry</span><b>Youth Fellowship</b></p></div></div>
      <div class="mm-view-section"><h4>Recent Activity</h4><ul class="mm-view-timeline"><li><i class="fa-solid fa-check"></i>Profile updated on 18 May 2025</li><li><i class="fa-solid fa-calendar-check"></i>Attended Sunday Service</li><li><i class="fa-solid fa-hand-holding-heart"></i>Contribution recorded this month</li></ul></div>
    </div>`;
    modal.classList.add('show');
  }
  function closeView(){qs('#memberViewModal')?.classList.remove('show')}
  qs('#closeMemberViewModal')?.addEventListener('click',closeView); qs('#closeMemberViewBtn')?.addEventListener('click',closeView); qs('#memberViewModal')?.addEventListener('click',e=>{if(e.target.id==='memberViewModal')closeView()});
  document.addEventListener('click',function(e){
    const view=e.target.closest('.view-member');
    if(view){e.preventDefault(); e.stopPropagation(); openView(getRowData(view)); return;}
    const menuBtn=e.target.closest('.row-menu,.mm-row-actions .mm-action-btn:last-child');
    if(menuBtn && menuBtn.querySelector('.fa-ellipsis-vertical')){
      e.preventDefault(); e.stopPropagation(); qsa('.mm-row-menu-panel').forEach(x=>x.remove());
      const rect=menuBtn.getBoundingClientRect(); const data=getRowData(menuBtn)||{};
      const panel=document.createElement('div'); panel.className='mm-row-menu-panel'; panel.style.top=(rect.bottom+6)+'px'; panel.style.left=Math.max(8,rect.right-160)+'px';
      panel.innerHTML='<button data-menu="view"><i class="fa-regular fa-eye"></i>View</button><button data-menu="edit"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button data-menu="message"><i class="fa-regular fa-envelope"></i>Message</button><button data-menu="delete"><i class="fa-regular fa-trash-can"></i>Delete</button>';
      document.body.appendChild(panel);
      panel.addEventListener('click',ev=>{const act=ev.target.closest('button')?.dataset.menu; panel.remove(); if(act==='view') openView(data); else if(act==='delete') toast('Delete action ready for '+(data.name||'member')); else toast((act||'Action')+' opened for '+(data.name||'member'));});
      return;
    }
    if(!e.target.closest('.mm-row-menu-panel')) qsa('.mm-row-menu-panel').forEach(x=>x.remove());
    const quick=e.target.closest('.mm-quick[data-url]'); if(quick){ location.href=quick.dataset.url; }
  },true);
  qs('#resetMemberFilters')?.addEventListener('click',()=>{['memberSearch','memberType','memberStatus','memberBranch','memberAge'].forEach(id=>{const el=qs('#'+id); if(el) el.value=el.tagName==='SELECT'?'all':''; el?.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));}); qsa('[data-member-tab]').forEach(b=>b.classList.remove('active')); qs('[data-member-tab="all"]')?.classList.add('active'); toast('Filters reset');});
  qsa('.mm-role-card').forEach(card=>card.addEventListener('click',()=>{qsa('.mm-role-card').forEach(c=>c.classList.remove('active')); card.classList.add('active'); card.querySelector('input')?.click();}));
  qs('#editViewedMember')?.addEventListener('click',()=>{window.location.href='add-member.html?mode=edit'});
})();


/* Add New Family must navigate to the Family Registration page, not open a popup */
document.addEventListener('click', function(e){
  const addFamily = e.target.closest('.mm-quick-link[href="family-registration.html"], .mm-quick[data-url="family-registration.html"]');
  if(addFamily){
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'family-registration.html';
  }
}, true);
