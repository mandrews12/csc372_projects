/* =========================================
    Meghan Andrews - 2/28/2026
    API ROUTES

    REST endpoints for authentication.
    All routes are prefixed with /api via server.js.

    POST /api/login  — sign in existing user
    POST /api/signup — register new user

    Documentation:
    - Supabase Auth: https://supabase.com/docs/reference/javascript/auth-signinwithpassword
    - Supabase SignUp: https://supabase.com/dashboard/project/tqxtkssnrpmqavbvzthn/integrations/data_api/docs?page=users-management
    - Express Router: https://expressjs.com/en/guide/routing.html
   ========================================= */

const express = require('express');
const router  = express.Router();
const { createClient } = require('../middleware/supabase');

/*
 POST /api/login
 Accepts email and password from the login modal.
 Calls Supabase signInWithPassword and returns the
 user's display name on success.
*/
router.post('/login', async (req, res) => {

    const supabase = createClient(req, res);
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) return res.status(401).json({ error: error.message });

    // Return display name — fall back to email if full_name not set
    const name = data.user.user_metadata.full_name || data.user.email;
    res.json({ name });
});

/*
 POST /api/signup
 Accepts email, password, and name from the signup modal.
 Calls Supabase signUp with no email confirmation required
*/
router.post('/signup', async (req, res) => {

    const supabase = createClient(req, res);
    const { email, password, name } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // Store display name in user metadata
            data: { full_name: name }
        }
    });

    if (error) return res.status(400).json({ error: error.message });

    // Return the name they signed up with
    res.json({ name: name || data.user.email });
});



module.exports = router;