const googleTTS = require('google-tts-api');
const lame = require('lame');
const Speaker = require('speaker');
const download = require('download');

var text = process.argv.slice(2).join(' ')

googleTTS(text, 'es', 0.5)
.then(function (url) {
  download(url)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      this.pipe(new Speaker(format));
    });
})
.catch(function (err) {
  console.error(err.stack);
});
