function drawPageCal(){
  const el=document.getElementById('pageCalendar');
  if(!el)return;
  el.innerHTML='';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>el.innerHTML+=`<div class="day-name">${d}</div>`);
  for(let i=1;i<=35;i++)el.innerHTML+=`<div data-day="${i}"><b>${i}</b>${[5,12,20,25].includes(i)?'<small>Service</small>':''}</div>`;
  el.querySelectorAll('div[data-day]').forEach(d=>d.onclick=()=>{el.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));d.classList.add('selected')});
}
drawPageCal();
