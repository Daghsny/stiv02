const coursesData = [
    {
        id: 1,
        title: "CCNA 2020 200-125 Video Boot Camp",
        category: "Cours",
        icon: "ph-laptop",
        colorClass: "card-pink",
        rating: 4.8,
        students: "9,530 students",
        type: "Course",
        dateAdded: "2023-10-25",
        pdfUrl: "assets/ccna_bootcamp.pdf",
        thumbnail: "https://picsum.photos/id/1/600/350"
    },
    {
        id: 2,
        title: "Powerful Business Writing: How to Write Concisely",
        category: "Annexe",
        icon: "ph-briefcase",
        colorClass: "card-orange",
        rating: 4.9,
        students: "1,463 students",
        type: "Course",
        dateAdded: "2023-11-02",
        pdfUrl: "assets/business_writing.pdf",
        thumbnail: "https://picsum.photos/id/180/600/350"
    },
    {
        id: 3,
        title: "Certified Six Sigma Yellow Belt Training",
        category: "TP",
        icon: "ph-flask",
        colorClass: "card-purple",
        rating: 4.9,
        students: "6,726 students",
        type: "TD",
        dateAdded: "2023-11-05",
        pdfUrl: "assets/six_sigma.pdf",
        thumbnail: "https://picsum.photos/id/3/600/350"
    },
    {
        id: 4,
        title: "How to Design a Room in 10 Easy Steps",
        category: "Cours",
        icon: "ph-cube",
        colorClass: "card-green",
        rating: 5.0,
        students: "8,735 students",
        type: "Course",
        dateAdded: "2023-11-10",
        pdfUrl: "assets/interior_design.pdf",
        thumbnail: "https://picsum.photos/id/4/600/350"
    },
    {
        id: 5,
        title: "Introduction to Psychology",
        category: "Annexe",
        icon: "ph-brain",
        colorClass: "card-orange",
        rating: 4.7,
        students: "2,100 students",
        type: "Correction",
        dateAdded: "2023-11-12",
        pdfUrl: "assets/psychology_intro.pdf",
        thumbnail: "https://picsum.photos/id/5/600/350"
    },
    {
        id: 6,
        title: "Advanced CSS Animations",
        category: "Examen Bac",
        icon: "ph-code",
        colorClass: "card-pink",
        rating: 4.9,
        students: "3,250 students",
        type: "Quiz",
        dateAdded: "2023-11-15",
        pdfUrl: "assets/css_animations.pdf",
        thumbnail: "https://picsum.photos/id/6/600/350"
    },
    {
        id: 7,
        title: "Advanced CSS Animations",
        category: "Examen Bac",
        icon: "ph-paperclip",
        colorClass: "card-pink",
        rating: 4.9,
        students: "3,250 students",
        type: "Quiz",
        dateAdded: "2022-11-15",
        pdfUrl: "assets/css_animations.pdf",
        thumbnail: "https://picsum.photos/id/6/600/350"
    }
];

const coursesGrid = document.getElementById('coursesGrid');
const filterChips = document.querySelectorAll('.category-chip');
const recentFilesList = document.getElementById('recentFilesList');
const themeToggle = document.getElementById('themeToggle');

// Modal Elements (Global Scope)
const modal = document.getElementById('courseModal');
const closeModal = document.getElementById('closeModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalType = document.getElementById('modalType');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const startLearningBtn = document.querySelector('.btn-primary'); // The start button

// Close Modal Logic
if (closeModal) {
    closeModal.onclick = () => modal.classList.remove('open');
}

window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('open');
}

// ------ RENDER FUNCTIONS ------

