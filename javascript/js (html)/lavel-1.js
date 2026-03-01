const htmlInput = document.getElementById("html-input");
const renderArea = document.getElementById("user-render-area");
const nextBtn = document.getElementById("next-btn");

window.onload = () => {
    htmlInput.focus();
};

function checkAnswer() {
    const inputCode = htmlInput.value;

    // 1. นำโค้ด HTML ที่ผู้ใช้พิมพ์ ไปแสดงผล
    renderArea.innerHTML = inputCode;

    // 2. ตรวจสอบความถูกต้อง (DOM Checking & String Parsing)
    let isCorrect = false;

    // เช็คว่ามี tag <input> เกิดขึ้นจริงบนจอ
    const generatedInput = renderArea.querySelector("input");

    // ตัดช่องว่างต่างๆ ออกเพื่อเช็คข้อความดิบๆ เผื่อผู้ใช้พิมพ์สลับตำแหน่ง 
    const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();

    // ตรวจว่ามีการสร้าง <input> และผู้ใช้ตั้งใจพิมพ์ type="text" จริงๆ 
    // (ป้องกันกรณีพิมพ์แค่ <input> เปล่าๆ แล้วเบราว์เซอร์มองว่าเป็น text อัตโนมัติ)
    if (generatedInput && (cleanInput.includes('type="text"') || cleanInput.includes("type='text'"))) {
        isCorrect = true;
    }

    if (isCorrect) {
        // ตอบถูก
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('pulse');
    } else {
        // ตอบผิด
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('pulse');
    }
}

htmlInput.addEventListener('input', checkAnswer);

function showAnswer() {
    document.getElementById("overlay").style.display = "flex";
}

function hideAnswer() {
    document.getElementById("overlay").style.display = "none";
}


// ระบบ Popup Menu
function toggleLevelMenu() {
    const popup = document.getElementById("level-popup");
    popup.classList.toggle("show");
}

document.addEventListener('click', function (event) {
    const popup = document.getElementById("level-popup");
    const btn = document.getElementById("toggle-menu-btn");

    if (popup && popup.classList.contains("show")) {
        if (!popup.contains(event.target) && event.target !== btn) {
            popup.classList.remove("show");
        }
    }
});