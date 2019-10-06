"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconSetName = 'fontawesome-free';
const fs_1 = require("fs");
const xml2js_1 = require("xml2js");
exports.extractorSync = (group, iconName) => {
    const filePath = `node_modules/@fortawesome/fontawesome-free/svgs/${group}/${iconName}.svg`;
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    let contentAsJSObject = undefined;
    const setCA = (value) => contentAsJSObject = value;
    xml2js_1.parseString(fileContent, (err, result) => {
        if (err !== null) {
            throw new Error(`Can't parse xml-sting, ${err.message}`);
        }
        setCA(result);
    });
    if (contentAsJSObject !== undefined) {
        const content = contentAsJSObject.svg.path[0]['$'].d;
        const viewBox = contentAsJSObject.svg['$'].viewBox.split(' ').map(i => parseInt(i));
        return [
            undefined,
            {
                content,
                viewBox
            }
        ];
    }
    else {
        return [
            new Error('not seted'), undefined
        ];
    }
};
