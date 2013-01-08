global.theApp = {};

global.theApp.Person = function() {

  var Person = function() {
   this.sayHelloTo = function(anotherPerson) {
      return 'Hello, ' + anotherPerson + '!';
    };
  };

  return Person;

};
