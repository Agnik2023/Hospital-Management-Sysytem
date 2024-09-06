const express = require('express');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const app = express();

app.use(express.static('public')); // Serve static files from the public folder

// Route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fetch patient details based on ABHA ID
app.get('/patient/:abhaId', (req, res) => {
    const abhaId = req.params.abhaId;
    const result = excelToJson({
        sourceFile: 'patients.xlsx',
        sheets: [{
            name: 'Sheet1',
            columnToKey: {
                A: 'name',
                B: 'age',
                C: 'abhaId',
                D: 'aadhar',
                E: 'gender'
            }
        }]
    });
    const patient = result.Sheet1.find(p => p.abhaId === abhaId);
    res.json(patient || null);
});

// Fetch available doctors
app.get('/doctors', (req, res) => {
    const result = excelToJson({
        sourceFile: 'doctors.xlsx',
        sheets: [{
            name: 'Sheet1',
            columnToKey: {
                A: 'name',
                B: 'specialization',
                C: 'available_time'
            }
        }]
    });
    res.json(result.Sheet1);
});

app.listen(3000, () => console.log('Server started on port 3000'));
