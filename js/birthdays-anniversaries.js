document.addEventListener('DOMContentLoaded', function(){
  const panel = document.querySelector('.ba-panel');
  if (!panel) return;

  const tabs = [...document.querySelectorAll('.ba-tab')];
  const locationSelect = document.getElementById('baLocation');
  const yearsSelect = document.getElementById('baYears');
  const ageSelect = document.getElementById('baAge');
  const viewSelect = document.getElementById('baView');
  const resetButton = document.querySelector('.ba-reset');
  const dateButton = document.getElementById('baDateRange');
  const dateText = dateButton?.querySelector('span');
  const birthdayRows = [...document.querySelectorAll('.birthday-table tbody tr')];
  const anniversaryRows = [...document.querySelectorAll('.anniversary-table tbody tr')];
  let currentView = 'birthdays';
  let currentDateRange = 'upcoming';

  const dateRanges = [
    { key: 'upcoming', label: 'Upcoming 30 Days' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' }
  ];

  function getRows(){
    return currentView === 'anniversaries' ? anniversaryRows : birthdayRows;
  }

  function parseRowMonth(row){
    const month = row.querySelector('.ba-date b')?.textContent?.trim().toLowerCase() || '';
    return month;
  }

  function inYearRange(value, range){
    const years = Number(value || 0);
    if (range === '1 - 10 Years') return years <= 10;
    if (range === '11 - 20 Years') return years >= 11 && years <= 20;
    if (range === '21 - 30 Years') return years >= 21 && years <= 30;
    if (range === '31+ Years') return years >= 31;
    return true;
  }

  function inDateRange(row){
    if (currentDateRange === 'upcoming' || currentDateRange === 'year') return true;
    if (currentDateRange === 'month') return parseRowMonth(row) === 'may';
    return true;
  }

  function setEmptyState(tableSelector, show){
    const tbody = document.querySelector(`${tableSelector} tbody`);
    if (!tbody) return;
    let empty = tbody.querySelector('.ba-empty-row');
    if (show && !empty) {
      empty = document.createElement('tr');
      empty.className = 'ba-empty-row';
      empty.innerHTML = '<td colspan="8">No records found for the selected filters.</td>';
      tbody.appendChild(empty);
    }
    if (empty) empty.style.display = show ? '' : 'none';
  }

  function updateCountText(){
    const visibleBirthdayCount = birthdayRows.filter(row => !row.classList.contains('hide')).length;
    const visibleAnniversaryCount = anniversaryRows.filter(row => !row.classList.contains('hide')).length;
    const info = document.querySelector('.ba-pagination > span');
    if (info) {
      if (currentView === 'birthdays') info.textContent = `Showing ${visibleBirthdayCount} birthday records`;
      else info.textContent = `Showing ${visibleAnniversaryCount} anniversary records`;
    }
  }

  function applyFilters(){
    const locationValue = locationSelect?.value || 'All Locations';
    const ageValue = ageSelect?.value || 'All';
    const yearsValue = yearsSelect?.value || 'All';

    birthdayRows.forEach(row => {
      let show = currentView === 'birthdays';
      show = show && (locationValue === 'All Locations' || row.dataset.location === locationValue);
      show = show && (ageValue === 'All' || row.dataset.age === ageValue);
      show = show && inDateRange(row);
      row.classList.toggle('hide', !show);
    });

    anniversaryRows.forEach(row => {
      let show = currentView === 'anniversaries';
      show = show && (locationValue === 'All Locations' || row.dataset.location === locationValue);
      show = show && inYearRange(row.dataset.years, yearsValue);
      show = show && inDateRange(row);
      row.classList.toggle('hide', !show);
    });

    setEmptyState('.birthday-table', currentView === 'birthdays' && birthdayRows.every(row => row.classList.contains('hide')));
    setEmptyState('.anniversary-table', currentView === 'anniversaries' && anniversaryRows.every(row => row.classList.contains('hide')));
    updateCountText();
  }

  function setTab(view, shouldScroll = false){
    currentView = view === 'anniversaries' ? 'anniversaries' : 'birthdays';
    tabs.forEach(tab => {
      const active = tab.dataset.view === currentView;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panel.classList.toggle('show-birthdays', currentView === 'birthdays');
    panel.classList.toggle('show-anniversaries', currentView === 'anniversaries');
    if (shouldScroll) {
      const target = currentView === 'birthdays' ? document.getElementById('birthdayTable') : document.getElementById('anniversaryTable');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    applyFilters();
  }

  function buildDateMenu(){
    if (!dateButton || document.querySelector('.ba-date-menu')) return;
    const menu = document.createElement('div');
    menu.className = 'ba-date-menu';
    dateRanges.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.range = item.key;
      button.innerHTML = `<span>${item.label}</span>${item.key === currentDateRange ? '<i class="fa-solid fa-check"></i>' : ''}`;
      button.addEventListener('click', () => {
        currentDateRange = item.key;
        if (dateText) dateText.textContent = item.label;
        if (viewSelect) viewSelect.value = item.label;
        menu.classList.remove('show');
        dateButton.setAttribute('aria-expanded', 'false');
        buildDateMenuButtons(menu);
        applyFilters();
      });
      menu.appendChild(button);
    });
    document.body.appendChild(menu);
  }

  function buildDateMenuButtons(menu){
    menu.querySelectorAll('button').forEach(button => {
      const active = button.dataset.range === currentDateRange;
      button.classList.toggle('active', active);
      button.innerHTML = `<span>${dateRanges.find(item => item.key === button.dataset.range)?.label || button.textContent}</span>${active ? '<i class="fa-solid fa-check"></i>' : ''}`;
    });
  }

  function positionDateMenu(){
    const menu = document.querySelector('.ba-date-menu');
    if (!dateButton || !menu) return;
    const rect = dateButton.getBoundingClientRect();
    menu.style.left = `${rect.left + window.scrollX}px`;
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.width = `${Math.max(rect.width, 220)}px`;
  }

  tabs.forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.addEventListener('click', () => setTab(tab.dataset.view, false));
  });

  [locationSelect, yearsSelect, ageSelect].forEach(control => {
    control?.addEventListener('change', applyFilters);
  });

  viewSelect?.addEventListener('change', () => {
    const selected = dateRanges.find(item => item.label === viewSelect.value);
    if (selected) {
      currentDateRange = selected.key;
      if (dateText) dateText.textContent = selected.label;
      buildDateMenuButtons(document.querySelector('.ba-date-menu'));
    }
    applyFilters();
  });

  dateButton?.addEventListener('click', event => {
    event.stopPropagation();
    buildDateMenu();
    const menu = document.querySelector('.ba-date-menu');
    positionDateMenu();
    menu?.classList.toggle('show');
    dateButton.setAttribute('aria-expanded', menu?.classList.contains('show') ? 'true' : 'false');
  });

  document.addEventListener('click', event => {
    const menu = document.querySelector('.ba-date-menu');
    if (menu && !menu.contains(event.target) && !dateButton?.contains(event.target)) {
      menu.classList.remove('show');
      dateButton?.setAttribute('aria-expanded', 'false');
    }
  });

  window.addEventListener('resize', positionDateMenu);
  window.addEventListener('scroll', () => {
    const menu = document.querySelector('.ba-date-menu.show');
    if (menu) positionDateMenu();
  }, true);

  resetButton?.addEventListener('click', () => {
    if (locationSelect) locationSelect.value = 'All Locations';
    if (yearsSelect) yearsSelect.value = 'All';
    if (ageSelect) ageSelect.value = 'All';
    if (viewSelect) viewSelect.value = 'Upcoming 30 Days';
    currentDateRange = 'upcoming';
    if (dateText) dateText.textContent = 'Upcoming 30 Days';
    applyFilters();
  });

  document.querySelectorAll('.ba-stat-content a').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href') || '';
      if (href.includes('anniversary')) setTab('anniversaries', true);
      if (href.includes('birthday')) setTab('birthdays', true);
    });
  });

  document.querySelectorAll('.eye-action').forEach(btn => btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    if (!row || row.classList.contains('ba-empty-row')) return;
    let title = 'Details';
    let content = '';
    if (row.dataset.type === 'birthday') {
      title = 'Birthday Details';
      const name = row.querySelector('.person-cell b')?.textContent || '';
      const ageVal = row.children[2]?.textContent || '';
      const loc = row.children[4]?.textContent || '';
      content = `<strong>${name}</strong><br>Age: ${ageVal}<br>${loc}`;
    } else {
      title = 'Anniversary Details';
      const name = row.querySelector('.couple-cell b')?.textContent || '';
      const yearsVal = row.children[3]?.textContent || '';
      const loc = row.children[4]?.textContent || '';
      content = `<strong>${name}</strong><br>${yearsVal} years of marriage<br>${loc}`;
    }
    const modal = document.getElementById('baViewModal');
    const head = modal?.querySelector('.modal-head h2');
    if (head) head.textContent = title;
    const modalText = document.getElementById('baModalText');
    if (modalText) modalText.innerHTML = content;
    modal?.classList.add('show');
  }));

  let moreMenu = document.querySelector('.more-menu');
  if (!moreMenu) {
    moreMenu = document.createElement('div');
    moreMenu.className = 'more-menu';
    moreMenu.innerHTML = '<button type="button" data-action="edit"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-action="message"><i class="fa-regular fa-message"></i>Send Greeting</button><button type="button" data-action="delete"><i class="fa-regular fa-trash-can"></i>Delete</button>';
    document.body.appendChild(moreMenu);
  }

  document.querySelectorAll('.more-action').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const rect = button.getBoundingClientRect();
      moreMenu.style.left = `${rect.left + window.scrollX - 110}px`;
      moreMenu.style.top = `${rect.bottom + window.scrollY + 4}px`;
      moreMenu.classList.toggle('show');
    });
  });

  moreMenu.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (!action) return;
    moreMenu.classList.remove('show');
    alert(action === 'message' ? 'Greeting action ready.' : `${action.charAt(0).toUpperCase() + action.slice(1)} action ready.`);
  });

  document.addEventListener('click', event => {
    if (!moreMenu.contains(event.target)) moreMenu.classList.remove('show');
  });

  document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => btn.closest('.modal')?.classList.remove('show')));
  document.querySelector('.export-btn')?.addEventListener('click', () => alert('Birthdays & anniversaries exported successfully.'));
  document.querySelector('.filter-open')?.addEventListener('click', () => document.querySelector('.ba-filter-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  document.querySelectorAll('.ba-view-all').forEach(btn => btn.addEventListener('click', () => alert(btn.textContent.trim())));

  setTab('birthdays', false);
});


