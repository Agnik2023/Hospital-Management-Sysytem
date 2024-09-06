function fetchPatientDetails() {
    const abhaId = document.getElementById('abha-id').value;

    fetch(`/patient/${abhaId}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('patient-info').innerHTML = `
                    <p>Name: ${data.name}</p>
                    <p>Age: ${data.age}</p>
                    <p>Gender: ${data.gender}</p>
                    <p>Aadhar Card: ${data.aadhar}</p>
                `;
                document.getElementById('book-doctor').style.display = 'block';
            } else {
                alert("Patient not found");
            }
        });
}

function showDoctorOptions() {
    fetch('/doctors')
        .then(response => response.json())
        .then(doctors => {
            let doctorOptions = '';
            doctors.forEach(doctor => {
                doctorOptions += `
                    <div class="doctor">
                        <p>Name: ${doctor.name}</p>
                        <p>Specialization: ${doctor.specialization}</p>
                        <p>Available Time: ${doctor.available_time}</p>
                        <button onclick="bookDoctor('${doctor.id}')">Book Now</button>
                    </div>
                `;
            });
            document.getElementById('doctor-options').innerHTML = doctorOptions;
            document.getElementById('doctor-options').style.display = 'block';
        });
}

function bookDoctor(doctorId) {
    const bookingId = Math.random().toString(36).substr(2, 8).toUpperCase();
    alert(`Booking Successful! Your Booking ID: ${bookingId}`);

    // Update patient info section with booking ID
    document.getElementById('patient-info').innerHTML += `<p>Booking ID: ${bookingId}</p>`;
}
