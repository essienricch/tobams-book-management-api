const app = require('./app');

const PORT = process.env.PORT || 2024;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));