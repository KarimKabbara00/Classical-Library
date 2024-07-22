import deburr from 'lodash/deburr';

function matchQueryToTitle(title, query) {
    // remove diactritcs and accents
    title = deburr(title).toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    let modifiedTitleA = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', "").replace("in ", ""); // as basic as possible
    let modifiedTitleB = title.replace("no. ", "").replaceAll("op. ", "").replaceAll(".", "").replaceAll(",", "").replaceAll('"', ""); // keep 'in'
    let modifiedTitleC = title.replace("no. ", "number ").replace("op. ", "opus "); // lengthened abbreviations.
    let modifiedTitleD = title.replace("no. ", "no ").replace("op. ", "op "); // alternate abbreviations.
    return title.includes(query) || modifiedTitleA.includes(query) || modifiedTitleB.includes(query) || modifiedTitleC.includes(query) || modifiedTitleD.includes(query);
}

export default matchQueryToTitle;