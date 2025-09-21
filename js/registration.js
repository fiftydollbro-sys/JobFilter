// Default selection
selectRole('employee');

function selectRole(role) {
    document.getElementById('role').value = role;

    const employeeCard = document.getElementById('employeeCard');
    const employerCard = document.getElementById('employerCard');
    const employeeFields = document.getElementById('employeeFields');
    const employerFields = document.getElementById('employerFields');

    if (role === 'employee') {
        employeeCard.classList.add('selected');
        employerCard.classList.remove('selected');
        employeeFields.style.display = 'block';
        employerFields.style.display = 'none';

        clearEmployerValidation();
    } else {
        employerCard.classList.add('selected');
        employeeCard.classList.remove('selected');
        employerFields.style.display = 'block';
        employeeFields.style.display = 'none';

        clearEmployeeValidation();
    }
}

// Clear validation styles for employer fields
function clearEmployerValidation() {
    const employerFields = ['companyName', 'companyRegNumber', 'companyAddress', 'companyPhone', 'companyLinkedIn'];
    employerFields.forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('is-invalid');
    });
}

// Clear validation styles for employee fields
function clearEmployeeValidation() {
    const employeeFields = ['jobTitle', 'employeePhone', 'dob', 'bio', 'resume'];
    employeeFields.forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('is-invalid');
    });
}

// Form validation on submit
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const role = document.getElementById('role').value;
    let isValid = true;

    // Common fields
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!fullname.value.trim()) {
        fullname.classList.add('is-invalid');
        isValid = false;
    } else {
        fullname.classList.remove('is-invalid');
    }

    if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (!password.value.trim()) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    if (role === 'employee') {
        const employeePhone = document.getElementById('employeePhone');
        const dob = document.getElementById('dob');
        const resume = document.getElementById('resume');

        // Phone required & valid
        if (!validatePhone(employeePhone.value)) {
            employeePhone.classList.add('is-invalid');
            isValid = false;
        } else {
            employeePhone.classList.remove('is-invalid');
        }

        // DOB required and should be in the past
        if (!dob.value || new Date(dob.value) >= new Date()) {
            dob.classList.add('is-invalid');
            isValid = false;
        } else {
            dob.classList.remove('is-invalid');
        }

        // Resume required and file type check
        if (resume.files.length === 0) {
            resume.classList.add('is-invalid');
            isValid = false;
        } else {
            const allowedExtensions = ['pdf', 'doc', 'docx'];
            const fileName = resume.files[0].name.toLowerCase();
            const extension = fileName.split('.').pop();
            if (!allowedExtensions.includes(extension)) {
                resume.classList.add('is-invalid');
                isValid = false;
            } else {
                resume.classList.remove('is-invalid');
            }
        }

        // jobTitle and bio are optional, no validation required

    } else if (role === 'employer') {
        const companyName = document.getElementById('companyName');
        const companyRegNumber = document.getElementById('companyRegNumber');
        const companyAddress = document.getElementById('companyAddress');
        const companyPhone = document.getElementById('companyPhone');
        const companyLinkedIn = document.getElementById('companyLinkedIn');

        if (!companyName.value.trim()) {
            companyName.classList.add('is-invalid');
            isValid = false;
        } else {
            companyName.classList.remove('is-invalid');
        }

        if (!companyRegNumber.value.trim()) {
            companyRegNumber.classList.add('is-invalid');
            isValid = false;
        } else {
            companyRegNumber.classList.remove('is-invalid');
        }

        if (!companyAddress.value.trim()) {
            companyAddress.classList.add('is-invalid');
            isValid = false;
        } else {
            companyAddress.classList.remove('is-invalid');
        }

        if (!validatePhone(companyPhone.value)) {
            companyPhone.classList.add('is-invalid');
            isValid = false;
        } else {
            companyPhone.classList.remove('is-invalid');
        }

        if (companyLinkedIn.value.trim() && !validateURL(companyLinkedIn.value)) {
            companyLinkedIn.classList.add('is-invalid');
            isValid = false;
        } else {
            companyLinkedIn.classList.remove('is-invalid');
        }
    }

    if (isValid) {
        alert('Registration successful!');
        this.reset();
        selectRole(role); // Reset form to current role view and clear validation
        // Add submission logic here if needed
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function validatePhone(phone) {
    const re = /^\+?[0-9\s\-]{7,15}$/;
    return re.test(phone.trim());
}

function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
