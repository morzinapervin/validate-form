
// Profile Picture upload
const profilePicInput = document.getElementById('profile-pic-input');
const profilePic = document.getElementById('profile-pic');
profilePicInput.addEventListener('change', function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    profilePic.src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

// Username edit/save
const displayUsername = document.getElementById('display-username');
const usernameInput = document.getElementById('username-input');
const editUsernameBtn = document.getElementById('edit-username-btn');
const saveUsernameBtn = document.getElementById('save-username-btn');

editUsernameBtn.addEventListener('click', function () {
  usernameInput.style.display = 'block';
  usernameInput.value = displayUsername.innerText;
  displayUsername.style.display = 'none';
  editUsernameBtn.style.display = 'none';
  saveUsernameBtn.style.display = 'inline-block';
});

saveUsernameBtn.addEventListener('click', function () {
  if (usernameInput.value.trim() === "") {
    alert("Username cannot be empty");
  } else {
    displayUsername.innerText = usernameInput.value;
    displayUsername.style.display = 'block';
    usernameInput.style.display = 'none';
    editUsernameBtn.style.display = 'inline-block';
    saveUsernameBtn.style.display = 'none';
  }
});
