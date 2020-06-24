document.addEventListener("DOMContentLoaded", () => {
    TestService.fetchTests()
    TestService.fetchTest(10)
    Test.testDropdownListener()
    
    Score.startTestListener()
})

