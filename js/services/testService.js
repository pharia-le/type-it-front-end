class TestService {
    
    static baseURL = 'http://localhost:3000/tests'

    static options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
    }
    
    static addTests() {
        fetch(this.baseURL,this.options)
        .then(resp => resp.json())
        .then(tests => {
            for (const test of tests) {
                const {id,title,author,content,likes} = test
                new Test(id,title,author,content,likes).addTestOption()
            }
        })
        .catch(error => console.log(error.message))
    }

    static addTest(id) {
        fetch(`${this.baseURL}/${id}`,this.options)
        .then(resp => resp.json())
        .then(test =>  {
            const {id,title,author,content,likes} = test
            new Test(id,title,author,content,likes).renderTest()
        })
        .catch(error => console.log(error.message))
    }

    static addScores() {
        const testID = parseInt(document.querySelector("#test-container").value)
        fetch(`${this.baseURL}/${testID}`,this.options)
        .then(resp => resp.json())
        .then(test => {
            const scores = test.scores
            Score.addTableToModal()
            Score.modalListener()
            for (const score of scores) {
                const {id,wpm,cpm,accuracy,errors_count} = score
                new Score(id,wpm,cpm,accuracy,errors_count).addScoreToModal()
            }
        })
        .catch(error => console.log(error.message))
    }

    static likeTest() {
        const testID = parseInt(document.querySelector("#test-container").value)
        const updatedLikes = parseInt(document.querySelector("#test-container h5").innerText.split(" ")[0])+1
        let testData = {
            likes: updatedLikes
        }
        fetch(`${this.baseURL}/${testID}`, {
            ...this.options,
            method: 'PATCH',
            body: JSON.stringify(testData)
        })
        .then(resp => resp.json())
        .then(test => {
            const {id,title,author,content,likes} = test
            new Test(id,title,author,content,likes).renderTest()
        })
        .catch(error => console.log(error.message))
    }
}
