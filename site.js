const PICSUM_API = "https://picsum.photos/v2/list?page=1&limit=100";
// 01: 0 - 101
// 02: 102 - 206
// 03: 208 - 316
// 04: 317 - 423
// 05: 424 - 528
// 06: 529 - 640
// 07: 641 - 770
// 08: 772 - 877
// 09: 878 - 985
// 10: 987 - 1084
const min_max = [
    [0, 101],
    [102, 206],
    [208, 316],
    [317, 423],
    [529, 640],
    [641, 770],
    [772, 877],
    [878, 985],
    [987, 1084]
]
async function randomPicSum() {
    fetch(`https://picsum.photos/v2/list?page=1&limit=100`)
        .then(res => res.json())
        .then(data => {
            let [min, max] = min_max[0];
            let randomId = randomNumber(min, max);
            let photo = data.filter((item) => item.id == randomId);

            fetch(photo[0]?.download_url)
                .then(res => {
                    document.getElementById('photo-url').value = res.url;
                   return res.url;
                })
                .then(url => {
                    console.log(url);
                    photo_preview.src = url
                })
        })
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const photo_preview = document.getElementById('show_photo');
randomPicSum()