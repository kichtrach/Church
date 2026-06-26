(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    const table = document.getElementById('sacramentTable');
    if(!table) return;

    const panel = document.querySelector('.sacrament-records-panel') || table.closest('section') || document.body;
    const tbody = table.querySelector('tbody');
    const allRows = Array.from(tbody.querySelectorAll('tr'));
    const typeFilter = document.getElementById('typeFilter');
    const locationFilter = document.getElementById('locationFilter');
    const officiantFilter = document.getElementById('officiantFilter');
    const dateFrom = document.getElementById('sacramentDateFrom');
    const dateTo = document.getElementById('sacramentDateTo');
    const filterBtn = document.getElementById('filterSacraments');
    const resetBtn = document.getElementById('resetSacraments');
    const tabs = Array.from(document.querySelectorAll('.sacrament-tabs button'));
    const title = document.querySelector('.records-head h3');
    const pagination = document.querySelector('.sacrament-pagination');
    const pageText = pagination?.querySelector('p');
    const pageBox = pagination?.querySelector('.pages');
    const perPageSelect = pagination?.querySelector('label select');
    const viewTools = panel.querySelector('.view-tools');
    const listBtn = viewTools ? Array.from(viewTools.querySelectorAll('button')).find(b => b.querySelector('.fa-list')) : null;
    const gridBtn = viewTools ? Array.from(viewTools.querySelectorAll('button')).find(b => b.querySelector('.fa-table-cells-large')) : null;
    const tableWrap = table.closest('.responsive-table') || table.parentElement;

    let grid = panel.querySelector('.sacrament-card-grid');
    if(!grid){
      grid = document.createElement('div');
      grid.className = 'sacrament-card-grid';
      tableWrap.insertAdjacentElement('afterend', grid);
    }

    let activeTab = 'All';
    let currentPage = 1;
    let currentView = 'list';

    function norm(v){ return String(v || '').trim().toLowerCase(); }
    function toDate(v){ return v ? new Date(v + 'T00:00:00') : null; }
    function rowDate(row){ return row?.dataset?.date ? new Date(row.dataset.date + 'T00:00:00') : null; }
    function perPage(){ return parseInt(perPageSelect?.value || '10', 10) || 10; }

    function getFilteredRows(){ return allRows.filter(row => row.dataset.match === '1'); }
    function getPageRows(){
      const matched = getFilteredRows();
      const start = (currentPage - 1) * perPage();
      return matched.slice(start, start + perPage());
    }

    function rowMatches(row){
      const selectedType = activeTab !== 'All' ? activeTab : (typeFilter?.value || 'All');
      const selectedLocation = locationFilter?.value || 'All Locations';
      const selectedOfficiant = officiantFilter?.value || 'All';
      const from = toDate(dateFrom?.value);
      const to = toDate(dateTo?.value);
      const rDate = rowDate(row);
      return (selectedType === 'All' || norm(row.dataset.type) === norm(selectedType)) &&
        (selectedLocation === 'All Locations' || norm(row.dataset.location) === norm(selectedLocation)) &&
        (selectedOfficiant === 'All' || norm(row.dataset.officiant) === norm(selectedOfficiant)) &&
        (!from || !rDate || rDate >= from) &&
        (!to || !rDate || rDate <= to);
    }

    function updateTitle(count){
      if(!title) return;
      const selectedType = activeTab === 'All' ? (typeFilter?.value || 'All') : activeTab;
      const label = selectedType === 'All' ? 'All Sacrament Records' : `${selectedType} Records`;
      title.innerHTML = `${label} <span>(${count})</span>`;
    }

    function rowToCard(row){
      const cells = row.children;
      const name = cells[2]?.querySelector('b')?.textContent?.trim() || cells[2]?.textContent?.trim() || 'Record';
      const sub = cells[2]?.querySelector('small')?.textContent?.trim() || '';
      const type = row.dataset.type || cells[1]?.textContent?.trim() || '';
      const location = row.dataset.location || cells[6]?.textContent?.trim() || '';
      const officiant = row.dataset.officiant || cells[7]?.textContent?.trim() || '';
      const date = cells[0]?.innerText?.trim().replace(/\s+/g,' ') || '';
      const badgeClass = norm(type).replace(/\s+/g,'-');
      const card = document.createElement('article');
      card.className = 'sacrament-grid-card';
      card.innerHTML = `
        <div class="grid-card-head">
          <span class="sacrament-badge ${badgeClass}">${type}</span>
          <button type="button" class="eye-btn grid-view-btn" aria-label="View ${name}"><i class="fa-regular fa-eye"></i></button>
        </div>
        <h4>${name}</h4>
        <p>${sub}</p>
        <div class="grid-meta">
          <span><i class="fa-regular fa-calendar"></i>${date}</span>
          <span><i class="fa-solid fa-location-dot"></i>${location}</span>
          <span><i class="fa-solid fa-user-tie"></i>${officiant}</span>
        </div>`;
      card.querySelector('.grid-view-btn')?.addEventListener('click', () => openModal(row));
      return card;
    }

    function renderGrid(){
      grid.innerHTML = '';
      const pageRows = getPageRows();
      if(!pageRows.length){
        const empty = document.createElement('div');
        empty.className = 'empty-state sacrament-grid-empty';
        empty.innerHTML = '<i class="fa-regular fa-folder-open"></i><p>No records found.</p>';
        grid.appendChild(empty);
        return;
      }
      pageRows.forEach(row => grid.appendChild(rowToCard(row)));
    }

    function renderRows(){
      allRows.forEach(r => r.style.display = 'none');
      if(currentView === 'list') getPageRows().forEach(r => r.style.display = '');
      if(currentView === 'grid') renderGrid();
    }

    function renderPagination(){
      const matched = getFilteredRows();
      const pp = perPage();
      const totalPages = Math.max(1, Math.ceil(matched.length / pp));
      currentPage = Math.min(Math.max(1, currentPage), totalPages);
      const start = (currentPage - 1) * pp;

      renderRows();

      if(pageText){
        pageText.textContent = matched.length === 0 ? 'Showing 0 records' : `Showing ${start + 1} to ${Math.min(start + pp, matched.length)} of ${matched.length} records`;
      }
      if(pageBox){
        pageBox.innerHTML = '';
        const makeBtn = (html, page, disabled=false, active=false) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.innerHTML = html;
          b.disabled = disabled;
          if(active) b.classList.add('active');
          b.addEventListener('click', () => { currentPage = page; renderPagination(); });
          return b;
        };
        pageBox.appendChild(makeBtn('<i class="fa-solid fa-chevron-left"></i>', currentPage - 1, currentPage === 1));
        const pages = [];
        for(let i=1;i<=totalPages;i++) if(i===1 || i===totalPages || Math.abs(i-currentPage)<=1) pages.push(i);
        let prev = 0;
        pages.forEach(p => {
          if(prev && p - prev > 1){ const s=document.createElement('span'); s.textContent='...'; pageBox.appendChild(s); }
          pageBox.appendChild(makeBtn(String(p), p, false, p === currentPage));
          prev = p;
        });
        pageBox.appendChild(makeBtn('<i class="fa-solid fa-chevron-right"></i>', currentPage + 1, currentPage === totalPages));
      }
    }

    function applyFilters(resetPage=true){
      allRows.forEach(row => { row.dataset.match = rowMatches(row) ? '1' : '0'; });
      if(resetPage) currentPage = 1;
      updateTitle(getFilteredRows().length);
      renderPagination();
    }

    function setView(view){
      currentView = view === 'grid' ? 'grid' : 'list';
      panel.classList.toggle('grid-mode', currentView === 'grid');
      panel.classList.toggle('list-mode', currentView === 'list');
      tableWrap.style.display = currentView === 'grid' ? 'none' : '';
      grid.style.display = currentView === 'grid' ? 'grid' : 'none';
      listBtn?.classList.toggle('active', currentView === 'list');
      gridBtn?.classList.toggle('active', currentView === 'grid');
      renderRows();
    }

    function syncTypeFromTab(btn){
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.dataset.type || 'All';
      if(typeFilter) typeFilter.value = activeTab === 'All' ? 'All' : activeTab;
      applyFilters(true);
    }

    const modal = document.getElementById('sacramentViewModal');
    function openModal(row){
      if(!row) return;
      const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val || ''; };
      set('detailName', row.querySelector('td:nth-child(3) b')?.textContent || '');
      set('detailType', row.dataset.type || '');
      set('detailLocation', row.dataset.location || '');
      set('detailOfficiant', row.dataset.officiant || '');
      modal?.classList.add('show');
    }

    tabs.forEach(btn => btn.addEventListener('click', () => syncTypeFromTab(btn)));
    filterBtn?.addEventListener('click', e => { e.preventDefault(); activeTab='All'; tabs.forEach((b,i)=>b.classList.toggle('active', i===0)); applyFilters(true); });
    [typeFilter, locationFilter, officiantFilter, dateFrom, dateTo].forEach(el => el?.addEventListener('change', () => { activeTab='All'; tabs.forEach((b,i)=>b.classList.toggle('active', i===0)); applyFilters(true); }));
    resetBtn?.addEventListener('click', e => {
      e.preventDefault();
      activeTab='All'; currentPage=1;
      tabs.forEach((b,i)=>b.classList.toggle('active', i===0));
      if(typeFilter) typeFilter.value='All';
      if(locationFilter) locationFilter.value='All Locations';
      if(officiantFilter) officiantFilter.value='All';
      if(dateFrom) dateFrom.value='2025-01-01';
      if(dateTo) dateTo.value='2025-12-31';
      applyFilters(false);
    });
    perPageSelect?.addEventListener('change', () => { currentPage = 1; renderPagination(); });
    listBtn?.addEventListener('click', e => { e.preventDefault(); setView('list'); });
    gridBtn?.addEventListener('click', e => { e.preventDefault(); setView('grid'); });

    document.querySelectorAll('#sacramentTable .eye-btn').forEach(btn => btn.addEventListener('click', () => openModal(btn.closest('tr'))));
    document.querySelectorAll('#sacramentViewModal .close-modal').forEach(btn => btn.addEventListener('click', () => modal?.classList.remove('show')));
    modal?.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });

    document.querySelectorAll('#sacramentTable .kebab').forEach(btn => btn.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      document.querySelectorAll('.row-menu').forEach(m => m.remove());
      const menu = document.createElement('div');
      menu.className = 'row-menu';
      menu.innerHTML = '<button type="button" data-action="view">View</button><button type="button" data-action="edit">Edit</button><button type="button" data-action="delete">Delete</button>';
      document.body.appendChild(menu);
      const r = btn.getBoundingClientRect();
      menu.style.left = (r.right - 124 + window.scrollX) + 'px';
      menu.style.top = (r.bottom + window.scrollY + 6) + 'px';
      menu.addEventListener('click', ev => {
        const action = ev.target.closest('button')?.dataset.action;
        const row = btn.closest('tr');
        if(action === 'view' || action === 'edit') openModal(row);
        if(action === 'delete'){
          row.remove();
          const ix = allRows.indexOf(row); if(ix > -1) allRows.splice(ix, 1);
          applyFilters(false);
        }
        menu.remove();
      });
    }));
    document.addEventListener('click', () => document.querySelectorAll('.row-menu').forEach(m => m.remove()));

    function toast(msg){
      const t=document.createElement('div'); t.className='toast show'; t.textContent=msg;
      document.body.appendChild(t); setTimeout(()=>t.remove(),2200);
    }
    document.getElementById('generateReportBtn')?.addEventListener('click',()=>toast('All Sacraments Report generated successfully'));
    document.querySelector('.sacrament-export')?.addEventListener('click',()=>toast('Sacrament report export started'));
    document.getElementById('downloadRecords')?.addEventListener('click',()=>toast('Records download started'));

    if(listBtn) listBtn.type = 'button';
    if(gridBtn) gridBtn.type = 'button';
    setView('list');
    applyFilters(false);
  });
})();
