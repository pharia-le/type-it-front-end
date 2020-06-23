class Test {
    constructor(id,name,content) {
        this.id = id
        this.name = name
        this.content = content
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
            <h3>${this.name}</h3>
            <p>${this.content}</p>
            `
    }

    // Add new Test Option to Test Options Selector
    addTestOption() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerHTML = this.name
        const testDropdown = document.getElementById("test-dropdown")
        testDropdown.add(option)
    }
}
