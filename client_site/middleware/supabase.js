/* =========================================
    Meghan Andrews - 3/18/2026
    SUPABASE AUTH INITIALIZATION

    Documentation:
    - Client Creation: https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=express
========================================= */

const { createServerClient, parseCookieHeader, serializeCookieHeader } = require('@supabase/ssr');

exports.createClient = (req, res) => {
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
        cookies: {
            getAll() {
                return parseCookieHeader(req.headers.cookie ?? '');
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    res.appendHeader('Set-Cookie', serializeCookieHeader(name, value))
                );
            },
        },
    });
};