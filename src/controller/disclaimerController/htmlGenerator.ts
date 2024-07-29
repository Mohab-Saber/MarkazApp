export{}
const markazLogo = require(`./markazLogo`);

const generateDisclaimerContent = (data2rows: any, pageNum, templateType, course) => {
  const tableRows = data2rows.map((element, index) => {
      return `
        <div class="content">

          <div class="header">
            <div class="course-title">
              <p>إخـــلاء</p>
            </div>
            ${markazLogo}

            <div class="course-title">
              <p>طــــرف</p>
            </div>

          </div>
          <div class="middle">
            <p>يشهد مركز التنمية المهنية للمعلمين ببركة السبع بأن السيد الأستاذ</p>
            <div class="person">
              <p class="person-content">${element.fullName || ' '}</p>
              ${templateType === 'traineeDisclaimer' || templateType === 'traineeDisclaimerSelection'? `
              <div class="person-content">
                <span>ادارة</span>
                <br>
                <span>بركة السبع</span>
              </div>
              <div class="person-content">
                <span>${element.school?.name ? 'مدرسة' : ' '}</span>
                <br>
                <span>${element.school?.name || ' '}</span>
                </div>
                ` :
                ``}
            </div>
            <p>قد تفضل ${templateType === 'traineeDisclaimer' || templateType === 'traineeDisclaimerSelection' ? 'بحضور' : `بالمحاضرة في`} دورة</p>
            <p>${course.subject || ' '}</p>
            <span>بالمركز في الفترة من ${course.startDate || ' '} الي ${course.finishDate || ' '}</span>
            <br>
            <span>وقد تغيب يوم ........................................................................</span>
            <span style="margin: 8px;display: block;">وتفضلوا بقبول وافر الاحترام</span>

          </div>
          <div class="footer">
            <div class="course-admin">
              <p>مسئول التدريب</p>
              <span> (...................................)</span>
            </div>
            <div class="markaz-admin">
              <p>مدير المركز</p>
              <span> (...................................)</span>
            </div>
          </div>

        </div>
    `
  });

  return `
    ${tableRows.join('')}
    `;
}
const generateHTML = (data2rows: String[], pageNum: Number, templateType, course) => {
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
          padding: 20px;
          margin: 5px;
          margin-top: 25px;
          border-style: double;
          border-width: 5px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header img {
          width: 30%;
        }

        .course-title {
          text-align: center;
          width: 200px;
          font-size: x-large;
          font-weight: bold;
        }

        .course-title p {
          margin: auto;
          font-size: 28px;
        }

        .middle {
          margin-top: 10px;
          font-size: large;
          text-align: center;
          font-weight: bold;
        }

        .person {
          display: flex;
          justify-content: space-evenly;
        }
        .person-content{
          width: 30%
        }
        .middle p {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .middle span {
          font-size: medium;
          font-weight: 600;
          text-align: center;
        }

        .footer {
          display: flex;
          justify-content: space-around;
          text-align: center;

        }

        .footer p {
          font-size: larger;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      
      ${generateDisclaimerContent(data2rows, pageNum, templateType, course)}

    </body>

    </html>
  `;

  return html

};

module.exports = generateHTML