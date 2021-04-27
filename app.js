const gameArea = document.querySelector('.game');
const gameOptions = document.querySelector('.gameOptions');
const btn = document.createElement('button');

//update of elements
btn.classList.add('startBtn');
btn.textContent = "Proceed";

//adding elements to page
gameArea.append(btn);

// event listeners
btn.addEventListener('click',startGame);

function startGame(){
    btn.style.display = 'none'; //hide start button
    gameOptions.style.display = 'none';  //hide to options inputs

    d=getValues()[0]; //game parameters reset
    console.log(d)
    if (d=='q'){
        location.href='index_v1.html'
    }
    if (d=='p'){
        location.href='index_v2.html'
    }

}

function getValues(){
    let temparr = []
    let d = document.getElementsByClassName('op')
    for (var checkbox of d) {
        if (checkbox.checked) {
            temparr.push(checkbox.value)
        };
    }
    // console.log(temparr)
    return temparr
}
