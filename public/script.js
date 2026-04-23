document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) throw new Error('Falha ao carregar conteúdo');
    const data = await res.json();

    // Preencher dados básicos
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about-text').textContent = data.about;
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = data.name;

    // Skills
    const skillsList = document.getElementById('skills-list');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    // Projetos
    const projectsGrid = document.getElementById('projects-grid');
    data.projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="tech">${proj.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div>
          ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
          ${proj.live ? `<a href="${proj.live}" target="_blank" rel="noopener">Demo ↗</a>` : ''}
        </div>
      `;
      projectsGrid.appendChild(card);
    });

    // Contato
    const contactLinks = document.getElementById('contact-links');
    const links = Object.entries(data.contact).map(([key, url]) =>
      `<a href="${url}" target="_blank" rel="noopener">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`
    );
    contactLinks.innerHTML = links.join('');

  } catch (err) {
    console.error(err);
    document.body.innerHTML = `<p style="color:red;text-align:center;margin-top:2rem">Erro ao carregar o portfólio. Verifique o console.</p>`;
  }
});
