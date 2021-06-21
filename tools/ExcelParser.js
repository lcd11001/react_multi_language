var path = require('path')
var fs = require('fs');
var xlsx = require('xlsx');
var lodash = require('lodash');

const main = (input, output) =>
{
    console.log(`Reading ${input}`)
    // https://stackoverflow.com/questions/30859901/parse-xlsx-with-node-and-create-json
    var i18 = {}
    var workbook = xlsx.readFile(input)
    var sheets = workbook.SheetNames
    sheets.forEach(namespace =>
    {
        var worksheet = workbook.Sheets[namespace]
        var headers = {}
        var data = []

        for (info in worksheet)
        {
            if (info[0] === '!') continue
            // parse out the column, row and value
            const regexStringNumber = /([a-z]*)([0-9]*)/gmi
            let matchesStringNumber = regexStringNumber.exec(info)

            var col = matchesStringNumber[1]
            var row = matchesStringNumber[2]
            var value = worksheet[info].v

            // console.log('col', col, 'row', row, 'value', value)
            const regexHeader = /(::)(\w*)(::)/gm
            let matchesHeader = regexHeader.exec(value)
            if (matchesHeader !== null)
            {
                // console.log('header', matchesHeader[2], "index", matchesHeader.index, "length", matchesHeader.length)
                headers[col] = matchesHeader[2]
            } 
            else
            {
                if (!data[row])
                {
                    data[row] = {}
                }
                data[row][headers[col]] = value
            }
        }

        //drop those rows which are empty
        let emptyRow = 0
        while (emptyRow < data.length)
        {
            if (!data[emptyRow])
            {
                data.splice(emptyRow, 1);
            } 
            else
            {
                emptyRow++
            }
        }

        // translate id-text
        for (let i = 0, keys = Object.keys(headers), len = keys.length; i < len; i++)
        {
            let id = headers[keys[0]]
            let language = headers[keys[i]]
            let define = lodash.mapValues(lodash.keyBy(data, id), (obj) =>
            {
                if (obj)
                {
                    if (id === language)
                    {
                        return `${namespace}:${obj[language]}`
                    }
                    return obj[language]
                }
            })
            if (!i18.hasOwnProperty(language))
            {
                i18[language] = {}
            }

            i18[language][namespace] = define
        }
    })

    Object.keys(i18).forEach(language =>
    {
        let define = JSON.stringify(i18[language], null, 4)
        let file = path.join(output, `${language}.json`)
        console.log(`Writing ${file}`)
        if (!fs.existsSync(output))
        {
            fs.mkdirSync(output, { recursive: true })
        }
        fs.writeFileSync(`${file}`, define)
    })
};

const input = path.resolve(process.argv[2])
const output = path.resolve(process.argv[3])
main(input, output)