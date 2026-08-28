// =========================================
// 1. THEME TOGGLE LOGIC
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check local storage for user's preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// =========================================
// 2. VIEW NAVIGATION & SELECTION (HOME -> MTU)
// =========================================
const viewHome = document.getElementById('view-home');
const viewMtu = document.getElementById('view-mtu');
const mtuCardBtn = document.getElementById('mtu-card-btn');
const backToHomeBtn = document.getElementById('back-to-home');

// Switch to MTU Dashboard
mtuCardBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    viewHome.classList.remove('active-view');
    viewHome.classList.add('hidden-view');
    
    viewMtu.classList.remove('hidden-view');
    viewMtu.classList.add('active-view');
});

// Switch back to Home
backToHomeBtn.addEventListener('click', () => {
    viewMtu.classList.remove('active-view');
    viewMtu.classList.add('hidden-view');
    
    viewHome.classList.remove('hidden-view');
    viewHome.classList.add('active-view');
});

// =========================================
// 3. MTU DASHBOARD SELECTION LOGIC
// =========================================
const allDeptBtns = document.querySelectorAll('.department-grid .glass-btn');
const allSemBtns = document.querySelectorAll('.semester-grid .glass-btn');
const continueBtn = document.getElementById('continue-docs');

let selectedDept = null;
let selectedSem = null;

// Disabled by default
continueBtn.disabled = true;

function checkSelections() {
    if (selectedDept === "Electrical" && selectedSem === "3rd Sem") {
        continueBtn.disabled = false;
    } else {
        continueBtn.disabled = true;
    }
}

// Handle Department Selection with Toggle
allDeptBtns.forEach(btn => {
    if (!btn.classList.contains('locked-btn')) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                selectedDept = null;
            } else {
                allDeptBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedDept = btn.textContent.trim();
            }
            checkSelections();
        });
    }
});

// Handle Semester Selection with Toggle
allSemBtns.forEach(btn => {
    if (!btn.classList.contains('locked-btn')) {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                selectedSem = null;
            } else {
                allSemBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSem = btn.textContent.trim();
            }
            checkSelections();
        });
    }
});

// =========================================
// 4. DOCUMENT CART LOGIC & ACCORDIONS (MTU -> DOCUMENTS)
// =========================================
const viewDocuments = document.getElementById('view-documents');
const backToMtuBtn = document.getElementById('back-to-mtu');
const dynamicSubtitle = document.getElementById('dynamic-subtitle');
const proceedCheckoutBtn = document.getElementById('proceed-checkout');
const allDocCheckboxes = document.querySelectorAll('.doc-item input[type="checkbox"]');

// Transition: MTU Dashboard -> Documents
continueBtn.addEventListener('click', () => {
    if (!continueBtn.disabled) {
        viewMtu.classList.remove('active-view');
        viewMtu.classList.add('hidden-view');
        
        viewDocuments.classList.remove('hidden-view');
        viewDocuments.classList.add('active-view');

        // Update the subtitle dynamically based on their Step 1 choices
        dynamicSubtitle.textContent = `${selectedDept} | ${selectedSem}`;
    }
});

// Transition: Documents -> MTU Dashboard
backToMtuBtn.addEventListener('click', () => {
    viewDocuments.classList.remove('active-view');
    viewDocuments.classList.add('hidden-view');
    
    viewMtu.classList.remove('hidden-view');
    viewMtu.classList.add('active-view');
});

// Accordion Slide Logic
const accordionBtns = document.querySelectorAll('.acc-main-btn, .acc-sub-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('open');
        
        const wrapper = this.nextElementSibling;
        if (wrapper && wrapper.classList.contains('acc-wrapper')) {
            wrapper.classList.toggle('open');
        }
    });
});

// Real-time Cart Counter (Handles all nested checks)
allDocCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedCount = document.querySelectorAll('.doc-item input[type="checkbox"]:checked').length;
        
        if (selectedCount > 0) {
            proceedCheckoutBtn.disabled = false;
            proceedCheckoutBtn.textContent = `Proceed to Checkout (${selectedCount})`;
        } else {
            proceedCheckoutBtn.disabled = true;
            proceedCheckoutBtn.textContent = `Proceed to Checkout (0)`;
        }
    });
});

