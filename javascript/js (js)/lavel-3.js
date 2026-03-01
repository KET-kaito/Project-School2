 const editor = document.getElementById('editor');
        const toggleBtn = document.getElementById('toggleBtn');
        const pondElement = document.getElementById('pond');
        const statusText = document.getElementById('status-text');
        const nextBtn = document.getElementById('nextBtn');
        const levelMenu = document.getElementById('level-menu');

        let isCodeCorrect = false;
        let hasToggled = false;

        // โฟกัสที่ช่องพิมพ์อัตโนมัติเมื่อโหลดหน้าเสร็จ 
        window.onload = () => editor.focus();

        // คำตอบที่ถูกต้อง 
        const expected = "pond.classlist.toggle(night)";

        // 1. ฟังก์ชันตรวจสอบโค้ดที่ผู้ใช้พิมพ์ 
        function checkAnswer() {
            const code = editor.value;
            // ตัดช่องว่างและเครื่องหมาย ' " ออกเพื่อให้ตรวจง่าย
            const cleanCode = code.replace(/[\s'"]/g, '').toLowerCase();

            if (cleanCode.includes(expected)) {
                isCodeCorrect = true;
                toggleBtn.style.backgroundColor = "#4caf50";
                toggleBtn.style.color = "white";
                toggleBtn.innerText = "กดสลับโหมดเลย!";
            } else {
                isCodeCorrect = false;
                toggleBtn.style.backgroundColor = "#ffb300";
                toggleBtn.style.color = "#333";
                toggleBtn.innerText = "สลับ กลางวัน/กลางคืน";
                pondElement.classList.remove('night');
                statusText.innerText = "โหมดปกติ";
                nextBtn.classList.add('disabled');
                nextBtn.classList.remove('pulse');
            }
        }

        // ตรวจสอบทุกครั้งที่พิมพ์
        editor.addEventListener('input', checkAnswer);

        // 2. ให้ผู้ใช้คลิกปุ่มเพื่อทดสอบระบบ Toggle
        toggleBtn.addEventListener('click', () => {
            if (isCodeCorrect) {
                pondElement.classList.toggle('night'); // สลับสีพื้นหลัง
                
                // อัปเดตข้อความเล็กน้อยให้ดูมีลูกเล่น
                if (pondElement.classList.contains('night')) {
                    statusText.innerText = "โหมดกลางคืน";
                } else {
                    statusText.innerText = "โหมดปกติ";
                }
                
                hasToggled = true;

                // ถ้ายอมกดสลับโหมดแล้ว ถึงจะให้ผ่านด่าน
                nextBtn.classList.remove('disabled');
                nextBtn.classList.add('pulse');
            } else {
                alert("โปรดพิมพ์คำสั่ง toggle ในช่องโค้ดให้ถูกต้องก่อนกดปุ่มครับ!");
            }
        });

        // 3. ฟังก์ชันเฉลยแบบพิมพ์ทีละตัว 
        function showAnswer() {
            const answer = "pond.classList.toggle('night');"; // คำตอบของด่านนี้
            let i = 0;

            editor.value = "";
            editor.disabled = true;

            const typing = setInterval(() => {
                editor.value += answer[i];
                checkAnswer(); // ตรวจคำตอบไปพร้อมกับตอนพิมพ์
                i++;

                if (i >= answer.length) {
                    clearInterval(typing);
                    editor.disabled = false;
                    editor.focus();
                }
            }, 50);
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