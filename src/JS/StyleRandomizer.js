const images = [
    { link:'./src/Gifs/boy.gif', background: '322A36', fontColor: 'FFFFFF'},
    { link:'./src/Gifs/goose.gif', background: 'FFDE39', fontColor: 'FFFFFF'},
    { link:'./src/Gifs/iron man.gif', background: 'FFFFFF', fontColor: '000000'}
];

const index = RandomRange(0, images.length);

$('.wrapper').prepend(`<img src="${images[index].link}">`);
$('body').css('background', `#${images[index].background}`);
$('.block h1, h2, h3, h4, h5').css('color', `#${images[index].fontColor}`);

function RandomRange (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}