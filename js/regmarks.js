var csInterface = new CSInterface();


function onCreateRegmarksButtonClick() {
  csInterface.evalScript("createRegMarks()");
}

function onClearRegmarksButtonClick() {
  csInterface.evalScript("clearRegMarks()");
}

var createRegMarksButton = document.querySelector("#create-regmarks-button");
createRegMarksButton.addEventListener("click", onCreateRegmarksButtonClick);

var clearRegMarksButton = document.querySelector("#clear-regmarks-button");
clearRegMarksButton.addEventListener("click", onClearRegmarksButtonClick);
