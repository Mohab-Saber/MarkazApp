export{}
const markazLogo = require(`./markazLogo`);

const beforeTableHeader = (data20rows: any, templateType) => {
  let title = '';
  if (templateType === 'subject') {
    title = `${data20rows[0].subject}`
  } else if (templateType === 'trainer') {
    title = `اسم المدرب: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp`
  } else if (templateType === 'trainee') {
    title = `اسم المتدرب: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp`
  }
  return `
        <div class="">
          <h3 style="text-align:center;direction: rtl; ">
            ${title}
           </h3>
        </div>
      `
}
const generateTraineeTable = (data20rows: any, templateType, pageNum) => {
  const tableRows = data20rows.map((course, index) => {
    if (templateType === 'subject') {
      return `
        <tr>
            <td>${course.startDate || ''}</td>
            <td>${course.finishDate || ''}</td>
            <td>${course.attendanceDays || ''}</td>
            <td>${course.attendanceNumber || ''}</td>
        </tr>`
    } else if (templateType === 'trainee' || templateType === 'trainer') {
      return `
        <tr>
            <td>${course.subject || ''}</td>
            <td>${course.startDate || ''}</td>
            <td>${course.finishDate || ''}</td>
            <td>${course.attendanceDays || ''}</td>
            <td>${course.attendanceNumber || ''}</td>
        </tr>`
    } else if (templateType === 'dateWithNames') {
    return `
      <tr>
        <td>${course.subject || ''}</td>
        <td>${course.startDate || ''}</td>
        <td>${course.finishDate || ''}</td>
        <td>${course.attendanceDays || ''}</td>
        <td>${course.attendanceNumber || ''}</td>
        <td>${course.trainers.map((e) => (e.fullName)).join('<br>')}</td>
        <td>${course.trainees.map((e) => (e.fullName)).join('<br>')}</td>
      </tr>`
    } else if (templateType === 'dateWithoutNames') {
      return `
      <tr>
        <td>${(index + 1) + (pageNum-1)*20 || ''}</td>
        <td>${course.subject || ''}</td>
        <td>${course.startDate || ''}</td>
        <td>${course.finishDate || ''}</td>
        <td>${course.attendanceDays || ''}</td>
        <td>${course.attendanceNumber || ''}</td>
      </tr>`
    } else {
      throw new Error('Bad  Type');
    }

  });

  return `
        <table>
            <thead>
                <tr>
                    ${['dateWithoutNames'].includes(templateType) ? `<th>م</th>` : ``}
                    ${['trainee', 'trainer', 'dateWithoutNames', 'dateWithNames'].includes(templateType) ? `<th>الموضوع</th>` : ``}
                    <th>تاريخ البداية</th>
                    <th>تاريخ النهاية</th>
                    <th>عدد الأيام</th>
                    <th>عدد الحضور</th>
                    ${['dateWithNames'].includes(templateType) ? `<th>المدربين</th> <th>المتدربين</th>` : ``}
                </tr>
            </thead>
            <tbody>
                ${tableRows.join('')}
            </tbody>
        </table>
    `;
}
const generateHTML = (data20rows: String[], pageNum: Number, templateType, courseCount) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Trainees List</title>
    <style>
    body {
      direction: rtl;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    table {
      ${pageNum === 1 ? `margin-top: 10px;` : `margin-top: 60px;`}
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 100px;
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
      <p>
        ${templateType === 'subject' ? `تقرير موضوعي بدورات المركز` :
        templateType === 'trainer' ? `تقرير مدرب بدورات المركز` :
          templateType === 'trainee' ? `تقرير متدرب بدورات المركز` :
            templateType === 'dateWithNames' ? `تقرير فتري بدورات المركز` :
              `تقرير فتري بدورات المركز`
      }</p>
  
    </div>
    <div class="course-num">
      <p>عدد التدريبات</p>
        <span>${courseCount}</span>
    </div>
    </div>` : ''}
    ${beforeTableHeader(data20rows, templateType)}
    ${generateTraineeTable(data20rows, templateType, pageNum)}
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

module.exports = generateHTML