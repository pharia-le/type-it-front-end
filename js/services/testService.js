class TestService {

    static baseURL = 'http://localhost:3000/tests'

    static options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
    }
    
    static fetchTests() {
        fetch(this.baseURL,this.options)
        .then(function(response) {
            return response.json()
        })
        .then(function(objects) {
            for (const obj of objects) {
                const {id,title,author,content,likes} = obj
                new Test(id,title,author,content,likes).addTestOption()
            }
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }

    static fetchTest(id) {
        fetch(`${this.baseURL}/${id}`,this.options)
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
            const {id,title,author,content,likes} = object
            new Test(id,title,author,content,likes).renderTest()
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }

    static likeTest() {
        const testID = parseInt(document.querySelector("#test-container").value)
        const updatedLikes = parseInt(document.querySelector("#test-container h5").innerText.split(" ")[0])+1
        let testData = {
            likes: updatedLikes
        }
        fetch(`${this.baseURL}/${testID}`, {
            headers: {
                'Content-Type': 'application/json'
                },
            method: 'PATCH',
            body: JSON.stringify(testData)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
            const {id,title,author,content,likes} = object
            new Test(id,title,author,content,likes).renderTest()
        })
        .catch(function(error) {
            console.log(error.message)
        })


    }
}
