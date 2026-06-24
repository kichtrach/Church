document.addEventListener('DOMContentLoaded', () => {
  const roleButtons = document.querySelectorAll('.role-card');
  const selectedRole = document.getElementById('selectedRole');
  const form = document.getElementById('signupForm');
  const toast = document.getElementById('signupToast');

  roleButtons.forEach((card) => {
    card.addEventListener('click', () => {
      roleButtons.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      selectedRole.value = card.dataset.role || '';
    });
  });

  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      const icon = button.querySelector('i');
      if (!target) return;
      const isPassword = target.type === 'password';
      target.type = isPassword ? 'text' : 'password';
      icon.className = isPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
    });
  });

  function markInvalid(input, invalid) {
    const field = input.closest('.field');
    if (field) field.classList.toggle('invalid', invalid);
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      const fullName = form.elements.fullName;
      const email = form.elements.email;
      const phone = form.elements.phone;
      const password = form.elements.password;
      const confirmPassword = form.elements.confirmPassword;
      const parish = form.elements.parish;
      const terms = form.elements.terms;
      const termsError = document.querySelector('.terms-error');

      [fullName, email, phone, password, confirmPassword, parish].forEach((input) => markInvalid(input, false));

      if (!fullName.value.trim()) { markInvalid(fullName, true); valid = false; }
      if (!email.validity.valid) { markInvalid(email, true); valid = false; }
      if (!phone.value.trim()) { markInvalid(phone, true); valid = false; }
      if (password.value.length < 8) { markInvalid(password, true); valid = false; }
      if (confirmPassword.value !== password.value || !confirmPassword.value) { markInvalid(confirmPassword, true); valid = false; }
      if (!parish.value) { markInvalid(parish, true); valid = false; }
      termsError.classList.toggle('show', !terms.checked);
      if (!terms.checked) valid = false;

      if (!valid) return;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    });
  }
});
