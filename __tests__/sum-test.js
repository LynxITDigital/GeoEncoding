jest.dontMock('../sum');
describe('sum',function(){
  it('adds 1 + 2 to equals 3', function(){
    var sum = require('../sum');

    console.log("SUM :" + sum);
    expect(sum(1,2)).toBe(3);
  });
});
