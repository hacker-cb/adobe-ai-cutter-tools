/**
 * This is script for Adobe illustrator (JSX).
 */


// 59.1.63 Document.symbolItems
// 59.1.64 Document.symbols
// 59.1.72 Document.views ???


// 96.3.1 Copying mesh items to another document

// Creates a new document if none exists then sets fill and stroke defaults to true
// var doc;
// if (app.documents.length == 0) {
// doc = app.documents.add();
// } else {
// doc = app.activeDocument;
// }
// doc.defaultFilled = true;
// doc.defaultStroked = true;

function procesSymbols(doc){
    // Process all symbols in document.

    $.writeln('Processing symbols');

    for (var i = 0; i < doc.symbols.length; i++) {

        var symbol = doc.symbols[i];
        var symbolName = symbol.name;

        $.writeln('Processing symbol: "' + symbolName);
    }
}

// function processObject(obj) {
//     var objName = obj.name ? obj.name : obj.symbol ? obj.symbol.name : '';
//     $.writeln('Processing object: "' + objName + '" hidden:' + obj.hidden);
// }

function proceessArtBoard(srcDoc, abName, abWidth, abHeight){

    $.writeln('Processing artboard: "' + abName + '"');

    // Create new document (See "157.3.1 Finding fonts" as example)
    var docPreset = new DocumentPreset;
    docPreset.units = RulerUnits.Millimeters;

    // FIXME: Use color space from source document
    var doc = app.documents.add();
    // var doc = app.documents.add(DocumentColorSpace.CMYK,
    //     UnitValue(abWidth, 'mm').as('pt'),
    //     UnitValue(abHeight, 'mm').as('pt'),
    //     );
    // var doc = documents.addDocument(DocumentColorSpace.CMYK, docPreset); // FIXME: Use color space from source document

    doc.defaultFilled = true;
    doc.defaultStroked = true;

    // // Create artboard same as source
    // var ab = doc.artboards.add([
    //     0, 0,
    //     UnitValue(abWidth, 'mm').as('pt'), UnitValue(abHeight, 'mm').as('pt')
    // ]);
    // //ab.name = srcAb.name;

    // Copy objects from source artboard to new document
    for (var i = 0; i < srcDoc.pageItems.length; i++) {

        var obj = srcDoc.pageItems[i];
        var objName = obj.name ? obj.name : obj.symbol ? obj.symbol.name : '';

        $.writeln('Copy object: "' + objName + '" hidden:' + obj.hidden);

        // Copy obj to new document
        var newObj = obj.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
    }

    // Process symbols in document
    procesSymbols(doc);

    if (0){ // FIXME: HARDCODE
        // Prepare PDF save options
        var pdfFile = new File(srcDoc.path + "/" + abName + " [Cut].pdf");
        var pdfOpts = new PDFSaveOptions();

        // Set PDF options
        pdfOpts.acrobatLayers = false;
        pdfOpts.compatibility = PDFCompatibility.ACROBAT4;
        // pdfOpts.generateThumbnails = false;
        pdfOpts.preserveEditability = true;
        // pdfOpts.optimization = true;
        // pdfOpts.colorBars = false;

        // Save it
        doc.saveAs(pdfFile, pdfOpts);
    }

    doc.close(SaveOptions.DONOTSAVECHANGES);

    redraw(); // FIXME: Is this call needed?
}


for (var i = 0; i <  app.activeDocument.artboards.length; i++) {

    var doc = app.activeDocument;
    var ab = doc.artboards[i];

    doc.artboards.setActiveArtboardIndex(i);

    // All units are in in points (See "MEASUREMENT UNITS" chapter 17)
    var rect = ab.artboardRect; // size and position

    var left = new UnitValue(rect[0],'pt').as('mm'); // left
    var top = new UnitValue(rect[1],'pt').as('mm'); // top
    var right = new UnitValue(rect[2],'pt').as('mm'); // right
    var bottom = new UnitValue(rect[3],'pt').as('mm'); // bottom

    var abWidth = right - left;
    var abHeight = top - bottom;
    var abName = ab.name;

    $.writeln('Artboard: "' + ab.name + '", size: [' + abWidth + '*' + abHeight + ']');

    if (ab.name != 'D1 (A4)'){
        // FIXME For tests
        continue;
    }

    proceessArtBoard(doc, abName, abWidth, abHeight);

    // var abName = ab[i].name;

    // $.writeln("Processing artboard: " + abName);

    // // For each object in the artboard
    // for (var j = 0; j < doc.pageItems.length; j++) {
    //     var obj = doc.pageItems[j];

    //     var objName = obj.name ? obj.name : obj.symbol ? obj.symbol.name : '';
    //     var hidden = obj.hidden;

    //     $.writeln('Object: "' + objName + '" hidden:' + obj.hidden);
    //     // If object name contains "cut"
    //     if (objName.indexOf("cut") > -1) {
    //         obj.hidden = false;
    //     } else {
    //         obj.hidden = true;
    //     }
    // }

    /*

    // Export artboard as PDF
    var pdfFile = new File(doc.path + "/" + abName + " [Cut].pdf");
    var pdfOpts = new PDFSaveOptions();

    // Set PDF options
    pdfOpts.acrobatLayers = true;
    pdfOpts.compatibility = PDFCompatibility.ACROBAT4;
    pdfOpts.generateThumbnails = false;
    pdfOpts.preserveEditability = true;
    pdfOpts.optimization = true;
    pdfOpts.colorBars = false;

    // Save PDF
    doc.saveAs(pdfFile, pdfOpts);

    */

}

$.writeln('Finish');

