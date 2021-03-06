class Score {
    constructor(id,wpm,cpm,accuracy,errors_count) {
        this.id = id
        this.wpm = wpm
        this.cpm = cpm
        this.accuracy = accuracy
        this.errors_count = errors_count
    }

    static updateData() {
        const testWord = document.getElementById("test-word")
        const inputWords = document.querySelector("input").value
        const inputWordsSplit = document.querySelector("input").value.split(" ")
        const inputWord = inputWordsSplit[inputWordsSplit.length-1]
        const same = (testWord.innerText === inputWord)
        same ? testWord.id = "test-word-right" : testWord.id = "test-word-wrong"
        const errorSaver = document.querySelector("#errors h2")              
        if (!same) {
            errorSaver.innerText = parseInt(errorSaver.innerText,10) +1
        }
        const errorNum = parseInt(errorSaver.innerText,10)
        const accuracy = document.querySelector("#accuracy h2")
        accuracy.innerText = `${parseInt((inputWordsSplit.length-errorNum)*100/inputWordsSplit.length,10)} %`
        const time = document.querySelector("#timer-container h2")
        const timeElapsed = 60 - parseInt(time.innerText)
        const grossWPM = parseInt((inputWords.length/5)/(timeElapsed/60),10)
        const newCPM = parseInt((inputWords.length)/(timeElapsed/60),10)
        const wpm = document.querySelector("#wpm h2")
        const cpm = document.querySelector("#cpm h2")
        wpm.innerText = `${grossWPM-errorNum}`
        cpm.innerText = `${newCPM-errorNum}`
    }

    static handleKeyDowns(event) {
        const space = 32
        const backspace = 8;
        if (event.keyCode == backspace) {
            event.preventDefault()
        }
        if (event.keyCode == space && document.querySelector("input").value.slice(-1) == " ") {
            event.preventDefault()
        }
        if (event.keyCode == space && document.querySelector("input").value.slice(-1) != " ") {
            this.updateData()
        }
    }

    static toggler() {
        const scores = document.getElementById("myBtn")
        const input = document.querySelector("input")
        const selector = document.getElementById("test-dropdown")
        const start = document.getElementById("start-button")
        const like = document.getElementById("like-button")
        input.disabled ? input.disabled = false : input.disabled = true
        selector.disabled ? selector.disabled = false : selector.disabled = true
        start.disabled ? start.disabled = false : start.disabled = true
        like.disabled ? like.disabled = false : like.disabled = true
        scores.disabled ? scores.disabled = false : scores.disabled = true
    }

    static startTimer() {
        return setInterval(this.decreaseTimer, 1000)
    }
    
    static startTestListener() {
        const button = document.getElementById("start-button")
        button.addEventListener("click", () => {
            this.toggler()
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

    clearFormAndData() {
        document.getElementById("score-form").reset()
        document.querySelector("#wpm h2").innerText = '0'
        document.querySelector("#cpm h2").innerText = '0'
        document.querySelector("#accuracy h2").innerText = '0'
        document.querySelector("#errors h2").innerText = '0'
        document.querySelector("#timer-container h2").innerText = '60'
    }

    renderScore() {
        this.clearFormAndData()
        Score.toggler()
        TestService.addTest(parseInt(document.querySelector("#test-container").value))
        const modal = document.getElementById("myModal")
        const modalBody = document.getElementsByClassName("modal-body")[0]
        modalBody.innerHTML += this.scoreHTML()
        const span = document.getElementsByClassName("close")[0]
        modal.style.display = "block"

        span.onclick = function() {
            modal.style.display = "none";
            modalBody.removeChild(modalBody.lastElementChild)
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none"
              modalBody.removeChild(modalBody.lastElementChild)
            }
          }    
    }

    scoreHTML() {
        return `
            <ul>
                <h3>WORDS / MIN : ${this.wpm}</h3>
                <h3>CHARS / MIN : ${this.cpm}</h3>
                <h3>TOTAL ERRORS : ${this.errors_count}</h3>
                <h3>ACCURACY : ${this.accuracy} %</h3>
            </ul>
            `
    }

    addScoreToModal() {
        const scoresTable = document.getElementById("scores-table")
        scoresTable.innerHTML += this.modalHTML()
    }

    modalHTML() {
        return `
            <tr>
                <td>${this.wpm}</td>
                <td>${this.cpm}</td>
                <td>${this.errors_count}</td>
                <td>${this.accuracy} %</td>
            </tr>
            `
    }
    
    static addTableToModal() {
        const modalBody = document.getElementsByClassName("modal-body")[1]
        modalBody.innerHTML += `
            <table id="scores-table">
                <tr>
                    <th>WORDS / MIN</th>
                    <th>CHARS / MIN</th>
                    <th>TOTAL ERRORS</th>
                    <th>ACCURACY</th>
                </tr>
            </table>
            `
    

    static modalListener() {
        const modal = document.getElementById("scoresModal")
        const modalBody = document.getElementsByClassName("modal-body")[1]
        const span = document.getElementsByClassName("close")[1]
        modal.style.display = "block"
        span.onclick = function() {
            modal.style.display = "none";
            modalBody.removeChild(modalBody.lastElementChild)
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none"
              modalBody.removeChild(modalBody.lastElementChild)
            }
          }
    }
}
