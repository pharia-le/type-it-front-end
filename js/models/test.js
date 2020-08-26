class Test {
    constructor(id,title,author,content,likes) {
        this.id = id
        this.title = title
        this.author = author
        this.content = content
        this.likes = likes
    }

    static testDropdownListener() {
        const testDropdown = document.getElementById("test-dropdown")
        testDropdown.addEventListener("change", (e) => {
            const id = parseInt(e.target.value)
            TestService.addTest(id)
        })
    }

    clearTest() {
        const testContainer = document.getElementById("test-container")
        testContainer.innerHTML = ''
    }

    appendTest() {
        const testContainer = document.getElementById("test-container")
        testContainer.value = this.id
        testContainer.innerHTML += this.testHTML()
    }

    renderTest() {
        document.querySelector("input").value = ''
        this.clearTest()
        this.appendTest()
    }

    testHTML() {
        return `
            <h3>${this.title}</h3>
            <h4>by ${this.author}</h4>
            <h5>${this.likes} Likes</h5>
            <button onclick=TestService.likeTest() type="button" id="like-button">Like</button>
            <p>${this.content.split(" ").map(word => `<span id='test-word'>${word}</span>`).join(" ")}</p>
            `
    }

    addTestOption() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerHTML = this.title
        const testDropdown = document.getElementById("test-dropdown")
        testDropdown.add(option)
    }
}
