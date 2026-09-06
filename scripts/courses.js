// Array de cursos do certificado Web and Computer Programming
// ALTERE a propriedade "completed" para true nos cursos que você já terminou
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

// Elementos do DOM
const coursesContainer = document.getElementById('courses-container');
const totalCreditsSpan = document.getElementById('total-credits');
const btnAll = document.getElementById('btn-all');
const btnCse = document.getElementById('btn-cse');
const btnWdd = document.getElementById('btn-wdd');

// Função para renderizar cursos
function renderCourses(courseList) {
    // Limpar container
    coursesContainer.innerHTML = '';

    // Renderizar cada curso
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `
            ${course.subject} ${course.number}<br>
            <small>${course.title}</small>
        `;
        coursesContainer.appendChild(card);
    });

    // Calcular total de créditos com reduce()
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Função para atualizar botões ativos
function setActiveButton(activeBtn) {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Event Listeners para filtros
btnAll.addEventListener('click', () => {
    renderCourses(courses);
    setActiveButton(btnAll);
});

btnCse.addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'CSE');
    renderCourses(filtered);
    setActiveButton(btnCse);
});

btnWdd.addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'WDD');
    renderCourses(filtered);
    setActiveButton(btnWdd);
});

// Renderizar todos os cursos ao carregar a página
renderCourses(courses);