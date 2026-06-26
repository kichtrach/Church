function togglePanel(btnSel,panelSel){
  document.querySelectorAll(btnSel).forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();e.stopPropagation();
    const wrap=btn.closest('.dropdown-wrap')||document;
    const panel=wrap.querySelector(panelSel)||document.querySelector(panelSel);
    document.querySelectorAll('.dropdown-panel.show').forEach(p=>{if(p!==panel)p.classList.remove('show')});
    panel?.classList.toggle('show');
  }));
}
togglePanel('.notify-toggle','.notification-panel');
togglePanel('.profile-toggle','.profile-panel');
document.addEventListener('click',e=>{
  if(!e.target.closest('.dropdown-wrap,.calendar-pop')) document.querySelectorAll('.dropdown-panel.show').forEach(p=>p.classList.remove('show'));
});
