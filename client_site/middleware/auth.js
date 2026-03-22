const { createClient } = require('./supabase');

exports.requireAdmin = async (req, res, next) => {
    console.log("requireAdmin hit");

    const supabase = createClient(req, res);
    const { data: { user }, error } = await supabase.auth.getUser();

    console.log("User in requireAdmin:", user);

    if (error || !user) {
        console.log("❌ No user, redirecting");
        return res.redirect('/login');
    }

    const role = user.app_metadata?.role;
    console.log("Role:", role);

    if (role !== 'admin') {
        console.log("❌ Not admin");
        return res.status(403).render('403', { pageTitle: 'Forbidden' });
    }

    console.log("✅ Admin verified");
    next();
};

exports.setUserLocals = async (req, res, next) => {
    console.log("setUserLocals hit");

    try {
        const supabase = createClient(req, res);
        const { data: { user } } = await supabase.auth.getUser();

        console.log("User in locals:", user);

        res.locals.isAdmin = user?.app_metadata?.role === 'admin';
        res.locals.isLoggedIn = !!user;

        next();
    } catch (err) {
        console.error("setUserLocals error:", err);
        next(); // don't block the request
    }
};