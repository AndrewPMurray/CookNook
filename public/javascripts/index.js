window.addEventListener("DOMContentLoaded", (event)=> {
    // expand answers
    const answers = document.querySelectorAll('.answer');
    answers.forEach((answer) => {
        if (answer.innerText.length > 300) {
            const fullText = answer.innerText;
            answer.innerHTML = `${fullText.slice(0, 300)} ... <a href="" class="expand">[expand]</a>`;

            answer.querySelector('.expand').addEventListener('click', (e) => {
                e.preventDefault();
                answer.innerText = fullText;
            });
        };
    });

    // add'l scripts as needed

});