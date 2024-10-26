const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const dots = document.querySelectorAll('.dot');


const tableBody = document.getElementById('table-body');

let currentSlide = 0;
const ctx = document.getElementById('myBarChart');
const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Event Registrations',
        data: [600, 900, 700, 500, 1000, 700, 800, 400, 750, 850, 950, 700],
        backgroundColor: '#8576FF', 
        borderColor: '#8576FF', 
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Start the Y-axis at 0
        }
      },
      responsive: true, // Make chart responsive
      maintainAspectRatio: false // Allow custom resizing
    }
  });


// Function to show a specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show the correct slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

// Show next slide
function showNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Show previous slide
function showPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Attach event listeners to buttons
nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

// Attach event listeners to dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto-slide functionality (optional)
setInterval(showNextSlide, 5000);  // Change slide every 5 seconds



// Sample data (could be more in the real scenario)
const data = [
  { name: "Cloud Innovation Summit", date: "2024-10-15", speaker: "Jane Doe", status: "Paid" },
  { name: "Blockchain Revolution Conference", date: "2024-11-05", speaker: "Dr. Peter Smith", status: "In Progress" },
  { name: "AI in Healthcare Symposium", date: "2024-12-01", speaker: "Dr. Aisha Malik", status: "Completed" },
  { name: "Future of Fintech Forum", date: "2024-10-25", speaker: "John Lee", status: "Paid" },
  { name: "Data Analytics in Business", date: "2024-11-12", speaker: "Rachel Moore", status: "Completed" },
  { name: "Sustainable Energy Expo", date: "2024-09-28", speaker: "Prof. Alan Green", status: "Paid" },
  { name: "Web3 Interfaces Workshop", date: "2024-10-10", speaker: "Kevin Adams", status: "In Progress" },
  { name: "Cybersecurity for Startups", date: "2024-11-19", speaker: "Emily Zhang", status: "Completed" },
  { name: "Smart Cities Forum", date: "2024-10-18", speaker: "Dr. Maria Hernandez", status: "In Progress" },
  { name: "Tech Safari Mixer", date: "2024-09-30", speaker: "Guest Panel", status: "In Progress" },
  { name: '5G and Beyond Summit', date: '2024-10-07', speaker: 'Susan Gray', status: 'In Progress' },
  { name: 'Blockchain Innovation Expo', date: '2024-12-05', speaker: 'Dr. Linda Carter', status: 'Completed' },
  { name: 'GreenTech Future Conference', date: '2024-11-15', speaker: 'Sophia Wright', status: 'In Progress' },
  { name: 'Augmented Reality Summit', date: '2024-10-27', speaker: 'Paul Martin', status: 'Completed' },
  { name: 'Space Exploration Forum', date: '2024-09-25', speaker: 'Dr. Jacob Reynolds', status: 'Completed' },
  { name: 'E-Commerce Revolution', date: '2024-12-10', speaker: 'Ava Wilson', status: 'In Progress' },
  { name: 'Digital Transformation Conference', date: '2024-11-08', speaker: 'Mark Davis', status: 'Completed' },
  { name: 'Cryptocurrency Investor Forum', date: '2024-12-12', speaker: 'Zara Patel', status: 'In Progress' },
  { name: 'Next-Gen Robotics Expo', date: '2024-11-25', speaker: 'Jason Grant', status: 'Completed' },
  { name: 'Women in Tech Leadership', date: '2024-10-30', speaker: 'Dr. Emma Scott', status: 'Paid' },
  { name: 'Autonomous Vehicles Conference', date: '2024-12-02', speaker: 'Tom Bennett', status: 'In Progress' },
  { name: 'SaaS Growth Summit', date: '2024-10-22', speaker: 'Jessica Hall', status: 'Completed' },
  { name: 'Cybersecurity in the Age of AI', date: '2024-11-30', speaker: 'Dr. Ethan Cole', status: 'In Progress' },
  { name: 'Future of Renewable Energy', date: '2024-12-07', speaker: 'Anna Roberts', status: 'Paid' },
  { name: 'DevOps Excellence Summit', date: '2024-11-02', speaker: 'Tyler Clark', status: 'Completed' },
  { name: 'Fintech Innovations Roundtable', date: '2024-10-12', speaker: 'Lisa Baker', status: 'In Progress' },
  { name: 'Artificial Intelligence Conference', date: '2024-11-10', speaker: 'Oliver King', status: 'Completed' },
  { name: 'Future of FoodTech', date: '2024-09-20', speaker: 'Sarah Collins', status: 'In Progress' },
  { name: 'Data Science for All', date: '2024-11-28', speaker: 'David Miller', status: 'In Progress' },
  { name: '3D Printing Expo', date: '2024-10-15', speaker: 'Isabella Diaz', status: 'Completed' },
];


