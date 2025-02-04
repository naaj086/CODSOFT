
function updateClock(clockId, offset) {
    const clock = document.getElementById(clockId);
    const timeElement = clock.querySelector('.time');
    const dateElement = clock.querySelector('.date');
    const dayElement = clock.querySelector('.day');

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    const newTime = new Date(utc + 3600000 * offset); // Apply offset

    // Convert to 12-hour format and add AM/PM
    let hours = newTime.getHours();
    const minutes = newTime.getMinutes().toString().padStart(2, '0');
    const seconds = newTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = hours.toString().padStart(2, '0');

    const day = newTime.getDate().toString().padStart(2, '0');
    const month = (newTime.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = newTime.getFullYear();
    const weekday = newTime.toLocaleDateString('en-US', { weekday: 'long' });

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    dateElement.textContent = `${day}/${month}/${year}`;
    dayElement.textContent = weekday;
  }

  function updateClocks() {
    const country1Offset = parseFloat(document.getElementById('country1').value);
    const country2Offset = parseFloat(document.getElementById('country2').value);
    updateClock('clock1', country1Offset);
    updateClock('clock2', country2Offset);
  }

  // Update clocks every second
  setInterval(updateClocks, 1000);

  // Initial call to display clocks immediately
  updateClocks();

  // Add event listeners to dropdowns
  document.getElementById('country1').addEventListener('change', updateClocks);
  document.getElementById('country2').addEventListener('change', updateClocks);
