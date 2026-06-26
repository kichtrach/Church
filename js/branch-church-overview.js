
document.addEventListener('DOMContentLoaded',()=>{
 if(!window.Chart) return; const teal='#008677', blue='#6158ff', orange='#ff7a2a', red='#f0526d';
 const trendCanvas=document.getElementById('branchMembershipChart');
 if(trendCanvas){
   const ctx=trendCanvas.getContext('2d'); const gradient=ctx.createLinearGradient(0,0,0,260); gradient.addColorStop(0,'rgba(0,134,119,.22)'); gradient.addColorStop(1,'rgba(0,134,119,0)');
   new Chart(ctx,{type:'line',data:{labels:['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],datasets:[{data:[910,940,980,1030,1080,1125,1160,1200,1225,1250,1275,1248],borderColor:teal,backgroundColor:gradient,fill:true,tension:.35,pointRadius:4,pointBackgroundColor:teal,pointBorderColor:'#fff',pointBorderWidth:2,borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:true}},scales:{x:{grid:{display:false},ticks:{color:'#071052',font:{family:'Open Sans',size:11,weight:'700'}}},y:{min:0,max:1500,ticks:{stepSize:250,color:'#071052',font:{family:'Open Sans',size:11,weight:'700'}},grid:{color:'#e6edf5'}}}}});
 }
 const memberCanvas=document.getElementById('memberBreakdownChart');
 if(memberCanvas){new Chart(memberCanvas,{type:'doughnut',data:{labels:['Adults (18-59)','Seniors (60+)','Youth (13-17)','Children (0-12)'],datasets:[{data:[782,236,148,82],backgroundColor:[teal,blue,'#8b5cf6','#f87171'],borderWidth:0,cutout:'62%'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{usePointStyle:true,boxWidth:9,color:'#071052',font:{family:'Open Sans',size:12,weight:'700'}}},tooltip:{enabled:true}}}});}
 document.querySelectorAll('.quick-actions button,.eye-btn,.more-btn,.full-btn').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.add('clicked'); setTimeout(()=>btn.classList.remove('clicked'),180)}));
});
