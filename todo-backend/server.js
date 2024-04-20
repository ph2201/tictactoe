const taskRoutes = require('./taskRoutes'); // import taskRoutes
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9973;

// Middleware

app.use(express.json());

// Routes

app.use('/api', taskRoutes); // use taskRoutes for routes starting with '/api'

app.get('/', (req, res) => {
	res.send('Men evigheden, der hvælver over og højt over det timelige, rolige som stjernehvælvingen om natten, og Gud i himlen, som i den ophøjede ros salighed holder øje med, uden den mindste følelse af svimmelhed i en sådan højde, disse utallige skarer af mænd og kender hvert enkelt individ ved navn—Han, den store eksaminator, siger, at kun én når målet.');
});

// Start server

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
