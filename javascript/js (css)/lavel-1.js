const cssInput = document.getElementById("css-input");
const pond = document.getElementById("pond");
const frog = document.getElementById("frog");
const nextBtn = document.getElementById("next-btn");

// โฟกัสช่องพิมพ์ทันทีเมื่อโหลดหน้าเว็บ
window.onload = () => {
    cssInput.focus();
};

// ฟังก์ชันตรวจจับการพิมพ์และอัปเดตโค้ด
function checkAnswer() {
    const inputCode = cssInput.value;

    // 1. นำโค้ดที่พิมพ์ไปใส่ในสระน้ำ (Pond)
    try {
        // คงค่า display: flex และ align-items ไว้เสมอเพื่อไม่ให้ Layout พัง
        pond.style.cssText = `display: flex; align-items: center; padding: 0 50px; ${inputCode}`;
    } catch (e) {
        // ข้ามไปถ้าโค้ดมี Error
    }

    // 2. ตรวจสอบความถูกต้องของคำตอบ
    // ลบช่องว่างและทำเป็นตัวพิมพ์เล็กทั้งหมดเพื่อง่ายต่อการตรวจ
    const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();

    // เช็คว่ามีคำว่า justify-content:flex-end อยู่หรือไม่ (ไม่ต้องสนใจเซมิโคลอนก็ได้)
    const isCorrect = cleanInput.includes('justify-content:flex-end');

    if (isCorrect) {
        // ตอบถูก
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('pulse');
        frog.classList.add('success');
    } else {
        // ตอบผิดหรือไม่ครบ
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('pulse');
        frog.classList.remove('success');
    }
}

// จับ Event เมื่อผู้ใช้พิมพ์ตัวอักษรลงในช่อง Input
cssInput.addEventListener('input', checkAnswer);

// ฟังก์ชันสำหรับปุ่มเฉลย (พิมพ์ให้ดูอัตโนมัติ)
function showAnswer() {
    const answer = "justify-content: flex-end;";
    let i = 0;

    cssInput.value = ""; // เคลียร์ช่องให้ว่าง
    cssInput.disabled = true; // ล็อคแป้นพิมพ์ระหว่างเฉลย

    // ใช้ setInterval เพื่อพิมพ์ทีละตัวอักษร
    const typing = setInterval(() => {
        cssInput.value += answer[i];
        checkAnswer(); // ตรวจคำตอบไปในตัวเพื่อให้กบขยับตาม
        i++;

        if (i >= answer.length) {
            clearInterval(typing);
            cssInput.disabled = false; // ปลดล็อคแป้นพิมพ์
            cssInput.focus();
        }
    }, 80); // ความเร็วในการพิมพ์ (80 มิลลิวินาที/ตัวอักษร)
}

// ฟังก์ชันสำหรับเปิด/ปิด Popup เลือกด่าน
function toggleLevelMenu() {
    const popup = document.getElementById("level-popup");
    popup.classList.toggle("show");
}

// ระบบปิด Popup อัตโนมัติ เมื่อคลิกพื้นที่ว่างรอบๆ
document.addEventListener('click', function(event) {
    const popup = document.getElementById("level-popup");
    const btn = document.getElementById("toggle-menu-btn");
    
    // ถ้า popup แสดงอยู่ และจุดที่คลิกไม่ได้อยู่ข้างใน popup หรือปุ่มเปิด ให้ปิดมันซะ
    if (popup && popup.classList.contains("show")) {
        if (!popup.contains(event.target) && event.target !== btn) {
            popup.classList.remove("show");
        }
    }
});