// Number of rows to display per page
let rowsPerPage = 5;
const totalPages = Math.ceil(data.length / rowsPerPage);
let currentPage = 1;
// Fuunction that gets the proper data on the screen
function getPaginatedData(page, dataToRender) {
  dataToRender = dataToRender || data;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return dataToRender.slice(startIndex, endIndex);
}

let filteredList = [];

document.getElementById('filter').addEventListener('input', (e) => {
  const filter = e.target.value.toLowerCase();

  // Filter the data array based on both 'name' and 'speaker'
  filteredList = data.filter(item => {
    return item.name.toLowerCase().includes(filter) || item.speaker.toLowerCase().includes(filter);
  });

  // Optionally reset to page 1 after filtering
  currentPage = 1;

  // Pass the filtered data to renderTable function to update the UI
  renderTable(currentPage, filteredList);
  
  // You can log filteredList inside the event listener after filtering
  console.log(filteredList);  // Log the filtered list
});


function renderTable(page, dataToRender) {
  const paginatedData = getPaginatedData(page, dataToRender);
  tableBody.innerHTML = '';  // Clear previous rows
  if (paginatedData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No matching records found</td></tr>`;
    return;
  }
  // Add the rows for the current page
  paginatedData.forEach(item => {
    let statusClass = '';  // Initialize a variable to store the class based on status
    let dotClass = '';  // Initialize a variable to store the class based on status
    // Determine the class to apply based on the item's status
    if (item.status === 'Completed') {
        statusClass = 'status-completed';
        dotClass = 'first';
    } else if (item.status === 'In Progress') {
        statusClass = 'status-inprogress';
        dotClass = 'second';
    } else if (item.status === 'Paid') {
        statusClass = 'status-paid';
        dotClass = 'third';
    }

    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.date}</td>
        <td>${item.speaker}</td>
        <td>
          <span class="${statusClass}">
            <div class=${dotClass}></div>
            ${item.status}
          </span>
        </td>
      </tr>
    `;
  });
  console.log(dataToRender)
  
}

// Initially render the first page
renderTable(currentPage);


// If you have specific page number links
document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderTable(currentPage);
  }
});

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable(currentPage);
  }
});

// If you have specific page number links
document.querySelectorAll('.page-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Remove 'active' class from all links
    document.querySelectorAll('.page-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add 'active' class to the clicked link
    e.target.classList.add('active');
    const page = Number(e.target.textContent);  // Get the page number from data attribute
    currentPage = page;
    renderTable(page);
  });
});

document.getElementById('rows-per-page').addEventListener('change', (e) => {
  rowsPerPage = Number(e.target.value);
  currentPage = 1;  // Reset to the first page after changing rows per page
  renderTable(currentPage);
});

// Get the modal
const modal = document.getElementById("eventModal");
const closeModal = document.querySelector(".close");
const closeBtn = document.querySelector(".close-btn")

// Add click listener to sidebar events
document.querySelectorAll(".event").forEach(event => {
  event.addEventListener('click', (e) => {
    const eventName = e.target.dataset.event;
    document.getElementById("modal-event-name").innerText = eventName;
    // Here you can set other event details, e.g., date, description, speakers

    // Display the modal
    modal.style.display = "block";
  });
});

// Close modal when 'x' is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close modal when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Collaspe
const CollaspeSidebar = document.getElementById("collaspe");

CollaspeSidebar.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("collaspe")
})