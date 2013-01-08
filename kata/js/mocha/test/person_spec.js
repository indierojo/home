var should = require('should');
var Person = require(__dirname + '/../src/person');

describe('Person', function() {
  it('should be able to say hello', function() {
    var Person = global.theApp.Person();
    var personInstance = new Person();
    var message = personInstance.sayHelloTo('adomokos');

    message.should.equal('Hello, adomokos!');
  });
});
