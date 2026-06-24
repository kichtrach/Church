(function(){
  const form = document.getElementById('forgotPasswordForm');
  const toast = document.getElementById('forgotToast');
  if(!form) return;

  const showToast = () => {
    if(!toast) return;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailField = form.querySelector('input[name="email"]');
    const wrapper = emailField.closest('.forgot-field');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
    wrapper.classList.toggle('invalid', !valid);
    if(valid){
      showToast();
      emailField.blur();
    }else{
      emailField.focus();
    }
  });
})();
