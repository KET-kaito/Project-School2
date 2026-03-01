const cssInput = document.getElementById("css-input");
const frogLayer = document.getElementById("frog-layer");
const frogs = document.querySelectorAll(".frog-img");
const nextBtn = document.getElementById("next-btn");

// ให้เคอร์เซอร์ไปกระพริบรอรับคำสั่งเลยเมื่อโหลดหน้า
window.onload = () => {
    cssInput.focus();
};

function checkAnswer() {
    const inputCode = cssInput.value;

    // นำโค้ดที่ผู้ใช้พิมพ์ไปใส่ในเลเยอร์กบ
    try {
        // ถ้าลบคำสั่งออก จะได้เด้งกลับไปที่ flex-start (ซ้ายสุด) เป็นค่าเริ่มต้น
        frogLayer.style.cssText = `justify-content: flex-start; ${inputCode}`;
    } catch (e) { }

    // ตรวจหาคำตอบที่ถูกต้อง (รองรับการพิมพ์ติดกัน/มีช่องว่าง)
    const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();
    const isCorrect = cleanInput.includes('justify-content:space-between');

    if (isCorrect) {
        // ตอบถูก -> เปิดปุ่มถัดไป & กบดีใจ
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('pulse');
        frogs.forEach(f => f.classList.add('success'));
    } else {
        // ตอบผิด -> ปิดปุ่ม
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('pulse');
        frogs.forEach(f => f.classList.remove('success'));
    }
}

// เช็คโค้ดทุกครั้งที่มีการพิมพ์
cssInput.addEventListener('input', checkAnswer);

// ระบบปุ่มเฉลย
function showAnswer() {
    const answer = "justify-content: space-between;";
    let i = 0;

    cssInput.value = "";
    cssInput.disabled = true;

    const typing = setInterval(() => {
        cssInput.value += answer[i];
        checkAnswer();
        i++;

        if (i >= answer.length) {
            clearInterval(typing);
            cssInput.disabled = false;
            cssInput.focus();
        }
    }, 80);
}

// ฟังก์ชันสำหรับเปิด/ปิด Popup เลือกด่าน
function toggleLevelMenu() {
    const popup = document.getElementById("level-popup");
    popup.classList.toggle("show");
}

// ระบบปิด Popup อัตโนมัติ เมื่อคลิกพื้นที่ว่างรอบๆ
document.addEventListener('click', function (event) {
    const popup = document.getElementById("level-popup");
    const btn = document.getElementById("toggle-menu-btn");

    // ถ้า popup แสดงอยู่ และจุดที่คลิกไม่ได้อยู่ข้างใน popup หรือปุ่มเปิด ให้ปิดมันซะ
    if (popup && popup.classList.contains("show")) {
        if (!popup.contains(event.target) && event.target !== btn) {
            popup.classList.remove("show");
        }
    }
});