function renderCourses(courses) {
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.colorClass}`;

        card.innerHTML = `
            <div class="card-header">
                <div class="course-icon">
                    <i class="ph-fill ${course.icon}"></i>
                </div>
                <div class="rating-chip">
                    <i class="ph-fill ph-star" style="color: #FFB547"></i> ${course.rating}
                </div>
            </div>
            
            <!-- Thumbnail Image -->
            <div class="course-thumbnail-wrapper">
                 <img src="${course.thumbnail}" alt="${course.title}" class="course-thumb" loading="lazy">
            </div>

            <div class="course-type-badge" style="font-size: 0.7rem; font-weight: 700; opacity: 0.6; text-transform: uppercase; margin-bottom: 4px;">
                ${course.type}
            </div>

            <h3 class="course-title">${course.title}</h3>
            
            <div class="course-footer">
                <span class="student-count">${course.students}</span>
            </div>
        `;

        // Modal Logic
        card.addEventListener('click', () => {
            modalTitle.textContent = course.title;
            modalType.textContent = course.type;
            modalCategory.textContent = course.category;

            // Update description 
            modalDescription.innerHTML = `
                Learn properly with our <strong>${course.title}</strong> module. <br> 
                This ${course.type} was added on <strong>${course.dateAdded}</strong>.
             `;

            // Set Icon and Color
            modalIcon.className = `modal-icon ${course.colorClass}`;
            modalIcon.innerHTML = `<i class="ph-fill ${course.icon}"></i>`;

            // Setup Start Button
            startLearningBtn.onclick = () => {
                window.open(course.pdfUrl, '_blank');
            };
            startLearningBtn.textContent = `Open ${course.type === 'Quiz' ? 'Quiz' : 'PDF'}`;

            modal.classList.add('open');
        });

        coursesGrid.appendChild(card);
    });
}

function renderRecentFiles() {
    // Sort by date descending
    const sorted = [...coursesData].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    // Take top 5
    const recent = sorted.slice(0, 5);

    recentFilesList.innerHTML = '';
    recent.forEach(course => {
        const item = document.createElement('div');
        item.className = 'course-mini-card';
        // Check local theme for mini card style adjustment if needed, but CSS vars handle most

        item.onclick = () => {
            // Re-use logic or trigger click on main card
            // For simplicity, just alert or open modal directly
            // Let's just create a click stub
            alert("Find this in the grid to open!");
        };

        let iconBg = '';
        // if (course.category === 'IT & Software' || course.category === 'Media Training') iconBg = 'p-pink';
        // else iconBg = 'p-orange';

        // Manually mapping bg colors from main class
        if (course.colorClass.includes('pink')) iconBg = 'background: var(--accent-pink)';
        if (course.colorClass.includes('orange')) iconBg = 'background: var(--accent-orange)';
        if (course.colorClass.includes('purple')) iconBg = 'background: var(--accent-purple)';
        if (course.colorClass.includes('green')) iconBg = 'background: var(--accent-green)';


        item.innerHTML = `
            <div class="mini-icon" style="${iconBg}; color: #1C1C1E;">
                <i class="ph-fill ${course.icon}"></i>
            </div>
            <div class="mini-details">
                <span class="cat">${course.dateAdded}</span>
                <h5>${course.title}</h5>
                <div class="mini-meta">${course.type}</div>
            </div>
        `;
        recentFilesList.appendChild(item);
    });
}


// ------ FILTERING ------
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const category = chip.getAttribute('data-filter');
        if (category === 'all') {
            renderCourses(coursesData);
        } else {
            const filtered = coursesData.filter(course => course.category === category);
            renderCourses(filtered);
        }
    });
});

// ------ DARK MODE ------
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('ph-moon', 'ph-sun');
    } else {
        icon.classList.replace('ph-sun', 'ph-moon');
    }
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});


// ------ INIT ------
// ------ CALENDAR DATA (Mock Annual Partition) ------
const calendarData = [
    {
        month: "September",
        modules: [
            { title: "Introduction to Algorithmics", type: "Cours" },
            { title: "Binary Logic Basics", type: "TP" }
        ]
    },
    {
        month: "October",
        modules: [
            { title: "Advanced Algorithms", type: "Cours" },
            { title: "C Programming Basics", type: "TP" },
            { title: "Web Architecture", type: "Cours" }
        ]
    },
    {
        month: "November",
        modules: [
            { title: "Data Structures I", type: "Cours" },
            { title: "Linux Commands", type: "TP" },
            { title: "Mini Project 1", type: "Projet" }
        ]
    },
    {
        month: "December",
        modules: [
            { title: "Data Structures II", type: "Cours" },
            { title: "Semester Exam Review", type: "Examen" }
        ]
    },
    {
        month: "January",
        modules: [
            { title: "Object Oriented Programming (Java)", type: "Cours" },
            { title: "Database Design (SQL)", type: "Cours" }
        ]
    },
    {
        month: "February",
        modules: [
            { title: "OOP Advanced Concepts", type: "TP" },
            { title: "SQL Complex Queries", type: "TP" }
        ]
    },
    {
        month: "March",
        modules: [
            { title: "Web Development (HTML/CSS)", type: "Cours" },
            { title: "JavaScript Basics", type: "TP" }
        ]
    },
    {
        month: "April",
        modules: [
            { title: "Frontend Frameworks", type: "Cours" },
            { title: "Exam Preparation", type: "Examen" }
        ]
    },
    {
        month: "May",
        modules: [
            { title: "Final Project Definition", type: "Projet" },
            { title: "Advanced Topics", type: "Cours" }
        ]
    },
    {
        month: "June",
        modules: [
            { title: "Final Exams", type: "Examen" },
            { title: "Project Defense", type: "Projet" }
        ]
    }
];

// ------ CALENDAR LOGIC ------
const navHome = document.getElementById('nav-home');
const navCalendar = document.getElementById('nav-calendar');
const dashboardView = document.getElementById('dashboard-view');
const calendarView = document.getElementById('calendar-view');
const calendarTimeline = document.getElementById('calendarTimeline');

function switchView(viewName) {
    if (viewName === 'calendar') {
        dashboardView.style.display = 'none';
        calendarView.style.display = 'grid'; // Use grid to match layout
        navHome.classList.remove('active');
        navCalendar.classList.add('active');
        renderCalendar();
    } else {
        dashboardView.style.display = 'contents'; // Restore grid placement
        calendarView.style.display = 'none';
        navCalendar.classList.remove('active');
        navHome.classList.add('active');
    }
}

if (navHome && navCalendar) {
    navHome.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
    });

    navCalendar.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('calendar');
    });
}

function renderCalendar() {
    if (calendarTimeline.innerHTML.includes('month-section')) return; // Already rendered

    calendarTimeline.innerHTML = '';
    calendarData.forEach(monthData => {
        const monthSection = document.createElement('div');
        monthSection.className = 'month-section timeline-line';

        let modulesHtml = '';
        monthData.modules.forEach(mod => {
            modulesHtml += `
                <div class="module-card">
                   <div class="module-info">
                        <h4>${mod.title}</h4>
                        <span class="module-type">${mod.type}</span>
                   </div>
                </div>
            `;
        });

        monthSection.innerHTML = `
            <div class="month-title">${monthData.month}</div>
            <div class="module-list">
                ${modulesHtml}
            </div>
        `;
        calendarTimeline.appendChild(monthSection);
    });
}

// ------ INIT ------
initTheme();
renderCourses(coursesData);
renderRecentFiles();
