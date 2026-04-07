<div id="loginModal" class="login-modal" style="display: none;">
    <div class="login-modal-content">
        <!-- Login View -->
        <div id="login-view">
            <h2>Welcome Back</h2>
            <input type="email" id="login-email" placeholder="Email" />
            <input type="password" id="login-password" placeholder="Password" />
            <p id="login-error" style="color:red; display:none;"></p>
            <button onclick="handleLogin()">Login</button>
            <p>Don't have an account? <a onclick="showSignupView()">Sign up</a></p>
        </div>

        <!-- Signup View (hidden by default) -->
        <div id="signup-view" style="display:none;">
            <h2>Create Account</h2>
            <input type="text" id="signup-name" placeholder="Full Name" />
            <input type="email" id="signup-email" placeholder="Email" />
            <input type="password" id="signup-password" placeholder="Password" />
            <p id="signup-error" style="color:red; display:none;"></p>
            <button onclick="handleSignup()">Sign Up</button>
            <p>Already have an account? <a onclick="showLoginView()">Log in</a></p>
        </div>
    </div>
</div>
