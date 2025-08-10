const clinicsData = [
  {
    id: 1,
    name: "Cardiology Clinic",
    doctors: [
      { id: 1, name: "Dr. Ahmed Ali" },
      { id: 2, name: "Dr. Nahed Samir" }
    ],
    appointments: [
      { doctorId:1, day: "Saturday", time: "10:00" },
      { doctorId:2, day: "Monday", time: "14:00" }
    ]
  },
  {
    id: 2,
    name: "Dental Clinic",
    doctors: [
      { id: 3, name: "Dr. Mona Khaled" }
    ],
    appointments: [
      { doctorId:3, day: "Sunday", time: "15:00" },
      { doctorId:3, day: "Thursday", time: "11:00" }
    ]
  },
  {
    id: 3,
    name: "Eye Clinic",
    doctors: [
      { id: 4, name: "Dr. Sami Mohamed" },
      { id: 5, name: "Dr. Laila Farouk" }
    ],
    appointments: [
      { doctorId:4, day: "Monday", time: "09:00" },
      { doctorId:5, day: "Wednesday", time: "13:00" }
    ]
  },
  {
    id: 4,
    name: "Pediatrics Clinic",
    doctors: [
      { id:6, name: "Dr. Hala Samir" }
    ],
    appointments: [
      { doctorId:6, day: "Tuesday", time: "09:30" },
      { doctorId:6, day: "Friday", time: "10:30" }
    ]
  }
];

localStorage.setItem('clinicsData', JSON.stringify(clinicsData));

const welcome = document.getElementById('welcome');
const logged = localStorage.getItem('loggedInUser');
welcome.textContent = logged ? `Welcome, ${logged}` : 'Welcome';

document.getElementById('logout').addEventListener('click', function(){
  localStorage.removeItem('loggedInUser');
});

const clinicsList = document.getElementById('clinicsList');
const clinicFilter = document.getElementById('clinicFilter');
const dayFilter = document.getElementById('dayFilter');
const searchInput = document.getElementById('searchInput');
const addApptBtn = document.getElementById('addApptBtn');

function populateClinicFilter(){
  clinicsData.forEach(c => {
    const op = document.createElement('option');
    op.value = c.id;
    op.textContent = c.name;
    clinicFilter.appendChild(op);
  });
}

function findDoctorName(clinic, doctorId){
  const d = clinic.doctors.find(x => x.id === doctorId);
  return d ? d.name : 'Unknown';
}

function render(filter = {}){
  clinicsList.innerHTML = '';
  const text = (filter.text || '').toLowerCase();

  clinicsData.forEach(c => {
    if(filter.clinicId && Number(filter.clinicId) !== c.id) return;

    const filteredAppts = c.appointments.filter(a => {
      const docName = findDoctorName(c, a.doctorId).toLowerCase();
      const clinicName = c.name.toLowerCase();
      const dayMatch = !filter.day || a.day === filter.day;
      const textMatch = !text || (docName.includes(text) || clinicName.includes(text) || a.day.toLowerCase().includes(text) || a.time.includes(text));
      return dayMatch && textMatch;
    });

    if(filteredAppts.length === 0) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'card';
    wrapper.innerHTML = `<h3>${c.name}</h3>`;

    filteredAppts.forEach(a => {
      const p = document.createElement('div');
      p.className = 'small';
      p.innerHTML = `<div class="flex">
        <div class="col">${findDoctorName(c, a.doctorId)}</div>
        <div style="min-width:140px;text-align:left;">
          <span class="meta">${a.day} — ${a.time}</span>
        </div>
        <div style="min-width:120px">
          <button onclick="book(${c.id}, ${a.doctorId}, '${a.day}', '${a.time}')">Book</button>
        </div>
      </div>`;
      wrapper.appendChild(p);
    });

    clinicsList.appendChild(wrapper);
  });
}

window.book = function(clinicId, doctorId, day, time){
  const user = localStorage.getItem('loggedInUser') || 'Guest';
  const clinic = clinicsData.find(c => c.id === clinicId);
  const doctor = clinic ? clinic.doctors.find(d => d.id === doctorId) : {name:'Unknown'};

  const fullName = prompt("Enter patient's full name:");
  if(!fullName) { alert('Booking cancelled. Name is required.'); return; }

  const gender = prompt("Enter gender (Male/Female):");
  if(!gender) { alert('Booking cancelled. Gender is required.'); return; }

  const age = prompt("Enter age:");
  if(!age || isNaN(age)) { alert('Booking cancelled. Age must be a number.'); return; }

  const confirmMsg = 
    `Booking for: ${user}\n` +
    `Patient Name: ${fullName}\n` +
    `Gender: ${gender}\n` +
    `Age: ${age}\n` +
    `Clinic: ${clinic.name}\n` +
    `Doctor: ${doctor.name}\n` +
    `Day: ${day}\n` +
    `Time: ${time}\n\n` +
    `Confirm?`;

  if(confirm(confirmMsg)){
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    saved.push({ 
      bookedBy: user,
      patientName: fullName,
      gender: gender,
      age: age,
      clinicId, 
      doctorId, 
      day, 
      time, 
      created: new Date().toISOString() 
    });
    localStorage.setItem('bookings', JSON.stringify(saved));
    alert('Booking confirmed!');
  }
};

addApptBtn.addEventListener('click', function(){
  const clinicId = prompt('Enter clinic number:\n' + clinicsData.map(c=>`${c.id}. ${c.name}`).join('\n'));
  const c = clinicsData.find(x => String(x.id) === String(clinicId));
  if(!c){ alert('Clinic not found'); return; }
  const doctorList = c.doctors.map(d=>`${d.id}. ${d.name}`).join('\n');
  const doctorId = prompt('Enter doctor number:\n' + doctorList);
  const d = c.doctors.find(x => String(x.id) === String(doctorId));
  if(!d){ alert('Doctor not found'); return; }
  const day = prompt('Day (e.g. Monday)');
  const time = prompt('Time (e.g. 11:30)');
  if(!day || !time){ alert('Day and time are required'); return; }
  c.appointments.push({ doctorId: Number(doctorId), day, time });
  alert('Appointment added to ' + c.name);
  render(currentFilter());
});

function currentFilter(){
  return {
    clinicId: clinicFilter.value,
    day: dayFilter.value,
    text: searchInput.value.trim()
  };
}
clinicFilter.addEventListener('change', ()=> render(currentFilter()));
dayFilter.addEventListener('change', ()=> render(currentFilter()));
searchInput.addEventListener('input', ()=> render(currentFilter()));

populateClinicFilter();
render();