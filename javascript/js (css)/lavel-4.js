const cssInput = document.getElementById("css-input");
const frogLayer = document.getElementById("frog-layer");
const frogs = document.querySelectorAll(".frog-img");
const nextBtn = document.getElementById("next-btn");

window.onload = () => {
    cssInput.focus();
};

function checkAnswer() {
    const inputCode = cssInput.value;

    try {
        // ขยับกบตามโค้ดที่พิมพ์
        frogLayer.style.cssText = `justify-content: flex-start; ${inputCode}`;
    } catch (e) { }

    // ตรวจหาคำตอบที่ถูกต้อง (รองรับการพิมพ์ space-around)
    const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();
    const isCorrect = cleanInput.includes('justify-content:space-around');

    if (isCorrect) {
        // ตอบถูก
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('pulse');
        frogs.forEach(f => f.classList.add('success'));
    } else {
        // ตอบผิด
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('pulse');
        frogs.forEach(f => f.classList.remove('success'));
    }
}

cssInput.addEventListener('input', checkAnswer);

function showAnswer() {
    // คำตอบที่ถูกต้องคือ space-around
    const answer = "justify-content: space-around;";
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
