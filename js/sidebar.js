(function(){
  'use strict';
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const current=(location.pathname.split('/').pop()||'dashboard.html').toLowerCase();

  function closeMobileSidebar(){
    $('.sidebar')?.classList.remove('show');
    document.body.classList.remove('sidebar-open');
  }

  function markActive(){
    const currentFile = (location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
    const activeMap = {
      'add-visitor.html': 'visitor-management.html',
      'edit-visitor.html': 'visitor-management.html',
      'visitor-details.html': 'visitor-management.html',
      'visitor-followup.html': 'visitor-management.html',
      'add-member.html': 'member-management.html',
      'add-family.html': 'family-registration.html'
    };
    const targetFile = activeMap[currentFile] || currentFile;

    $$('.side-nav a').forEach(a=>a.classList.remove('active'));
    $$('.nav-parent').forEach(btn=>btn.classList.remove('active'));
    $$('.nav-group.open').forEach(g=>g.classList.remove('open'));

    let activeLink = null;
    $$('.side-nav a[href]').some(a=>{
      const href=(a.getAttribute('href')||'').split('/').pop().toLowerCase();
      if(href === targetFile){ activeLink = a; return true; }
      return false;
    });

    if(!activeLink && (currentFile==='' || currentFile==='index.html')){
      activeLink = $('.side-nav a[href="dashboard.html"]');
    }
    if(activeLink){
      activeLink.classList.add('active');
      const group = activeLink.closest('.nav-group');
      if(group){
        group.classList.add('open');
        group.querySelector('.nav-parent')?.classList.add('active');
      }
    }
  }

  function bindParents(){
    $$('.nav-parent').forEach(btn=>{
      if(btn.dataset.sidebarBound==='true') return;
      btn.dataset.sidebarBound='true';
      btn.type='button';
      const group=btn.closest('.nav-group');
      const firstLink=group?.querySelector('.sub-nav a[href]');
      if(firstLink) btn.dataset.href=firstLink.getAttribute('href');
      btn.addEventListener('click',e=>{
        e.preventDefault();
        const href=btn.dataset.href;
        const arrowClicked=!!e.target.closest('.arrow');
        if(arrowClicked || e.altKey || e.ctrlKey || e.metaKey){
          group?.classList.toggle('open');
          return;
        }
        if(href){ window.location.href=href; }
        else { group?.classList.toggle('open'); }
      });
      btn.addEventListener('keydown',e=>{
        if(e.key==='Enter' && btn.dataset.href){ e.preventDefault(); window.location.href=btn.dataset.href; }
        if((e.key==='ArrowDown'||e.key===' ') && group){ e.preventDefault(); group.classList.toggle('open'); }
      });
    });
  }

  function bindLinks(){
    $$('.side-nav a').forEach(a=>{
      if(a.dataset.sidebarLinkBound==='true') return;
      a.dataset.sidebarLinkBound='true';
      a.addEventListener('click',e=>{
        const href=a.getAttribute('href');
        if(!href || href==='#') e.preventDefault();
        if(window.innerWidth<=991) closeMobileSidebar();
      });
    });
  }

  function bindHamburger(){
    $$('.hamburger').forEach(btn=>{
      if(btn.dataset.sidebarHamburgerBound==='true') return;
      btn.dataset.sidebarHamburgerBound='true';
      btn.type='button';
      btn.addEventListener('click',e=>{
        e.preventDefault(); e.stopPropagation();
        const sidebar=$('.sidebar');
        if(!sidebar) return;
        if(window.innerWidth<=991){
          sidebar.classList.toggle('show');
          document.body.classList.toggle('sidebar-open',sidebar.classList.contains('show'));
        }else{
          const collapsed = !document.body.classList.contains('sidebar-collapsed');
          document.body.classList.toggle('sidebar-collapsed', collapsed);
          if(collapsed){ $$('.nav-group.open').forEach(g=>g.classList.remove('open')); }
          else { markActive(); }
        }
      });
    });
  }

  function init(){
    const file=(location.pathname.split('/').pop()||'dashboard.html').replace(/\.html$/,'')||'dashboard';
    document.body.classList.add('page-'+file);
    markActive(); bindParents(); bindLinks(); bindHamburger();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  document.addEventListener('click',e=>{
    if(window.innerWidth<=991 && document.body.classList.contains('sidebar-open') && !e.target.closest('.sidebar,.hamburger')) closeMobileSidebar();
  });
  window.CSISidebar={init,closeMobileSidebar};
})();
