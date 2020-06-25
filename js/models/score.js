class Score {
    constructor(id,wpm,cpm,accuracy) {
        this.id = id
        this.wpm = wpm
        this.cpm = cpm
        this.accuracy = accuracy
    }

    static spaceListener() {
        const input = document.querySelector("input")
        input.addEventListener("input", (e) => {
            if (e.data == " ") {
                this.updateData()
            }
        })
    }

    static updateData() {
        const testWord = document.getElementById("test-word")
        const inputWords = document.querySelector("input").value
        const inputWordsSplit = document.querySelector("input").value.split(" ")
        const inputWord = inputWordsSplit[inputWordsSplit.length-2]
        const same = (testWord.innerText === inputWord)
        console.log(same)
        same ? testWord.id = "test-word-right" : testWord.id = "test-word-wrong"
        const errorSaver = document.querySelector("#errors h2")              
        if (!same) {
            errorSaver.innerText = parseInt(errorSaver.innerText,10) +1
        }
        const errorNum = parseInt(errorSaver.innerText,10)
        const accuracy = document.querySelector("#accuracy h2")
        accuracy.innerText = `${parseInt((inputWordsSplit.length-errorNum)*100/inputWordsSplit.length,10)}`
        const time = document.querySelector("#timer-container h2")
        const timeElapsed = 60 - parseInt(time.innerText)
        const grossWPM = parseInt((inputWords.length/5)/(timeElapsed/60),10)
        const newCPM = parseInt((inputWords.length)/(timeElapsed/60),10)
        const wpm = document.querySelector("#wpm h2")
        const cpm = document.querySelector("#cpm h2")
        wpm.innerText = `${grossWPM-errorNum}`
        cpm.innerText = `${newCPM-errorNum}`
    }

    static keyRestrictions(event) {
        const space = 32
        const backspace = 8;
        if (event.keyCode == backspace) {
            event.preventDefault()
        }
        if (event.keyCode == space && document.querySelector("input").value.slice(-1) == " ") {
            event.preventDefault()
        }
    }

    static toggler() {
        const input = document.querySelector("input")
        const selector = document.getElementById("test-dropdown")
        const start = document.getElementById("start-button")
        const like = document.getElementById("like-button")
        input.disabled ? input.disabled = false : input.disabled = true
        selector.disabled ? selector.disabled = false : selector.disabled = true
        start.disabled ? start.disabled = false : start.disabled = true
        like.disabled ? like.disabled = false : like.disabled = true
    }

    static startTimer() {
        return setInterval(this.decreaseTimer, 1000)
    }
    static startTestListener() {
        const button = document.getElementById("start-button")
        button.addEventListener("click", () => {
            this.toggler()
            this.spaceListener()
            const currentTime = this.startTimer()
            setTimeout(function() {
                clearInterval(currentTime),
                Score.updateData()
                ScoreService.postScore()
            }, 1000 * 61)
        })
    }

    static decreaseTimer() {
        const time = document.querySelector("#timer-container h2")
        if (parseInt(time.innerHTML) !== 0) {           
            time.innerHTML = parseInt(time.innerHTML)-1
        }
    }

    // Clear Score Form & Data
    clearFormAndData() {
        document.querySelector("input").value = ''
        document.querySelector("#wpm h2").innerText = '0'
        document.querySelector("#cpm h2").innerText = '0'
        document.querySelector("#accuracy h2").innerText = '0'
        document.querySelector("#errors h2").innerText = '0'
        document.querySelector("#timer-container h2").innerText = '60'
    }

    // Display Score
    renderScore() {
        this.clearFormAndData()
        Score.toggler()
        TestService.fetchTest(parseInt(document.querySelector("#test-container").value))
        alert(
            `WORDS / MIN - ${this.wpm}\nCHARS / MIN - ${this.cpm}\nACCURACY - ${this.accuracy} %`)
    }
}
