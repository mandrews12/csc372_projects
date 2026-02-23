// Load the http module
const http = require('http');
// Load the file system module
const fs = require('fs');
// Constant that stores the port number (e.g., 3000)
const PORT = 3000;

function serveStaticFile(res, path, contentType, resCode) {
    if (!resCode) {
        resCode = 200;
    }

    // Attempts to read the file at the given path
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            // Sets status code 500 if a server error occurs
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            // Sets status code 200 when successful (or passed-in resCode)
            // Sends the correct Content-Type header based on the file type
            res.writeHead(resCode, { 'Content-Type': contentType });
            // Sends the file data in the response
            res.end(data);
        }
    });
}

// Use createServer to:
http.createServer((request, response) => {

    // Normalize the URL path by removing query strings and trailing slashes,
    // and converting to lowercase.
    let path = request.url.split('?')[0].toLowerCase();
    if (path !== '/' && path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    console.log(path);

    // Map the URL paths to files inside the public folder.
    // Serve HTML pages, CSS files, JavaScript files, and images
    switch (path) {
        case '/':
            serveStaticFile(response, '/public/index.html', 'text/html');
            break;
        case '/index':
            serveStaticFile(response, '/public/index.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(response, '/public/about.html', 'text/html');
            break;
        case '/contact':
            serveStaticFile(response, '/public/contact.html', 'text/html');
            break;
        case '/products':
            serveStaticFile(response, '/public/products.html', 'text/html');
            break;
        default:
            // Serve CSS, JS, and image files by mapping the path directly
            if (path.endsWith('.css')) {
                serveStaticFile(response, '/public' + path, 'text/css');
            } else if (path.endsWith('.js')) {
                serveStaticFile(response, '/public' + path, 'application/javascript');
            } else if (path.endsWith('.png')) {
                serveStaticFile(response, '/public' + path, 'image/png');
            } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
                serveStaticFile(response, '/public' + path, 'image/jpeg');
            } else if (path.endsWith('.gif')) {
                serveStaticFile(response, '/public' + path, 'image/gif');
            } else if (path.endsWith('.svg')) {
                serveStaticFile(response, '/public' + path, 'image/svg+xml');
            } else {
                // If the requested path or file is not found,
                // serve custom 404 page and set HTTP status code to 404.
                serveStaticFile(response, '/public/404.html', 'text/html', 404);
            }
            break;
    }

// Tell the server which port to listen on and output the server URL to the console.
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});