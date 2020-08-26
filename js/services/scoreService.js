class ScoreService {
    
    static baseURL = 'http://localhost:3000/scores'
    
    static postScore() {
        const scoreData = {
            wpm: parseInt(document.querySelector("#wpm h2").innerHTML),
            cpm: parseInt(document.querySelector("#cpm h2").innerHTML),
            accuracy: parseInt(document.querySelector("#accuracy h2").innerHTML.split(" ")[0]),
            errors_count: parseInt(document.querySelector("#errors h2").innerText),
            test_id: document.querySelector("#test-container").value
        }
        fetch(this.baseURL, {
            headers: {
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(scoreData)
        })
        .then(resp => resp.json())
        .then(score => {
            const {id,wpm,cpm,accuracy,errors_count} = score
            new Score(id,wpm,cpm,accuracy,errors_count).renderScore()
        })
        .catch(error => console.log(error.message))
    }
}

