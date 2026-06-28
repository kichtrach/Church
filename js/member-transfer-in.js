(function(){
  const root=document.querySelector('.transfer-page');
  if(!root) return;
  const steps=[...root.querySelectorAll('.transfer-step')];
  const panels=[...root.querySelectorAll('.transfer-panel')];
  const prevBtn=root.querySelector('#prevTransfer');
  const nextBtn=root.querySelector('#nextTransfer');
  const submitBtn=root.querySelector('#submitTransfer');
  const cancelBtn=root.querySelector('#cancelTransfer');
  const form=root.querySelector('#transferForm');
  let current=0;

  function today(){ const d=new Date(); return d.toISOString().slice(0,10); }
  const transferDate=root.querySelector('#transferDate');
  if(transferDate && !transferDate.value) transferDate.value=today();

  function setStep(index){
    current=Math.max(0,Math.min(index,panels.length-1));
    steps.forEach((s,i)=>{s.classList.toggle('active',i===current);s.classList.toggle('done',i<current);});
    panels.forEach((p,i)=>p.classList.toggle('active',i===current));
    prevBtn.style.display=current===0?'none':'inline-flex';
    nextBtn.classList.toggle('hidden',current===panels.length-1);
    submitBtn.classList.toggle('hidden',current!==panels.length-1);
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
  nextBtn.addEventListener('click',()=>{ if(validatePanel()) setStep(current+1); });
  prevBtn.addEventListener('click',()=>setStep(current-1));
  cancelBtn.addEventListener('click',()=>{ if(confirm('Cancel transfer entry?')) location.href='member-management.html'; });

  root.querySelectorAll('textarea[maxlength]').forEach(t=>{
    const counter=root.querySelector('#'+t.id+'Count');
    const update=()=>{ if(counter) counter.textContent=t.value.length; };
    t.addEventListener('input',update); update();
  });

  function getVal(id){ const el=root.querySelector('#'+id); return el && el.value ? el.value : '—'; }
  function memberName(){
    const name=[getVal('firstName'),getVal('middleName'),getVal('lastName')].filter(v=>v && v!=='—').join(' ');
    return name || '—';
  }
  function updateSummary(){
    const dds=root.querySelectorAll('#summaryList dd');
    if(dds.length<6) return;
    dds[0].textContent=memberName();
    dds[1].textContent=getVal('dob');
    dds[2].textContent=getVal('membershipNo');
    dds[3].textContent=getVal('currentChurch')!=='—'?getVal('currentChurch'):getVal('fromChurch');
    dds[4].textContent=getVal('transferDate');
    dds[5].textContent=getVal('requestType');
  }
  root.querySelectorAll('input,select,textarea').forEach(el=>el.addEventListener('input',updateSummary));
  root.querySelectorAll('select,input[type="date"],input[type="radio"]').forEach(el=>el.addEventListener('change',updateSummary));

  const searchBtn=root.querySelector('.search-member');
  const result=root.querySelector('#memberSearchResult');
  searchBtn.addEventListener('click',()=>{
    const by=root.querySelector('#searchBy').value;
    const val=root.querySelector('#searchValue').value.trim();
    if(!by || !val){ result.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> Select search type and enter a search value.'; return; }
    result.innerHTML='<i class="fa-solid fa-circle-check"></i> Member found: <strong>John Samuel</strong> &nbsp; | &nbsp; Membership No: <strong>MEM1001</strong>. Details filled for review.';
    root.querySelector('#firstName').value='John';
    root.querySelector('#lastName').value='Samuel';
    root.querySelector('#gender').value='Male';
    root.querySelector('#dob').value='1985-03-10';
    root.querySelector('#mobile').value='9876543210';
    root.querySelector('#membershipNo').value='MEM1001';
    root.querySelector('#currentChurch').value='St. Mary\'s CSI Church';
    updateSummary();
  });

  root.querySelectorAll('input[name="searchMethod"]').forEach(r=>r.addEventListener('change',()=>{
    const isNew=root.querySelector('input[name="searchMethod"]:checked').value==='new';
    result.innerHTML=isNew?'<i class="fa-solid fa-user-plus"></i> Continue to Member Information and enter new member details.':'<i class="fa-solid fa-circle-info"></i> Search for an existing member in the system to initiate transfer in.';
  }));

  root.querySelectorAll('.upload-box input[type="file"]').forEach(input=>{
    input.addEventListener('change',()=>{
      const box=input.closest('.upload-box');
      const file=input.files && input.files[0];
      if(file){
        box.classList.add('uploaded');
        box.querySelector('span').textContent=file.name;
        const doc=input.dataset.doc;
        root.querySelectorAll('#docChecklist li').forEach(li=>{
          if(li.textContent.includes(doc.split(' ')[0])){
            const b=li.querySelector('b'); b.textContent='Uploaded'; b.classList.add('uploaded');
          }
        });
      }
    });
  });

  function updateReview(){
    const box=root.querySelector('#reviewBox');
    box.innerHTML=`<h4>Review Summary</h4>
      <p><strong>Member:</strong> ${memberName()}</p>
      <p><strong>Transfer Date:</strong> ${getVal('transferDate')} &nbsp; <strong>Request Type:</strong> ${getVal('requestType')}</p>
      <p><strong>From:</strong> ${getVal('fromChurch')} &nbsp; <strong>Receiving Branch:</strong> ${getVal('receivingBranch')}</p>
      <p><strong>Status:</strong> Ready for submission after document verification.</p>`;
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    updateReview();
    alert('Transfer In request submitted successfully.');
  });

  setStep(0);
})();
