async function submitForm(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const question1 = document.querySelector('input[name="question1"]:checked').value;
    const question2 = document.querySelector('input[name="question2"]:checked').value;
    const question3 = document.querySelector('input[name="question3"]:checked').value;
    const question4 = document.getElementById('question4').value;
    const question5 = document.getElementById('question5').value;

    const data = {
        name,
        phone,
        email,
        question1,
        question2,
        question3,
        question4,
        question5
    };

    // استبدل 'YOUR_GOOGLE_SCRIPT_URL' برابط Google Apps Script الخاص بك
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';

    try {
        // حفظ البيانات في Google Sheets
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.status === 'success') {
            // بعد نجاح الحفظ، أرسل رسالة واتساب
            const whatsappMessage = `شكرًا لك ${name} على زيارتك لجناحنا في المعرض! نأمل أنك استمتعت بتجربتك. يمكنك زيارة موقعنا عبر الرابط التالي: https://example.com`;
            const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsappMessage)}`;

            // فتح الواتساب في نافذة جديدة
            window.open(whatsappURL, '_blank');
            
            alert('تم حفظ البيانات بنجاح وتم فتح الواتساب لإرسال رسالة الشكر.');
        } else {
            alert('حدث خطأ في حفظ البيانات.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ في الاتصال بالخادم.');
    }
}
