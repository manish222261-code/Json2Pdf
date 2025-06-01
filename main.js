import { jsPDF } from "jspdf";
import { readFile } from 'node:fs/promises';

try{
    const filePath = './pyq/math.json';
    const pyqData = await readFile(filePath, 'utf-8');
    const pyqJson = JSON.parse(pyqData);

    // Initializing PDF
    const pdf = new jsPDF();

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
    
    pdf.text(pyqJson.questions[0].sub_questions[0].sub_number + "." + pyqJson.questions[0].sub_questions[0].text , 25 , 95);

    pdf.text("(a)" + " " + pyqJson.questions[0].sub_questions[0].options[0], 41 , 103);
    pdf.text("(b)" + " " + pyqJson.questions[0].sub_questions[0].options[1], 119 , 103);
    pdf.text("(c)" + " " + pyqJson.questions[0].sub_questions[0].options[2], 41 , 108);
    pdf.text("(d)" + " " + pyqJson.questions[0].sub_questions[0].options[3], 119 , 108);

    


    pdf.save("a4.pdf");
    // Get all Font Lists Available
    //console.log(pdf.getFontList());

} catch (error){
    console.error(error.message);
}

