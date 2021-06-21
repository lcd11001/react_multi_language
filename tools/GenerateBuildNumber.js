var fs = require('fs');
var moment = require('moment')

console.log("Incrementing build number...");

fs.readFile('src/metadata.json', function (err, content)
{
    if (err) throw err;
    var metadata = JSON.parse(content);

    metadata['release-number'] = metadata['release-number'] + 1;
    metadata['release-date'] = moment().format('YYYY-MMM-DD HH:mm:ss');

    var metadataContent = JSON.stringify(metadata, null, 4)

    fs.writeFile('src/metadata.json', metadataContent, function (err)
    {
        if (err) throw err;
        console.log("Current build : " + metadataContent);
    })
});