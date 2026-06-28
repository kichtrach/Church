(function(){
  const members = [
    {name:'John Samuel', email:'john.samuel@example.com', id:'MEM1001', branch:"St. John's Church", branchSub:'Main', category:'Family Head', phone:'+91 98765 43210', status:'Active', joined:'15 Jan 2020', gender:'Male', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/men/32.jpg'},
    {name:'Mary Samuel', email:'mary.samuel@example.com', id:'MEM1002', branch:"St. John's Church", branchSub:'Main', category:'Spouse', phone:'+91 98765 43211', status:'Active', joined:'15 Jan 2020', gender:'Female', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/women/44.jpg'},
    {name:'David Samuel', email:'david.samuel@example.com', id:'MEM1003', branch:"St. John's Church", branchSub:'Main', category:'Child', phone:'+91 98765 43212', status:'Active', joined:'15 Jan 2020', gender:'Male', age:'Youth', baptized:true, img:'https://randomuser.me/api/portraits/men/41.jpg'},
    {name:'Anna Grace Samuel', email:'anna.grace@example.com', id:'MEM1004', branch:"St. Peter's Church", branchSub:'North', category:'Individual', phone:'+91 98765 43213', status:'Active', joined:'22 Feb 2021', gender:'Female', age:'Adult', baptized:false, img:'https://randomuser.me/api/portraits/women/66.jpg'},
    {name:'Michael David', email:'michael.david@example.com', id:'MEM1005', branch:"St. John's Church", branchSub:'Main', category:'Individual', phone:'+91 98765 43214', status:'Inactive', joined:'10 Mar 2019', gender:'Male', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/men/12.jpg'},
    {name:'Sarah Elizabeth', email:'sarah.elizabeth@example.com', id:'MEM1006', branch:'CSI Church', branchSub:'West', category:'Family Head', phone:'+91 98765 43215', status:'Active', joined:'05 Apr 2021', gender:'Female', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/women/26.jpg'},
    {name:'Daniel Varghese', email:'daniel.varghese@example.com', id:'MEM1007', branch:"St. John's Church", branchSub:'Main', category:'Individual', phone:'+91 98765 43216', status:'Active', joined:'18 Jun 2022', gender:'Male', age:'Adult', baptized:false, img:'https://randomuser.me/api/portraits/men/54.jpg'},
    {name:'George Thomas', email:'george.thomas@example.com', id:'MEM1008', branch:"St. Thomas Church", branchSub:'South', category:'Individual', phone:'+91 98765 43217', status:'Active', joined:'20 Dec 2021', gender:'Male', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/men/76.jpg'},
    {name:'Reena Mathew', email:'reena.mathew@example.com', id:'MEM1009', branch:"St. Peter's Church", branchSub:'North', category:'Individual', phone:'+91 98765 43218', status:'Active', joined:'17 Jul 2022', gender:'Female', age:'Adult', baptized:true, img:'https://randomuser.me/api/portraits/women/12.jpg'},
    {name:'Alan Varghese', email:'alan.varghese@example.com', id:'MEM1010', branch:'CSI Church', branchSub:'West', category:'Individual', phone:'+91 98765 43219', status:'Active', joined:'12 Aug 2022', gender:'Male', age:'Youth', baptized:false, img:'https://randomuser.me/api/portraits/men/65.jpg'}
  ];
  let activeTab='all', currentView='list', currentRows=10;
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const rows = $('#mdMemberRows'), grid = $('#mdGridView'), list = $('#mdListView'), title = $('#mdShowingTitle');
  function cls(v){return String(v).toLowerCase().replace(/\s+/g,'-')}
  function filtered(){
    const q = ($('#mdSearch')?.value || '').toLowerCase().trim();
    const branch = $('#mdBranch')?.value || 'all';
    const cat = $('#mdCategory')?.value || 'all';
    const status = $('#mdStatus')?.value || 'all';
    const age = $('#mdAge')?.value || 'all';
    const gender = $('#mdGender')?.value || 'all';
    return members.filter(m=>{
      const inTab = activeTab==='all' || (activeTab==='Active' && m.status==='Active') || (activeTab==='Inactive' && m.status==='Inactive') || (activeTab==='new' && ['MEM1007','MEM1008','MEM1009','MEM1010'].includes(m.id)) || (activeTab==='baptized' && m.baptized);
      return inTab && (!q || [m.name,m.email,m.id,m.phone,m.branch].join(' ').toLowerCase().includes(q)) && (branch==='all'|| `${m.branch} (${m.branchSub})`===branch) && (cat==='all'||m.category===cat) && (status==='all'||m.status===status) && (age==='all'||m.age===age) && (gender==='all'||m.gender===gender);
    });
  }
  function actionCell(i){return `<div class="md-row-actions"><button class="md-action-btn md-view-member" data-index="${i}" title="View"><i class="fa-regular fa-eye"></i></button><div class="md-row-menu-wrap"><button class="md-action-btn md-more-row" data-index="${i}" title="More"><i class="fa-solid fa-ellipsis"></i></button><div class="md-row-menu"><button class="md-view-member" data-index="${i}"><i class="fa-regular fa-eye"></i>View</button><button class="md-edit-member" data-index="${i}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button class="md-message-member" data-index="${i}"><i class="fa-regular fa-envelope"></i>Message</button><button class="md-delete-member" data-index="${i}"><i class="fa-regular fa-trash-can"></i>Delete</button></div></div></div>`}
  function render(){
    const data = filtered();
    rows.innerHTML = data.map((m, idx)=>{
      const originalIndex = members.indexOf(m);
      return `<tr><td><input type="checkbox" class="md-row-check"></td><td><div class="md-person"><img class="md-avatar" src="${m.img}" alt="${m.name}"><div><b>${m.name}</b><span>${m.email}</span></div></div></td><td>${m.id}</td><td><div class="md-branch"><b>${m.branch}</b><span>(${m.branchSub})</span></div></td><td><span class="md-chip ${cls(m.category)}">${m.category}</span></td><td>${m.phone}</td><td><span class="md-status ${m.status.toLowerCase()}">${m.status}</span></td><td>${m.joined}</td><td>${actionCell(originalIndex)}</td></tr>`;
    }).join('');
    grid.innerHTML = data.map(m=>{ const i=members.indexOf(m); return `<div class="md-member-card"><div class="md-person"><img class="md-avatar" src="${m.img}" alt="${m.name}"><div><b>${m.name}</b><span>${m.id}</span></div></div><p><span>Branch</span><b>${m.branch}</b></p><p><span>Category</span><b>${m.category}</b></p><p><span>Phone</span><b>${m.phone}</b></p><p><span>Status</span><span class="md-status ${m.status.toLowerCase()}">${m.status}</span></p>${actionCell(i)}</div>`; }).join('');
    const count = data.length || 0;
    title.textContent = count ? `Showing 1 to ${Math.min(currentRows,count)} of ${count === members.length ? '4,732' : count} members` : 'No matching members found';
    if(!count){ rows.innerHTML = `<tr><td colspan="9" style="text-align:center;height:90px;color:#66738f">No members match the selected filters.</td></tr>`; grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#66738f;padding:40px">No members match the selected filters.</div>`; }
  }
  function showToast(msg){ const t=$('#mdToast'); if(!t) return; t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
  function openMember(i){ const m = members[i]; if(!m) return; $('#mdViewBody').innerHTML = `<div class="md-view-hero"><img src="${m.img}" alt="${m.name}"><div><h3>${m.name}</h3><p>${m.id} • ${m.category}</p><span class="md-status ${m.status.toLowerCase()}">${m.status}</span></div></div><div class="md-view-meta"><p><span>Email</span>${m.email}</p><p><span>Phone</span>${m.phone}</p><p><span>Branch / Church</span>${m.branch} (${m.branchSub})</p><p><span>Joined On</span>${m.joined}</p><p><span>Gender</span>${m.gender}</p><p><span>Age Group</span>${m.age}</p><p><span>Baptized</span>${m.baptized?'Yes':'No'}</p><p><span>Member Category</span>${m.category}</p></div>`; $('#mdEditFromView').onclick=()=>{ location.href='add-member.html?edit='+encodeURIComponent(m.id); }; $('#mdViewModal').classList.add('show'); $('#mdViewModal').setAttribute('aria-hidden','false'); }
  document.addEventListener('click', e=>{
    const view = e.target.closest('.md-view-member'); if(view){ openMember(+view.dataset.index); return; }
    const more = e.target.closest('.md-more-row'); if(more){ e.stopPropagation(); $$('.md-row-menu').forEach(m=>m.classList.remove('show')); more.nextElementSibling.classList.toggle('show'); return; }
    if(e.target.closest('.md-edit-member')){ location.href='add-member.html?edit='+encodeURIComponent(members[e.target.closest('.md-edit-member').dataset.index].id); return; }
    if(e.target.closest('.md-message-member')){ showToast('Message action opened'); return; }
    if(e.target.closest('.md-delete-member')){ showToast('Demo delete action completed'); return; }
    if(e.target.closest('.md-modal-close')){ $$('.md-modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')}); return; }
    if(e.target.id==='mdBulkBtn'){ e.stopPropagation(); $('#mdBulkMenu').classList.toggle('show'); return; }
    if(!e.target.closest('.md-row-menu-wrap')) $$('.md-row-menu').forEach(m=>m.classList.remove('show'));
    if(!e.target.closest('.md-bulk-wrap')) $('#mdBulkMenu')?.classList.remove('show');
  });
  $$('.md-tabs button').forEach(btn=>btn.addEventListener('click',()=>{ $$('.md-tabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); activeTab=btn.dataset.filter; render(); }));
  $$('.md-view-btn').forEach(btn=>btn.addEventListener('click',()=>{ currentView=btn.dataset.view; $$('.md-view-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); list.classList.toggle('hidden', currentView==='grid'); grid.classList.toggle('active', currentView==='grid'); }));
  ['mdSearch','mdBranch','mdCategory','mdStatus','mdAge','mdGender'].forEach(id=>$('#'+id)?.addEventListener(id==='mdSearch'?'input':'change', render));
  $('#mdResetFilters')?.addEventListener('click',()=>{ ['mdSearch'].forEach(id=>$('#'+id).value=''); ['mdBranch','mdCategory','mdStatus','mdAge','mdGender'].forEach(id=>$('#'+id).value='all'); activeTab='all'; $$('.md-tabs button').forEach((b,i)=>b.classList.toggle('active',i===0)); render(); });
  $('#mdMoreFilters')?.addEventListener('click',()=>showToast('More filters are available in Advanced Search'));
  $('#mdAdvancedBtn')?.addEventListener('click',()=>$('#mdAdvancedModal').classList.add('show'));
  $('#mdAdvancedQuick')?.addEventListener('click',()=>$('#mdAdvancedModal').classList.add('show'));
  $('#mdApplyAdvanced')?.addEventListener('click',()=>{ $$('.md-modal').forEach(m=>m.classList.remove('show')); showToast('Advanced search applied'); });
  $('#mdExportBtn')?.addEventListener('click',()=>showToast('Member list export started'));
  $('#mdImportBtn')?.addEventListener('click',()=>showToast('Import members action opened'));
  $('#mdBulkUpdateBtn')?.addEventListener('click',()=>showToast('Bulk update action opened'));
  $('#mdPrintBtn')?.addEventListener('click',()=>window.print());
  $('#mdSelectAll')?.addEventListener('change',e=>$$('.md-row-check').forEach(c=>c.checked=e.target.checked));
  $$('.md-page-num').forEach(b=>b.addEventListener('click',()=>{ $$('.md-page-num').forEach(x=>x.classList.remove('active')); b.classList.add('active'); showToast(`Page ${b.textContent} loaded`); }));
  $$('.md-page-control').forEach(b=>b.addEventListener('click',()=>showToast(`${b.dataset.page === 'next' ? 'Next' : 'Previous'} page loaded`)));
  $('#mdRowsPerPage')?.addEventListener('change',e=>{ currentRows=+e.target.value; render(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') $$('.md-modal').forEach(m=>m.classList.remove('show')); });
  render();
})();
