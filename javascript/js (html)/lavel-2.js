 const htmlInput = document.getElementById("html-input");
        const renderArea = document.getElementById("user-render-area");
        const nextBtn = document.getElementById("next-btn");

        window.onload = () => {
            htmlInput.focus();
        };

        function checkAnswer() {
            const inputCode = htmlInput.value;

            // 1. นำโค้ด HTML ที่ผู้ใช้พิมพ์ ไปแสดงผลจริงๆ บนหน้าจอ
            renderArea.innerHTML = inputCode;

            // 2. ตรวจสอบความถูกต้อง (DOM Checking)
            let isCorrect = false;
            
            // ค้นหา Tag input ที่ผู้ใช้สร้างขึ้นมา
            const generatedInput = renderArea.querySelector("input");
            
            if (generatedInput) {
                // เช็คว่า type คือ button และ value คือ ส่งคำตอบ หรือไม่ (ไม่สนใจว่าจะพิมพ์ attribute ไหนก่อน)
                if (generatedInput.type === "button" && generatedInput.value === "ส่งคำตอบ") {
                    isCorrect = true;
                }
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

        // เช็คคำตอบทุกครั้งที่มีการพิมพ์
        htmlInput.addEventListener('input', checkAnswer);

        function showAnswer() {
            // โค้ด HTML ที่ถูกต้อง
            const answer = '<input type="button" value="ส่งคำตอบ">';
            let i = 0;
            
            htmlInput.value = ""; 
            htmlInput.disabled = true; 
            
            const typing = setInterval(() => {
                htmlInput.value += answer[i];
                checkAnswer(); // เรนเดอร์ปุ่มโชว์ทีละตัวอักษร
                i++;
                
                if (i >= answer.length) {
                    clearInterval(typing);
                    htmlInput.disabled = false; 
                    htmlInput.focus();
                }
            }, 60); 
        }

        // ระบบ Popup Menu
        function toggleLevelMenu() {
            const popup = document.getElementById("level-popup");
            popup.classList.toggle("show");
        }

        document.addEventListener('click', function(event) {
            const popup = document.getElementById("level-popup");
            const btn = document.getElementById("toggle-menu-btn");
            
            if (popup && popup.classList.contains("show")) {
                if (!popup.contains(event.target) && event.target !== btn) {
                    popup.classList.remove("show");
                }
            }
        });