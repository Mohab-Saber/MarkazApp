import playwright from 'playwright';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
const fsPromises = require('fs').promises;
const os = require('os');
const htmlFilesPath = path.join(os.userInfo().homedir, 'AppData', 'local', 'Markaz', 'htmlFiles');
const pdfFilesPath = path.join(os.userInfo().homedir, 'AppData', 'local', 'Markaz', 'pdfFiles');
const outputPath = path.join(pdfFilesPath, '..', 'PDF');

const generateHTML = require('./htmlGenerator');
const generateHTMLForCourseList = require('./htmlGeneratorForCourseList');

const pdfDBFuncs = require('./pdfDataGetter');

const generateHTMLPages = (data: any = [], templateType : string) => {

  // Clearing path
  if (fs.existsSync(htmlFilesPath)) { fs.rmdirSync(htmlFilesPath, { recursive: true }) }
  fs.mkdirSync(htmlFilesPath)

  if(['subject', 'trainer', 'trainee', 'dateWithNames', 'dateWithoutNames'].includes(templateType)){
    for (let pageNum = 1; Math.ceil(data.length / 20) >= pageNum; pageNum++) {
      fs.writeFileSync(path.join(htmlFilesPath, `page${pageNum}.html`),
      generateHTML(data.slice((pageNum - 1) * 20, pageNum * 20), pageNum, templateType, data.length))
    }
  }else{
    for (let pageNum = 1; Math.ceil(data[templateType === 'courseListTrainees' ? 'trainees' : 'trainers'].length / 17) >= pageNum; pageNum++) {
      fs.writeFileSync(path.join(htmlFilesPath, `page${pageNum}.html`),
        generateHTMLForCourseList(data[templateType === 'courseListTrainees' ? 'trainees' : 'trainers'].slice((pageNum - 1) * 17, pageNum * 17), pageNum, templateType, data, data.subject))
    }
  }
}
const generatePDFPages = async (data, templateType) => {
  if (fs.existsSync(pdfFilesPath)) { fs.rmdirSync(pdfFilesPath, { recursive: true }) }
  fs.mkdirSync(pdfFilesPath, {recursive: true})

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();


  if(['subject', 'trainer', 'trainee', 'dateWithNames', 'dateWithoutNames'].includes(templateType)){
      
  for (let pageNum = 1; Math.ceil(data.length / 20) >= pageNum; pageNum++) {
    await page.goto(path.join(htmlFilesPath, `page${pageNum}.html`));
    await page.pdf({ path: path.join(pdfFilesPath, `page${pageNum}.pdf`) });
  }
  }else{
    for (let pageNum = 1; Math.ceil(data[templateType === 'courseListTrainees' ? 'trainees' : 'trainers'].length / 17) >= pageNum; pageNum++) {
      await page.goto(path.join(htmlFilesPath, `page${pageNum}.html`));
      await page.pdf({ path: path.join(pdfFilesPath, `page${pageNum}.pdf`) });
    }
  }
  await context.close();
  await browser.close();
}

const combinePDFs = async (pdfPaths) => {
  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();
  const sortedPaths = pdfPaths.sort((a, b) => a.length - b.length);
  // Iterate over each PDF path
  for (const pdfPath of sortedPaths) {
    // Read the PDF file
    const pdfBytes = await fsPromises.readFile(pdfPath);

    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Iterate over each page and add it to the merged PDF
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  // Write the merged PDF to a file
  const mergedPdfBytes = await mergedPdf.save();
  await fsPromises.writeFile(path.join(outputPath, 'combined1.pdf'), mergedPdfBytes);

  console.log(`Combined PDFs saved to ${path.join(outputPath, 'combined1.pdf')}`);
}

const makePdf = async (req, res) => {
  try {
    const pdfRequested = req.body;
    let data: any = [];
    if (pdfRequested.type === 'subject') {
      data = await pdfDBFuncs.getCoursesPdfSubject( pdfRequested.subject);
    } else if (pdfRequested.type === 'trainee') {
      data = await pdfDBFuncs.getCoursesPdfTrainee( pdfRequested.trainee);

    } else if (pdfRequested.type === 'trainer') {
      data = await pdfDBFuncs.getCoursesPdfTrainer( pdfRequested.trainer);

    } else if (pdfRequested.type === 'dateWithNames') {
      data = await pdfDBFuncs.getCoursesPdfDateWithNames( pdfRequested.startDate, pdfRequested.finishDate);
    } else if (pdfRequested.type === 'dateWithoutNames') {
      data = await pdfDBFuncs.getCoursesPdfDateWithoutNames( pdfRequested.startDate, pdfRequested.finishDate);
    } else if (pdfRequested.type === 'courseListTrainees') {
      data = await pdfDBFuncs.getCourseDataList( pdfRequested.courseID);
    } else if (pdfRequested.type === 'courseListTrainers') {
      data = await pdfDBFuncs.getCourseDataList( pdfRequested.courseID);

    } else {
      throw new Error('Bad Type');
    }

    generateHTMLPages(data, pdfRequested.type);
    await generatePDFPages(data, pdfRequested.type);

    let pdfsPaths: any = [];
    const pdfFiles = fs.readdirSync(pdfFilesPath);
    pdfsPaths = pdfFiles.map((file) => { return path.join(pdfFilesPath, file) })
    if (!fs.existsSync(outputPath)) { fs.mkdirSync(outputPath) }

    await combinePDFs(pdfsPaths)


    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}


module.exports = { makePdf }





