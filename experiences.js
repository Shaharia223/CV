function createExperienceItem(experience) {
    const item = document.createElement('div');
    item.className = 'experience-item';

    const title = document.createElement('h3');
    title.textContent = experience.title;
    item.appendChild(title);

    if (Array.isArray(experience.details) && experience.details.length > 0) {
        const details = document.createElement('ul');

        experience.details.forEach((detail) => {
            const detailItem = document.createElement('li');
            detailItem.textContent = detail;
            details.appendChild(detailItem);
        });

        item.appendChild(details);
    }

    return item;
}

fetch('experiences.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Unable to load experiences.json: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const introduction = document.querySelector('[data-experience-introduction]');
        const experienceList = document.querySelector('[data-experience-list]');

        if (!introduction || !experienceList) {
            throw new Error('Experience page elements were not found.');
        }

        introduction.textContent = data.introduction || '';

        if (!Array.isArray(data.experiences)) {
            throw new Error('The experiences.json experiences value must be an array.');
        }

        data.experiences.forEach((experience) => {
            experienceList.appendChild(createExperienceItem(experience));
        });
    })
    .catch((error) => {
        console.error(error);

        const introduction = document.querySelector('[data-experience-introduction]');
        if (introduction) {
            introduction.textContent = 'Experiences could not be loaded. Please try again later.';
        }
    });
