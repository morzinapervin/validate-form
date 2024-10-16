
const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const phone_input = document.getElementById('phone-input');
const dob_input = document.getElementById('dob');
const error_message = document.getElementById('error-message');
const reviewName = document.getElementById('review-name');
const reviewContact = document.getElementById('review-contact');
const reviewDob = document.getElementById('review-dob');
const reviewContactLabel = document.getElementById('review-contact-label');
let useEmail = true;

// Listen for input changes
const allInputs = [firstname_input, email_input, dob_input, phone_input].filter(input => input != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = ''; // Clear error message when input changes
    }
  });
});

// Validation function for Step 1
function validateStep1() {
  let errors = getSignupFormErrors(firstname_input.value, dob_input.value);

  // Check either email or phone depending on the current input state
  if (useEmail) {
    errors = errors.concat(validateEmail(email_input.value));
  } else {
    errors = errors.concat(validatePhone(phone_input.value));
  }

  // Clear previous errors
  error_message.innerText = '';

  // Display errors if they exist
  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
    return; // Stop the form from moving to the next step
  }

  nextStep(2); 
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission for validation
  validateStep1(); // Perform step 1 validation
});

// Validation for Name and Date of Birth
function getSignupFormErrors(firstname, dob) {
  let errors = [];

  // Name validation
  if (firstname === '' || firstname == null) {
    errors.push('Name is required');
    firstname_input.parentElement.classList.add('incorrect');
  } else {
    firstname_input.parentElement.classList.remove('incorrect');
  }

  // Date of birth validation
  if (dob === '' || dob == null) {
    errors.push('Date of Birth is required');
    dob_input.parentElement.classList.add('incorrect');
  } else {
    dob_input.parentElement.classList.remove('incorrect');
  }

  return errors;
}

// Email validation
function validateEmail(email) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
  } else if (!email.includes('@')) {
    errors.push('Email must contain @');
  } else {
    let emailParts = email.split('@');
    if (emailParts.length < 2 || emailParts[1].trim() === '') {
      errors.push('Please enter a part following "@". Email is incomplete');
    }
  }

  return errors;
}

// Phone validation
function validatePhone(phone) {
  let errors = [];

  if (phone === '' || phone == null) {
    errors.push('Phone number is required');
    phone_input.parentElement.classList.add('incorrect');
  } else if (!/^\d{10}$/.test(phone)) {
    errors.push('Phone number must be a 10-digit number');
    phone_input.parentElement.classList.add('incorrect');
  } else {
    phone_input.parentElement.classList.remove('incorrect');
  }

  return errors;
}

// Toggle between email and phone input
function toggleInput() {
  const emailInput = document.getElementById('email-input');
  const phoneInput = document.getElementById('phone-input');
  const toggleField = document.getElementById('toggle-field');

  if (useEmail) {
    emailInput.classList.add('hidden');
    emailInput.removeAttribute('required');
    phoneInput.classList.remove('hidden');
    phoneInput.setAttribute('required', 'true');
    toggleField.innerText = "Use email instead";
  } else {
    phoneInput.classList.add('hidden');
    phoneInput.removeAttribute('required');
    emailInput.classList.remove('hidden');
    emailInput.setAttribute('required', 'true');
    toggleField.innerText = "Use phone instead";
  }

  useEmail = !useEmail; // Toggle the state
}

// Function to set the active step in the stepper
function setActiveStep(step) {
  const stepperCells = document.querySelectorAll('.fp-stepper-cell');
  
  // Remove 'active' class from all cells
  stepperCells.forEach(cell => {
    cell.classList.remove('active');
  });

  // Add 'active' class to the current step
  if (step >= 1 && step <= stepperCells.length) {
    stepperCells[step - 1].classList.add('active');
  }
}
function populateReviewForm() {

  // Populate the values in Step 2
  reviewName.value = firstname_input.value;
  reviewContact.value = useEmail ? email_input.value : phone_input.value;
  reviewDob.value = dob_input.value;

  // Dynamically update the label based on whether the user is using email or phone
  reviewContactLabel.innerText = useEmail ? 'Email' : 'Phone';
}

// Function to handle the transition to the next step
function nextStep(step) {
  // Hide all steps and show the selected step
  document.querySelectorAll('.step').forEach(stepDiv => {
    stepDiv.classList.add('hidden');
  });
  document.getElementById('step-' + step).classList.remove('hidden');

  // Populate review form on Step 2
  if (step === 2) {
    populateReviewForm();
  }

  // Dynamically update the verification message on Step 3
  if (step === 3) {
    const verificationMessage = document.getElementById('verification-message');
    if (verificationMessage) {
      console.log("Found verification message element.");
      verificationMessage.innerText = useEmail
        ? 'We sent a code to your email. Please enter it below.'
        : 'We sent a code to your phone. Please enter it below.';
    } else {
      console.log("Verification message element not found.");
    }
  }

  // Sync the stepper
  setActiveStep(step);
}

// Go back to previous step
function prevStep(step) {
  // Hide all steps and show the selected step
  document.querySelectorAll('.step').forEach(stepDiv => {
    stepDiv.classList.add('hidden');
  });
  document.getElementById('step-' + step).classList.remove('hidden');

  // Sync the stepper
  setActiveStep(step);
}




// For verification code validation
let sentCode = '123456'; // This should be the code generated and sent to the user

function validateVerificationCode() {
  const enteredCode = document.getElementById('verification-code').value;
  const errorMessage = document.getElementById('verificaion-error-message');

  // Reset the error message before each validation attempt
  errorMessage.innerText = '';

  // Check if the input is empty
  if (enteredCode === '') {
    errorMessage.innerText = 'Verification code cannot be empty.';
    return;
  }

  // Check if the code matches
  if (enteredCode !== sentCode) {
    errorMessage.innerText = 'Incorrect verification code. Please try again.';
    return;
  }

  // If validation passes, clear error message and move to the next step
  errorMessage.innerText = ''; 
  nextStep(4);
}

// For password  validation
function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordErrorMessage = document.getElementById('password-error-message');

  // Reset the error message before each validation attempt
  passwordErrorMessage.innerText = '';

  // Check if the password is empty
  if (password === '') {
    passwordErrorMessage.innerText = 'Password cannot be empty.';
    return;
  }

  // Check if the password is less than 8 characters
  if (password.length < 8) {
    passwordErrorMessage.innerText = 'Password must be at least 8 characters long.';
    return;
  }

  // If validation passes, clear the error message and finish signup
  passwordErrorMessage.innerText = '';
  finishSignup(); // Proceed to the next action (e.g., redirect or close form)
}








function finishSignup() {
  window.location.href = 'profile.html'; 
}


// JavaScript for populating the Date of Birth fields dynamically
window.onload = function () {
  populateDOB();
};

function populateDOB() {
  const daySelect = document.getElementById('dob-day');
  const monthSelect = document.getElementById('dob-month');
  const yearSelect = document.getElementById('dob-year');

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    daySelect.appendChild(option);
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.text = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 100; i <= currentYear; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
  }
}





// =========================================for login page
function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}





    
