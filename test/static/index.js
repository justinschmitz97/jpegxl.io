document.addEventListener('DOMContentLoaded', function () {
    JXLTests().then(function(JXLTests){
        JXLTests = JXLTests;
        JXLTests.runAllTests();
    })
});