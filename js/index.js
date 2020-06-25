document.addEventListener("DOMContentLoaded", () => {
    TestService.fetchTests()
    TestService.fetchTest(1)
    Test.testDropdownListener()
    Score.startTestListener()

})

