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
const AVATAR = 1;
const PRODUCT = 2;
const PHOTO = 3;

async function randomPicSum() {
    document.querySelector('.photo-preview>p').classList?.remove('d-none');
    document.querySelector('.photo-preview>img').classList?.add('d-none');
    fetch(`https://picsum.photos/v2/list?page=${1}&limit=100`)
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
                    document.querySelector('.photo-preview>p').classList?.add('d-none');
                    document.querySelector('.photo-preview>img').classList?.remove('d-none');
                    document.getElementById('show_photo').src = url;
                })
        })
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function copyToClipBoard() {
    let input_url = document.getElementById('photo-url');
    input_url.select();
    navigator.clipboard.writeText(input_url.value);
}

function randomAvatar() {
    let avatarId = randomNumber(1, 70);
    document.getElementById('photo-url').value = `https://i.pravatar.cc/150?img=${avatarId}`;
    document.getElementById('show_photo').src = `https://i.pravatar.cc/150?img=${avatarId}`;
}

function changeType() {
    let type = document.getElementById('avatar').checked ? 1 : document.getElementById('product').checked ? 2 : 3;
    switch (type) {
        case AVATAR: {
            randomAvatar();
            break;
        }
        case PRODUCT: {
            break;
        }
        case PHOTO: {
            randomPicSum()
            break;
        }
    }
}

document.getElementById('avatar').addEventListener("change", changeType);
document.getElementById('product').addEventListener("change", changeType);
document.getElementById('photo').addEventListener("change", changeType);
document.getElementById('btnGetPhoto').addEventListener("click", changeType);
document.getElementById('btnCopy').addEventListener("click", copyToClipBoard);

changeType()

