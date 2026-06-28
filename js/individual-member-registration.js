(function(){
  const form=document.getElementById('individualMemberForm');
  if(!form) return;
  const qs=(s,root=document)=>root.querySelector(s);
  const qsa=(s,root=document)=>Array.from(root.querySelectorAll(s));
  const toast=qs('#memberToast');
  const saveBtn=qs('#saveMemberBtn');
  const resetBtn=qs('#resetMemberForm');
  const photoInput=qs('#memberPhoto');
  const photoPreview=qs('#photoPreview');
  const photoImg=qs('#memberPhotoImg');
  const removePhoto=qs('#removePhoto');
  const photoStatus=qs('#photoStatus');
  function field(name){return form.elements[name]}
  function formatDate(v){ if(!v) return '-'; const d=new Date(v+'T00:00:00'); return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }
  function calcAge(v){ if(!v) return ''; const b=new Date(v); const t=new Date(); let a=t.getFullYear()-b.getFullYear(); const m=t.getMonth()-b.getMonth(); if(m<0||(m===0&&t.getDate()<b.getDate())) a--; return a>=0?a:''; }
  function updateSummary(){
    const full=[field('firstName').value,field('middleName').value,field('lastName').value].filter(Boolean).join(' ').trim();
    qs('#sumName').textContent=full||'-';
    qs('#sumGender').textContent=field('gender').value||'-';
    qs('#sumDob').textContent=formatDate(field('dob').value);
    qs('#sumBranch').textContent=field('branch').value||'-';
    qs('#sumJoin').textContent=formatDate(field('joiningDate').value);
    qs('#sumMemberNo').textContent=field('membershipNo').value||'Auto';
    qs('#sumCategory').textContent=field('category').value||'-';
    field('age').value=calcAge(field('dob').value);
  }
  qsa('input,select,textarea',form).forEach(el=>el.addEventListener('input',updateSummary));
  qsa('select,input[type="date"]',form).forEach(el=>el.addEventListener('change',updateSummary));
  qsa('input[inputmode="numeric"]').forEach(el=>el.addEventListener('input',()=>{el.value=el.value.replace(/\D/g,'').slice(0,el.maxLength||10)}));
  function clearErrors(){qsa('.field.invalid',form).forEach(f=>{f.classList.remove('invalid'); const e=f.querySelector('.error'); if(e) e.remove();});}
  function validate(){
    clearErrors(); let ok=true;
    qsa('[required]',form).forEach(el=>{ if(!String(el.value||'').trim()){ ok=false; const lab=el.closest('.field'); lab.classList.add('invalid'); const er=document.createElement('small'); er.className='error'; er.textContent='This field is required'; lab.appendChild(er); }});
    const mobile=field('mobile'); if(mobile.value && mobile.value.length!==10){ ok=false; const lab=mobile.closest('.field'); if(!lab.classList.contains('invalid')){lab.classList.add('invalid'); const er=document.createElement('small'); er.className='error'; er.textContent='Enter 10 digit mobile number'; lab.appendChild(er);} }
    return ok;
  }
  saveBtn&&saveBtn.addEventListener('click',()=>{ if(!validate()) return; field('membershipNo').value=field('membershipNo').value||('MEM'+Math.floor(1000+Math.random()*9000)); updateSummary(); toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2600); });
  resetBtn&&resetBtn.addEventListener('click',()=>{ form.reset(); field('age').value=''; field('membershipNo').value=''; clearErrors(); updateSummary(); removePhoto.click(); });
  photoInput&&photoInput.addEventListener('change',()=>{ const file=photoInput.files&&photoInput.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=e=>{photoImg.src=e.target.result; photoPreview.classList.add('has-photo'); removePhoto.disabled=false; photoStatus.textContent='Photo uploaded';}; reader.readAsDataURL(file); });
  removePhoto&&removePhoto.addEventListener('click',()=>{photoInput.value=''; photoImg.removeAttribute('src'); photoPreview.classList.remove('has-photo'); removePhoto.disabled=true; photoStatus.textContent='No photo added';});
  // make calendar icon focus/open date input
  qsa('.calendar-field').forEach(box=>{box.addEventListener('click',()=>{const inp=box.querySelector('input[type="date"]'); if(inp){ inp.focus(); if(inp.showPicker) inp.showPicker(); }});});
  updateSummary();
})();
