const jsInput = document.getElementById("js-input");
        const popupElement = document.getElementById("popup");
        const nextBtn = document.getElementById("next-btn");

        window.onload = () => jsInput.focus();

        function checkAnswer() {
            const inputCode = jsInput.value;
            const cleanInput = inputCode.replace(/[\s'"]/g, '').toLowerCase();

            const isCorrect = cleanInput.includes('modal.classlist.add(hidden)');

            if (isCorrect) {
                popupElement.classList.add('hidden'); // ซ่อนจริง
                nextBtn.classList.remove('disabled');
                nextBtn.classList.add('pulse');
            } else {
                popupElement.classList.remove('hidden'); // แสดงกลับ
                nextBtn.classList.add('disabled');
                nextBtn.classList.remove('pulse');
            }
        }

        jsInput.addEventListener('input', checkAnswer);

        function showAnswer() {
            const answer = 'modal.classList.add("hidden");';
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