/* Top filter and tab fallback fix - merged */
document.addEventListener('DOMContentLoaded', function(){
  const panel=document.querySelector('.ba-panel');
  if(!panel) return;
  const filterRow=document.querySelector('.ba-filter-row') || document.querySelector('.ba-filters') || document.querySelector('.filter-section');
  const filterBtn=document.querySelector('.filter-open') || Array.from(document.querySelectorAll('.page-actions button,.page-actions a')).find(el=>/filter/i.test(el.textContent||''));
  filterBtn?.addEventListener('click', function(e){
    e.preventDefault();
    panel.classList.toggle('filters-open');
    if(filterRow){ filterRow.classList.add('highlight-filter'); filterRow.scrollIntoView({behavior:'smooth',block:'center'}); setTimeout(()=>filterRow.classList.remove('highlight-filter'),900); }
    document.getElementById('baLocation')?.focus({preventScroll:true});
  });
  const birthdaySection=document.getElementById('birthdayTable');
  const anniversarySection=document.getElementById('anniversaryTable');
  function showTab(view){
    const isAnn=view==='anniversaries';
    document.querySelectorAll('.ba-tab').forEach(t=>{
      const active=(t.dataset.view||'birthdays')===(isAnn?'anniversaries':'birthdays');
      t.classList.toggle('active', active); t.setAttribute('aria-selected', active?'true':'false');
    });
    if(birthdaySection) birthdaySection.style.display=isAnn?'none':'';
    if(anniversarySection) anniversarySection.style.display=isAnn?'':'none';
    panel.classList.toggle('show-birthdays',!isAnn);
    panel.classList.toggle('show-anniversaries',isAnn);
  }
  document.querySelectorAll('.ba-tab').forEach(tab=>tab.addEventListener('click',()=>showTab(tab.dataset.view)));
  const active=document.querySelector('.ba-tab.active')?.dataset.view || 'birthdays';
  showTab(active);
});
