const jsInput = document.getElementById("js-input");
const statusBox = document.getElementById("status-box");
const nextBtn = document.getElementById("next-btn");
const levelMenu = document.getElementById('level-menu');

// Focus ที่ช่อง input ทันทีที่โหลด
window.onload = () => jsInput.focus();

function checkAnswer() {
    const inputCode = jsInput.value;

    // ลบช่องว่างและเครื่องหมายคำพูดออก เพื่อให้ผู้ใช้พิมพ์สลับ quote (', ") ก็ตรวจผ่าน
    const cleanInput = inputCode.replace(/[\s'"]/g, '').toLowerCase();

    // เช็คว่ามีคำสั่งเปลี่ยนเป็น อนุมัติ ไหม (กลไก string match เหมือนที่คุณเคยทำ)
    const isCorrect = cleanInput.includes('box.innertext=อนุมัติ') || cleanInput.includes('box.innerhtml=อนุมัติ');

    // ตรวจสอบความถูกต้อง
    if (isCorrect) {
        // อัปเดตหน้าจอ Preview แบบ Real-time
        statusBox.innerText = "อนุมัติ";
        statusBox.style.color = "#0a400a";
        statusBox.style.backgroundColor = "#81c784"; // เปลี่ยนสีพื้นหลังเป็นเขียวอ่อน
        statusBox.style.fontWeight = "bold";

        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('pulse');
    } else {
        // คืนค่าเดิมถ้ายอมลบโค้ด
        statusBox.innerText = "รอการตรวจสอบ...";
        statusBox.style.color = "var(--text-dark)";
        statusBox.style.backgroundColor = "var(--white)";
        statusBox.style.fontWeight = "normal";

        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('pulse');
    }
}

jsInput.addEventListener('input', checkAnswer);

function showAnswer() {
    const answer = 'box.innerText = "อนุมัติ";';
    let i = 0;
    jsInput.value = "";
    jsInput.disabled = true;

    const typing = setInterval(() => {
        jsInput.value += answer[i];
        checkAnswer();
        i++;
        if (i >= answer.length) {
            clearInterval(typing);
            jsInput.disabled = false;
            jsInput.focus();
        }
    }, 60);
}

function toggleLevelMenu() {
    document.getElementById("level-popup").classList.toggle("show");
}

// 4. การจัดการเมนู 
function toggleMenu() {
    levelMenu.classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const btn = document.getElementById("menuBtn");
    if (levelMenu && levelMenu.classList.contains("active") && !levelMenu.contains(event.target) && event.target !== btn) {
        levelMenu.classList.remove("active");
    }
});