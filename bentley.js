document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const pointsDisplay = document.getElementById('pointsTotal');
  const resetButton = document.getElementById('resetButton');
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('taskDate');
  let totalPoints = parseInt(localStorage.getItem('taskPoints')) || 0;

  // Show current total
  pointsDisplay.textContent = totalPoints;

  // Basic points per task (can be customized)
  const taskPoints = {
    task1: 1,
    task2: 2,
    task3: 3,
    task4: 1,
    task5: 2,
    bonus1: 4,
    bonus2: 5,
    bonus3: 6
  };

  // Reset daily checkboxes if it's a new day
  if (savedDate !== today) {
    localStorage.setItem('taskDate', today);
    checkboxes.forEach((box) => {
      localStorage.removeItem(box.id);
      box.checked = false;
      box.parentElement.classList.remove('checked');
    });
    localStorage.setItem('taskPoints', 0);
    totalPoints = 0;
    pointsDisplay.textContent = totalPoints;
  }

  // Load checkbox states and apply styling
  checkboxes.forEach((box) => {
    const saved = localStorage.getItem(box.id);
    box.checked = saved === 'true';

    if (box.checked) {
      box.parentElement.classList.add('checked');
    }

    box.addEventListener('change', () => {
      const alreadyScored = localStorage.getItem(box.id) === 'true';

      if (box.checked && !alreadyScored) {
        const pointsForTask = taskPoints[box.id] || 1;
        totalPoints += pointsForTask;
        localStorage.setItem('taskPoints', totalPoints);
        pointsDisplay.textContent = totalPoints;
      }

      localStorage.setItem(box.id, box.checked);
      box.parentElement.classList.toggle('checked', box.checked);
      checkCompletion();
    });
  });

  // Reset button logic
  resetButton.addEventListener('click', () => {
    checkboxes.forEach((box) => {
      box.checked = false;
      localStorage.removeItem(box.id);
      box.parentElement.classList.remove('checked');
    });

    localStorage.removeItem('taskDate');
    localStorage.removeItem('taskPoints');
    totalPoints = 0;
    pointsDisplay.textContent = totalPoints;
    document.getElementById('celebration').style.display = 'none';
  });

  function checkCompletion() {
    const allDone = [...checkboxes].every(cb => cb.checked);
    document.getElementById('celebration').style.display = allDone ? 'block' : 'none';
  }
});
