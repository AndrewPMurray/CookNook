window.addEventListener("DOMContentLoaded", (event) => {
    // truncate text function (if text too long)
    const truncateText = (html) => {
        if (html.innerText.length > 300) {
            const fullText = html.innerText;
            html.innerHTML = `${fullText.slice(0, 300)} ... <a href="" class="expand">[expand]</a>`;

            html.querySelector('.expand').addEventListener('click', (e) => {
                e.preventDefault();
                html.innerText = fullText;
            });
        };
    }

    // truncate answers that are too long
    const answers = document.querySelectorAll('.answer');
    answers.forEach((answer) => {
        truncateText(answer);
    });

    // add'l scripts as needed

});