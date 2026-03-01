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
                frogLayer.style.cssText = `justify-content: flex-start; align-items: flex-start; ${inputCode}`;
            } catch (e) { }

            // ตรวจหาคำตอบที่ถูกต้อง ต้องมีทั้ง 2 คำสั่ง
            const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();
            const hasJustifyCenter = cleanInput.includes('justify-content:center');
            const hasAlignCenter = cleanInput.includes('align-items:center');

            if (hasJustifyCenter && hasAlignCenter) {
                // ตอบถูกครบทั้ง 2 ข้อ
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
            // คำตอบที่ถูกต้อง พิมพ์ 2 บรรทัด
            const answer = "justify-content: center;\nalign-items: center;";
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