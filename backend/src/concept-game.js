import words from "./words.json";
// TODO: Add more words
export class ConceptGame {
    currentPlayerIndex;
    playerList = {};
    stones = {};
    currentWord;
    messages= []

    addPlayer = (uuid, playerInfo) => {
        this.playerList[uuid] = { ...playerInfo, points: 0 }
        this.messages.push({ text: `${playerInfo.name} joined the game.` })
    }
    deletePlayer = (uuid) => delete this.playerList[uuid]

    nextPlayer() {
        if (this.currentPlayerIndex === undefined) this.currentPlayerIndex = 0
        else this.currentPlayerIndex = (this.currentPlayerIndex + 1) % Object.keys(this.playerList).length
    }

    setPlayerReadyStatus(uuid, readyStatus) {
        this.playerList[uuid].ready = readyStatus
    }

    chooseNewWord = () => {
        this.currentWord = words[Math.floor(Math.random() * words.length)]
        console.log("NEW WORD:", this.currentWord)
    }

    defineStones = (uuid, stones) => {
        if (Object.keys(this.playerList)[this.currentPlayerIndex] === uuid) {
            Object.entries(stones).forEach(([key, value]) => this.stones[key] = value)
        }
    }

    getPublicInfo = () => {
        return {
            currentPlayerIndex: this.currentPlayerIndex,
            playerList: this.playerList,
            stones: this.stones,
            messages: this.messages
        }
    }

    startGame() {
        this.chooseNewWord();
        this.nextPlayer();
    }

    isRightTip(uuid, tip) {
        const isCorrect = tip.toLowerCase().replace(/\s+/g, '') === this.currentWord.toLowerCase().replace(/\s+/g, '')
        if (isCorrect) {
            this.playerList[uuid].points += 2
            this.playerList[Object.keys(this.playerList)[this.currentPlayerIndex]].points += 1
        }
        this.messages.push({ text: tip, sender: this.playerList[uuid].name, correct: isCorrect})
        return isCorrect
    }
}