// =========================================
// 5. HYPRLAND TIMETABLE LOGIC
// =========================================
const timetableModal = document.getElementById('timetable-modal');
const btnTimetable = document.getElementById('btn-timetable');
const closeTimetable = document.getElementById('close-timetable');
const hyprTabs = document.querySelectorAll('.hypr-tab');
const timetableOutput = document.getElementById('timetable-output');

const scheduleData = {
    1: [ // Monday
        { time: "9:00 AM - 10:00 AM", subject: "Foundation of Physics", room: "Rm 301" },
        { time: "10:00 AM - 11:00 AM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "11:00 AM - 12:00 PM", subject: "Linear Alg / ODEMC", room: "Rm 204/307" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Prof Laws, Ethics & Values", room: "Rm 101" },
        { time: "3:00 PM - 5:00 PM", subject: "Numerical Methods Lab", room: "EE Comp Lab" }
    ],
    2: [ // Tuesday
        { time: "9:00 AM - 10:00 AM", subject: "Linear Algebra", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Foundation of Physics", room: "Rm 301" },
        { time: "11:00 AM - 12:00 PM", subject: "Innovation & Creativity", room: "Rm 101" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 4:00 PM", subject: "Solid State Devices Lab", room: "EE Conf Hall" },
        { time: "4:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ],
    3: [ // Wednesday
        { time: "9:00 AM - 10:00 AM", subject: "Linear Algebra", room: "Rm 204" },
        { time: "10:00 AM - 12:00 PM", subject: "Measurements & Comm Lab", room: "Measurement Lab" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Numerical Methods Lab (T)", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Smart Materials", room: "Rm 307" },
        { time: "3:00 PM - 4:00 PM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "4:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ],
    4: [ // Thursday
        { time: "9:00 AM - 10:00 AM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "11:00 AM - 12:00 PM", subject: "Linear Algebra", room: "Rm 204" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Found. Physics / ODEMC", room: "Rm 301/307" },
        { time: "2:00 PM - 3:00 PM", subject: "Numerical Methods (L)", room: "Rm 307" },
        { time: "3:00 PM - 5:00 PM", subject: "Circuit Simulation Lab", room: "EE Comp Lab" }
    ],
    5: [ // Friday
        { time: "9:00 AM - 10:00 AM", subject: "Smart Materials", room: "Rm 307" },
        { time: "10:00 AM - 11:00 AM", subject: "Linear Alg / ODEMC", room: "Rm 204/307" },
        { time: "11:00 AM - 12:00 PM", subject: "Measurements & Comm", room: "Rm 307" },
        { time: "12:00 PM - 1:00 PM", subject: "RECESS", room: "-" },
        { time: "1:00 PM - 2:00 PM", subject: "Electrical Circuit Analysis", room: "Rm 307" },
        { time: "2:00 PM - 3:00 PM", subject: "Solid State Devices", room: "Rm 307" },
        { time: "3:00 PM - 5:00 PM", subject: "Remedial Class", room: "Rm 307" }
    ]
};
const dayNames = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday" };

function renderTree(dayInt) {
    const classes = scheduleData[dayInt];
    let output = `.\n└── ${dayNames[dayInt]}\n`;
    
    classes.forEach((c, index) => {
        const isLast = index === classes.length - 1;
        const branch = isLast ? "    └──" : "    ├──";
        const subBranch = isLast ? "        └──" : "    │   └──";
        
        output += `${branch} [${c.time}]\n`;
        if (c.subject === "RECESS") {
            output += `${subBranch} RECESS\n`;
        } else {
            output += `${subBranch} ${c.subject} (${c.room})\n`;
        }
    });
    
    timetableOutput.textContent = output;
}

if (btnTimetable) {
    btnTimetable.addEventListener('click', () => {
        timetableModal.classList.add('active'); // No more hidden-view!
        
        let currentDay = new Date().getDay();
        if (currentDay === 0 || currentDay === 6) currentDay = 1;
        
        hyprTabs.forEach(tab => {
            tab.classList.remove('active');
            if (parseInt(tab.dataset.day) === currentDay) tab.classList.add('active');
        });
        renderTree(currentDay);
    });
}

closeTimetable.addEventListener('click', () => timetableModal.classList.remove('active'));
timetableModal.addEventListener('click', (e) => {
    if (e.target === timetableModal) timetableModal.classList.remove('active');
});

hyprTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        hyprTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderTree(parseInt(e.target.dataset.day));
    });
});

// =========================================
// 6. DEADLINES LOGIC (Google Sheets Integration)
// =========================================
const deadlineModal = document.getElementById('deadline-modal');
const btnDeadline = document.getElementById('btn-deadline'); // Fixed selector
const closeDeadline = document.getElementById('close-deadline');
const deadlineOutput = document.getElementById('deadline-output');

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPPZ3OGBai93O4ILNEf-ic2QLy68v-2zmHaFqbrze15ugPfO2iiDRMphphyvarNDKlHovBV6qZflp-/pubhtml"

async function fetchAndRenderDeadlines() {
    deadlineOutput.textContent = "[~] ESTABLISHING SECURE CONNECTION...\n[~] FETCHING URGENT TASKS FROM MAINFRAME...\n";
    
    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.split('\t'));
        rows.shift(); 
        
        let output = `\n[!] FETCH COMPLETE.\n\n`;
        let hasTasks = false;

        rows.forEach(row => {
            if (row.length >= 3 && row[0].trim() !== "") {
                hasTasks = true;
                output += `[*] [${row[0].trim()}]\n`;
                output += `    ├── Subject: ${row[1].trim()}\n`;
                output += `    └── Task:    ${row[2].trim()}\n\n`;
            }
        });

        if (!hasTasks) output += `    No pending deadlines. System idle.\n`;
        deadlineOutput.textContent = output;
        
    } catch (error) {
        deadlineOutput.textContent = `\n[ERR] CONNECTION FAILED.\nCheck network or verify the Sheet URL.\n`;
        console.error(error);
    }
}

