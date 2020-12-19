const fetch = require('node-fetch');
const removeaccents = require('remove-accents');

const baseURL = 'http://www.giggino.com/traduzione-italiano-napoletano.asp?t='

/**
 * 
 * @param {string} input
 * @returns {Promise<string>}
 */
async function translate(input){
    if(typeof input != 'string') return '';

    return fetch(baseURL + encodeURI(removeaccents(input).replace(/[^a-zA-Z0-9\n\s]+/g,' ')))
    .then(res => res.text())
    .then(res => res.replace(/[\n\r]/g,''))
    .then(res => res.match(/(?<=<td><span class="Stile3">)(.*)(?=<\/span><\/td>)/g)[0])
    .then(res => 
        res
        .replace(/�/g,'')
        .replace(/<br>/g,'\n')
        .replace(/\s+/g,' ')
        .replace(/^\s+|\s+$/gm,'')
    );
}

module.exports = translate;
