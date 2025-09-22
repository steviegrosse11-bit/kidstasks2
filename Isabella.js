document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const pointsDisplay = document.getElementById('pointsTotal');
  const resetButton = document.getElementById('resetButton');
  const spendButton = document.getElementById('spendButton');
  const spendInput = document.getElementById('spendInput');
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('isabellaDate');
  let totalPoints = parseInt(localStorage.getItem('isabellaPoints')) || 0;

  // Show current total
  pointsDisplay.textContent = totalPoints;

  // Custom points per task
  const taskPoints = {
    btask1: 1, // Make your bed
    btask2: 2, // Brush your teeth
    btask3: 3, // Hoover or sweep hallway/frontroom/landing and bedrooms
    btask5: 2  // Brush your hair
  };

  // Reset daily checkboxes if it's a new day
  if (savedDate !== today) {
    localStorage.setItem('isabellaDate', today);
    checkboxes.forEach((box) => {
      localStorage.removeItem(box.id);
      box.checked = false;
      box.parentElement.classList.remove('checked');
    });
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
        localStorage.setItem('bentleyPoints', totalPoints);
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

    localStorage.removeItem('isabellaDate');
    localStorage.removeItem('isabellaPoints');
    totalPoints = 0;
    pointsDisplay.textContent = totalPoints;
    document.getElementById('celebration').style.display = 'none';
  });

  // Spend points logic
  spendButton.addEventListener('click', () => {
    const spendAmount = parseInt(spendInput.value);

    if (isNaN(spendAmount) || spendAmount <= 0) {
      alert("Please enter a valid number of points to spend.");
      return;
    }

    if (totalPoints >= spendAmount) {
      totalPoints -= spendAmount;
      localStorage.setItem('isabellaPoints', totalPoints);
      pointsDisplay.textContent = totalPoints;
      spendInput.value = '';
    } else {
      alert("Not enough points to spend.");
    }
  });

  function checkCompletion() {
    const allDone = [...checkboxes].every(cb => cb.checked);
    document.getElementById('celebration').style.display = allDone ? 'block' : 'none';
  }
});
