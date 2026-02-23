/* =========================================
    Meghan Andrews - 2/12/2026
    FACEBOOK SDK INITIALIZATION

    Documentation:
    - Facebook Graph API Tool: https://developers.facebook.com/tools/explorer/
    - Facebook login documentation: https://developers.facebook.com/docs/facebook-login/web
   ========================================= */

/*
Function to load the Facebook SDK asynchronously.
 This self-invoking function dynamically loads
 the Facebook SDK script into the page.
*/
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];

    // Prevent loading SDK twice
    if (d.getElementById(id)) return;

    js = d.createElement(s);
    js.id = id;

    // External SDK source
    js.src = "https://connect.facebook.net/en_US/sdk.js";

    // Insert SDK script into document
    fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));

/*
 window.fbAsyncInit runs after the Facebook SDK
 has finished loading asynchronously.
 This ensures FB methods are available before use.
*/
window.fbAsyncInit = function () {

    // Initialize the Facebook SDK with app credentials
    FB.init({
        appId: '1463756312015624',  // Your Facebook App ID
        cookie: true,              // Enables cookies for session handling
        xfbml: true,               // Parses social plugins (like login button)
        version: 'v19.0'           // Graph API version
    });

    /*
     API Request Logic:
     Immediately check the user’s login status when the page loads.
     This sends a request to Facebook servers to determine whether
     the user is authenticated with your app.
    */
    FB.getLoginStatus(function(response) {

        /*
         Async Handling:
         FB.getLoginStatus() is asynchronous. The callback function runs ONLY after Facebook returns a response from their servers.
        */
        statusChangeCallback(response);
    });
};

// Function to fetch user information from Facebook Graph API
function getUserInfo() {

    /*
     API Request Logic:
     FB.api() sends a request to the Facebook Graph API.
     '/me' requests data about the currently logged-in user.
     'fields' specifies which user data I want returned.
    */
    FB.api(
        '/me',
        'GET',
        { "fields": "id,name" },

        /*
         Async Handling:
         This callback runs once Facebook returns
         the requested user data.
        */
        function(response) {

            /*
             Response Processing:
             Check if the response exists and contains no errors.
             If valid, extract user data and update the DOM.
            */
            if (response && !response.error) {

                const userId = response.id;       // User's Facebook ID
                const userName = response.name;   // User's Facebook Name

                // Display username on the page
                document.getElementById("username").textContent = userName;
                document.getElementById("username").style.display = "inline";

            } else {

                // Handle API errors
                console.error('Error fetching user info:', response.error);
            }
        }
    );
}


// Function to handle changes in login status
function statusChangeCallback(response) {
    /*
     Response Processing:
     The response object contains a status field:
     - "connected" → Logged into Facebook + authorized app
     - "not_authorized" → Logged into Facebook but not your app
     - "unknown" → Not logged into Facebook
    */
    if (response.status === 'connected') {
        document.getElementById("loginModal").style.display = "none";
        document.body.style.overflow = "auto";
        // Retrieve user info from Graph API
        getUserInfo();
    } else {
        document.getElementById("loginModal").style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Function to allow users to continue as guests without logging in
function continueAsGuest() {

    document.getElementById("loginModal").style.display = "none";
    document.body.style.overflow = "auto";
}
