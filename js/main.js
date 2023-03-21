// open-regmarks-button
document.querySelector("#open-regmarks-button").addEventListener("click", function(){
  jsx.file("./jsx/regmarks/fab/open_regmarks_dialog.jsx");
});

// export-print-and-cut-button
document.querySelector("#export-print-and-cut-button").addEventListener("click", function(){
  jsx.file("./jsx/export/fab/export_print_and_cut.jsx");
});

// restart-ext-button
if (document.querySelector("#restart-ext-button")){
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
      window.location.href = "./index.html";
    } catch (e) {
      window.location.href = "./index.html";
    }
  });
}



