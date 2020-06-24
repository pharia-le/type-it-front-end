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
        const input = document.querySelector("input")
        input.addEventListener("click", () => {
            const currentTimer = this.startTimer()
            
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
        } else {
            clearInterval(this.currentTimer)
            ScoreService.postScore()
            
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
}
