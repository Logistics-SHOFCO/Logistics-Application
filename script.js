function handleCredentialResponse(response) {
    try {
        const userData = jwt_decode(response.credential);
        const userEmail = userData.email || "Unavailable";
        document.getElementById("email").value = userEmail;
        console.log("User email captured:", userEmail);
    } catch (error) {
        console.error("Failed to capture email:", error);
    }
}

function generateBookingID() {
    const bookingID = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("bid").value = bookingID;
}

document.getElementById("vehicle-category").addEventListener("change", showVehicleList);

function showVehicleList() {
    const category = document.getElementById("vehicle-category").value;
    const shofcoDropdown = document.getElementById("shofco-vehicles");
    const hireDropdown = document.getElementById("hire-vehicles");

    if (category === "shv") {
        shofcoDropdown.style.display = "block";
        hireDropdown.style.display = "none";
        document.getElementById("hrv-list").value = "-";
    } else if (category === "hrv") {
        hireDropdown.style.display = "block";
        shofcoDropdown.style.display = "none";
        document.getElementById("shv-list").value = "-";
    } else {
        shofcoDropdown.style.display = "none";
        hireDropdown.style.display = "none";
    }

    // Force a re-check for the dropdown
    validateVehicleSelection();
}

function validateVehicleSelection() {
    const category = document.getElementById("vehicle-category").value;
    const shvList = document.getElementById("shv-list").value;
    const hrvList = document.getElementById("hrv-list").value;

    if (category === "shv" && shvList === "-") {
        alert("Please select a SHOFCO vehicle.");
    } else if (category === "hrv" && hrvList === "-") {
        alert("Please select a Hire vehicle.");
    }
}


function handleSubmit(event) {
     if (event && event.preventDefault) {
        event.preventDefault(); // Stops the default submission
    } else {
        event.returnValue = false; // For older mobile browsers
    } // Prevent default form submission

    // Validation logic
    const bid = document.getElementById("bid").value.trim();
    const email = document.getElementById("email").value.trim();
    const ddate = document.getElementById("ddate").value;
    const rdate = document.getElementById("rdate").value;
    const passno = document.getElementById("passno").value.trim();
    const dest = document.getElementById("dest").value.trim();
    const dept = document.getElementById("dept").value.trim();
    const pop = document.getElementById("pop").value.trim();
    const tin = document.getElementById("tin").value;
    const tout = document.getElementById("tout").value;
    const vehicleCategory = document.getElementById("vehicle-category").value;
    const shvList = document.getElementById("shv-list").value;
    const hrvList = document.getElementById("hrv-list").value;

    // Check if required fields are filled
    if (!bid || !email || !ddate || !rdate || !passno || !dest || !dept || !pop || !tin || !tout || !vehicleCategory) {
        alert("All fields are required!");
        return; // Stop further execution
    }

    // Check if a specific vehicle is selected
    if (vehicleCategory === "shv" && shvList === "-") {
        alert("Please select a SHOFCO vehicle.");
        return;
    }
    if (vehicleCategory === "hrv" && hrvList === "-") {
        alert("Please select a Hire vehicle.");
        return;
    }

    // Form submission using fetch API
    const form = document.getElementById("submissionForm");
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.result === "success") {
                alert("Submitted Successfully!");
                form.reset();
                generateBookingID(); // Regenerate booking ID
            } else {
                alert("Error, Did not Submit: " + data.error);
            }
        })
        .catch((error) => {
            alert("Error, Did not Submit: " + error.message);
        });
}


document.addEventListener("DOMContentLoaded", () => {
    generateBookingID();

    document.getElementById("submissionForm").addEventListener("submit", handleSubmit);
    document.getElementById("closeButton").addEventListener("click", function () {
    if (confirm("Are you sure you want to close this window? Make sure all data is submitted.")) {
        try {
            window.close();
        } catch (e) {
            alert("Please close this tab manually.");
        }
    }
});

});
