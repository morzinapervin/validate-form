// Profile picture upload functionality
const profilePicInput = document.getElementById('profile-pic-input');
const profilePic = document.getElementById('profile-pic');

profilePic.addEventListener('click', () => {
  profilePicInput.click(); // Trigger file input click when image is clicked
});

profilePicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profilePic.src = e.target.result; // Set profile pic to uploaded image
    }
    reader.readAsDataURL(file);
  }
});

// Save profile functionality (for demo)
document.getElementById('save-btn').addEventListener('click', () => {
    openUsernamePopup()
//   window.location.href = '#'; 
});

/// Open username popup
function openUsernamePopup() {
    const usernamePopup = document.getElementById('username-popup');
    usernamePopup.classList.remove('hidden'); // This should show the popup
   
    const userpicPopup = document.getElementById('userpic-popup');
    userpicPopup.classList.add('hidden'); // This should show the popup
  }
  


//   For username validation
function validateUsername() {
    const username = document.getElementById('username-input').value;
    const usernameErrorMessage = document.getElementById('username-error-message');
  
    // Reset the error message before each validation attempt
    usernameErrorMessage.innerText = '';
  
    // Check if the username is empty
    if (username === '') {
      usernameErrorMessage.innerText = 'Username cannot be empty.';
      return;
    }
  
    // If validation passes, clear the error message and proceed to the next step
    usernameErrorMessage.innerText = '';
    finishProfileSetup(); // Proceed with the profile setup
  }

  
  // Finish profile setup (navigate to dashboard)
  function finishProfileSetup() {
    const username = document.getElementById('username-input').value;
    if (username.trim()) {
      alert(`This is a temporary popup. 
        Welcome, ${username}! Your profile is now set up. 
        This will lead to WIC Family`);
      // You can now redirect the user to the dashboard or homepage
      window.location.href = 'signup.html'; // Redirect to dashboard after username is set
    } else {
      alert('Please enter a valid username.');
    }
  }
  