if (btnDeadline) {
    btnDeadline.addEventListener('click', () => {
        deadlineModal.classList.add('active'); // No more hidden-view!
        fetchAndRenderDeadlines();
    });
}

closeDeadline.addEventListener('click', () => deadlineModal.classList.remove('active'));
deadlineModal.addEventListener('click', (e) => {
    if (e.target === deadlineModal) deadlineModal.classList.remove('active');
});

// =========================================
// 8. CHECKOUT & AUTHENTICATION LOGIC
// =========================================
const viewCheckout = document.getElementById('view-checkout');
const backToDocsBtn = document.getElementById('back-to-docs');
const orderSummaryList = document.getElementById('order-summary-list');
const checkoutForm = document.getElementById('checkout-form');
const authMessage = document.getElementById('auth-message');

// Simulated Backend Database (Name must match Registration last 4 digits)
const studentDB = {
    "1234": "Bluecat",
    "0001": "John Doe",
    "9999": "Test User"
};

// Transition: Documents -> Checkout
proceedCheckoutBtn.addEventListener('click', () => {
    if (!proceedCheckoutBtn.disabled) {
        document.getElementById('view-documents').classList.remove('active-view');
        document.getElementById('view-documents').classList.add('hidden-view');
        
        viewCheckout.classList.remove('hidden-view');
        viewCheckout.classList.add('active-view');

        buildOrderSummary();
    }
});

// Transition: Checkout -> Documents
backToDocsBtn.addEventListener('click', () => {
    viewCheckout.classList.remove('active-view');
    viewCheckout.classList.add('hidden-view');
    
    document.getElementById('view-documents').classList.remove('hidden-view');
    document.getElementById('view-documents').classList.add('active-view');
    
    // Clear the form and messages
    checkoutForm.reset();
    authMessage.textContent = "";
});

