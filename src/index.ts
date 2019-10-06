type extractorSyncType = import('icons-to-sprite').extractorSyncType
type extractionTry = import('icons-to-sprite').iconExtractTryType

export const iconSetName: string = 'fontawesome-free'

interface ParcedIcon  {
    svg: {
        '$': {
            viewBox: string
        }
        path: [{ '$': {
            d: string
        }}]
    }
}

import { readFileSync } from 'fs'
import { parseString } from 'xml2js'

export const extractorSync: extractorSyncType = (
    group: string,
    iconName: string
): extractionTry => {
    const filePath: string = `node_modules/@fortawesome/fontawesome-free/svgs/${group}/${iconName}.svg`
    const fileContent: string = readFileSync(filePath, { encoding: 'utf-8' })
    
    let contentAsJSObject: ParcedIcon | undefined = undefined
    const setCA = (value: ParcedIcon ) => contentAsJSObject = value 

    parseString(fileContent, (err, result) => {
        if (err !== null) {
            throw new Error(`Can't parse xml-sting, ${err.message}`)
        }
        setCA(result)
    })

    if (contentAsJSObject !== undefined ) {
        const content:string = (<ParcedIcon>contentAsJSObject).svg.path[0]['$'].d
        const viewBox: [number, number, number, number] = <[number, number, number, number]>(<ParcedIcon>contentAsJSObject).svg['$'].viewBox.split(' ').map(i => parseInt(i))
    return [
        undefined,
        {
            content,
            viewBox 
        }
    ] } else {
        return [
            new Error('not seted'), undefined
        ]
    }
}
