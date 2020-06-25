class ScoreService {
    static baseURL = 'http://localhost:3000/scores'
    
    static postScore() {
        let scoreData = {
            wpm: parseInt(document.querySelector("#wpm h2").innerHTML),
            cpm: parseInt(document.querySelector("#cpm h2").innerHTML),
            accuracy: parseInt(document.querySelector("#accuracy h2").innerHTML.split(" ")[0]),
            test_id: document.querySelector("#test-container").value
        }
        fetch(this.baseURL, {
            headers: {
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(scoreData)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(obj) {
            const {id,wpm,cpm,accuracy} = obj
            new Score(id,wpm,cpm,accuracy).renderScore()
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }
}

