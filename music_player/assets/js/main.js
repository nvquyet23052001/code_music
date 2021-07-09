const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
const playList = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const netxBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const muteItem = $('.mute-item');
const rangerVolume = $('#ranger');

const PLAYER_STORAGE_KEY = 'player_song';
const app = {
    currentIndex: 0,
    isPlaying: false,
    isOneProgress: false,
    isRamdom: false,
    isRepeat: false,
    isRender: false,
    isMute: false,
    isVolume: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [{
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
            name: 'Light It Up',
            singer: 'Robin Hustin x TobiMorrow',
            path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
        },
        {
            name: 'Yoru ni kakeru',
            singer: 'YOASOBI',
            path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: 'https://aredir.nixcdn.com/NhacCuaTui945/ShapeOfYou-AlexGootAndieCase-5076956.mp3?st=9I9Z2TBGWNOnQRfIJDomDA&e=1623138210',
            image: 'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/09/a0/64/09a0641c-e5fa-407e-9829-47702358ec72/190295819972.jpg/1200x1200bf-60.jpg',
        },
        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
    ],

    getConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return ` <div class="song ${index === this.currentIndex? 'active':''}" data-index='${index}'>
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        playList.innerHTML = htmls.join('');

    },

    handleEvent: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // animate:
        const cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        document.onscroll = function () {
            const scroll = window.scrollY;
            const newCdWidth = cdWidth - scroll;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi nhấn vào nút play bài hát
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            audio.onplay = () => {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();

            }

            audio.onpause = function () {
                app.isPlaying = false;
                player.classList.remove('playing');
                cdThumbAnimate.pause();

            }
        }

        // Lấy t/g bài hát:
        audio.ontimeupdate = function () {
                _this.isOneProgress = false;
                if (audio.duration && !_this.isOneProgress) {
                    const progressPercent = audio.currentTime / audio.duration * 100;

                    progress.value = progressPercent;
                    _this.setTime();
                }
                _this.getConfig('currentTime', audio.currentTime);

            },
            



            // Xử lý khi tua bài hát:
            progress.oninput = function () {
                const seekTime = audio.duration / 100 * progress.value;
                audio.currentTime = seekTime;

            }

        // Next
        netxBtn.onclick = () => {

            if (_this.isRamdom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }

            this.loadCurrentSong();
            audio.play();
            audio.onplay = () => {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
            _this.scrollInToView();
        }

        // Prev
        prevBtn.onclick = () => {
            if (_this.isRamdom) {
                _this.randomSong();
            } else {
                this.prevSong();
            }
            this.loadCurrentSong();
            audio.play();
            audio.onplay = () => {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
            _this.scrollInToView();
        }

        // random song
        randomBtn.onclick = () => {
            _this.isRamdom = !_this.isRamdom;
            _this.getConfig('isRandom', _this.isRamdom);
            randomBtn.classList.toggle('active', _this.isRamdom);

        }

        // repeat song:
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            _this.getConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play();
            } else {
                netxBtn.click();
            }
        }

        // Lang nghe click vao playlist
        playList.onclick = function (e) {
            if (e.target.closest('.song:not(.active)') || e.target.closest('.option')) {
                if (e.target.closest('.song:not(.active)')) {
                    _this.currentIndex = e.target.closest('.song:not(.active)').dataset.index;
                    _this.loadCurrentSong();
                    audio.play();
                    audio.onplay = () => {
                        app.isPlaying = true;
                        player.classList.add('playing');
                         cdThumbAnimate.play();
                    }
                }

                if (e.target.closest('.option')) {

                }
            }
        }

        muteItem.onclick = function() {
            _this.isMute = !_this.isMute;
            muteItem.classList.toggle('un-mute', _this.isMute);
            if(_this.isMute) {
                audio.muted = true;
                $('.mute-up').style.display = 'none';
                $('.mute-un').style.display = 'inline-block';
                $('.mute-down').style.display = 'none';
            }
            else {
                audio.muted = false;
                if(audio.volume < 0.5) {
                    $('.mute-down').style.display = 'inline-block';
                    $('.mute-up').style.display = 'none';
                $('.mute-un').style.display = 'none';

                }
               else {
                $('.mute-up').style.display = 'inline-block';
                $('.mute-un').style.display = 'none';
               }
            }

        }

        rangerVolume.oninput = function() {
            audio.muted = false;
            const rangerPercent = rangerVolume.value / 100;
            audio.volume = rangerPercent;
            _this.changerStyleVolume(rangerPercent);
        }

    },

    changerStyleVolume: function(rangerPercent) {
        

        if(rangerPercent === 0) {
            $('.mute-down').style.display = 'none';
            $('.mute-up').style.display = 'none';
            $('.mute-un').style.display = 'inline-block';
            audio.muted = true;
        }
        else if(rangerPercent < 0.5) {
            $('.mute-down').style.display = 'inline-block';
            $('.mute-up').style.display = 'none';
            $('.mute-un').style.display = 'none';
        }
        else if(rangerPercent > 0.5) {
            $('.mute-down').style.display = 'none';
            $('.mute-up').style.display = 'inline-block';
            $('.mute-un').style.display = 'none';
            
        }
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }

    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
    },

    randomSong: function () {
        const randomArray = [];
        const lengthSong = this.songs.length;
        if (!randomArray.length) {
            for (var i = 0; i < lengthSong; i++) {
                randomArray.push(i);
            }
        }
        const newIndex = Math.floor(Math.random() * lengthSong);

        this.currentIndex = randomArray[newIndex];
        randomArray.splice(newIndex, 1);


    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

        this.getConfig('currentIndex', this.currentIndex);

        const active = $('.song.active');
        const noneActive = $$('.song');
        if (active) {
            active.classList.remove('active');
        }
        if (noneActive) {
            noneActive[this.currentIndex].classList.add('active');
        }


    },

    setTime: function () {
        let minute = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime - minute * 60);

        let minuteDuration = Math.floor(audio.duration / 60);
        let secondsDuration = Math.floor(audio.duration - minuteDuration * 60);

        let durationMinuteValue;
        let durationSecondsValue;

        let minuteValue;
        let secondValue;
        if (minute < 10 || minuteDuration < 10) {
            minuteValue = '0' + minute;
            durationMinuteValue = '0' + minuteDuration;

        } else {
            minuteValue = minute;
            durationMinuteValue = minuteDuration;

        }

        if (seconds < 10 && secondsDuration < 10) {
            secondValue = '0' + seconds;
            durationSecondsValue = '0' + secondsDuration;
        } else {
            secondValue = seconds;
            durationSecondsValue = secondsDuration;
        }

        let audioTime = minuteValue + ':' + secondValue;
        let durationTime = durationMinuteValue + ':' + durationSecondsValue;
        $('.current-time').textContent = audioTime;
        $('.duration-time').textContent = durationTime;
    },

    scrollInToView: function () {
        if (this.currentIndex < 5) {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }, 200);
        } else {
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }, 200);
        }
    },

    // loadConfig: function () {
    //     this.isRamdom = this.config.isRamdom;
    //     this.isRepeat = this.config.isRepeat;
    //     this.currentIndex = this.config.currentIndex;
    //     audio.currentTime = this.config.currentTime;

    // },

    start: function () {
        // Lấy dữ liệu config
        // this.loadConfig();          
        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRamdom);

        this.defineProperties();
        
        // Render playlist
        this.render();

        // Load song:
        this.loadCurrentSong();
        // Xử lý sự kiện
        this.handleEvent();

    }

}


app.start()