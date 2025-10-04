
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const role = document.querySelector('select[name="role"]').value;
  const name = document.querySelector('input[name="name"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Simulate login (replace with real backend later)
  if (name && password) {
    localStorage.setItem('userRole', role);
    window.location.href = `${role.toLowerCase()}_dashboard.html`;
  } else {
    alert('Please enter valid credentials.');
  }
});

function loadModules(modules) {
  const container = document.getElementById('content');
  container.innerHTML = ''; // Clear previous content

  modules.forEach(module => {
    fetch(`modules/${module}.html`)
      .then(res => res.text())
      .then(html => {
        const section = document.createElement('section');
        section.innerHTML = html;
        container.appendChild(section);
      })
      .catch(err => console.error(`Error loading ${module}:`, err));
  });
}

function loadDashboard(role) {
  switch(role) {
    case 'Admin/Head':
      loadModules(['profile', 'reports', 'transcript', 'results', 'fees', 'summary', 'complaints']);
      break;
    case 'Teacher':
      loadModules(['profile', 'sba','exams']);
      break;
    case 'Student':
      loadModules(['profile', 'results', 'transcript', 'fees']);
      break;
  }
}