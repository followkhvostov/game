'use strict';
var playGame = function () {
    var emojiArray = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃', '🐿',];
    var createEmoji = function () {   
        var emojiNumber = Math.floor(Math.random() * emojiArray.length);
        var emoji = emojiArray[emojiNumber];
        emojiArray.splice(emojiNumber, 1);
        return emoji;
    };
    var createCard = function (cardClassName, frontClassName, backClassName) {
        var card = document.createElement('div');
        card.classList.add(cardClassName);
        var frontSide = document.createElement('span');
        frontSide.classList.add(frontClassName);
        card.appendChild(frontSide);
        var backSide = document.createElement('span');
        backSide.classList.add(backClassName);
        backSide.innerHTML = createEmoji();
        card.appendChild(backSide);
        return card;
    }
    var defineOrder = function () {
        var classArray = ['zero', 'one', 'two', 'three'];
        var number = Math.floor(Math.random() * classArray.length);
        var className = classArray[number];
        return className;
    }
    var createCards = function () {
        var field = document.getElementById('game__field')
        var numberOfPairs = 6;
        for (var i = 0; i < numberOfPairs; i++) {
            var card = createCard('game__card', 'game__card_front', 'game__card_back');
            var cardPair = card.cloneNode(true);
            field.appendChild(card);
            field.appendChild(cardPair);
            card.classList.add(defineOrder());
            cardPair.classList.add(defineOrder());
        };
    };
    var count = 0;
    var compare = function (rotatedCards) {
        for (var i = 0; i < rotatedCards.length; i++) {
            if (rotatedCards[0].innerHTML == rotatedCards[1].innerHTML) {
                    rotatedCards[i].classList.remove('rotateY');
                    rotatedCards[i].classList.add('equal');
                    count++;
                    if (count == 12) {
                        setTimeout(displayResult, 500, 'win')
                    }
            } else {
                rotatedCards[i].classList.add('not-equal');
            }
        }     
    }
    var rotateCards = function () {
        var field = document.querySelector('.game__field');
        field.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target.tagName === 'SPAN') {
                if (!document.getElementById('game__timer').hasChildNodes()) {
                    timer();
                }
                if (!event.target.parentNode.classList.contains('rotateY')) {
                    event.target.parentNode.classList.add('rotateY');
                }
                var rotatedCards = Array.from(field.querySelectorAll('.rotateY'));
                if (rotatedCards.length == 3) {
                    for (var i = 0; i < rotatedCards.length; i++) {
                        rotatedCards[i].classList.remove('rotateY');
                        rotatedCards[i].classList.remove('not-equal');  
                        if (!event.target.parentNode.classList.contains('rotateY')) {
                            event.target.parentNode.classList.add('rotateY');
                        }
                    }
                }
                if (rotatedCards.length == 2) {
                    setTimeout(compare, 400, rotatedCards);      
                }
            }
        }, true);
    };
    var timer = function () {
        if (event.target.tagName == 'SPAN') {
            var timer = document.getElementById('game__timer');
            var minCounter = 1;
            var secCounter = '00';
            var minutes = document.createElement('span');
            minutes.classList.add('game__text');
            minutes.innerHTML = '0' + minCounter.toString();
            timer.appendChild(minutes);
            var seconds = document.createElement('span');
            seconds.innerHTML = ':' + secCounter.toString();
            seconds.classList.add('game__text');
            timer.appendChild(seconds);
            var minChanger = setInterval(() => {
                minCounter -= 1;
                minutes.innerHTML = '0' + minCounter.toString();
                if (minCounter === 0) {
                    clearInterval(minChanger);
                }
            }, 1000);
            if (minCounter === 1) {
                secCounter = 60;
                var secChanger = setInterval(() => {
                    var r = document.getElementById('game__result');
                    if (!r.classList.contains('display-none')) {
                        clearInterval(secChanger);
                    }
                    secCounter -= 1;
                    if (secCounter === 0) {
                        setTimeout(() => {
                            displayResult('lose');
                        }, 1000);
                        clearInterval(secChanger);
                    }
                    if (secCounter < 10) {
                        secCounter = '0' + secCounter;
                    }
                    seconds.innerHTML = ':' + secCounter.toString();
                }, 1000);
            }
        }
    };
    var displayResult = function (message) {
        var result = document.getElementById('game__result')
        result.classList.remove('display-none');
        if (message == 'win') {
            document.getElementById('win').classList.remove('display-none');
        } else {
            document.getElementById('lose').classList.remove('display-none');
        }
        result.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON' || event.target.tagName === 'SPAN') {
                result.classList.add('display-none');
                var arrayToDelete = document.querySelectorAll('.game__card');
                for (var i = 0; i < arrayToDelete.length; i++) {
                    arrayToDelete[i].parentNode.removeChild(arrayToDelete[i]);
                }
                var arrayToDeleteTimer = document.querySelectorAll('.game__text');
                for (var j = 0; j < arrayToDeleteTimer.length; j++) {
                    arrayToDeleteTimer[j].parentNode.removeChild(arrayToDeleteTimer[j]);
                }
                playGame();
            }
        }, true);
    };
    createCards();
    rotateCards();
}