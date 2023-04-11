//@include "../RegMarksDialog.jsxinc"
//@include "../../lib/Utils.jsxinc"

try {
    RegMarksDialog.run();
} catch (e) {
    Utils.handleException(e);
}
