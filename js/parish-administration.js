document.querySelectorAll('.mini-cal-days span').forEach(d=>d.addEventListener('click',()=>{document.querySelectorAll('.mini-cal-days .active').forEach(x=>x.classList.remove('active'));let c=d.querySelector('.circle')||d; c.classList.add('active')}));

(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

  // Page date dropdown: works independently from the topbar calendar.
  const toggle=$('#parishDateToggle');
  const menu=$('#parishDateMenu');
  if(toggle && menu){
    const close=()=>{menu.classList.remove('show');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');};
    toggle.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const show=!menu.classList.contains('show');close();if(show){menu.classList.add('show');menu.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');}});
    menu.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();menu.querySelectorAll('.active').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const label=btn.querySelector('span')?.textContent||btn.textContent.trim();toggle.innerHTML=`<i class="fa-regular fa-calendar"></i> ${label} <i class="fa-solid fa-chevron-down"></i>`;close();}));
    document.addEventListener('click',e=>{if(!e.target.closest('.page-actions')) close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
  }

  // Parish mini calendar next/prev + easy date selection.
  const mini=$('.mini-calendar');
  if(mini){
    const head=mini.querySelector('.mini-cal-head strong');
    const daysWrap=mini.querySelector('.mini-cal-days');
    let date=new Date(2025,4,1);
    const marks={1:'orange',12:'green',18:'orange',20:'green',25:'orange'};
    function render(){
      if(!head||!daysWrap)return;
      head.textContent=date.toLocaleString('en-US',{month:'long',year:'numeric'});
      daysWrap.innerHTML='';
      const first=new Date(date.getFullYear(),date.getMonth(),1).getDay();
      const days=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
      const prevDays=new Date(date.getFullYear(),date.getMonth(),0).getDate();
      for(let i=first-1;i>=0;i--){const sp=document.createElement('span');sp.className='muted';sp.textContent=prevDays-i;daysWrap.appendChild(sp);} 
      for(let d=1;d<=days;d++){const sp=document.createElement('span');sp.dataset.day=d;sp.innerHTML=marks[d]?`<i class="circle ${marks[d]}">${d}</i>`:String(d);sp.addEventListener('click',()=>{daysWrap.querySelectorAll('.active').forEach(x=>x.classList.remove('active'));(sp.querySelector('.circle')||sp).classList.add('active');});daysWrap.appendChild(sp);} 
      while(daysWrap.children.length<42){const sp=document.createElement('span');sp.className='muted';sp.textContent=daysWrap.children.length-days-first+1;daysWrap.appendChild(sp);} 
    }
    const btns=mini.querySelectorAll('.mini-cal-head button');
    btns[0]?.addEventListener('click',e=>{e.preventDefault();date.setMonth(date.getMonth()-1);render();});
    btns[1]?.addEventListener('click',e=>{e.preventDefault();date.setMonth(date.getMonth()+1);render();});
    render();
  }
})();
