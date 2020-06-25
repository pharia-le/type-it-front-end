class Test {
    constructor(id,title,author,content,likes) {
        this.id = id
        this.title = title
        this.author = author
        this.content = content
        this.likes = likes
    }

    // Event Listener for Select a Test
    static testDropdownListener() {
        const testDropdown = document.getElementById("test-dropdown")
        testDropdown.addEventListener("change", (e) => {
            const id = parseInt(e.target.value)
            TestService.fetchTest(id)
        })
    }

    // Clear a Test
    clearTest() {
        const testContainer = document.getElementById("test-container")
        testContainer.innerHTML = ''
    }

    // Add a Test
    addTest() {
        const testContainer = document.getElementById("test-container")
        testContainer.value = this.id
        testContainer.innerHTML += this.testHTML()
    }

    // Display a Test
    renderTest() {
        this.clearTest()
        this.addTest()
    }

    // Create HTML for a Test
    testHTML() {
        return `
            <h3>${this.title}</h3>
            <h4>${this.likes} Likes</h4>
            <button onclick=TestService.likeTest() type="button" id="like-button">Like</button>
            <p>${this.content}</p>
            `
    }

    // Add new Test Option to Test Options Selector
    addTestOption() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerHTML = this.title
        const testDropdown = document.getElementById("test-dropdown")
        testDropdown.add(option)
    }
}
