
// Create a list that holds all of your cards
var cards = ['fa-diamond','fa-diamond',
             'fa-paper-plane-o','fa-paper-plane-o',
             'fa-anchor','fa-anchor',
             'fa-bolt','fa-bolt',
             'fa-cube','fa-cube',
             'fa-leaf','fa-leaf',
             'fa-bicycle','fa-bicycle',
             'fa-bomb','fa-bomb'
            ];

/*
*The gereateCard function return the HTML format 
*With dynamic class called
*/
function generateCard(card){
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//Function for counting the time the player spend in the game 
var arr = [];
window.onbeforeunload = function(){
var nTime = new Date();
var getTime = nTime.getTime();
arr.push(getTime);
var diff= getTime-arr[0]; // here take the difference time between privous and the newtime
var sec = diff/1000;
var r = Math.round(sec);
return "Time spent : "+r+" seconds";
};


//Display alert to tell the player his scoore
function Congratulations(){
    const congrateDiv = document.createElement('div');
    const congrate = document.createElement('h1');
    const textCongrate = document.createTextNode('Congratulations');
    const paragraph = document.createElement('p');
    
    const button = document.createElement('div');
    button.className = " rest restart";
    const restButton = document.createElement('i');
    restButton.className = 'fa fa-repeat';
    const textParagraph = document.createTextNode("You get \'" + countStars + "\' Star, The Numbers moves was \'" + moves + " \' and " + window.onbeforeunload());
    
    congrate.appendChild(textCongrate);
    paragraph.appendChild(textParagraph);
    button.appendChild(restButton);
    congrateDiv.appendChild(congrate);
    congrateDiv.appendChild(paragraph);
    congrateDiv.appendChild(button);
    congrateDiv.className = "congrate";
    
    document.body.appendChild(congrateDiv);
   
    

}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function initGame() {
    
    var deck = document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    
    /*.join array prototype method joins all element of an array
     *And into a string and returns this string
     *Then we inserting to deck variable
    */
    deck.innerHTML = cardHTML.join('');
    moveCount.innerText = moves;
    
}

var moves = 0;
var moveCount = document.querySelector('.moves');

var stars = document.querySelector('.stars');
var countStars = 'Three';
initGame();

var allCards = document.querySelectorAll('.card');
var cardsOn = [];

var countToCongrate = 0;



//set up the event listener for a restart 
var restart = document.querySelector('.restart');
restart.addEventListener('click',function() {
    window.location.reload();
});



//To display the time in screen 
var checkTime = true;
var time = document.querySelector('.times');


var checkCloseCard = true;
allCards.forEach(function(card) {
    
    card.addEventListener('click', function() {
        if(checkCloseCard){
        //Time of the game will start when the player start game 
        setInterval(function() {
        if(checkTime === true){
            time.innerText = window.onbeforeunload();
            }
        },1000);
        
        
        //Check if the two cards not open & show & match
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && checkCloseCard){
            cardsOn.push(card);
            card.classList.add('open','show');
            
        }
        
        /*
        *Check if they match 
        *If yes it mateched will keep it and add match then eassiged empty for cardsOn array
        *If No means else will remove open and show then assiged empty for cardsOn array 
        */
        if (cardsOn.length > 1){
                //each click add +1 for moves
                moves += 1;
                //then assigned 
                moveCount.innerText = moves; 
            if (cardsOn[0].firstElementChild.classList.value === cardsOn[1].firstElementChild.classList.value){
                cardsOn.forEach(function(card) {
                    card.classList.add('match');
                });
                cardsOn = [];
                //When match increase countToCongrate by one. Max = 8
                countToCongrate++;
            }else{
              checkCloseCard = false;
                setTimeout(function() {
                    cardsOn.forEach(function(card) {
                    card.classList.remove('open','show');
                       checkCloseCard = true; 
                    });
                    cardsOn = [];
                },700);
                  
            }
            
        }
            
        
        
        
        if(moves > 10){
            //here the stars will be one
            stars.childNodes[3].style.visibility = 'hidden';
            countStars = 'One';
        }else if(moves > 5){
            //here the stars will be two, fill
            stars.lastElementChild.style.visibility = 'hidden';
            countStars = 'Two';
        }
        
        if(countToCongrate === 8){
            checkTime = false;
            Congratulations();
            //Set up the event listener for a restert after finish game
            var restart2 = document.querySelector('.rest');
            restart2.addEventListener('click',function() {
                window.location.reload();
            });
        }
    }
    })
   
});










