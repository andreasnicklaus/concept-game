import words from "./words.json" assert {type: 'json'};

export class ConceptGame {
    currentPlayerIndex;
    playerList = {};
    stones = {};
    currentWord;

    addPlayer = (uuid, playerInfo) => this.playerList[uuid] = playerInfo
    deletePlayer = (uuid) => delete this.playerList[uuid]

    nextPlayer() {
        if (this.currentPlayerIndex === undefined) this.currentPlayerIndex = 0
        else this.currentPlayerIndex++
    }

    chooseNewWord = () => this.currentWord = words[Math.floor(Math.random() * words.length)]

    defineStones = (uuid, stones) => {
        if (Object.keys(this.playerList)[this.currentPlayerIndex] === uuid) {
            Object.entries(stones).forEach(([key, value]) => this.stones[key] = value)
        }
    }

    getPublicInfo = () => {
        return {
            currentPlayerIndex: this.currentPlayerIndex,
            playerList: this.playerList,
            stones: this.stones
        }
    }

    startGame() {
        this.chooseNewWord();
        this.nextPlayer();
    }

    isRightTip(tip) {
        return tip === this.currentWord;
    }
}