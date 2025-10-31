// Quiz Functionality

// Quiz questions data
const quizQuestions = [
    {
        question: "What is the primary purpose of logic in mathematics and computer science?",
        options: [
            "a) To create complex sentences.",
            "b) To study the beauty of mathematical structures.",
            "c) To evaluate arguments and differentiate correct from poor reasoning.",
            "d) To memorize philosophical arguments."
        ],
        answer: "c",
        reasoning: "The correct answer is (c). Logic is formally defined as the study of how to evaluate arguments and reasoning. While it uses sentences (a) and can be applied to mathematical structures (b) and philosophy (d), its core purpose is to provide a formal system for determining if reasoning is valid."
    },
    {
        question: "Which of the following sentences is a <strong>proposition</strong>?",
        options: [
            "a) Look out!",
            "b) What is the date?",
            "c) 4 + 2 = 6",
            "d) x + 1 = 5"
        ],
        answer: "c",
        reasoning: "A proposition must be a declarative sentence that is either true or false. (a) 'Look out!' is a command. (b) 'What is the date?' is a question. (d) 'x + 1 = 5' is an open sentence (or propositional function) because its truth value depends on the variable 'x'. (c) '4 + 2 = 6' is a declarative sentence that is definitively true, making it a proposition."
    },
    {
        question: "The statement \"The sky is blue AND the grass is green\" is an example of a:",
        options: [
            "a) Simple (Atomic) Proposition",
            "b) Compound Proposition",
            "c) Contradiction",
            "d) Non-proposition"
        ],
        answer: "b",
        reasoning: "The answer is (b) Compound Proposition. It is formed by connecting two simple propositions ('The sky is blue', 'The grass is green') with the logical operator 'AND'. A Simple (Atomic) proposition (a) cannot be broken down further, like 'The sky is blue' on its own."
    },
    {
        question: "Let p = \"It is sunny\" (True) and q = \"It is cold\" (False). What is the truth value of the <strong>conjunction</strong> (p ∧ q)?",
        options: [
            "a) True",
            "b) False"
        ],
        answer: "b",
        reasoning: "The answer is (b) False. A conjunction (p ∧ q) is true only if *both* p and q are true. Since q is false, the entire compound statement is false."
    },
    {
        question: "Let p = \"It is sunny\" (True) and q = \"It is cold\" (False). What is the truth value of the <strong>disjunction</strong> (p ∨ q)?",
        options: [
            "a) True",
            "b) False"
        ],
        answer: "a",
        reasoning: "The answer is (a) True. A disjunction (p ∨ q) is true if *at least one* of the propositions is true. Since p is true, the entire statement is true. It would only be false if both p and q were false."
    },
    {
        question: "A conditional statement (p → q) is <strong>only</strong> false in which of the following cases?",
        options: [
            "a) p is True, q is True",
            "b) p is True, q is False",
            "c) p is False, q is True",
            "d) p is False, q is False"
        ],
        answer: "b",
        reasoning: "The answer is (b). The conditional (p → q) represents a 'promise'. The only way a promise is broken (i.e., the statement is false) is if the hypothesis (p) is true but the conclusion (q) fails to happen (is false). In all other cases (a, c, d), the promise is considered kept."
    },
    {
        question: "When is the <strong>biconditional</strong> (p ↔ q) statement true?",
        options: [
            "a) Only when p and q are both True.",
            "b) Only when p and q have opposite truth values.",
            "c) When p and q have the same truth value (both True or both False).",
            "d) Only when p and q are both False."
        ],
        answer: "c",
        reasoning: "The answer is (c). The biconditional (p ↔ q) is true if and only if p and q 'match'. This means it's true when both are True *and* when both are False. It is false if their truth values differ (one is T, one is F), as in options (a) and (d) which are incomplete and (b) which is the rule for XOR."
    },
    {
        question: "What is the truth value of (p ⊕ q) if p is True and q is True?",
        options: [
            "a) True",
            "b) False"
        ],
        answer: "b",
        reasoning: "The answer is (b) False. The Exclusive-OR (p ⊕ q) means 'one or the other, *but not both*'. Since both p and q are true in this case, the statement is false. It would be true if p=T, q=F or if p=F, q=T."
    },
    {
        question: "A compound statement that is <strong>always false</strong>, regardless of the truth values of its components, is called a:",
        options: [
            "a) Tautology",
            "b) Contradiction",
            "c) Contingency",
            "d) Equivalence"
        ],
        answer: "b",
        reasoning: "The answer is (b) Contradiction. A Contradiction is always false (e.g., p ∧ ~p). A Tautology (a) is always true (e.g., p ∨ ~p). A Contingency (c) can be either true or false."
    },
    {
        question: "According to De Morgan's Laws, what is the logical equivalent of <strong>~(p ∧ q)</strong>?",
        options: [
            "a) ~p ∧ ~q",
            "b) p ∨ q",
            "c) ~p ∧ q",
            "d) ~p ∨ ~q"
        ],
        answer: "d",
        reasoning: "The answer is (d). De Morgan's Laws state that to negate a conjunction (AND), you negate both parts and flip the operator to a disjunction (OR). Thus, ~(p ∧ q) ≡ ~p ∨ ~q. Answer (a) is the negation of (p ∨ q)."
    },
    {
        question: "The statement \"If it is raining (p), then the ground is wet (q)\" is logically equivalent to which statement?",
        options: [
            "a) \"If the ground is wet (q), then it is raining (p).\"",
            "b) \"If it is not raining (~p), then the ground is not wet (~q).\"",
            "c) \"If the ground is not wet (~q), then it is not raining (~p).\"",
            "d) \"It is raining (p) AND the ground is wet (q).\""
        ],
        answer: "c",
        reasoning: "The answer is (c), the contrapositive. A conditional statement (p → q) is *always* logically equivalent to its contrapositive (~q → ~p). Answer (a) 'q → p' is the *converse*. Answer (b) '~p → ~q' is the *inverse*. Neither the converse nor the inverse is equivalent to the original statement."
    }
];

