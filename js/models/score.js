class Score {
    constructor(id,wpm,cpm) {
        this.id = id
        this.wpm = wpm
        this.cpm = cpm
    }

    static startTimer() {
        return setInterval(this.decreaseTimer, 1000)
    }
    static startTestListener() {
        const button = document.getElementById("start-button")
        button.addEventListener("click", () => {
            const selector = document.getElementById("test-dropdown")
            const button = document.getElementById("start-button")
            selector.disabled = true
            button.disabled = true
            const currentTime = this.startTimer()
            setTimeout(function() {
                clearInterval(currentTime),
                ScoreService.postScore()
            }, 1000 * 61)
        })
    }

    static decreaseTimer() {
        const time = document.querySelector("#timer-container h2")
        if (parseInt(time.innerHTML) !== 0) {
            const input = document.querySelector("input")
            const content = document.querySelector("#test-container p").innerText
            const allEntries = input.value
            let errors = 0
            for (const entry of allEntries) {
                if (entry !== content[allEntries.indexOf(entry)]) {
                    errors+=1
                }
            }
            const currentWPM = Score.findWPM()
            const currentCPM = currentWPM*5
            const wpm = document.querySelector("#wpm h2")
            const cpm = document.querySelector("#cpm h2")
            if (currentWPM > 0) {
                wpm.innerHTML = parseInt(currentWPM,10)
                cpm.innerHTML = parseInt(currentCPM,10)
            } else {
                wpm.innerHTML = 1
                cpm.innerHTML = 5
            }            
            time.innerHTML = parseInt(time.innerHTML)-1
        }
    }

    static findWPM() {
        const content = document.querySelector("#test-container p").innerText
        const input = document.querySelector("input")
        const time = document.querySelector("#timer-container h2")
        const accuracy = document.querySelector("#accuracy h2")
        const timeElapsed = 60 - parseInt(time.innerHTML)
        const allEntries = input.value
        let errors = 0
        for (const entry of allEntries) {
            if (entry !== content[allEntries.indexOf(entry)]) {
                errors+=1
            }
        }
        const grossWPM = (allEntries.length/5)/(timeElapsed/60)
        if (errors > 0) {
            const currentAccuracy = parseInt(errors/(allEntries.length)*100,10)
            accuracy.innerHTML = `${currentAccuracy}%`
            return (grossWPM - errors/(timeElapsed/60))
        } else {
            accuracy.innerHTML = '100%'
            return grossWPM
        }
    }

    // Clear Score Form & Data
    clearFormAndData() {
        document.querySelector("input").value = ''
        document.querySelector("#wpm h2").innerText = '0'
        document.querySelector("#cpm h2").innerText = '0'
        document.querySelector("#accuracy h2").innerText = '0'
        document.querySelector("#timer-container h2").innerText = '60'
    }

    // Display Score
    renderScore() {
        alert(
            `WORDS / MIN - ${this.wpm}\nCHARS / MIN - ${this.cpm}`)
        this.clearFormAndData()
        const selector = document.getElementById("test-dropdown")
        selector.disabled = false
        const button = document.getElementById("start-button")
        button.disabled = false
    }


}
