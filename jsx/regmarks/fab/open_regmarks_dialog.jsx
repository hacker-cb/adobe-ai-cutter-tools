//@include "../RegMarksDialog.jsxinc"

try {
    RegMarksDialog.run();
} catch (e) {
    $.writeln('ERROR: "' + e.message + '" ' + e.fileName + ":" + e.line);
    alert(e.message + "\n(" + (new File(e.fileName)).name + " line " + e.line + ")");
}
