const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const today = new Date().toDateString();
const savedDate = localStorage.getItem('isabellaDate');

if (savedDate !== today) {
  localStorage.setItem('isabellaDate', today);
  checkboxes.forEach((box, i) => localStorage.removeItem(`isabella_task${i}`));
}

checkboxes.forEach((box, i) => {
  const saved = localStorage.getItem(`isabella_task${i}`);
  box.checked = saved === 'true';

  // Apply green background if checked
  if (box.checked) {
    box.parentElement.classList.add('checked');
  }

  box.addEventListener('change', () => {
    localStorage.setItem(`isabella_task${i}`, box.checked);
    box.parentElement.classList.toggle('checked', box.checked);
    checkCompletion();
  });
});

function checkCompletion() {
  const allDone = [...checkboxes].every(cb => cb.checked);
  document.getElementById('celebration').style.display = allDone ? 'block' : 'none';
}
