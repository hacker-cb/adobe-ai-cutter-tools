// open-regmarks-button
document.querySelector("#open-regmarks-button").addEventListener("click", function(){
  console.log('test1');
  alert('test 1');
  jsx.evalScript('app.documents.length', function(n){alert('You have ' + n + ' open.');}, true);
  //jsx.file("../jsx/regmarks/fab/open-regmarks.jsx");
  alert('test 2');
});

// restart-ext-button
document.querySelector("#restart-ext-button").addEventListener("click", function(){
  // See https://creative-scripts.com/jsx-js/#jsx

  try {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // if we're restarting then we should remove all the eventListeners so we don't get double events //
    // Try get the point over                                                                         //
    // CRITICAL MAKE SURE TO CLOSE NULLIFY ETC. ANY LOOSE WATCHERS, EVENTLISTENERS, GLOBALS ETC.      //
    // CRITICAL MAKE SURE TO CLOSE NULLIFY ETC. ANY LOOSE WATCHERS, EVENTLISTENERS, GLOBALS ETC.      //
    // CRITICAL MAKE SURE TO CLOSE NULLIFY ETC. ANY LOOSE WATCHERS, EVENTLISTENERS, GLOBALS ETC.      //
    // CRITICAL MAKE SURE TO CLOSE NULLIFY ETC. ANY LOOSE WATCHERS, EVENTLISTENERS, GLOBALS ETC.      //
    // for example watcher.close();                                                                   //
    // Then reset the UI to load it's page (if it hasn't change page)                                 //
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    process.removeAllListeners();
    window.location.href = "../html/index.html";
  } catch (e) {
    window.location.href = "../html/index.html";
  }
});


