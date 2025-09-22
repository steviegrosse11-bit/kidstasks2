document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const pointsDisplay = document.getElementById('pointsTotal');
  const resetButton = document.getElementById('resetButton');
  const spendButton = document.getElementById('spendButton');
  const spendInput = document.getElementById('spendInput');
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('bentleyDate');
  let totalPoints = parseInt(localStorage.getItem('bentleyPoints')) || 0;

  pointsDisplay.textContent = totalPoints;

  const taskPoints = {
    btask1: 1,
    btask2: 2,
    btask3: 3,
    btask4: 1,
    btask5: 2,
    itaskBonus1: 4,
    itaskBonus2: 5,
    itaskBonus3: 6
  };

  if (savedDate !== today) {
    localStorage.setItem('bentleyDate', today);
    checkboxes.forEach((box) => {
      localStorage.removeItem(box.id);
      box.checked = false;
      box.parentElement.classList.remove('checked');
    });
  }

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

        // 🎉 Confetti burst
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      localStorage.setItem(box.id, box.checked);
      box.parentElement.classList.toggle('checked', box.checked);
      checkCompletion();
    });
  });

  resetButton.addEventListener('click', () => {
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

  spendButton.addEventListener('click', () => {
    const spendAmount = parseInt(spendInput.value);

    if (isNaN(spendAmount) || spendAmount <= 0) {
      alert("Please enter a valid number of points to spend.");
      return;
    }

    if (totalPoints >= spendAmount) {
      totalPoints -= spendAmount;
      localStorage.setItem('bentleyPoints', totalPoints);
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
