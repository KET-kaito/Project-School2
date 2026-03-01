 const jsInput = document.getElementById("js-input");
        const fakeBtn = document.getElementById("fake-submit");
        const msg = document.getElementById("success-msg");
        
        // แก้ไขชื่อ ID ให้ตรงกับ HTML คือ nextBtn
        const nextBtn = document.getElementById("nextBtn");

        let codeIsCorrect = false;

        window.onload = () => jsInput.focus();

        function checkAnswer() {
            const inputCode = jsInput.value;
            const cleanInput = inputCode.replace(/[\s'"]/g, '').toLowerCase();
            
            // เช็คโค้ด addEventListener
            if (cleanInput.includes('btn.addeventlistener(click,sayhello)')) {
                codeIsCorrect = true;
                fakeBtn.style.backgroundColor = "#4caf50"; // เปลี่ยนปุ่มเป็นสีเขียวเพื่อบอกว่าพร้อมกด
                
                // รีเซ็ตข้อความเผื่อไว้กรณีเคยแจ้งเตือน Error
                msg.style.opacity = "0"; 
            } else {
                codeIsCorrect = false;
                fakeBtn.style.backgroundColor = "#2196f3"; // กลับเป็นสีเดิม
                msg.style.opacity = "0";
                
                if (nextBtn) {
                    nextBtn.classList.add('disabled'); 
                    nextBtn.classList.remove('pulse');
                }
            }
        }

        // เมื่อผู้ใช้ลองกดปุ่มคลิกฉันสิ
        fakeBtn.addEventListener('click', () => {
            if (codeIsCorrect) {
                // ถ้าพิมพ์โค้ดถูก ถึงจะโชว์ข้อความและปลดล็อคปุ่มถัดไป
                msg.innerText = "ฟังก์ชันทำงานแล้ว 🎉";
                msg.style.color = "#4caf50";
                msg.style.opacity = "1";
                
                if (nextBtn) {
                    nextBtn.classList.remove('disabled'); 
                    nextBtn.classList.add('pulse');
                }
            } else {
                // ถ้าโค้ดยังไม่ถูก โชว์ข้อความแจ้งเตือนสีแดง (แทนการใช้ alert() แบบเดิม)
                msg.innerText = "โปรดพิมพ์คำสั่ง addEventListener ให้ถูกต้องก่อนครับ!";
                msg.style.color = "#f44336";
                msg.style.opacity = "1";
                
                // สั่งให้ข้อความ Error หายไปเองใน 3 วินาที
                setTimeout(() => {
                    if (!codeIsCorrect) msg.style.opacity = "0";
                }, 3000);
            }
        });

        jsInput.addEventListener('input', checkAnswer);

        function showAnswer() {
            const answer = 'btn.addEventListener("click", sayHello);';
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
            }, 50); 
        }

        function toggleLevelMenu() { 
            const popup = document.getElementById("level-popup");
            if (popup) popup.classList.toggle("show"); 
        }

        document.addEventListener('click', function(event) {
            const popup = document.getElementById("level-popup");
            const btn = document.getElementById("toggle-menu-btn");
            if (popup && popup.classList.contains("show") && !popup.contains(event.target) && event.target !== btn) { 
                popup.classList.remove("show"); 
            }
        });