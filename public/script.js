const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');

avatar.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatar.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.sidebar li');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');
    const id = item.getAttribute('data-section');
    sections.forEach((sec) => {
      sec.classList.toggle('active', sec.id === id);
    });
  });
});
