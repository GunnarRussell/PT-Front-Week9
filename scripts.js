// For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
// You do not need to do anything special when there is a tie in a round.
// Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser's console.


// - Deal 26 Cards to each Player from a Deck of 52 cards.
// - Iterate through the turns where each Player plays a Card.
// - The Player who played the higher card is awarded a point.
// - Ties result in zero points for both Players.
// - After all cards have been played, display the score and declare the winner.

class Card
{
    constructor(num, suit)
    {
        this.num = num;
        this.suit = suit;

        // sets values of face cards
        // num is the variable used to determine which card is higher, value is what is displayed on the card
        if(num == 11)
        {
            this.value = "Jack";
        }
        else if(num == 12)
        {
            this.value = "Queen";
        }
        else if(num == 13)
        {
            this.value = "King";
        }
        else if(num == 14)
        {
            this.value = "Ace";
        }
        else
        {
            this.value = this.num;
        }
    }

    describe() //returns description of card
    {
        return `${this.value} of ${this.suit}`;
    }

}

class Deck
{
    constructor()
    {
        this.deck1 = [];
        this.deck2 = [];

        //on startup, create card objects for each card in a poker deck using for loops

        //create 2 through Ace of Spades
        for(let i = 2; i <= 14; i++)
        {
            let card = new Card(i, "Spades");
            this.deck1.push(card);
        }

        //create 2 through Ace of Clubs
        for(let i = 2; i <= 14; i++)
        {
            let card = new Card(i, "Clubs");
            this.deck1.push(card);
        }

        //create 2 through Ace of Spades
        for(let i = 2; i <= 14; i++)
        {
            let card = new Card(i, "Diamonds");
            this.deck1.push(card);
        }

        //create 2 through Ace of Spades
        for(let i = 2; i <= 14; i++)
        {
            let card = new Card(i, "Hearts");
            this.deck1.push(card);
        }
    }

    shuffle()
    {
        console.log("Shuffling deck...");

        //map and sort randomly
        let shuffledDeck = this.deck1
            .map(function(value) // pairs deck array with a new array of random values
            {
                return { value: value, sort: Math.random() }
            })
            .sort(function(a, b) // sorts this random array in ascending order, "shuffling" the original array in a way
            {
                return a.sort - b.sort;
            })
            .map(function(item) // "extracts" the original array values from the new array
            {
                return item.value;
            });
        
        //overwrites deck with shuffled version of deck
        this.deck1 = shuffledDeck;
    }

    split(player1, player2) //seperates the deck into two decks and gives each deck to a player
    {
        console.log("Dealing cards...");
        
        //take half of deck1 array and put it in deck2 array
        for(let i = 0; i < 26; i++)
        {
            this.deck2.push(this.deck1.pop());
        }

        //give the deck halves to each player
        player1.deck = this.deck1;
        player2.deck = this.deck2;
    }
}

class Player
{
    constructor(name)
    {
        this.name = name;
        
        this.deck = [];
        this.points = 0;
    }

    playCard() // removes the top card of their deck array and returns the value
    {
        //remove the top card of deck
        let playedCard = this.deck.pop();

        //print to console
        console.log(`${this.name} played ${playedCard.describe()}.`);

        //return card (goes to to War Class's compareCards() method)
        return playedCard;
    }
}

class War 
{
    constructor(player1, player2, deck)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.deck = deck;
    }

    compareCards(player1card, player2card) //compares two Card objects and reports the winner
    {
        if(player1card.num > player2card.num) //if player 1's card is greater
        {
            console.log(`${player1card.describe()} wins! Player 1 scores a point.`);
            this.player1.points += 1;

        }
        else if (player1card.num < player2card.num) //if player 2's card is greater
        {
            console.log(`${player2card.describe()} wins! Player 2 scores a point.`);
            this.player2.points += 1;
        }
        else //tie
        {
            console.log(`It's a tie! Nobody scores any points.`);
        }
        console.log("-------------------------------------");
    }

    playWar() //game logic
    {
        // - SET UP GAME -
        //Shuffle and deal cards
        this.deck.shuffle();
        this.deck.split(this.player1,this.player2);

        console.log("Ready to begin!\n-------------------------------------");

        // - PLAY GAME -
        //While loop iterates through all of the cards in each players' decks
        //As long as players have cards in their decks,
        while(this.player1.deck.length != 0)
        {
            //both players play the top card of their deck and compare them
            this.compareCards(this.player1.playCard(),this.player2.playCard());
        }

        //Show points at the end of the game
        console.log("END OF GAME");
        console.log(`${this.player1.name}: ${this.player1.points} points.`)
        console.log(`${this.player2.name}: ${this.player2.points} points.`)

        //Figure out who wins
        if(this.player1.points > this.player2.points)
        {
            //if player 1 has more points
            console.log(`${this.player1.name} wins!`);
        }
        else if(this.player1.points < this.player2.points)
        {
            //if player 2 has more points
            console.log(`${this.player2.name} wins!`);
        }
        else
        {
            //tie
            console.log("It's a tie!")
        }
    }
}

//PLAY THE GAME

//create players
player1 = new Player("Player 1");
player2 = new Player ("Player 2");

//create deck
deck = new Deck();

//create the game and pass the players and deck into it
war = new War(player1, player2, deck);

//play the game!
war.playWar();


