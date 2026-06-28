document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#familyMembersTable tbody');
  const addBtn = document.getElementById('addFamilyMember');
  const resetBtn = document.getElementById('resetFamilyForm');
  const saveBtn = document.getElementById('saveFamilyBtn');
  const form = document.getElementById('familyForm');
  const toast = document.getElementById('familyToast');

  const showToast = (message, type='success') => {
    if (!toast) return;
    toast.querySelector('span').textContent = message;
    toast.style.background = type === 'error' ? '#b42318' : '#006f64';
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  const memberRowTemplate = () => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="row-index"></td>
      <td><div class="member-photo"><i class="fa-regular fa-user"></i></div></td>
      <td><div class="name-pair"><input placeholder="First Name" required><input placeholder="Last Name" required></div></td>
      <td><select required><option>Head</option><option>Spouse</option><option>Child</option><option>Parent</option><option>Guardian</option></select></td>
      <td><select required><option value="">Select</option><option>Male</option><option>Female</option></select></td>
      <td><div class="with-icon compact calendar-field"><input type="date" placeholder="Select date" required><i class="fa-regular fa-calendar"></i></div></td>
      <td><input placeholder="Occupation"></td>
      <td><div class="row-actions"><button class="circle-add" type="button" title="Add member"><i class="fa-solid fa-plus"></i></button><button class="circle-delete" type="button" title="Delete member"><i class="fa-regular fa-trash-can"></i></button></div></td>`;
    return tr;
  };

  const renumberRows = () => {
    tableBody?.querySelectorAll('tr').forEach((tr, i) => {
      const n = tr.querySelector('.row-index');
      if (n) n.textContent = i + 1;
    });
    updateSummary();
  };

  const updateSummary = () => {
    const total = tableBody ? tableBody.querySelectorAll('tr').length : 0;
    const branch = form?.querySelector('[name="branch"]')?.value || '-';
    const cat = form?.querySelector('[name="category"]')?.value || '-';
    const head = form?.querySelector('[name="head"]')?.value?.trim() || 'New Family';
    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    set('sumTotal', total);
    set('sumAdults', Math.max(0, total - 1));
    set('sumChildren', total > 1 ? 1 : 0);
    set('sumBranch', branch);
    set('sumCategory', cat);
    set('summaryTitle', head);
  };

  const clearErrors = () => {
    document.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
    document.querySelectorAll('.input-error-msg').forEach(el => el.remove());
  };
  const markError = (el) => {
    el.classList.add('error-field');
    const field = el.closest('.field') || el.closest('td');
    if (field && !field.querySelector('.input-error-msg')) {
      const msg = document.createElement('div');
      msg.className = 'input-error-msg';
      msg.textContent = 'Required';
      field.appendChild(msg);
    }
  };

  addBtn?.addEventListener('click', () => {
    tableBody.appendChild(memberRowTemplate());
    renumberRows();
  });

  tableBody?.addEventListener('click', (e) => {
    const add = e.target.closest('.circle-add');
    const del = e.target.closest('.circle-delete');
    if (add) {
      tableBody.appendChild(memberRowTemplate());
      renumberRows();
    }
    if (del) {
      if (tableBody.querySelectorAll('tr').length > 1) {
        del.closest('tr').remove();
        renumberRows();
      } else {
        showToast('At least one family member is required', 'error');
      }
    }
  });

  form?.addEventListener('input', updateSummary);
  form?.addEventListener('change', updateSummary);
  tableBody?.addEventListener('input', updateSummary);
  tableBody?.addEventListener('change', updateSummary);

  resetBtn?.addEventListener('click', () => {
    clearErrors();
    form.reset();
    const reg = form.querySelector('[name="registrationDate"]');
    const phone = form.querySelector('[name="phone"]');
    const altPhone = form.querySelector('[name="altPhone"]');
    if (reg) reg.value = '2025-05-18';
    if (phone) phone.value = '98765 43210';
    if (altPhone) altPhone.value = '98765 43211';
    tableBody.innerHTML = '';
    tableBody.appendChild(memberRowTemplate());
    renumberRows();
    showToast('Form reset successfully');
  });

  saveBtn?.addEventListener('click', () => {
    clearErrors();
    let ok = true;
    form.querySelectorAll('[required]').forEach(el => {
      if (!String(el.value || '').trim()) { markError(el); ok = false; }
    });
    tableBody.querySelectorAll('input[required], select[required]').forEach(el => {
      if (!String(el.value || '').trim()) { markError(el); ok = false; }
    });
    if (!ok) {
      showToast('Please fill all mandatory fields', 'error');
      document.querySelector('.error-field')?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    const familyId = 'FAM-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
    const idInput = form.querySelector('[name="familyId"]');
    if (idInput) idInput.value = familyId;
    document.querySelector('.summary-hero span').textContent = 'Saved successfully';
    showToast('Family saved successfully');
  });

  document.querySelectorAll('.doc-row button').forEach(btn => {
    btn.addEventListener('click', () => showToast('Demo download action'));
  });


  document.addEventListener('click', (event) => {
    const icon = event.target.closest('.calendar-field i, .with-icon i.fa-calendar');
    if (!icon) return;
    const input = icon.closest('.with-icon')?.querySelector('input[type="date"]');
    if (!input) return;
    if (typeof input.showPicker === 'function') input.showPicker();
    else input.focus();
  });

  document.querySelectorAll('.phone-box input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9\s-]/g, '').replace(/\s{2,}/g, ' ').slice(0, 15);
    });
  });

  updateSummary();
});
