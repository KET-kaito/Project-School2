 const jsInput = document.getElementById("js-input");
        const statusElement = document.getElementById("status");
        const descElement = document.getElementById("desc");
        const serverBoxElement = document.getElementById("serverBox");
        const nextBtn = document.getElementById("next-btn");

        window.onload = () => jsInput.focus();

        function checkAnswer() {
            const inputCode = jsInput.value;
            // คลีนค่า: ลบช่องว่างและเครื่องหมายคำพูด (เพื่อให้ง่ายต่อการตรวจสอบ)
            // คราวนี้ผมแปลงให้เป็น lowerCase ไปเลยเพื่อให้ตรวจจับคำว่า online ง่ายขึ้น
            const cleanInput = inputCode.replace(/[\s'"]/g, '').toLowerCase();

            // ตรวจสอบว่าผู้ใช้พิมพ์ server.innerText = "Online" หรือไม่
            const isCorrect = cleanInput.includes('server.innertext=online');

            if (isCorrect) {
                // หากถูก: เปลี่ยนข้อความและสีเป็นสีเขียว
                statusElement.innerText = "🟢 Online";
                statusElement.style.color = "#48c038";
                serverBoxElement.style.borderColor = "#48c038";
                descElement.innerText = "เซิร์ฟเวอร์กำลังทำงานตามปกติ!";
                
                nextBtn.classList.remove('disabled');
                nextBtn.classList.add('pulse');
            } else {
                // หากผิด: กลับเป็นค่าเริ่มต้น
                statusElement.innerText = "🔴 Offline";
                statusElement.style.color = "#ff4c4c";
                serverBoxElement.style.borderColor = "#555";
                descElement.innerText = "เซิร์ฟเวอร์ยังไม่พร้อมใช้งาน...";
                
                nextBtn.classList.add('disabled');
                nextBtn.classList.remove('pulse');
            }
        }

        jsInput.addEventListener('input', checkAnswer);

        function showAnswer() {
            const answer = 'server.innerText = "Online";';
            let i = 0;
            jsInput.value = ""; jsInput.disabled = true;
            const typing = setInterval(() => {
                jsInput.value += answer[i];
                checkAnswer(); i++;
                if (i >= answer.length) { clearInterval(typing); jsInput.disabled = false; jsInput.focus(); }
            }, 50);
        }

        function toggleLevelMenu() { document.getElementById("level-popup").classList.toggle("show"); }
        document.addEventListener('click', function (event) {
            const popup = document.getElementById("level-popup");
            const btn = document.getElementById("toggle-menu-btn");
            if (popup && popup.classList.contains("show") && !popup.contains(event.target) && event.target !== btn) { popup.classList.remove("show"); }
        });