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
document.getElementById('resetButton').addEventListener('click', () => {
  checkboxes.forEach((box) => {
    box.checked = false;
    localStorage.removeItem(box.id);
    box.parentElement.classList.remove('checked');
  });

  localStorage.removeItem('bentleyDate');
  localStorage.removeItem('bentleyPoints');
  totalPoints = 0;
  pointsDisplay.textContent = totalPoints;
  document.getElementById('celebration').style.display = 'none';
});
