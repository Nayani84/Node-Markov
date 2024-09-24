/** Textual markov chain generator */

class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "the hat": [null]} */
  
    makeChains() {
      let chains = new Map();
  
      for (let i = 0; i < this.words.length-1; i++) {
        let currWord = this.words[i] + " " + this.words[i + 1];
        let nextWord = this.words[i + 2] || null;
  
        if (chains.has(currWord)) {
          chains.get(currWord).push(nextWord);
        }
        else {
          chains.set(currWord, [nextWord]);
        }
      }
      this.chains = chains;
    }
  
  
    /** return random text from chains */
    static choice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
  
    makeText(numWords = 100) {
      let keys = Array.from(this.chains.keys());
  
      let key = MarkovMachine.choice(keys);
      let out = [];
  
      while (out.length <= numWords && key !== null) {
        let [w1, w2] = key.split(" ");
        out.push(w1);
        key = w2 + " " + this.choice(this.chains.get(key));
      }

      return out.join(" ");
    }
  }
  
  
  module.exports = { MarkovMachine };