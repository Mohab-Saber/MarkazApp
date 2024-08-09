export { };
const markazLogo = require(`./markazLogo`);

// TemplateType
// can be either one of these: 
// 1- subject (done)
// 2- trainer (done)
// 3- trainee (done)
// 4- dateWithoutNames (done)
// 5- dateWithNames (undone)
// 6- courseListTrainees (done)
// 7- courseListTrainers (done)


const beforeTableHeader = (course) => {
  let title = `${course.subject}`;
 
  return `
        <table style="width:50%">
          <thead>
              <tr>
                <th>تاريخ البداية</th>
                <th>تاريخ النهاية</th>
                <th>عدد الأيام</th>
                <th>عدد الحضور</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>${course.startDate || ''}</td>
                <td>${course.finishDate || ''}</td>
                <td>${course.attendanceDays || ''}</td>
                <td>${course.attendanceNumber || ''}</td>
              </tr>
          </tbody>
      </table>
      `
}
const generateTraineeTable = (data20rows: any, pageNum, templateType) => {
  const tableRows = data20rows.map((element, index) => {
    if (templateType === 'courseListTrainees') {
      return `
        <tr>
          <td>${(index + 1) + (pageNum-1)*17 || ''}</td>
          <td>${element.fullName || ''}</td>
          <td style="font-size: small;font-weight: 600;">${element.teachersCode || ''}</td>
          <td style="font-size: small;font-weight: 600;">${element.nationalID || ''}</td>
          <td style="font-size: small;font-weight: 600;">${element.school?.name || ''}</td>
        </tr>`
    } else if (templateType === 'courseListTrainers' || templateType === 'trainer') {
      return `
      <tr>
          <td>${(index + 1) + (pageNum-1)*17 || ''}</td>
          <td>${element.fullName || ''}</td>
        </tr>`
   
    } else {
      throw new Error('Bad  Type');
    }

  });

  return `
        <table>
            <thead>
                <tr>
                    <th>م</th>
                    ${['courseListTrainees'].includes(templateType) ? `<th>الاسم</th>` : ``}
                    ${['courseListTrainees'].includes(templateType) ? `<th>كود المعلم</th>` : ``}
                    ${['courseListTrainees'].includes(templateType) ? `<th>الرقم القومي</th>` : ``}
                    ${['courseListTrainees'].includes(templateType) ? `<th>المدرسة</th>` : ``}
                    ${['courseListTrainers'].includes(templateType) ? `<th>الاسم</th>` : ``}

                </tr>
            </thead>
            <tbody>
                ${tableRows.join('')}
            </tbody>
        </table>
    `;
}
const generateHTMLForCourseList = (data20rows: any[], pageNum: Number, templateType, course) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Trainees List</title>
    <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      direction: rtl;
      display: flex;
      flex-direction: column;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    table {
      ${pageNum === 1 ? `margin-top: 10px;` : `margin-top: 60px;`}
      margin-right: auto;
      margin-left: auto;
      border-collapse: collapse;
      ${templateType === 'courseListTrainers' ? `width: 50%;` : `width: 95%;`}
    }
  
    th,
    td {
      padding: 8px;
      border: 1px solid #111;
    }
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .header img {
      width: 34%;
    }
  
    .course-title {
      text-align: center;
      width: 260px;
      font-size: x-large;
      font-weight: bold;
      margin-bottom: 0px;
    }
  
    .course-title p {
      margin: auto;
    }
  
    .course-num {
      text-align: center;
      width: 160px;
      font-size: larger;
      font-weight: bold;
      border-style: dashed;
      margin-left: 50px;
      margin-right: 50px;
    }
  
    .course-num p {
      margin: auto;
    }
    .course-subject{
    font-size: large;
    }
    .footer {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
    .footer-sign{
      display: flex;
      justify-content: space-around;
      text-align: center;
    }
  
    .footer p {
      font-size: larger;
      font-weight: bold;
    }
    .pageNumber{
      text-align: center;
    }
    </style>
  </head>
  <body>
   <div class="content">
  ${pageNum === 1 ? `<div class="header">
    ${markazLogo}
    <div class="course-title">
    
    
      <p style="font-size: small;">&nbsp</p>
      <p>${templateType === 'courseListTrainees' ? `قائمة متدربين دورة` : `قائمة مدربين دورة`}</p>
      <p style="font-size: small;">&nbsp</p>
      <p style="font-size: small;">&nbsp</p>
      <p style="font-size: large;">${course.subject || ''}</p>
    </div>

    <div class="course-num">
      <p>عدد ${templateType === 'courseListTrainees' ? `المتدربين` : `المدربين`}</p>
      <span>${templateType === 'courseListTrainees' ? course.trainees?.length :  course.trainers?.length}</span>
    </div>
    </div>` : ''}
    ${beforeTableHeader(course)}
    ${generateTraineeTable(data20rows, pageNum, templateType)}
    <div class="footer">
      <div class="footer-sign">
      <div class="course-admin">
        <p>مسئول التدريب</p>
        <span> (.......................................)</span>
      </div>
      <div class="markaz-admin">
        <p>مدير المركز</p>
        <span> (.......................................)</span>
      </div>
      </div>
      <div class="pageNumber"><p>صفحة ${pageNum}</p></div>
      </div>
      </div>
  </body>
  </html>
  `;

  return html

};
module.exports = generateHTMLForCourseList