// Dynamically generate the list of chosen items
function buildOrderSummary() {
    orderSummaryList.innerHTML = ''; // Clear previous list
    
    // Grab all checked boxes
    const checkedBoxes = document.querySelectorAll('.doc-item input[type="checkbox"]:checked');
    
    checkedBoxes.forEach(box => {
        const docItemParent = box.closest('.doc-item');
        let docName = docItemParent.querySelector('.doc-name').textContent.trim();
        
        // Handle dropdown variations (e.g., Experiment numbers)
        const complexParent = box.closest('.complex-doc-item');
        if (complexParent) {
            const selectVal = complexParent.querySelector('select').value;
            docName += ` - ${selectVal}`;
        }

        // Traverse up the DOM to find the parent subject name
        let subjectName = "General";
        const subAccGroup = box.closest('.sub-acc-group');
        if (subAccGroup) {
            // Get text, remove the chevron arrow
            subjectName = subAccGroup.querySelector('.acc-sub-btn').textContent.replace('▼', '').trim();
        }

        // Create the summary card
        const summaryCard = document.createElement('div');
        summaryCard.className = 'glass-card-small';
        summaryCard.style.cursor = 'default'; // Non-clickable in review
        summaryCard.innerHTML = `
            <span class="doc-icon">✓</span>
            <div class="summary-item-text">
                <span class="summary-subject">${subjectName}</span>
                <span class="doc-name" style="font-size: 0.95rem;">${docName}</span>
            </div>
        `;
        
        orderSummaryList.appendChild(summaryCard);
    });
}
// Handle Authentication and Submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    const nameInput = document.getElementById('student-name').value.trim();
    const regInput = document.getElementById('student-reg').value.trim();
    const phoneInput = document.getElementById('student-phone').value.trim();
    
    authMessage.className = "auth-msg"; // Reset classes
    authMessage.textContent = "Authenticating...";

    // Mock Backend Verification Delay
    setTimeout(() => {
        // Check if the reg number exists in DB AND the name matches (case insensitive)
        if (studentDB[regInput] && studentDB[regInput].toLowerCase() === nameInput.toLowerCase()) {
            
            authMessage.className = "auth-msg success";
            authMessage.textContent = "Authentication Successful! Processing order...";
            
            // Route straight to the Seanime success page after a brief pause
            setTimeout(() => {
                viewCheckout.classList.remove('active-view');
                viewCheckout.classList.add('hidden-view');
                
                viewSuccess.classList.remove('hidden-view');
                viewSuccess.classList.add('active-view');
            }, 800);

        } else {
            authMessage.className = "auth-msg error";
            authMessage.textContent = "Authentication Failed: Name and Registration Number do not match our records.";
        }
    }, 800);
});
// =========================================
// 9. APP RESET & SUCCESS ROUTING
// =========================================
const resetOrderBtn = document.getElementById('reset-order-btn');
const viewSuccess = document.getElementById('view-success');

// Inside your checkoutForm 'submit' event listener (Update the setTimeout block):
// setTimeout(() => {
//     if (studentDB[regInput] && studentDB[regInput].toLowerCase() === nameInput.toLowerCase()) {
//         authMessage.className = "auth-msg success";
//         authMessage.textContent = "Authentication Successful! Processing...";
//         
//         // Route to Success Page
//         setTimeout(() => {
//             viewCheckout.classList.remove('active-view');
//             viewCheckout.classList.add('hidden-view');
//             
//             viewSuccess.classList.remove('hidden-view');
//             viewSuccess.classList.add('active-view');
//         }, 800);
//     } else {
//         authMessage.className = "auth-msg error";
//         authMessage.textContent = "Authentication Failed: Name and Registration Number do not match our records.";
//     }
// }, 800);

resetOrderBtn.addEventListener('click', () => {
    // 1. Uncheck all checkboxes
    const allCheckboxes = document.querySelectorAll('.doc-item input[type="checkbox"]');
    allCheckboxes.forEach(box => box.checked = false);
    
    // 2. Reset the checkout button state
    const proceedCheckoutBtn = document.getElementById('proceed-checkout');
    proceedCheckoutBtn.disabled = true;
    proceedCheckoutBtn.textContent = `Proceed to Checkout (0)`;

    // 3. Clear the forms
    document.getElementById('checkout-form').reset();
    document.getElementById('auth-message').textContent = "";

    // 4. Route back to Home
    viewSuccess.classList.remove('active-view');
    viewSuccess.classList.add('hidden-view');
    
    document.getElementById('view-home').classList.remove('hidden-view');
    document.getElementById('view-home').classList.add('active-view');
});