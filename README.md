# Clinic Appointment Booking System

A lightweight clinic appointment booking prototype built for a CS50 project using HTML, CSS, and JavaScript. Users can explore clinics and doctors, browse available appointments, and manage bookings through a browser-based interface.

## Features

- Registration and login interface
- Browse clinics and doctors
- Search and filter appointment options
- Book appointments and view bookings
- Add appointment slots through the existing interface

> **Project status:** Educational frontend prototype. Data is stored in browser `localStorage`; it is not a production-ready medical booking system. Authentication, access control, and booking integrity need server-side implementation before real-world use. Do not enter real patient information or reuse a real password.

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Browser Local Storage

## Project Structure

```text
project-CS50/
├── bookings.html     # Booking list
├── clinics.html      # Clinics and appointment interface
├── clinics.js        # Clinic and appointment data/logic
├── login.html        # Login page
├── register.html     # Registration page
└── style.css         # Shared styling
```

## Getting Started

No package manager, database installation, or build step is required for this frontend prototype.

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulrhman500-aed/project-CS50.git
   cd project-CS50
   ```

2. Open `register.html` in a modern browser to explore the registration interface, or open `clinics.html` to browse clinics.

3. Alternatively, serve the folder locally with Python:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000/register.html` or `http://localhost:8000/clinics.html`.

> Note: The current registration/login flow has known implementation and security limitations. The steps above describe how to launch the pages, not a guarantee that account creation and login work correctly.

## How It Works

The frontend uses JavaScript to render clinic and appointment information and uses browser `localStorage` for its prototype data. Stored data is local to the browser and can be lost when site storage is cleared. It is not shared reliably across devices or users.

## Known Limitations and Planned Improvements

- Fix registration field-value handling.
- Replace client-side password storage with secure backend authentication and password hashing.
- Add a backend and persistent database.
- Associate bookings with authenticated users and enforce access permissions.
- Prevent double booking and validate appointment availability on the server.
- Improve forms, error handling, accessibility, and responsive layout.
- Add patient, doctor, and administrator dashboards.
- Add automated tests and deployment instructions once a backend is implemented.

## Author

GitHub: [@abdulrhman500-aed](https://github.com/abdulrhman500-aed)

## Disclaimer

This is an educational project and should not be used to store real patient data or manage real clinical appointments in its current form.
