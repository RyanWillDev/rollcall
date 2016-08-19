var app = angular.module('rollCall', [])
.controller('studentController', function($scope) {
  $scope.students = [{ firstName: 'ryan', lastName: 'will', present: false },
    { firstName: 'michael', lastName: 'eatherly', present: false },
    { firstName: 'aimee', lastName: 'knight', present: false },
    { firstName: 'saron', lastName: 'yitbarek', present: false },
    { firstName: 'kyle', lastName: 'simpson', present: false },
    { firstName: 'wes', lastName: 'bos', present: false },
    { firstName: 'jamison', lastName: 'dance', present: false }
  ];

  $scope.addStudent = function() {
    // Validates newStudent to avoid adding empty names and a typeError from being logged to console
    function nameIsValid() {
      var ns = $scope.newStudent;
      return (ns !== undefined && ns.firstName !== undefined
        && ns.firstName.length > 0 && ns.lastName !== undefined && ns.lastName.length > 0);
    }

    if (nameIsValid()) {
      $scope.students.push({ firstName: $scope.newStudent.firstName,
        lastName: $scope.newStudent.lastName, present: false
      });
    }
  };

  $scope.removeStudent = function(index) {
    $scope.students.splice(index, 1);
  };
})
.directive('student', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/partials/student.html'
  };
})
.directive('absentStudent', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/partials/absent-student.html'
  };
})
.directive('presentStudent', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/partials/present-student.html'
  };
})
.filter('capitalize', function() {
  return function(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
  };
})
.filter('present', function() {
  return function(studentArr) {
    // Filter function to create an array of only students
    // whose present value is true
    function isPresent(currStudent) {
      return currStudent.present;
    }

    var presentStudents = studentArr.filter(isPresent);
    return presentStudents;
  };
})
.filter('absent', function() {
  return function(studentArr) {
    // Filter function to create an array of only students
    // whose present value is false
    function isAbsent(currStudent) {
      return !currStudent.present;
    }

    var absentStudents = studentArr.filter(isAbsent);
    return absentStudents;
  };
});
