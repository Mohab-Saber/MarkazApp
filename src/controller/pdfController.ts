import pdf from "pdf-creator-node";


const generateTraineeTable = (data) => {
    const tableRows = data.map(trainee => `
        <tr>
            <td>${trainee.fullName}</td>
            <td>${trainee.jobTitle}</td>
            <td>${trainee.email}</td>
            <td>${trainee.address}</td>
        </tr>
    `);

    return `
        <table>
            <thead>
                <tr>
                    <th>FullName</th>
                    <th>JobTitle</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows.join('')}
            </tbody>
        </table>
    `;
}
const generatePDF = (data) => {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Trainees List</title>
    <style>
        body {
direction: rtl;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            
        }
        th, td {
            padding: 8px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>قائمة المتدربين</h1>
    <img src="mm.jpg" alt="manga">
    ${generateTraineeTable(data)}
</body>
</html>
`;
    const document = {
        html: html,
        data: [],
        path: './output.pdf'
    };
    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm'
    };

    pdf.create(document, options)
        .then(res => {
            console.log(res); // Success message (e.g., { filename: 'employee-list.pdf' })
        })
        .catch(error => {
            console.error(error);
        });


};


const makePdf = async (req, res) => {
    try {
        generatePDF(req.body)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


module.exports = { makePdf }





