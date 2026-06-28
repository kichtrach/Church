
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function resetContainer(container){
    container.querySelectorAll('input,select,textarea').forEach(el=>{
      if(el.type==='checkbox'||el.type==='radio') el.checked = el.defaultChecked;
      else if(el.tagName==='SELECT') el.selectedIndex = 0;
      else el.value = '';
      el.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));
      el.dispatchEvent(new Event('change',{bubbles:true}));
    });
    if(window.CSIToast) window.CSIToast('Filters reset');
  }
  function addResetButtons(){
    const filterSelectors=['.filters','.events-filters','.filter-section','.page-filters','.ba-filter-row','.filter-row','.table-toolbar','.md-filter-card','.mm-filter-card','.filter-card form','.filter-panel'];
    filterSelectors.forEach(sel=>{$$(sel).forEach(box=>{
      if(box.querySelector('.ds-reset-btn,.filter-reset-btn,.md-reset,[id$="ResetFilters"]')) return;
      const hasControl=box.querySelector('input,select,textarea'); if(!hasControl) return;
      const btn=document.createElement('button'); btn.type='button'; btn.className='ds-reset-btn'; btn.innerHTML='<i class="fa-solid fa-rotate-left"></i> Reset';
      btn.addEventListener('click',()=>resetContainer(box)); box.appendChild(btn);
    });});
  }
  function normalizePhoneInputs(){
    $$('input[type="tel"],input[name*="phone" i],input[id*="phone" i],input[name*="mobile" i],input[id*="mobile" i]').forEach(inp=>{
      inp.placeholder = inp.placeholder && inp.placeholder.toLowerCase().includes('alternate') ? 'Enter alternate number' : (inp.placeholder || 'Enter phone number');
      inp.addEventListener('input',()=>{ inp.value = inp.value.replace(/[^0-9]/g,'').slice(0,10); });
      inp.value = (inp.value||'').replace(/\+\d+\s*/,'').replace(/[^0-9]/g,'').slice(0,10);
    });
  }
  function convertDateTextboxes(){
    $$('input[data-date],input.date,input.datepicker,input[id*="date" i],input[name*="date" i]').forEach(inp=>{
      if(inp.type!=='date' && !inp.readOnly){ try{ inp.type='date'; }catch(e){} }
    });
  }
  window.CSIToast=function(msg){
    let t=$('.ds-toast'); if(!t){ t=document.createElement('div'); t.className='ds-toast'; document.body.appendChild(t); }
    t.textContent=msg; t.classList.add('show'); clearTimeout(t._to); t._to=setTimeout(()=>t.classList.remove('show'),1800);
  };
  document.addEventListener('click',e=>{
    const reset=e.target.closest('.ds-reset-btn,.filter-reset-btn'); if(reset){ const box=reset.closest('.filters,.events-filters,.filter-section,.page-filters,.ba-filter-row,.filter-row,.table-toolbar,.md-filter-card,.mm-filter-card,.filter-card form,.filter-panel'); if(box){ e.preventDefault(); resetContainer(box); } }
  });
  document.addEventListener('DOMContentLoaded',()=>{addResetButtons(); normalizePhoneInputs(); convertDateTextboxes();});
})();
