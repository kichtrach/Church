(function(){
  const root=document.querySelector('.transfer-out-page');
  if(!root) return;
  const steps=[...root.querySelectorAll('.transfer-step')];
  const panels=[...root.querySelectorAll('.transfer-panel')];
  const prevBtn=root.querySelector('#prevTransfer');
  const nextBtn=root.querySelector('#nextTransfer');
  const submitBtn=root.querySelector('#submitTransfer');
  const cancelBtn=root.querySelector('#cancelTransfer');
  const form=root.querySelector('#transferOutForm');
  let current=0;
  const today=()=>new Date().toISOString().slice(0,10);
  const outDate=root.querySelector('#transferOutDate');
  if(outDate && !outDate.value) outDate.value=today();

  function setStep(index){
    current=Math.max(0,Math.min(index,panels.length-1));
    steps.forEach((s,i)=>{s.classList.toggle('active',i===current);s.classList.toggle('done',i<current);});
    panels.forEach((p,i)=>p.classList.toggle('active',i===current));
    if(prevBtn) prevBtn.style.display=current===0?'none':'inline-flex';
    if(nextBtn) nextBtn.classList.toggle('hidden',current===panels.length-1);
    if(submitBtn) submitBtn.classList.toggle('hidden',current!==panels.length-1);
    updateSummary();
    if(current===panels.length-1) updateReview();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function validatePanel(){
    let ok=true;
    panels[current].querySelectorAll('[required]').forEach(el=>{
      const empty=!String(el.value||'').trim();
      el.classList.toggle('error',empty);
      if(empty) ok=false;
    });
    return ok;
  }
  steps.forEach((s,i)=>s.addEventListener('click',()=>{ if(i<=current || validatePanel()) setStep(i); }));
  nextBtn&&nextBtn.addEventListener('click',()=>{ if(validatePanel()) setStep(current+1); });
  prevBtn&&prevBtn.addEventListener('click',()=>setStep(current-1));
  cancelBtn&&cancelBtn.addEventListener('click',()=>{ if(confirm('Cancel transfer out entry?')) location.href='member-management.html'; });

  root.querySelectorAll('textarea[maxlength]').forEach(t=>{
    const counter=root.querySelector('#'+t.id+'Count');
    const update=()=>{ if(counter) counter.textContent=t.value.length; };
    t.addEventListener('input',update); update();
  });
  function val(id){ const el=root.querySelector('#'+id); return el && el.value ? el.value : '—'; }
  function name(){ return [val('firstName'),val('middleName'),val('lastName')].filter(v=>v&&v!=='—').join(' ') || '—'; }
  function calcAge(){
    const dob=root.querySelector('#dob'); const age=root.querySelector('#age');
    if(!dob||!age||!dob.value) return;
    const d=new Date(dob.value); const n=new Date();
    let y=n.getFullYear()-d.getFullYear(); const m=n.getMonth()-d.getMonth();
    if(m<0||(m===0&&n.getDate()<d.getDate())) y--;
    age.value=y>0?y:'';
  }
  function updateSummary(){
    calcAge();
    const dds=root.querySelectorAll('#summaryList dd');
    if(dds.length<8) return;
    dds[0].textContent=name();
    dds[1].textContent=val('dob');
    dds[2].textContent=val('membershipNo');
    dds[3].textContent=val('currentChurch');
    dds[4].textContent=val('destChurch');
    dds[5].textContent=val('transferOutDate');
    dds[6].textContent=val('requestType');
    const nm=root.querySelector('#summaryMemberName'); if(nm) nm.textContent=name()==='—'?'Member Name':name();
  }
  root.querySelectorAll('input,select,textarea').forEach(el=>{
    el.addEventListener('input',updateSummary); el.addEventListener('change',updateSummary);
  });

  const searchBtn=root.querySelector('.search-member');
  const result=root.querySelector('#memberSearchResult');
  searchBtn&&searchBtn.addEventListener('click',()=>{
    const by=root.querySelector('#searchBy').value;
    const search=root.querySelector('#searchValue').value.trim();
    if(!by||!search){result.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> Select search type and enter a search value.';return;}
    result.innerHTML='<i class="fa-solid fa-circle-check"></i> Member found: <strong>John William D\'Silva</strong> | Membership No: <strong>MEM-2020-014</strong>. Details filled for transfer out.';
    const data={firstName:'John',middleName:'William',lastName:"D\'Silva",gender:'Male',dob:'1990-06-15',maritalStatus:'Married',bloodGroup:'B+',mobile:'9876543210',email:'john.dsilva@gmail.com',membershipNo:'MEM-2020-014',familyId:'FAM12345',address1:'12, Church Street',address2:'Near St. Mary\'s School',city:'Nagercoil',state:'Tamil Nadu',district:'Kanyakumari',pincode:'629001',familyHead:"John D\'Silva",familyMembers:'4',currentChurch:"St. John's Church (Main)"};
    Object.entries(data).forEach(([id,v])=>{const el=root.querySelector('#'+id); if(el) el.value=v;});
    updateSummary();
  });

  root.querySelectorAll('.upload-btn input[type="file"]').forEach(input=>{
    input.addEventListener('change',()=>{
      const tr=input.closest('tr'); const file=input.files&&input.files[0];
      if(!tr||!file) return;
      const status=tr.querySelector('.doc-status');
      status.textContent='Uploaded'; status.className='doc-status uploaded';
      const label=input.closest('.upload-btn'); label.innerHTML='<i class="fa-solid fa-circle-check"></i> Uploaded'; label.appendChild(input);
      const doc=input.dataset.doc;
      root.querySelectorAll('#docChecklist li').forEach(li=>{
        if(li.textContent.includes(doc.split(' ')[0]) || (doc==='ID Proof' && li.textContent.includes('ID Proof'))){
          const b=li.querySelector('b'); b.textContent='Uploaded'; b.classList.add('uploaded');
        }
      });
      updateReview();
    });
  });
  root.querySelectorAll('.doc-remove').forEach(btn=>btn.addEventListener('click',()=>{
    const tr=btn.closest('tr'); if(!tr) return;
    const input=tr.querySelector('input[type="file"]'); if(input) input.value='';
    const status=tr.querySelector('.doc-status'); status.textContent='Pending'; status.className='doc-status pending';
    const label=tr.querySelector('.upload-btn'); if(label){ const doc=input.dataset.doc; label.innerHTML='<input type="file" data-doc="'+doc+'"><i class="fa-solid fa-upload"></i> Upload File'; }
  }));

  function reviewCard(title,rows,step){
    return '<div class="review-item"><h4>'+title+' <button type="button" data-review-step="'+step+'"><i class="fa-regular fa-pen-to-square"></i> Edit</button></h4>'+rows.map(r=>'<p><span>'+r[0]+'</span><b>'+r[1]+'</b></p>').join('')+'</div>';
  }
  function updateReview(){
    const uploaded=[...root.querySelectorAll('.doc-status.uploaded')].length;
    const grid=root.querySelector('#reviewGrid'); if(!grid) return;
    grid.innerHTML=reviewCard('Transfer Request', [['Transfer Out Date',val('transferOutDate')],['Requested By',val('requestedBy')],['Request Type',val('requestType')],['Reason',val('reasonCategory')]],0)
      +reviewCard('Member Information', [['Member Name',name()],['Date of Birth',val('dob')],['Membership No.',val('membershipNo')],['Current Church',val('currentChurch')]],1)
      +reviewCard('Destination Church', [['Church',val('destChurch')],['Diocese / Parish',val('destDiocese')],['Delivery',val('deliveryMode')],['Certificate No.',val('transferCertificateNo')]],2)
      +reviewCard('Documents Summary', [['Total Documents','4'],['Uploaded',uploaded],['Pending',4-uploaded],['Required Status',uploaded>=3?'Completed':'Pending']],3);
    grid.querySelectorAll('[data-review-step]').forEach(b=>b.addEventListener('click',()=>setStep(Number(b.dataset.reviewStep))));
  }
  form&&form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!root.querySelector('#confirmReview').checked){ alert('Please confirm that you reviewed the transfer out details.'); return; }
    alert('Transfer Out request submitted successfully.');
  });
  setStep(0);
})();
