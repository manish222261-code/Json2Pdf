import { jsPDF } from "jspdf";
import { readFile } from 'node:fs/promises';

try{
    const filePath = './pyq/evs.json';
    const pyqData = await readFile(filePath, 'utf-8');
    const pyqJson = JSON.parse(pyqData);




    // Initializing PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210,276]
    });

    // Page 1

    pdf.setFontSize(10);
    pdf.text(pyqJson.subject_code ,169, 29);

    // University
    pdf.setFont("times" , "bold");
    pdf.setFontSize(16);
    pdf.text(pyqJson.university , 48, 39 ,{charSpace : '0'});


    // Examination
    pdf.setFontSize(13);
    pdf.text(pyqJson.exam , 53, 48);


    // Subject
    pdf.setFontSize(10);
    pdf.text(`Subject : ${pyqJson.subject}` , 21 , 56);

    // Subject Code
    pdf.setFontSize(10);
    pdf.text(`Subject Code : ${pyqJson.subject_code}` , 140 , 56);

    // Time Allowed
    pdf.setFontSize(10);
    pdf.text(`Time Allowed : ${pyqJson.duration}` , 21 , 62);

    // Full Marks
    pdf.setFontSize(10);
    pdf.text(`Full Marks : ${pyqJson.full_marks}` , 140 , 62);

    // Line 1
    pdf.line(20,69,182,69);

    // Line 2
    pdf.line(20,88,182,88);



    // Question 1 (MCQs)
    //console.log(pyqJson.questions[0].sub_questions[0]);

    // Question 2 (Long Answers)
    //console.log(pyqJson.questions[1].sub_questions[0]);

    // Question 3 (Long Answers)
    //console.log(pyqJson.questions[2].sub_questions[0]);


    let y = 95;
    let opt = 0;
    let opty = 100;
    // sub_questionsLength is how many MCQs Questions Available
    let sub_questionsLength = pyqJson.questions.length;

    // Font Size
    pdf.setFont("times" , "normal");

    // Iterating over Total MCQs Questions
    for(let i = 0; i < sub_questionsLength; i++){
        pdf.text(pyqJson.questions[0].sub_questions[i].sub_number + " " + pyqJson.questions[0].sub_questions[i].text,25,y);
        opty = opty + 5;
        pdf.text("(a)" + " " + pyqJson.questions[0].sub_questions[i].options[opt], 41 , opty);
        pdf.text("(b)" + " " + pyqJson.questions[0].sub_questions[i].options[opt + 1], 119 , opty);
        opty = opty + 5;
        pdf.text("(c)" + " " + pyqJson.questions[0].sub_questions[i].options[opt + 2], 41 , opty);
        pdf.text("(d)" + " " + pyqJson.questions[0].sub_questions[i].options[opt + 3], 119 , opty);
        opty = opty + 15;
        opt = 0;
        y = y + 25;
    }
    
    
    
    
        // Page 2 
                  
    
    
    let page2_Y = 40;
    pdf.addPage([210,276] , 'portrait');

    for (let j = 1; j < pyqJson.questions.length; j++) {
        const question = pyqJson.questions[j];
        for (let k = 0; k < question.sub_questions.length; k++) {
            const subQ = question.sub_questions[k];
            if (question.sub_questions.length == 1){
                pdf.text(`${question.number}. ${subQ.text}`, 25, page2_Y, { maxWidth: '150' });
               
            } else {
                //pdf.text(`${question.number}. ${question.text}`, 25, page2_Y, { maxWidth: '150' });
                //page2_Y += 10;
                pdf.text(` ${question.number}.${subQ.sub_number} ${subQ.text}`, 25, page2_Y, { maxWidth: '150' });
            }
            page2_Y += 10;
        }
    }

    

    


    pdf.save("a4.pdf");
    // Get all Font Lists Available
    //console.log(pdf.getFontList());

} catch (error){
    console.error(error.message);
}