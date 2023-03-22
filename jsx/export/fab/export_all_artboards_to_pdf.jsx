(function(){
    var doc = app.activeDocument;

    var docBaseName = doc.name.replace(/\.[^\.]+$/, '');

    var exportFolder = Folder(doc.path + '/' + docBaseName);

    if (!exportFolder.exists) {
        exportFolder.create();
    }

    for (var i=0; i < app.PDFPresetsList.length; i++) {
        $.writeln('Preset: '+ app.PDFPresetsList[i]);
    }

    // exportFolder.selectDlg('Select folder to export PDFs');

    $.writeln('exportFolder: ' + exportFolder.path);

    var pdfOptions = new ExportForScreensPDFOptions();

    var whatToExport = new ExportForScreensItemToExport();
    whatToExport.artboards = 'all';

    doc.exportForScreens(
        exportFolder,
        ExportForScreensType.SE_PDF,
        // pdfOptions,
        // whatToExport,
        // 'TEST_'
    );

})();

