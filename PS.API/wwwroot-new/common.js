(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "Avdh":
/*!****************************************************!*\
  !*** ./src/app/_guards/prevent-unsaved-changes.ts ***!
  \****************************************************/
/*! exports provided: PreventUnsavedChanges, PreventUnsavedChangesForEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreventUnsavedChanges", function() { return PreventUnsavedChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreventUnsavedChangesForEvents", function() { return PreventUnsavedChangesForEvents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PreventUnsavedChanges {
    canDeactivate(component) {
        if (component.editForm.dirty) {
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost!');
        }
        return true;
    }
}
PreventUnsavedChanges.ɵfac = function PreventUnsavedChanges_Factory(t) { return new (t || PreventUnsavedChanges)(); };
PreventUnsavedChanges.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PreventUnsavedChanges, factory: PreventUnsavedChanges.ɵfac });
class PreventUnsavedChangesForEvents {
    canDeactivate(component) {
        if (component.parentForm.dirty) {
            return confirm('Are you shure you want to continue? Any unsaved changes will be lost!');
        }
        return true;
    }
}


/***/ })

}]);
//# sourceMappingURL=common.js.map