/** Command-line tool to generate Markov text. */

const fs = require('fs');
const argv = process.argv;
const markov = require('./markov');
const axios = require("axios");


function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path} : ${err}`);
            process.exit(1);
        }
        else {
            generateText(data);
        }
    });
}


async function makeUrlText(url) {
    try {
        let res = await axios.get(url);
        generateText(res.data);
    }
    catch (err) {
        console.error(`Error fetching ${url} : ${err}`);
        process.exit(1);
    }
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeUrlText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}