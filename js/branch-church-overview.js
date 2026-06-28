
document.addEventListener('DOMContentLoaded',()=>{
 if(!window.Chart) return; const teal='#008677', blue='#6158ff', orange='#ff7a2a', red='#f0526d';
 const trendCanvas=document.getElementById('branchMembershipChart');
 if(trendCanvas){
   const ctx=trendCanvas.getContext('2d'); const gradient=ctx.createLinearGradient(0,0,0,260); gradient.addColorStop(0,'rgba(0,134,119,.22)'); gradient.addColorStop(1,'rgba(0,134,119,0)');
   new Chart(ctx,{type:'line',data:{labels:['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],datasets:[{data:[910,940,980,1030,1080,1125,1160,1200,1225,1250,1275,1248],borderColor:teal,backgroundColor:gradient,fill:true,tension:.35,pointRadius:4,pointBackgroundColor:teal,pointBorderColor:'#fff',pointBorderWidth:2,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:true}},scales:{x:{grid:{display:false},ticks:{color:'#071052',font:{family:'Open Sans',size:11,weight:'700'}}},y:{min:0,max:1500,ticks:{stepSize:250,color:'#071052',font:{family:'Open Sans',size:11,weight:'700'}},grid:{color:'#e6edf5'}}}}});
 }
 const memberCanvas=document.getElementById('memberBreakdownChart');
 if(memberCanvas){new Chart(memberCanvas,{type:'doughnut',data:{labels:['Adults (18-59)','Seniors (60+)','Youth (13-17)','Children (0-12)'],datasets:[{data:[782,236,148,82],backgroundColor:[teal,blue,'#8b5cf6','#f87171'],borderWidth:0,cutout:'62%'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{usePointStyle:true,boxWidth:9,color:'#071052',font:{family:'Open Sans',size:12,weight:'700'}}},tooltip:{enabled:true}}}});}
 
 const branchModal=document.getElementById('branchViewModal');
 function openBranchModal(row){
   if(!row || !branchModal) return;
   const c=row.children;
   const set=(id,val)=>{const el=document.getElementById(id); if(el) el.textContent=(val||'').trim();};
   set('branchDetailName', c[0]?.textContent);
   set('branchDetailLocation', c[1]?.textContent);
   set('branchDetailMembers', c[2]?.textContent);
   set('branchDetailServices', c[3]?.textContent);
   set('branchDetailMinistries', c[4]?.textContent);
   set('branchDetailOfferings', c[5]?.textContent);
   set('branchDetailStatus', c[6]?.textContent);
   branchModal.classList.add('show'); document.body.classList.add('modal-open');
 }
 document.querySelectorAll('.branch-table .eye-btn').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();openBranchModal(btn.closest('tr'));}));
 branchModal?.querySelectorAll('.close-modal').forEach(btn=>btn.addEventListener('click',()=>{branchModal.classList.remove('show');document.body.classList.remove('modal-open');}));
 branchModal?.addEventListener('click',e=>{if(e.target===branchModal){branchModal.classList.remove('show');document.body.classList.remove('modal-open');}});

 document.querySelectorAll('.quick-actions button,.more-btn,.full-btn').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.add('clicked'); setTimeout(()=>btn.classList.remove('clicked'),180)}));
});
