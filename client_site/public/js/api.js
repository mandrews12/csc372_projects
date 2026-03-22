/* =========================================
    Meghan Andrews - 2/12/2026
    AUTHENTICATION & MODAL LOGIC

    Handles Supabase login and signup via a
    toggling modal. Persists auth state across
    pages using sessionStorage.

    Documentation:
    - Supabase JS Client: https://supabase.com/docs/reference/javascript
    - sessionStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
   ========================================= */

/*
 On every page load, check sessionStorage for an existing
 auth choice. If the user is already logged in, restore
 their username in the nav without re-hitting the server.
*/
document.addEventListener("DOMContentLoaded", function () {

    if (sessionStorage.getItem("authChoice") === "connected") {

        // User already logged in this session — restore their name in the nav
        showUserInNav(sessionStorage.getItem("userName") || "");
    }
});

/* ---- Modal Open / Close ---- */

// Opens the login modal and defaults to the login view
function openLoginModal() {

    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display     = "flex";
        document.body.style.overflow = "hidden";
        showLoginView();   // Always open on login tab, not signup
    }
}

// Closes the modal and resets all fields and errors
function closeLoginModal() {

    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display     = "none";
        document.body.style.overflow = "auto";
    }
}

/* ---- Login / Signup Toggle ---- */

// Shows the login form and hides the signup form
function showLoginView() {

    document.getElementById("login-view").style.display  = "block";
    document.getElementById("signup-view").style.display = "none";
}

// Shows the signup form and hides the login form
function showSignupView() {

    document.getElementById("login-view").style.display  = "none";
    document.getElementById("signup-view").style.display = "block";
}

/* ---- Login ---- */

/*
 Handles login form submission.
 POSTs credentials to /api/login on the Express server,
 which calls Supabase signInWithPassword server-side.

 Async Handling:
 fetch() is asynchronous — await pauses until the
 server responds before processing the result.
*/
async function handleLogin() {

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const errorEl = document.getElementById("login-error");

    // Clear previous errors
    errorEl.style.display = "none";
    errorEl.textContent   = "";

    /*
     API Request Logic:
     POST to /api/login — server handles the Supabase call
     and returns { name } on success or { error } on failure.
    */
    try {
        const response = await fetch('/api/login', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password })
        });

        /*
         Response Processing:
         Parse JSON and check HTTP status.
         401 = bad credentials, 500 = server error.
        */
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            errorEl.textContent   = data.error || "Login failed. Please try again.";
            errorEl.style.display = "block";
            return;
        }

        // Persist auth state so modal won't reappear on navigation
        sessionStorage.setItem("authChoice", "connected");
        sessionStorage.setItem("userName",   data.name);

        showUserInNav(data.name);
        closeLoginModal();

    } catch (err) {

        // Handle network errors (e.g. server is down)
        errorEl.textContent   = "Unable to connect. Please try again.";
        errorEl.style.display = "block";
        console.error("Login error:", err);
    }
}

/* ---- Signup ---- */

/*
 Handles signup form submission.
 POSTs new user details to /api/signup on the Express server,
 which calls Supabase signUp server-side.
 No email confirmation required — user is logged in immediately.
*/
async function handleSignup() {

    const name     = document.getElementById("signup-name").value.trim();
    const email    = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const errorEl  = document.getElementById("signup-error");

    // Clear previous errors
    errorEl.style.display = "none";
    errorEl.textContent   = "";

    /*
     API Request Logic:
     POST to /api/signup — server calls Supabase signUp
     and stores the display name in user metadata.
    */
    try {
        const response = await fetch('/api/signup', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password, name })
        });

        /*
         Response Processing:
         Parse JSON and check HTTP status.
         400 = email already in use or invalid input.
        */
        const data = await response.json();

        if (!response.ok) {
            errorEl.textContent   = data.error || "Signup failed. Please try again.";
            errorEl.style.display = "block";
            return;
        }

        // Persist auth state and log user in immediately
        sessionStorage.setItem("authChoice", "connected");
        sessionStorage.setItem("userName",   data.name);

        showUserInNav(data.name);
        closeLoginModal();

    } catch (err) {

        // Handle network errors
        errorEl.textContent   = "Unable to connect. Please try again.";
        errorEl.style.display = "block";
        console.error("Signup error:", err);
    }
}

/* ---- Nav ---- */

/*
 Swaps the login button in the nav for the
 logged-in user's name with a person icon.
*/
function showUserInNav(userName) {

    const loginBtn = document.getElementById("nav-login-btn");
    if (loginBtn) {
        loginBtn.innerHTML    = `<i class="fa-solid fa-circle-user"></i> ${userName}`;
        loginBtn.onclick      = null;        // Remove modal trigger once logged in
        loginBtn.style.cursor = "default";
    }
}