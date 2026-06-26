(function(){
  'use strict';
  const primary='#0096c7', secondary='#0077b6', green='#20b486', orange='#ff9f1c', purple='#8e6ad8', red='#ef476f';
  const palette=[primary,secondary,green,orange,purple,red];
  const charts={};
  function ensureHeight(canvas){
    if(!canvas) return;
    const parent=canvas.parentElement;
    if(parent && parent.offsetHeight<220){ parent.style.minHeight='260px'; }
    canvas.style.width='100%'; canvas.style.height='250px'; canvas.removeAttribute('height');
  }
  function destroy(id){ if(charts[id]){ charts[id].destroy(); delete charts[id]; } }
  function chart(id,type,labels,data,label){
    const canvas=document.getElementById(id); if(!canvas || !window.Chart) return null;
    ensureHeight(canvas); destroy(id);
    charts[id]=new Chart(canvas.getContext('2d'),{
      type,
      data:{labels,datasets:[{label:label||'Records',data,borderColor:primary,backgroundColor:(type==='line')?'rgba(0,150,199,.13)':palette,pointBackgroundColor:primary,pointBorderColor:'#fff',pointBorderWidth:2,pointRadius:4,tension:.36,fill:type==='line',borderWidth:3,cutout:type==='doughnut'?'62%':undefined}]},
      options:{responsive:true,maintainAspectRatio:false,resizeDelay:120,plugins:{legend:{display:type==='pie'||type==='doughnut',position:'right',labels:{boxWidth:10,usePointStyle:true,pointStyle:'circle',font:{family:'Open Sans',size:12,weight:'600'}}},tooltip:{enabled:true}},scales:(type==='pie'||type==='doughnut')?{}:{x:{grid:{display:false},ticks:{font:{family:'Open Sans',size:12},color:'#5b667a'}},y:{beginAtZero:true,grid:{color:'#e6edf4'},ticks:{font:{family:'Open Sans',size:12},color:'#5b667a'}}}}
    });
    return charts[id];
  }
  function renderAll(){
    if(!window.Chart) return;
    chart('lineChart','line',['Jan','Feb','Mar','Apr','May','Jun'],[3200,3600,3900,4100,4300,4450],'Records');
    chart('barChart','bar',['Jan','Feb','Mar','Apr','May','Jun'],[12,19,8,15,24,18],'Records');
    chart('pieChart','doughnut',['Tithe','Offerings','Donations','Other'],[49,27,18,6],'Share');
    chart('committeePerformanceChart','line',['Jan','Feb','Mar','Apr','May','Jun'],[72,76,81,79,86,91],'Performance');
    chart('activityStatusChart','doughnut',['Completed','In Progress','Pending'],[58,27,15],'Activities');
    chart('memberParticipationChart','doughnut',['High','Medium','Low'],[44,38,18],'Participation');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(renderAll,80),{once:true}); else setTimeout(renderAll,80);
  window.addEventListener('resize',()=>Object.values(charts).forEach(c=>c.resize()));
  window.CSICharts={chart,renderAll,destroy,charts};
})();
