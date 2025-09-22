const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const today = new Date().toDateString();
const savedDate = localStorage.getItem('bentleyDate');

if (savedDate !== today) {
  localStorage.setItem('bentleyDate', today);
  checkboxes.forEach((box, i) => localStorage.removeItem(`bentley_task${i}`));
}

checkboxes.forEach((box, i) => {
  const saved = localStorage.getItem(`bentley_task${i}`);
  box.checked = saved === 'true';

  // Apply green background if checked
  if (box.checked) {
    box.parentElement.classList.add('checked');
  }

  box.addEventListener('change', () => {
    localStorage.setItem(`bentley_task${i}`, box.checked);
    box.parentElement.classList.toggle('checked', box.checked);
    checkCompletion();
  });
});

function checkCompletion() {
  const allDone = [...checkboxes].every(cb => cb.checked);
  document.getElementById('celebration').style.display = allDone ? 'block' : 'none';
}
