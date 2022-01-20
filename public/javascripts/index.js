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

    // Generate form when question button clicked
    const addQuestionButton = document.getElementById('add-question');

    addQuestionButton.addEventListener('click', (e) => {
        e.preventDefault();

        const overlay = document.createElement('div');
        const formContainer = document.createElement('div');

        overlay.className = 'overlay';
        
        overlay.innerHTML = `
        <div class="question-form-container">
            <form action="/questions" method="post">
                <p>Ask a question here!</p>
                <label for="content">
                <input type="textarea" name="content" placeholder="begin your question with what, where, why...">
            </form>
        </div>
        `

        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            console.log(e.target)
            overlay.remove();
        });
    });

    // add'l scripts as needed


});