let currentQuizQuestionIndex = 0;
let quizScore = 0;

// Get references to quiz elements
const quizContainer = document.getElementById('quiz-container');
const quizSummaryBox = document.getElementById('quiz-results-summary');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('quiz-options-container');
const feedbackBoxEl = document.getElementById('quiz-feedback');
const nextButtonEl = document.getElementById('next-question-btn');

function startQuiz() {
    currentQuizQuestionIndex = 0;
    quizScore = 0;
    
    quizSummaryBox.style.display = 'none';
    quizContainer.style.display = 'block';
    
    loadQuizQuestion();
}

function loadQuizQuestion() {
    // Reset state
    feedbackBoxEl.style.display = 'none';
    nextButtonEl.style.display = 'none';
    optionsContainerEl.innerHTML = '';

    if (currentQuizQuestionIndex >= quizQuestions.length) {
        showQuizSummary();
        return;
    }

    const question = quizQuestions[currentQuizQuestionIndex];
    
    questionNumberEl.textContent = `Question ${currentQuizQuestionIndex + 1}/${quizQuestions.length}`;
    questionTextEl.innerHTML = question.question;

    question.options.forEach((option, index) => {
        const optionValue = option.charAt(0);
        const optionId = `q${currentQuizQuestionIndex}_${optionValue}`;
        
        const label = document.createElement('label');
        label.htmlFor = optionId;
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `q${currentQuizQuestionIndex}`;
        radio.id = optionId;
        radio.value = optionValue;
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${option}`));
        
        label.addEventListener('click', () => selectQuizAnswer(optionValue, label));
        optionsContainerEl.appendChild(label);
    });
}

function selectQuizAnswer(selectedValue, selectedLabel) {
    // Disable all options
    optionsContainerEl.querySelectorAll('label').forEach(label => {
        label.classList.add('disabled');
        label.querySelector('input').disabled = true;
    });
    
    const question = quizQuestions[currentQuizQuestionIndex];
    
    if (selectedValue === question.answer) {
        // Correct
        quizScore++;
        selectedLabel.classList.add('correct');
        feedbackBoxEl.innerHTML = '<h4><span class="truth-value-true">✓ Correct!</span></h4><p>Great job!</p>';
        feedbackBoxEl.className = 'feedback-box correct';
        feedbackBoxEl.style.display = 'block';
        nextButtonEl.style.display = 'inline-block';
    } else {
        // Incorrect
        selectedLabel.classList.add('incorrect');
        feedbackBoxEl.innerHTML = `
            <h4><span class="truth-value-false">✗ Incorrect</span></h4>
            <p><strong>Reasoning:</strong> ${question.reasoning}</p>
            <p>
                Don't worry, this can be tricky! For a review, 
                <a class="resource-link">check out the 'Resources' tab</a>.
            </p>`;
        feedbackBoxEl.className = 'feedback-box incorrect';
        feedbackBoxEl.style.display = 'block';
        nextButtonEl.style.display = 'inline-block';
    }
}

function loadNextQuestion() {
    currentQuizQuestionIndex++;
    loadQuizQuestion();
}

nextButtonEl.addEventListener('click', loadNextQuestion);

function showQuizSummary() {
    quizContainer.style.display = 'none';
    
    let summaryMessage = `You scored <strong>${quizScore}</strong> out of <strong>${quizQuestions.length}</strong>.`;
    
    if (quizScore === quizQuestions.length) {
        summaryMessage += " Perfect score! 🥳";
    } else if (quizScore / quizQuestions.length >= 0.7) {
        summaryMessage += " Great job! 👍";
    } else {
        summaryMessage += " Keep reviewing and try again! 📖";
    }

    quizSummaryBox.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>${summaryMessage}</p>
        <button id="restart-quiz-btn" class="action-btn" style="margin-top: 20px;">Restart Quiz</button>
    `;
    quizSummaryBox.style.display = 'block';
    
    document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
}
