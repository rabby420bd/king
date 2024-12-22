const request = require('request');

const proxyTsports = (req, res) => {
    const url = 'http://103.96.235.18:8080/sports1/index.m3u8';
    request(url)
        .on('error', (err) => {
            console.error('Error fetching M3U8 file:', err.message);
            res.status(500).send('Failed to retrieve the M3U8 file.');
        })
        .pipe(res);
};

module.exports = proxyTsports;
