moviesApp.directive("showErrors", function ($timeout, showErrorsConfig) {
  var getShowSuccess, linkFn;
  getShowSuccess = function (options) {
    var showSuccess;
    showSuccess = showErrorsConfig.showSuccess;
    if (options && options.showSuccess != null) {
      showSuccess = options.showSuccess;
    }
    return showSuccess;
  };
  linkFn = function (scope, el, attrs, formCtrl) {
    var blurred,
      inputEl,
      inputName,
      inputNgEl,
      options,
      showSuccess,
      toggleClasses;
    blurred = false;
    options = scope.$eval(attrs.showErrors);
    showSuccess = getShowSuccess(options);
    inputEl = el[0].querySelector("[name]");
    inputNgEl = angular.element(inputEl);
    inputName = inputNgEl.attr("name");
    if (!inputName) {
      throw "show-errors element has no child input elements with a 'name' attribute";
    }
    inputNgEl.bind("blur", function () {
      blurred = true;
      return toggleClasses(formCtrl[inputName].$invalid);
    });
    scope.$watch(
      function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      },
      function (invalid) {
        if (!blurred) {
          return;
        }
        return toggleClasses(invalid);
      }
    );
    scope.$on("show-errors-check-validity", function () {
      return toggleClasses(formCtrl[inputName].$invalid);
    });
    scope.$on("show-errors-reset", function () {
      return $timeout(
        function () {
          el.removeClass("has-error");
          el.removeClass("has-success");
          return (blurred = false);
        },
        0,
        false
      );
    });
    return (toggleClasses = function (invalid) {
      el.toggleClass("has-error", invalid);
      if (showSuccess) {
        return el.toggleClass("has-success", !invalid);
      }
    });
  };
  return {
    restrict: "A",
    require: "^form",
    compile: function (elem, attrs) {
      if (!elem.hasClass("form-group")) {
        throw "show-errors element does not have the 'form-group' class";
      }
      return linkFn;
    },
  };
});
