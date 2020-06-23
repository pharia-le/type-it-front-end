class TestService {

    static baseURL = 'http://localhost:3000/tests'

    static options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
    }
    
    // Class Method to Format Test

    static testData(id,name,content) {
        id = id,
        name = name,
        content = content
    }
    
    static fetchTests() {
        fetch(this.baseURL,this.options)
        .then(function(response) {
            return response.json()
        })
        .then(function(objects) {
            for (const obj of objects) {
                const {id,name,content} = obj
                new Test(id,name,content).addTestOption()
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
            const {id,name,content} = object
            new Test(id,name,content).renderTest()
        })
        .catch(function(error) {
            console.log(error.message)
        })
    }

}
