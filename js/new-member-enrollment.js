(function(){
  const form=document.getElementById('enrollmentForm');
  if(!form) return;
  let currentStep=1;
  const maxStep=5;
  const panels=[...document.querySelectorAll('[data-step-panel]')];
  const topSteps=[...document.querySelectorAll('#enTopStepper .en-step')];
  const sideSteps=[...document.querySelectorAll('#enSideStepper button')];
  const checklist=document.getElementById('uploadChecklist');
  const docsCard=document.querySelector('.docs-card');
  const toast=(msg)=>{let t=document.querySelector('.en-toast'); if(!t){t=document.createElement('div');t.className='en-toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
  const fmtDate=(v)=>{if(!v)return '-'; const d=new Date(v+'T00:00:00'); return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replace(/ /g,' ')};
  const value=(name)=>{const el=form.elements[name]; if(!el) return ''; if(el instanceof RadioNodeList) return el.value; return el.value||''};
  function validateStep(step){
    const panel=document.querySelector(`[data-step-panel="${step}"]`); if(!panel) return true;
    let ok=true; panel.querySelectorAll('[required]').forEach(el=>{el.classList.remove('en-error'); if(!el.value.trim()){el.classList.add('en-error'); ok=false;}});
    if(!ok) toast('Please fill all mandatory fields.');
    return ok;
  }
  function updateSteps(){
    panels.forEach(p=>p.classList.toggle('active',Number(p.dataset.stepPanel)===currentStep));
    topSteps.forEach((s,i)=>{const n=i+1;s.classList.toggle('active',n===currentStep);s.classList.toggle('completed',n<currentStep)});
    sideSteps.forEach((s,i)=>{const n=i+1;s.classList.toggle('active',n===currentStep);s.classList.toggle('completed',n<currentStep);const small=s.querySelector('small'); if(small) small.textContent=n<currentStep?'Completed':n===currentStep?'In Progress':'Pending';});
    if(checklist){checklist.classList.toggle('show',currentStep===5)}
    if(docsCard){docsCard.style.display=currentStep===5?'none':''}
    updateSummary();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function gotoStep(n){n=Math.max(1,Math.min(maxStep,Number(n))); if(n>currentStep && !validateStep(currentStep)) return; currentStep=n; updateSteps();}
  document.addEventListener('click',e=>{
    const next=e.target.closest('[data-next]'); if(next){ if(validateStep(currentStep)) gotoStep(currentStep+1); }
    const prev=e.target.closest('[data-prev]'); if(prev) gotoStep(currentStep-1);
    const goto=e.target.closest('[data-goto-step]'); if(goto) gotoStep(goto.dataset.gotoStep);
    if(e.target.closest('[data-cancel]')) window.location.href='member-directory.html';
  });
  function updateSummary(){
    const first=value('firstName')||'John'; const last=value('lastName')||'Samuel'; const full=(first+' '+last).trim();
    const gender=value('gender')||'-'; const branch=value('branch')||'-'; const mobile=value('mobile')||'-'; const familyName=value('familyName')||last||'-';
    const qs=document.getElementById('quickSummary');
    if(qs){
      if(currentStep>=4){ qs.innerHTML=`<div class="summary-list"><p><span>Family Head</span><strong>${full||'John Samuel'}</strong></p><p><span>Spouse</span><strong>${value('spouse')||'Mary Samuel'}</strong></p><p><span>Children</span><strong>2</strong></p><p><span>Total Members</span><strong>${document.querySelectorAll('#familyMembersTable tbody tr').length||4}</strong></p><p class="span2"><span>Address</span><strong>${value('locality')||'Sunrise Apartments, Block A, Flat 302'}<br>Bangalore - 560034</strong></p></div>`; }
      else if(first || last || value('mobile') || value('branch')){ qs.innerHTML=`<div class="summary-list"><p><span>Full Name</span><strong>${full||'-'}</strong></p><p><span>Gender</span><strong>${gender}</strong></p><p><span>Branch</span><strong>${branch}</strong></p><p><span>Mobile</span><strong>${mobile}</strong></p></div>`; }
      else { qs.innerHTML='<div class="en-avatar"><i class="fa-regular fa-user"></i></div><strong>No information entered yet</strong><p>Complete this step to see preview</p>'; }
    }
    const map={enrollmentDate:fmtDate(value('enrollmentDate')),referredBy:value('referredBy')||'Parish Website',source:value('source')||'Website',reason:value('reason')||'Faith & Fellowship',membershipType:value('membershipType')||'Regular Member',language:value('language')||'English',fullName:full||'John Samuel',gender:gender,dob:fmtDate(value('dob'))||'10 Mar 1985',marital:value('marital')||'Married',mobile:mobile,email:value('email')||'samuel.family@example.com',bloodGroup:value('bloodGroup')||'B+',address:[value('address1'),value('address2'),value('city'),value('pincode')].filter(Boolean).join(', ')||'Sunrise Apartments, Block A, Flat 302, Bangalore - 560034, Karnataka, India',branch:branch,churchType:value('churchType')||'Regular Member',joiningDate:fmtDate(value('joiningDate')),baptised:value('baptised')==='Yes'?'Baptized':'Not Baptized',familyHead:value('familyHead')||'John Samuel (Self)',familyName:familyName,spouse:value('spouse')||'Mary Samuel',residential:value('residential')||'Resident',locality:value('locality')||'Sunrise Apartments, Block A, Flat 302',familyOccupation:value('familyOccupation')||'Business'};
    Object.entries(map).forEach(([k,v])=>{document.querySelectorAll(`[data-review="${k}"]`).forEach(el=>el.textContent=v||'-')});
    document.getElementById('reviewFamilyCount')&&(document.getElementById('reviewFamilyCount').textContent=document.querySelectorAll('#familyMembersTable tbody tr').length||4);
  }
  form.addEventListener('input',e=>{
    if(e.target.name==='dob' && e.target.value){const dob=new Date(e.target.value);const now=new Date();let age=now.getFullYear()-dob.getFullYear();const m=now.getMonth()-dob.getMonth();if(m<0||(m===0&&now.getDate()<dob.getDate()))age--;form.elements.age.value=age>0?age:'';}
    if(e.target.type==='tel') e.target.value=e.target.value.replace(/\D/g,'').slice(0,10);
    updateSummary();
  });
  form.addEventListener('change',updateSummary);
  document.getElementById('addFamilyMember')?.addEventListener('click',()=>{
    const tbody=document.querySelector('#familyMembersTable tbody'); const n=tbody.children.length+1;
    const tr=document.createElement('tr'); tr.innerHTML=`<td>${n}</td><td>New Member ${n}</td><td>Child</td><td>-</td><td>-</td><td>-</td><td>Unmarried</td><td>Individual</td><td><button type="button" class="en-icon-btn"><i class="fa-solid fa-pen"></i></button><button type="button" class="en-icon-btn danger"><i class="fa-solid fa-trash"></i></button></td>`; tbody.appendChild(tr); document.getElementById('familyCount').textContent=tbody.children.length; updateSummary(); toast('Family member added.');
  });
  document.addEventListener('click',e=>{const del=e.target.closest('.en-icon-btn.danger'); if(del){const tr=del.closest('tr'); tr?.remove(); document.querySelectorAll('#familyMembersTable tbody tr').forEach((row,i)=>row.cells[0].textContent=i+1); document.getElementById('familyCount').textContent=document.querySelectorAll('#familyMembersTable tbody tr').length; updateSummary(); toast('Family member removed.');}});
  document.querySelectorAll('.checklist-card label').forEach(label=>{const input=label.querySelector('input'); input?.addEventListener('change',()=>{const em=label.querySelector('em'); if(input.files.length){em.textContent='Uploaded'; em.innerHTML='Uploaded <i class="fa-solid fa-circle-check"></i>';}})});
  document.getElementById('saveDraft')?.addEventListener('click',()=>toast('Enrollment saved as draft.'));
  form.addEventListener('submit',e=>{e.preventDefault(); if(!validateStep(currentStep)) return; toast('Enrollment submitted successfully.'); setTimeout(()=>{window.location.href='member-directory.html'},1200);});
  updateSteps();
})();
