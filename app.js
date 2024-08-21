const express = require('express');
const app = express();
const port = 4000;

const path = require('path');

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Middleware to check if the request is during working hours
function workingHoursMiddleware(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours(); // 0 to 23

    // Working hours are Monday to Friday, 9:00 to 17:00
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Proceed to the route handler
    } else {
        res.status(403).send('Sorry, the application is only available during working hours.');
    }
}

// Apply the working hours middleware
app.use(workingHoursMiddleware);

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('home'); // Render the home.ejs template
});

app.get('/services', (req, res) => {
    res.render('services'); // Render the services.ejs template
});

app.get('/contact', (req, res) => {
    res.render('contact'); // Render the contact.ejs template
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
