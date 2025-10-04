// Redirect to login if no user role is found
if (!localStorage.getItem('userRole')) {
  window.location.href = 'index.html';
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const role = document.querySelector('select[name="role"]').value.trim();
    const name = document.querySelector('input[name="name"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    // Simulated login logic (replace with backend integration)
    if (name && password) {
      localStorage.setItem('userRole', role);
      const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
      window.location.href = `${normalizedRole}_dashboard.html`;
    } else {
      alert('Please enter valid credentials.');
    }
  });
}

// Load dashboard modules dynamically
function loadModules(modules) {
  const container = document.getElementById('content');
  if (!container) return;

  container.innerHTML = ''; // Clear previous content

  modules.forEach(module => {
    fetch(`modules/${module}.html`)
      .then(response => response.text())
      .then(html => {
        const section = document.createElement('section');
        section.innerHTML = html;
        container.appendChild(section);
      })
      .catch(error => {
        console.error(`Error loading module "${module}":`, error);
      });
  });
}

// Determine which modules to load based on role
function loadDashboard(role) {
  switch (role) {
    case 'Admin/Head':
      loadModules(['profile', 'reports', 'transcript', 'results', 'fees', 'summary', 'complaints']);
      break;
    case 'Teacher':
      loadModules(['profile', 'sba', 'exams']);
      break;
    case 'Student':
      loadModules(['profile', 'results', 'transcript', 'fees']);
      break;
    default:
      console.warn('Unknown role:', role);
      break;
  }
}

// Show success popup if available
const successPopup = document.getElementById('successPopup');
if (successPopup) {
  successPopup.classList.remove('d-none');
  successPopup.classList.add('show');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('userRole');
  if (role) {
    loadDashboard(role);
  } else {
    window.location.href = 'index.html';
  }
});

// Logout function
function logout() {
  localStorage.removeItem('userRole');
  window.location.href = 'index.html';
}