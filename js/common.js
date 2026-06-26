(function(){
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

  function toast(msg){
    let t=$('.csi-toast');
    if(!t){ t=document.createElement('div'); t.className='csi-toast'; document.body.appendChild(t); }
    t.textContent=msg; t.classList.add('show'); clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove('show'),1600);
  }

  function normal(v){ return String(v||'').trim().toLowerCase(); }
  function isIgnoredValue(v){ v=normal(v); return !v || v==='all' || v.startsWith('all ') || v==='select' || v.startsWith('select ') || v==='any' || v==='date range'; }
  function parseDateFromText(text){
    text=String(text||'');
    let m=text.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/);
    if(m){ const y=+m[3]<100?2000+(+m[3]):+m[3]; return new Date(y,+m[2]-1,+m[1]); }
    m=text.match(/\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})\b/i);
    if(m){ return new Date(+m[3], ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(m[2].slice(0,3).toLowerCase()), +m[1]); }
    m=text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2}),?\s+(\d{4})\b/i);
    if(m){ return new Date(+m[3], ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(m[1].slice(0,3).toLowerCase()), +m[2]); }
    return null;
  }
  function fmtDate(d){ return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }

  function closestFilterScope(el){ return el.closest('.events-filters,.filters,.filter-section,.page-filters,.ba-filter-row,.filter-row,.table-toolbar,.panel-head,.page-actions') || el.closest('.panel,section,main') || document; }
  function findTableRoot(scope){
    if(!scope || scope===document) return document;
    let root=scope.closest('.panel,section,.content,main') || scope;
    if(root.querySelector('tbody tr')) return root;
    let next=scope.nextElementSibling;
    while(next){ if(next.querySelector?.('tbody tr')) return next; next=next.nextElementSibling; }
    return document.querySelector('main') || document;
  }
  function rowsFor(root){ return $$('table tbody tr', root).filter(r=>!r.closest('.modal')); }

  function getFilterValues(scope){
    const values=[];
    $$('input[type="text"],input[type="search"],input:not([type]),select', scope).forEach(el=>{
      if(el.closest('.modal')) return;
      const v=normal(el.value || el.options?.[el.selectedIndex]?.text);
      if(!isIgnoredValue(v)) values.push(v);
    });
    return values;
  }
  function getDateRange(scope){
    const btn=$('.date-range,.date-range-control,[data-date-range]',scope) || scope.querySelector('button[class*="date"]');
    if(btn?.dataset.start || btn?.dataset.end){ return [btn.dataset.start?new Date(btn.dataset.start):null, btn.dataset.end?new Date(btn.dataset.end):null]; }
    const inputs=$$('input[type="date"]',scope);
    if(inputs.length>=2) return [inputs[0].value?new Date(inputs[0].value):null, inputs[1].value?new Date(inputs[1].value):null];
    return [null,null];
  }

  function applyFilters(origin){
    const scope=closestFilterScope(origin instanceof Element ? origin : (origin?.target || document.body));
    const root=findTableRoot(scope);
    const rows=rowsFor(root);
    if(!rows.length) return;
    const values=getFilterValues(scope);
    const [start,end]=getDateRange(scope);
    rows.forEach(row=>{
      const text=normal(row.innerText);
      let ok=true;
      for(const v of values){ if(!text.includes(v)){ ok=false; break; } }
      if(ok && (start||end)){
        const d=parseDateFromText(row.innerText);
        if(d){ if(start && d<start) ok=false; if(end && d>end) ok=false; }
      }
      row.dataset.filterMatch=ok?'1':'0';
    });
    paginate(root,1);
    document.dispatchEvent(new CustomEvent('csi:filters-applied',{detail:{scope:root, values}}));
  }

  function ensurePager(root){
    const table=$('table',root); if(!table) return null;
    let pager=root.querySelector('.pagination,.events-pagination,.table-pagination');
    if(!pager){
      pager=document.createElement('div'); pager.className='table-pagination pagination';
      table.insertAdjacentElement('afterend',pager);
    }
    return pager;
  }
  function paginate(root,page){
    root=findTableRoot(root);
    const rows=rowsFor(root); if(!rows.length) return;
    const pager=ensurePager(root); if(!pager) return;
    const sizeSelect=root.querySelector('select.rows-per-page,.page-size');
    const pageSize=sizeSelect?parseInt(sizeSelect.value,10)||8:8;
    const matched=rows.filter(r=>r.dataset.filterMatch!=='0');
    const pages=Math.max(1,Math.ceil(matched.length/pageSize));
    page=Math.min(Math.max(1,page||+(root.dataset.page||1)),pages);
    root.dataset.page=page;
    rows.forEach(r=>r.style.display='none');
    matched.forEach((r,i)=>{ if(i>=(page-1)*pageSize && i<page*pageSize) r.style.display=''; });
    const from=matched.length?((page-1)*pageSize+1):0, to=Math.min(page*pageSize,matched.length);
    pager.innerHTML=`<span>Showing ${from} to ${to} of ${matched.length} records</span><div class="page-buttons"><button type="button" class="page-prev" ${page===1?'disabled':''}><i class="fa-solid fa-chevron-left"></i></button>${Array.from({length:pages},(_,i)=>`<button type="button" class="page-num ${i+1===page?'active':''}" data-page="${i+1}">${i+1}</button>`).join('')}<button type="button" class="page-next" ${page===pages?'disabled':''}><i class="fa-solid fa-chevron-right"></i></button></div>`;
  }

  function initDateRanges(){
    document.addEventListener('click',e=>{
      const trigger=e.target.closest('.date-range,.date-range-control,[data-date-range]');
      if(!trigger) return;
      e.preventDefault(); e.stopPropagation();
      document.querySelectorAll('.date-range-popover').forEach(p=>p.remove());
      const rect=trigger.getBoundingClientRect();
      const pop=document.createElement('div'); pop.className='date-range-popover';
      const today=new Date(), end=new Date(today); end.setMonth(end.getMonth()+3);
      const val=d=>d.toISOString().slice(0,10);
      pop.innerHTML=`<label>Start date<input type="date" class="dr-start" value="${trigger.dataset.start||val(today)}"></label><label>End date<input type="date" class="dr-end" value="${trigger.dataset.end||val(end)}"></label><div><button type="button" class="btn outline dr-clear">Clear</button><button type="button" class="btn primary dr-apply">Apply</button></div>`;
      document.body.appendChild(pop);
      pop.style.left=Math.min(rect.left+window.scrollX, window.scrollX+innerWidth-320)+'px';
      pop.style.top=(rect.bottom+window.scrollY+8)+'px';
      pop.querySelector('.dr-apply').addEventListener('click',()=>{
        const s=pop.querySelector('.dr-start').value, en=pop.querySelector('.dr-end').value;
        trigger.dataset.start=s; trigger.dataset.end=en;
        const label=`${fmtDate(new Date(s))} - ${fmtDate(new Date(en))}`;
        const span=trigger.querySelector('span'); if(span) span.textContent=label; else trigger.innerHTML=`<i class="fa-regular fa-calendar"></i> ${label}`;
        pop.remove(); applyFilters(trigger); toast('Date range applied');
      });
      pop.querySelector('.dr-clear').addEventListener('click',()=>{ delete trigger.dataset.start; delete trigger.dataset.end; pop.remove(); applyFilters(trigger); });
    });
    document.addEventListener('click',e=>{ if(!e.target.closest('.date-range-popover,.date-range,.date-range-control,[data-date-range]')) document.querySelectorAll('.date-range-popover').forEach(p=>p.remove()); });
  }

  function initFilters(){
    const selector='.events-filters,.filters,.filter-section,.page-filters,.ba-filter-row,.filter-row,.table-toolbar';
    $$(selector).forEach(scope=>{
      if(scope.dataset.csiFilterReady==='1') return; scope.dataset.csiFilterReady='1';
      $$('input,select',scope).forEach(el=>el.addEventListener(el.matches('input[type="text"],input[type="search"]')?'input':'change',()=>applyFilters(el)));
      $$('button',scope).forEach(btn=>{
        if(btn.matches('.date-range,.date-range-control,[data-date-range]')) return;
        const t=normal(btn.textContent);
        if(t.includes('filter') || btn.classList.contains('filter-btn')) btn.addEventListener('click',e=>{e.preventDefault(); applyFilters(btn); toast('Filters applied');});
        if(t.includes('reset') || btn.classList.contains('reset-btn')) btn.addEventListener('click',e=>{e.preventDefault(); $$('input',scope).forEach(i=>i.value=''); $$('select',scope).forEach(s=>s.selectedIndex=0); applyFilters(btn);});
      });
    });
    $$('table').forEach(table=>{ const root=table.closest('.panel,section,main')||document; rowsFor(root).forEach(r=>{ if(!r.dataset.filterMatch) r.dataset.filterMatch='1'; }); paginate(root,1); });
  }

  function initTabs(){
    document.addEventListener('click',e=>{
      const tab=e.target.closest('.tab,.events-tab,[data-tab],[data-filter]'); if(!tab) return;
      if(tab.tagName==='A' && tab.getAttribute('href') && tab.getAttribute('href')!=='#') return;
      const group=tab.parentElement; if(!group) return;
      e.preventDefault();
      $$('.tab,.events-tab,[data-tab],[data-filter]',group).forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const scope=tab.closest('.panel,section,main,.modal-card')||document;
      const targetId=tab.dataset.tab;
      if(targetId){ const target=scope.querySelector('#'+CSS.escape(targetId)); if(target){ $$('.tab-content',scope).forEach(c=>c.classList.remove('active')); target.classList.add('active'); } }
      const filter=normal(tab.dataset.filter || tab.textContent);
      if(filter && rowsFor(scope).length){ rowsFor(scope).forEach(r=>{ r.dataset.filterMatch=(filter==='all'||r.innerText.toLowerCase().includes(filter))?'1':'0'; }); paginate(scope,1); }
    });
  }

  function initActions(){
    document.addEventListener('click',e=>{
      const more=e.target.closest('.more,.more-btn,[data-action-menu]');
      if(more){ e.preventDefault(); e.stopPropagation(); document.querySelectorAll('.floating-action-menu').forEach(m=>m.remove()); const menu=document.createElement('div'); menu.className='floating-action-menu'; menu.innerHTML='<button type="button" data-float="view"><i class="fa-regular fa-eye"></i> View</button><button type="button" data-float="edit"><i class="fa-regular fa-pen-to-square"></i> Edit</button><button type="button" data-float="delete"><i class="fa-regular fa-trash-can"></i> Delete</button>'; document.body.appendChild(menu); const r=more.getBoundingClientRect(); menu.style.left=Math.max(8,r.right-140+scrollX)+'px'; menu.style.top=(r.bottom+8+scrollY)+'px'; menu._row=more.closest('tr'); return; }
      const float=e.target.closest('.floating-action-menu button');
      if(float){ const menu=float.closest('.floating-action-menu'); const row=menu._row; const act=float.dataset.float; if(act==='delete'&&row){ row.remove(); toast('Record deleted'); } else toast(act.charAt(0).toUpperCase()+act.slice(1)+' opened'); menu.remove(); return; }
      const del=e.target.closest('.delete,.table-action.delete'); if(del){ e.preventDefault(); const row=del.closest('tr'); if(row && confirm('Delete this record?')){ row.remove(); toast('Record deleted'); } return; }
      const action=e.target.closest('.table-action,.action-btn,.eye-btn,.view,.edit,.quick-actions button,.mini-list p'); if(action && !action.closest('a')){ e.preventDefault(); toast('Action opened'); }
    });
    document.addEventListener('click',e=>{ if(!e.target.closest('.floating-action-menu,.more,.more-btn,[data-action-menu]')) document.querySelectorAll('.floating-action-menu').forEach(m=>m.remove()); });
  }

  function initViewLinks(){
    $$('.view-link,.card-link,.section-link,.stat-card a').forEach(link=>{
      link.innerHTML=link.textContent.replace(/[→›]+/g,'').trim()+' <i aria-hidden="true" class="fa-solid fa-arrow-right"></i>';
    });
  }

  function init(){ initViewLinks(); initDateRanges(); initFilters(); initTabs(); initActions(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.CSICommon={init,applyFilters,paginate,toast};
})();
