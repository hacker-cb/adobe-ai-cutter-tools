//@include "../CutterToolsPrefs.jsxinc"

try {
    CutterToolsPrefs.clearAll();
    alert('Prefernces were cleared.');
} catch (e) {
    alert('Error: ' + e);
}

