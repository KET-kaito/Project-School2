 const htmlInput = document.getElementById("html-input");
        const renderArea = document.getElementById("user-render-area");
        const nextBtn = document.getElementById("next-btn");

        window.onload = () => htmlInput.focus();

        function checkAnswer() {
            const inputCode = htmlInput.value;
            renderArea.innerHTML = inputCode;
            let isCorrect = false;
            const generatedInput = renderArea.querySelector("input");
            const cleanInput = inputCode.replace(/\s/g, '').toLowerCase();
            
            if (generatedInput && (cleanInput.includes('type="email"') || cleanInput.includes("type='email'"))) {
                isCorrect = true;
                generatedInput.placeholder = "example@email.com";
            }

            if (isCorrect) {
                nextBtn.classList.remove('disabled'); nextBtn.classList.add('pulse');
            } else {
                nextBtn.classList.add('disabled'); nextBtn.classList.remove('pulse');
            }
        }

        htmlInput.addEventListener('input', checkAnswer);

        function showAnswer() {
            const answer = '<input type="email">';
            let i = 0;
            htmlInput.value = ""; htmlInput.disabled = true; 
            const typing = setInterval(() => {
                htmlInput.value += answer[i];
                checkAnswer(); i++;
                if (i >= answer.length) { clearInterval(typing); htmlInput.disabled = false; htmlInput.focus(); }
            }, 60); 
        }

        function toggleLevelMenu() { document.getElementById("level-popup").classList.toggle("show"); }
        document.addEventListener('click', function(event) {
            const popup = document.getElementById("level-popup");
            const btn = document.getElementById("toggle-menu-btn");
            if (popup && popup.classList.contains("show") && !popup.contains(event.target) && event.target !== btn) {
                popup.classList.remove("show");
            }
        });