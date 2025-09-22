const taskList = document.querySelectorAll('input[type="checkbox"]');
const today = new Date().toDateString();
const savedDate = localStorage.getItem('taskDate');

if (savedDate !== today) {
  localStorage.clear();
  localStorage.setItem('taskDate', today);
}

taskList.forEach((checkbox, index) => {
  const saved = localStorage.getItem(`task${index}`);
  checkbox.checked = saved === 'true';

  checkbox.addEventListener('change', () => {
    localStorage.setItem(`task${index}`, checkbox.checked);
  });
});
