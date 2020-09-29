const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; // Heroku will set the env, default for local is port 3000

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html')); // to not get an error if the user refreshes the /<page>
})

app.listen(port, () => {
    console.log('Server is up!');
});