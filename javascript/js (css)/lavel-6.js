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
                // ขยับกบตามโค้ดที่พิมพ์ โดยคงค่าแนวนอน (justify-content: center) ไว้เหมือนเดิม
                frogLayer.style.cssText = `justify-content: center; align-items: flex-start; ${inputCode}`;
            } catch (e) { }

            // ตรวจหาคำตอบที่ถูกต้อง (ใช้ align-items: center)
            const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();
            const isCorrect = cleanInput.includes('align-items:center');

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
            // คำตอบที่ถูกต้องคือ align-items: center;
            const answer = "align-items: center;";
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

        // ฟังก์ชันสำหรับเปิด/ปิด Popupเลือกด่าน
        function toggleLevelMenu() {
            const popup = document.getElementById("level-popup");
            popup.classList.toggle("show");
        }

        // ระบบปิด Popup อัตโนมัติ เมื่อคลิกพื้นที่ว่างรอบๆ
        document.addEventListener('click', function(event) {
            const popup = document.getElementById("level-popup");
            const btn = document.getElementById("toggle-menu-btn");
            
            if (popup && popup.classList.contains("show")) {
                if (!popup.contains(event.target) && event.target !== btn) {
                    popup.classList.remove("show");
                }
            }
        });