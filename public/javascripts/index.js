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
    };

    // truncate answers that are too long
    const answers = document.querySelectorAll('.answer');
    answers.forEach((answer) => {
        truncateText(answer);
    });

    

    // Possible Code for overlay
    // Generate form when question button clicked
    // const addQuestionButton = document.getElementById('add-question');

    // if(addQuestionButton) {
    //     addQuestionButton.addEventListener('click', (e) => {
    //         e.preventDefault();

    //         const overlay = document.createElement('div');
    //         const formContainer = document.createElement('div');

    //         overlay.className = 'overlay';
    //         formContainer.className = 'question-form-container';

    //         overlay.innerHTML = `
    //         <div class="question-form-container">
    //             <div class="question-form-container-items">
    //                 <a href="" id="x">X</a>
    //                 <div class="question-form-header">
    //                     <p>Add Question</p>
    //                 </div>
    //                 <div class="question-form-tips">
    //                     <p>Tips on getting good answers quickly</p>
    //                     <ul>
    //                         <li>Make sure your question has not been asked already</li>
    //                         <li>Keep your question short and to the point</li>
    //                         <li>Double-check grammar and spelling</li>
    //                     </ul>
    //                 </div>
    //                 <div class="question-form-body">
    //                     <form action="/questions" method="post">
    //                         <input type="hidden" name="postTypeId" value="1">
    //                         <label for="title">Ask your question here:</label>
    //                         <input name="title" placeholder="Start your question with &quot;What&quot;, &quot;How&quot;, &quot;Why&quot;, etc."></input>
    //                         <label for="content">To allow others to best answer your question, please provide details for your question below:</label>
    //                         <textarea name="content"></textarea>
    //                         <div class="space" id="buttons">
    //                             <a href="" id="cancel">cancel</a>
    //                             <button type="submit" id="ask-question-button">Ask Question</button>
    //                         </div>
    //                     </form>
    //                 </div>
    //                 <div class="question-form-footer">
    //                 </div>
    //             </div>
    //         </div>
    //         `

    //         document.body.appendChild(overlay);
    //         overlay.addEventListener('click', (e) => {
    //             if (e.target === overlay) {
    //                 overlay.remove();
    //             }
    //         });
    //     });

    // add'l scripts as needed

});
