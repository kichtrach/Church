
(function(){
  const members = [
    ['Aaron Daniel','STJ/M/2012/0045','Men\'s Fellowship','with','Uploaded by Parish','Adults (18+)','AD','aaron-daniel.svg'],
    ['Anita Varghese','STJ/F/2015/0067','Women\'s Fellowship','with','Uploaded by Parish','Adults (18+)','AV','anita-varghese.svg'],
    ['Balaji Thomas','STJ/M/2010/0021','Choir','with','Bulk Upload','Adults (18+)','BT','balaji-thomas.svg'],
    ['Delphine Samuel','STJ/F/2018/0109','Sunday School','with','Uploaded by Parish','Adults (18+)','DS','delphine-samuel.svg'],
    ['Edward Mathew','STJ/M/2008/0012','Ushering','with','Imported','Seniors (60+)','EM','edward-mathew.svg'],
    ['Grace Philip','STJ/F/2011/0033','Youth Ministry','with','Uploaded by Parish','Adults (18+)','GP','grace-philip.svg'],
    ['Jacob Joseph','STJ/M/2016/0078','Men\'s Fellowship','with','Uploaded by Parish','Adults (18+)','JJ','jacob-joseph.svg'],
    ['Leela Daniel','STJ/F/2005/0008','Women\'s Fellowship','with','Bulk Upload','Seniors (60+)','LD','leela-daniel.svg'],
    ['M. K. Daniel','STJ/M/2002/0003','Choir','with','Uploaded by Parish','Seniors (60+)','MD','m-k-daniel.svg'],
    ['Mary George','STJ/F/2013/0056','Sunday School','with','Uploaded by Parish','Adults (18+)','MG','mary-george.svg'],
    ['Mathew John','STJ/M/2003/0011','Ushering','with','Imported','Seniors (60+)','MJ','mathew-john.svg'],
    ['Neena Abraham','STJ/F/2017/0091','Women\'s Fellowship','with','Uploaded by Parish','Adults (18+)','NA','neena-abraham.svg'],
    ['Philip Varghese','STJ/M/2014/0062','Youth Ministry','with','Uploaded by Parish','Adults (18+)','PV','philip-varghese.svg'],
    ['Rekha Thomas','STJ/F/2019/0113','Choir','with','Bulk Upload','Adults (18+)','RT','rekha-thomas.svg'],
    ['Samuel Raj','STJ/M/2020/0122','Men\'s Fellowship','without','Other','Adults (18+)','SR','no-photo.svg']
  ].map((m,i)=>({id:i+1,name:m[0],membership:m[1],ministry:m[2],status:m[3],source:m[4],age:m[5],initials:m[6],photo:m[7]}));
  let activeTab='all', view='grid', filtered=[...members];
  const grid=document.getElementById('photoMembers');
  const modal=document.getElementById('photoModal');
  const modalBody=document.getElementById('photoModalBody');
  const modalTitle=document.getElementById('photoModalTitle');
  const primary=document.getElementById('photoModalPrimary');
  if(!grid) return;
  function card(m){
    const avatar = `<div class="member-avatar ${m.status==='with'?'photo':'missing'}"><img src="images/member-photos/${m.photo}" alt="${m.name} photo"></div>`;
    return `<article class="member-photo-card" data-name="${m.name.toLowerCase()}" data-status="${m.status}" data-ministry="${m.ministry}">
      ${avatar}<div class="member-photo-info"><h4>${m.name}</h4><p>${m.membership}</p><small>${m.ministry}</small></div>
      <div class="photo-actions"><button title="View" data-action="view" data-id="${m.id}"><i class="fa-solid fa-eye"></i></button><button title="Edit" data-action="edit" data-id="${m.id}"><i class="fa-solid fa-pen-to-square"></i></button><button title="Upload" data-action="upload" data-id="${m.id}"><i class="fa-solid fa-upload"></i></button><button class="delete" title="Remove" data-action="delete" data-id="${m.id}"><i class="fa-solid fa-trash-can"></i></button></div>
    </article>`;
  }
  function render(){
    grid.classList.toggle('list-view', view==='list');
    grid.innerHTML = filtered.map(card).join('') || `<div class="empty-state"><i class="fa-solid fa-image"></i><p>No members found.</p></div>`;
    const countText=document.getElementById('photoCountText'); if(countText) countText.textContent = `Showing 1 to ${Math.min(filtered.length,15)} of ${activeTab==='without'?'262':activeTab==='recent'?'24':'986'} entries`;
  }
  function applyFilters(){
    const search=(document.getElementById('photoSearch')?.value||'').toLowerCase();
    const status=document.getElementById('photoStatus')?.value||'all';
    const ministry=document.getElementById('photoMinistry')?.value||'all';
    const source=document.getElementById('photoSource')?.value||'all';
    const age=document.getElementById('photoAge')?.value||'all';
    const without=document.getElementById('withoutOnly')?.checked;
    filtered=members.filter(m=>{
      if(activeTab==='without' && m.status!=='without') return false;
      if(activeTab==='recent' && m.id>5) return false;
      if(search && !(m.name.toLowerCase().includes(search)||m.membership.toLowerCase().includes(search))) return false;
      if(status!=='all' && status!==m.status && !(status==='recent' && m.id<=5)) return false;
      if(ministry!=='all' && ministry!==m.ministry) return false;
      if(source!=='all' && source!==m.source) return false;
      if(age!=='all' && age!==m.age) return false;
      if(without && m.status!=='without') return false;
      return true;
    });
    const sort=document.getElementById('photoSort')?.value;
    if(sort==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==='missing') filtered.sort((a,b)=>a.status.localeCompare(b.status));
    render();
  }
  function openModal(type, member){
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
    if(type==='view'){
      modalTitle.textContent='Member Photo Details'; primary.style.display='none';
      modalBody.innerHTML=`<div class="detail-grid"><div class="member-avatar ${member.status==='with'?'photo':'missing'}"><img src="images/member-photos/${member.photo}" alt="${member.name} photo"></div><dl><dt>Member Name</dt><dd>${member.name}</dd><dt>Membership No.</dt><dd>${member.membership}</dd><dt>Ministry / Group</dt><dd>${member.ministry}</dd><dt>Photo Status</dt><dd>${member.status==='with'?'With Photo':'Without Photo'}</dd><dt>Image Source</dt><dd>${member.source}</dd></dl></div>`;
    } else if(type==='delete'){
      modalTitle.textContent='Remove Member Photo'; primary.style.display='inline-flex'; primary.textContent='Remove Photo';
      modalBody.innerHTML=`<p>Are you sure you want to remove the photo for <b>${member.name}</b>?</p><p class="muted">This action can be replaced by uploading a new photo later.</p>`;
    } else {
      modalTitle.textContent= type==='bulk'?'Bulk Upload Photos':`Upload Photo - ${member?member.name:'Member'}`; primary.style.display='inline-flex'; primary.textContent='Save Photo';
      modalBody.innerHTML=`<div class="upload-zone"><i class="fa-solid fa-cloud-arrow-up"></i><h3>Drag and drop photo files here</h3><p>JPG or PNG. Recommended size 500x500 px. Maximum 2MB.</p><input type="file" id="photoFile" accept="image/png,image/jpeg" ${type==='bulk'?'multiple':''}><label for="photoFile">Browse Files</label><div id="selectedFiles"></div></div>`;
      setTimeout(()=>{document.getElementById('photoFile')?.addEventListener('change',e=>{const names=[...e.target.files].map(f=>f.name).join(', ');document.getElementById('selectedFiles').textContent=names||'';});},0);
    }
  }
  document.querySelectorAll('[data-photo-tab]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-photo-tab]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeTab=btn.dataset.photoTab;document.getElementById('photoListTitle').textContent = activeTab==='without'?'Members Without Photo (262)':activeTab==='recent'?'Recently Added (24)':activeTab==='updates'?'Photo Updates':'Members (986)';applyFilters();}));
  document.querySelectorAll('.view-mode').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.view-mode').forEach(b=>b.classList.remove('active'));btn.classList.add('active');view=btn.dataset.view;render();}));
  ['photoSearch','photoStatus','photoMinistry','photoSource','photoAge','photoSort','withoutOnly'].forEach(id=>document.getElementById(id)?.addEventListener(id==='photoSearch'?'input':'change',applyFilters));
  document.getElementById('applyPhotoFilters')?.addEventListener('click',applyFilters);
  document.getElementById('clearPhotoFilters')?.addEventListener('click',()=>{['photoSearch'].forEach(id=>document.getElementById(id).value='');['photoStatus','photoMinistry','photoType','photoSource','photoChurch','photoAge'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='all'});const chk=document.getElementById('withoutOnly');if(chk)chk.checked=false;activeTab='all';document.querySelectorAll('[data-photo-tab]').forEach((b,i)=>b.classList.toggle('active',i===0));applyFilters();});
  grid.addEventListener('click',e=>{const b=e.target.closest('button[data-action]'); if(!b) return; const m=members.find(x=>x.id==b.dataset.id); openModal(b.dataset.action==='edit'?'upload':b.dataset.action,m);});
  document.querySelectorAll('.bulk-upload-btn,#addPhotoAction,.quick-update').forEach(b=>b.addEventListener('click',()=>openModal('bulk')));
  document.getElementById('exportPhotoReport')?.addEventListener('click',()=>alert('Photo report export started.'));
  document.querySelector('.quick-remove')?.addEventListener('click',()=>openModal('delete',members[0]));
  document.querySelectorAll('[data-close-photo-modal]').forEach(el=>el.addEventListener('click',()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true');}));
  primary?.addEventListener('click',()=>{modal.classList.remove('show'); alert('Photo action saved successfully.');});
  render();
})();
