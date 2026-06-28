
(function(){
  const form=document.getElementById('addMemberPageForm');
  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function toast(msg){let old=qs('.mm-toast'); if(old) old.remove(); const t=document.createElement('div'); t.className='mm-toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200);}
  function syncPreview(){
    qs('#previewName').textContent=form?.elements.name?.value||'New Member';
    qs('#previewType').textContent=form?.elements.type?.value||'-';
    qs('#previewBranch').textContent=form?.elements.branch?.value||'-';
    qs('#previewPhone').textContent=form?.elements.phone?.value||'-';
  }
  ['input','change'].forEach(ev=>form?.addEventListener(ev,syncPreview));
  qsa('.mm-role-card').forEach(card=>card.addEventListener('click',()=>{qsa('.mm-role-card').forEach(c=>c.classList.remove('active')); card.classList.add('active'); card.querySelector('input').checked=true;}));
  form?.addEventListener('submit',e=>{e.preventDefault(); if(!form.checkValidity()){form.reportValidity(); toast('Please complete required fields'); return;} toast('Member saved successfully'); setTimeout(()=>{window.location.href='member-management.html'},700);});
})();
