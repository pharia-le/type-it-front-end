class TestService {

    static baseURL = 'http://localhost:3000/tests'

    static options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
    }

    static testData(id,title,content) {
        id = id,
        title = title,
        author = author,
        content = content,
        likes = likes
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

}
