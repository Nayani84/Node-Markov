const { MarkovMachine } = require('./markov');

describe("MarkoMachine", function () {
    let mm;

    beforeEach(function () {
        mm = new MarkovMachine("the cat in the hat is in the hat");
    });

    test('make chains', function () {

        expect(mm.chains).toEqual(new Map([
            ["the", ["cat", "hat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the", "the"]],
            ["hat", ["is", null]],
            ["is", ["in"]]
        ]));

        expect(Array.from(mm.chains.keys())).toEqual(['the', 'cat', 'in', 'hat', 'is']);
    });


    test('choices get from array', function () {
        expect(['the', 'cat', 'in', 'hat', 'is']).toContain(MarkovMachine.choice(['the', 'cat', 'hat']));
    });


    test('generates text', function () {
        let text = mm.makeText();
        expect(text.split(' ')).toContain("the")
    });

});
