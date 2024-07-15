const fs = require('fs');
const path = require('path');
const os = require('os');
const pdfFilesPath = path.join( os.userInfo().homedir, 'AppData', 'local', 'Markaz', 'pdfFiles');

// Function to get all files in a directory synchronously
  try {
    const files = fs.readdirSync(pdfFilesPath);
    console.log('Files found:');
    files.forEach(file => {
      console.log(file);
    });
    return files;
  } catch (err) {
    throw err;
  }
