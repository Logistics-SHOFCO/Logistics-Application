function handleCredentialResponse(response) {
    const userData = jwt_decode(response.credential);
    const userEmail = userData.email;
    document.getElementById("email").value = userEmail;
}
function generateBookingID() {
    const bookingID = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("bid").value = bookingID;
}

window.onload = function() {
    generateBookingID();
};
function validateForm(event) {
                // Prevent the form from submitting
                event.preventDefault();

                // Get form values
                const bid = document.getElementById("bid").value;
                const email = document.getElementById("email").value;
                const ddate = document.getElementById("ddate").value;
                const rdate = document.getElementById("rdate").value;
                const passno = document.getElementById("passno").value;
                const dest = document.getElementById("dest").value;
                const dept = document.getElementById("dept").value;
                const pop = document.getElementById("pop").value;
                const tin = document.getElementById("tin").value;
                const tout = document.getElementById("tout").value;
                const vehicleCategory = document.getElementById("vehicle-category").value;
                const shvList = document.getElementById("shv-list").value;
                const hrvList = document.getElementById("hrv-list").value;

                // Check if required fields are filled
                if (!bid || !email || !ddate || !rdate || !passno || !dest || !dept || !pop || !tin || !tout || !vehicleCategory) {
                    alert("All fields required!");
                    return false;
                }

                // Check if a vehicle is selected based on category
                if (vehicleCategory === "shv" && shvList === "-") {
                    alert("Please select a SHOFCO vehicle.");
                    return false;
                }
                if (vehicleCategory === "hrv" && hrvList === "-") {
                    alert("Please select a Hire vehicle.");
                    return false;
                }
            }

function showVehicleList() {
    const category = document.getElementById("vehicle-category").value;
    const shofcoDropdown = document.getElementById("shofco-vehicles");
    const hireDropdown = document.getElementById("hire-vehicles");
    if (category === "shv") {
        shofcoDropdown.style.display = "block";
        hireDropdown.style.display = "none";
    } else if (category === "hrv") {
        hireDropdown.style.display = "block";
        shofcoDropdown.style.display = "none";
    } else {
        shofcoDropdown.style.display = "none";
        hireDropdown.style.display = "none";
    }
}
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("submissionForm");
    const formData = new FormData(form);

    // Send form data via fetch
    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert("Submitted Successfully!");
            form.reset(); // Clear the form
            generateBookingID(); // Regenerate booking ID
        } else {
            alert("Error, Did not Submit: " + data.error);
        }
    })
    .catch(error => {
        alert("Error, Did not Submit: " + error.message);
    });
}
document.getElementById("closeButton").addEventListener("click", function () {
    // Confirm all data has been submitted
    if (confirm("Are you sure you want to close this window? Make sure all data is submitted.")) {
        window.close();
    } else {
        alert("Closing canceled. Please complete the submission.");
    }
});
// Handle form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Simulate form submission (e.g., send to Google Form)
    // Assuming the submission is successful, enable the Close button
    setTimeout(() => {
        alert("Data submitted successfully!");
        document.getElementById("closeButton").disabled = false; // Enable close button
    }, 1000); // Simulate a 1-second delay for submission

    // You can call the real form submission here:
    // document.getElementById("myForm").submit(); 
});

// Close the window/tab after form submission
document.getElementById("closeButton").addEventListener("click", function() {
    if (confirm("Are you sure you want to close this window? Make sure all data is submitted.")) {
        window.close();
    } else {
        alert("Closing canceled. Please complete the submission.");
    }
});



