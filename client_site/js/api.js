/* ---- Modal Open / Close ---- */

// Opens the login modal and defaults to the login view
function openLoginModal() {

    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Closes the modal and resets all fields and errors
function closeLoginModal() {

    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("nav-login-btn");
    const closeBtn = document.getElementById("close-login-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLoginModal);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", openLoginModal);
    }

    const signup_button = document.getElementById('toggle-btn');
    const toggleText = document.getElementById('toggle-text');

    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');

    if (signup_button) {
        signup_button.addEventListener('click', function() {

            if (loginView.style.display === 'flex') {
                // Switch to SIGNUP
                signupView.style.display = 'flex';
                loginView.style.display = 'none';

                toggleText.textContent = "Already have an account?";
                signup_button.textContent = "Log In";

            } else {
                // Switch to LOGIN
                signupView.style.display = 'none';
                loginView.style.display = 'flex';

                toggleText.textContent = "New User?";
                signup_button.textContent = "Sign Up";
            }

        });
    }

});