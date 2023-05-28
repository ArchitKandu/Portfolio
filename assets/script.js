const checkbox = document.getElementById('check');
const menuOpen = document.getElementById('open');

// Function to handle the checkbox state change
function handleCheckboxChange() {
    if (checkbox.checked) {
      menuOpen.style.display = 'none';
    } else {
      menuOpen.style.display = 'block';
    }
}

// Function to check the screen width and show/hide elements accordingly
function checkScreenWidth() {
    const screenWidth = window.innerWidth;    
    if (screenWidth <= 535) {
      checkbox.addEventListener('change', handleCheckboxChange);
      menuOpen.style.display = 'block';
    } else {
      checkbox.style.display = 'none';
      menuOpen.style.display = 'none';
      checkbox.removeEventListener('change', handleCheckboxChange);
    }
}  
// Call the function on page load and whenever the window is resized
window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);  