
const gameArea = document.querySelector('.game'); //GLOBAL | RETURNS FIRST ' OBJECTS REFER MEMORY LOCATION
const gameOptions = document.querySelector('.gameOptions');
const btn = document.createElement('button');
const btn1 = document.createElement('button');
const output = document.createElement('div');
const answer = document.createElement('input'); //HIDDEN INPUT VALUE
const message = document.createElement('div');
output.textContent = "Click the button to start the game";
btn.textContent = "Start Game";
btn1.textContent = "Next Question";
answer.setAttribute('type', 'number'); 
answer.setAttribute('max', 999);
answer.setAttribute('min', 0);
output.classList.add('output');
message.classList.add('message');
answer.classList.add('boxAnswer'); 
gameArea.append(message);
gameArea.append(output);
gameArea.append(btn);
gameArea.append(btn1);
btn1.style.display = 'none';
const opts = ['*', '/', '+', '-'];
const game = { correct: '', maxValue: 10, questions: 10, oVals: [0, 1, 2, 3], curQue: 0, hiddenVal: 3, inplay: false };
const player = { correct: 0, incorrect: 0 };
btn.addEventListener('click', btnCheck);
btn1.addEventListener('click', buildQuestion);

$("*").click(function(){
    alert("The paragraph was clicked.");
  });

function message1(){
    alert("MULTIPLICATION SELECTED!");
}
function message2(){
    alert("DIVISION SELECTED!");
}
function message3(){
    alert("ADDITION SELECTED!");
}
function message4(){
    alert("SUBTRACTION SELECTED!");
}

answer.addEventListener('keyup', (e) => { //Getting the key typed during input
    console.log(e.code);
    console.log(answer.value.length);
    if (answer.value.length > 0) { //displaying the check button after input taken
        btn.style.display = 'block';
        btn.textContent = 'check';
        game.inplay = true;
    }
    if (e.code == 'Enter' || e.code == 'NumpadEnter') { //clicking check button on enter key
        game.inplay = true;
        btnCheck();
    }
})


function btnCheck() { //triggered after check is clicked
    btn.style.display = 'none'; //disabling the check button
    if (game.inplay) {
        if (answer.value == game.correct) { //checking the inputted value with correct value from build question
            message.innerHTML = 'Correct<br>Answer is ' + game.correct;
            player.correct++;
        } else {
            message.innerHTML = 'Wrong<br>Answer is ' + game.correct;
            player.incorrect++;
        }

        answer.disabled = true; //enabling the next question button
        nextQuestion();
    } else {
        //start Game
        getValues();
        gameOptions.style.display = 'none';
        game.curQue = 0;
        buildQuestion();
    }
}

function nextQuestion() {
    btn1.style.display = 'block';
}


function scoreBoard() { //Obtaining values from game object for scoreboard
    message.innerHTML = `${game.curQue} of ${game.questions} Questions<br>`;
    message.innerHTML += `Correct : (${player.correct}) || Incorrect: (${player.incorrect})`;
}

function getValues() { //Takinginitial inputs from home page to initialise the game object
    game.maxValue = Number(document.querySelector('#maxVal').value);
    game.questions = document.querySelector('#numQuestions').value;
    let temparr = []
    let d = document.getElementsByClassName('op')
    for (var checkbox of d) {
        if (checkbox.checked) {
            temparr.push(checkbox.value)
        };
    }
    game.oVals = temparr;
    console.log(game)

}




function buildQuestion() { //NEXT QUESTION
    btn1.style.display = 'none';
    console.log(game.curQue + ' of ' + game.questions);
    if (game.curQue < game.questions) {
        game.curQue++;
        scoreBoard();
        output.innerHTML = ''; //Adding question content
        let vals = []; //VALUES ARRAY
        vals[0] = Math.ceil(Math.random() * (game.maxValue)); // 1 TO MAX VALUE
        let tempMax = game.maxValue + 1;
        game.oVals.sort(() => { return 0.5 - Math.random() }); //ARRAY SORT OF OPERATORS
        if (game.oVals[0] == 3) { // FOR HANDLING SUBTRACTION 
            tempMax = vals[0];
        }
        vals[1] = Math.floor(Math.random() * tempMax); // using tempmax for handling non-negative vals from subtraction
        if (game.oVals[0] == 0) { // FOR HANDLING MULTIPLICATION
            if (vals[1] == 0) { vals[1] = 1; }
            if (vals[0] == 0) { vals[0] = 1; }
        }
        if (game.oVals[0] == 1) { //FOR HANDLING DIVISION {producing whole numbers}
            if (vals[0] == 0) { vals[0] = 1; }
            let temp = vals[0] * vals[1];
            vals.unshift(temp); //append at first arr[0]
        }
        else {
            vals[2] = eval(vals[0] + opts[game.oVals[0]] + vals[1]); //NORMAL OPERATORS; CALCULATING RESULT
        }
        vals[3] = opts[game.oVals[0]]; //FIRST RANDOM OPERATOR 
        let hiddenVal;
        if (game.hiddenVal != 3) { //randomization
            hiddenVal = game.hiddenVal;
        } else {
            hiddenVal = Math.floor(Math.random() * 3); //hidden value takes place value of 0,1,2
        }
        answer.value = '';
        answer.disabled = false;
        for (let i = 0; i < 3; i++) {
            if (hiddenVal == i) {
                game.correct = vals[i];
                output.append(answer);
            } 
            else {
                maker(vals[i], 'box'); //BOX FOR NUMBER VALUE
            }

            if (i == 0) {
                // console.log(vals[3]);
                let tempSign = vals[3] == '*' ? '&times;' : vals[3];
                maker(tempSign, 'boxSign'); //BOX SIGN FOR OPERATOR AND EQUAL SYMBOL
            }
            if (i == 1) {
                maker('=', 'boxSign');
            }
        }
        answer.focus();
        //vals[hiddenVal] = '__';
        //output.innerHTML = `${} ${vals[3]} ${vals[1]} = ${vals[2]} `;
    }
    else {

        alert("YOUR TOTAL CORRECT QUESTIONS: " + player.correct + "\n YOUR TOTAL INCORRECT QUESTIONS: " + player.incorrect);

    }

}

function maker(v, cla) { //APPEND TO THE OUTPUT
    const temp = document.createElement('div');
    temp.classList.add(cla);
    temp.innerHTML = v;
    output.append(temp);
}


