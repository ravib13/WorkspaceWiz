const API_URL = "";

let currentUser = localStorage.getItem("user_email");
let myModal;
let selectedSpaceId = null;
let selectedSeatId = null;

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("adminTabs")) {
        loadAdminDashboard();
    } else if (currentUser && document.getElementById("login-section")) {
        showDashboard();
    }
});

// ================= TOAST =================
function showToast(message, type = "success") {
    const container = document.querySelector(".toast-container");

    const id = "toast-" + Date.now();

    container.insertAdjacentHTML("beforeend", `
        <div id="${id}" class="toast align-items-center text-bg-${type} border-0 show">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `);

    setTimeout(() => {
        document.getElementById(id)?.remove();
    }, 4000);
}

// ================= AUTH =================
async function sendOtp() {
    const email = document.getElementById("email-input").value.trim();

    if (!email) {
        showToast("Enter valid email", "danger");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (!res.ok) {
            showToast(data.error || "OTP failed", "danger");
            return;
        }

        document.getElementById("step-1").classList.add("d-none");
        document.getElementById("step-2").classList.remove("d-none");

        showToast("OTP sent!");

    } catch (err) {
        showToast("Server not reachable", "danger");
        console.error(err);
    }
}
async function verifyOtp() {
    const email = document.getElementById("email-input").value.trim();
    const otp = document.getElementById("otp-input").value.trim();

    try {
        const res = await fetch(`${API_URL}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp })
        });

        const data = await res.json();

        if (!res.ok) {
            return showToast(data.error || "Invalid OTP", "danger");
        }

        currentUser = data.user.email;
        localStorage.setItem("user_email", currentUser);
        localStorage.setItem("is_admin", data.isAdmin);

        showDashboard();

    } catch (err) {
        showToast("Login failed", "danger");
    }
}

async function logout() {
    await fetch(`${API_URL}/logout`, { method: "POST" });

    localStorage.clear();
    location.reload();
}

// ================= DASHBOARD =================
function showDashboard() {
    document.getElementById("login-section")?.classList.add("d-none");
    document.getElementById("dashboard-section")?.classList.remove("d-none");

    document.getElementById("user-info").classList.remove("d-none");
    document.getElementById("user-email").innerText = currentUser;

    loadSpaces();
    loadBookings();
    loadWishlist();
}

// ================= SPACES =================
async function loadSpaces() {
    const container = document.getElementById("spaces-list");
    container.innerHTML = "Loading...";

    try {
        const res = await fetch(`${API_URL}/spaces`);
        const spaces = await res.json();

        container.innerHTML = "";

        spaces.forEach(space => {
            container.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5>${space.name}</h5>
                            <p>${space.type} | Floor ${space.floor}</p>
                            <p>₹${space.price}</p>

                            <button class="btn btn-primary btn-sm"
                                onclick="openBookingModal('${space._id}')">
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        container.innerHTML = "Failed to load spaces";
    }
}

// ================= BOOKING =================
function openBookingModal(spaceId) {
    selectedSpaceId = spaceId;
    selectedSeatId = null;

    myModal = new bootstrap.Modal(document.getElementById("bookingModal"));
    myModal.show();
}

async function confirmBooking() {
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;

    if (!date) return showToast("Select date", "danger");
    if (!selectedSpaceId) return showToast("Select space", "danger");

    try {
        const res = await fetch(`${API_URL}/book`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: currentUser,
                space_id: selectedSpaceId,
                date,
                time_slot: time
            })
        });

        const data = await res.json();

        if (!res.ok) {
            return showToast(data.error || "Booking failed", "danger");
        }

        showToast("Booking successful");
        myModal.hide();
        loadBookings();

    } catch (err) {
        showToast("Booking error", "danger");
    }
}

// ================= BOOKINGS =================
async function loadBookings() {
    const container = document.getElementById("bookings-list");
    container.innerHTML = "Loading...";

    try {
        const res = await fetch(`${API_URL}/my-bookings/${currentUser}`);
        const bookings = await res.json();

        container.innerHTML = "";

        bookings.forEach(b => {
            container.innerHTML += `
                <div class="list-group-item">
                    <b>${b.date}</b><br>
                    ${b.time_slot}<br>
                    Status: ${b.status}

                    ${b.status === "booked" ? `
                        <button class="btn btn-danger btn-sm mt-2"
                            onclick="cancelBooking('${b._id}')">
                            Cancel
                        </button>
                    ` : ""}
                </div>
            `;
        });

    } catch (err) {
        container.innerHTML = "Failed to load bookings";
    }
}

async function cancelBooking(id) {
    await fetch(`${API_URL}/cancel/${id}`, { method: "DELETE" });
    showToast("Cancelled");
    loadBookings();
}

// ================= WISHLIST =================
async function loadWishlist() {
    const container = document.getElementById("wishlist-items");
    if (!container) return;

    try {
        const res = await fetch(`${API_URL}/api/wishlist/${currentUser}`);
        const data = await res.json();

        container.innerHTML = "";

        data.forEach(item => {
            container.innerHTML += `
                <div class="card p-2 mb-2">
                    Space ID: ${item.space_id}
                </div>
            `;
        });

    } catch (err) {
        container.innerHTML = "Failed";
    }
}