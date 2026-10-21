const projectLinkStyle = 'color: #2563eb; text-decoration: underline;';

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-item';

    const photo = document.createElement('div');
    photo.className = 'project-photo';

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.imageAlt;
    photo.appendChild(image);

    const content = document.createElement('div');
    content.className = 'project-content';

    const title = document.createElement('h4');
    title.textContent = project.title;
    content.appendChild(title);

    project.paragraphs.forEach((paragraphText) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = paragraphText;
        content.appendChild(paragraph);
    });

    if (project.link) {
        const linkParagraph = document.createElement('p');
        const link = document.createElement('a');
        link.href = project.link.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('style', projectLinkStyle);
        link.textContent = project.link.label;

        if (project.link.icon) {
            link.append(' ');
            const icon = document.createElement('i');
            icon.className = project.link.icon;
            link.appendChild(icon);
        }

        linkParagraph.appendChild(link);
        content.appendChild(linkParagraph);
    }

    card.append(photo, content);
    return card;
}

function showProjectsError() {
    document.querySelectorAll('[data-projects-section]').forEach((section) => {
        section.textContent = 'Projects could not be loaded. Please try again later.';
    });
}

fetch('projects.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Unable to load projects.json: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        document.querySelectorAll('[data-projects-section]').forEach((section) => {
            const projects = data.sections[section.dataset.projectsSection];
            if (!Array.isArray(projects)) {
                throw new Error(`Unknown project section: ${section.dataset.projectsSection}`);
            }
            projects.forEach((project) => section.appendChild(createProjectCard(project)));
        });
    })
    .catch((error) => {
        console.error(error);
        showProjectsError();
    });
