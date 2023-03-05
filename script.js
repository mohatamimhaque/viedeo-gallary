
function player(position,arr,path,thumbnail,ext,increase){
  $(position).append(`<div id="head">
        <button class='active'>Autoplay</button>
        <span class="icon" style="z-index:1">
            <i class="material-icons auto_play"></i>
        </span>
    </div>
    <div id="wrapper">
    </div>
    <div id="loading_icon">
    </div>`)
  
  
  
  
    var i;
    var start = 0;
    var neat = arr.length - 1;

    for (i = 0; i < increase + start; i++) {
        const name = arr[i];
        const src = `${path}/${arr[i]}${ext}`;
        $('#wrapper').append(fileLoad(name, thumbnail, src));
    }
    control();
    start = i;
    /**/
    setInterval(() => {
        const last = window.screen.height;
        const items = document.querySelectorAll('.video_wrapper');
        const last_element = items[items.length - 1].getBoundingClientRect().top + 300;
        if (last_element < last) {
            if (start < neat) {
                for (i = start; i <= increase + start; i++) {
                    if (i < neat) {
                        const name = arr[i];
                        const src = `${path}/${arr[i]}${ext}`;
                        $('#loading_icon').css('display', 'flex');

                        $('#wrapper').append(fileLoad(name, thumbnail, src));

                    } else {
                        $('#loading_icon').css('display', 'none');
                    }
                }
                start = i;
            }
            control();
        } else {
            $('#loading_icon').css('display', 'none');
        }
    }, 2000)
    /*    
     */

    function fileLoad(name, thumbnail, src) {
        return `<div class="video_wrapper">
            <div class="video_player first_time paused">
              
                <div class="video_status active">

                    <div class="play_arrow">
                        <span class="material-icons">
                            play_arrow
                         </span>
                    </div>
                </div>
                <div class="progress_area mobile">
                    <div class="progress_bar">
                        <span></span>
                    </div>
                    <div class="buffered_progress_bar"></div>
                </div>
                <div class="control_bottom">
                    <div class="timer">
                        <span class="current">0:00</span> / <span class="duration">0:00</span>
                    </div>
                                        <div class="sc-control">
                        <span class="icon" >
                            <i for="fc" class="material-icons fullscreen">fullscreen</i>
             </span>
                        <span class="icon">
                            <i class="material-icons picture_in_picture">picture_in_picture_alt</i>
                        </span>
                    </div>

        
                </div>
                <div class="thumbnail"></div>
                <p class="caption_text"></p>
                <div class="progressAreaTime">0.00</div>
                <div class="spinner">
                    <div class="spinner-child">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="46" />
                    </svg>
                    </div>
                </div>
                <div class="video_overlay">
                           <img src="${thumbnail}" alt="${name}">             

                </div>
                      <video class= 'main_video' src="${src}"></video>
          
               <div class="right rewind">
         <div class="rewind-child">
           <div class="icon-group">
             <i class="material-icons"> play_arrow</i><i class="material-icons ">    play_arrow</i><i class="material-icons ">    play_arrow</i>
           </div>
           <p class="text">
             10 seconds
           </p>
         </div>
   
    </div>
         <div class="left rewind">
         <div class="rewind-child">
           <div class="icon-group">
             <i class="material-icons"> play_arrow</i><i class="material-icons ">    play_arrow</i><i class="material-icons ">    play_arrow</i>
           </div>
           <p class="text">
             10 seconds
           </p>
         </div>
   
    </div>
          
            </div>
                                        <p class="video_title">${name}</p>
        </div>
  
  `
    }





var auto_play = document.querySelector('#head');
auto_play.addEventListener('click', () => {
    auto_play.classList.toggle('active');
})

function control() {
    const container = document.getElementById('wrapper');
    var elements = document.querySelectorAll('.video_wrapper');
    var height = window.screen.height;

    for (let tt = 0; tt < elements.length; tt++) {

        const element = elements[tt];
        const main_video = element.querySelector('.main_video');
        const thumbnail_img = element.querySelector('.video_overlay img');
        const sc_control = element.querySelector('.sc-control');
        const thumbnail = element.querySelector('.thumbnail');
        // const thumbnail = element.querySelector('.thumbnail');
        const play_pause = element.querySelector('.play_arrow .material-icons');

        const video_player = element.querySelector('.video_player');
        const video_title = element.querySelector('.video_title');
        const control_bottom = element.querySelector('.control_bottom');
        const video_overlay = element.querySelector('.video_overlay');
        const buffered_progress_bar = element.querySelector('.buffered_progress_bar');
        const progress_bar = element.querySelector('.progress_bar');
        const video_status = element.querySelector('.video_status');
        const right = element.querySelector('.rewind.right');
        const left = element.querySelector('.rewind.left');
        const spinner = element.querySelector('.spinner');

        const current = element.querySelector('.current');
        const duration = element.querySelector('.duration');
        const progress_area = element.querySelector('.progress_area');
        const progressAreaTime = element.querySelector('.progressAreaTime');
        const picture_in_picture = element.querySelector('.picture_in_picture');
        const fullscreen = element.querySelector('.fullscreen');

        function playVideo() {
            pauseAll();
            video_player.classList.remove('paused');
            play_pause.innerHTML = "pause";
            main_video.play();
            active()
        }

        function pauseVideo() {
            video_player.classList.add('paused');
            play_pause.innerHTML = "play_arrow";
            main_video.pause();
            setTimeout(function() {
                notActive()
            }, 2000)
        }

        function pauseAll() {
            for (let jj = 0; jj < elements.length; jj++) {
                const ele = elements[jj];
                ele.querySelector('.play_arrow .material-icons').innerHTML = "play_arrow";
                ele.querySelector('.video_player').classList.add('paused');
                ele.querySelector('.main_video').pause();
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture()
                }
                setTimeout(function() {
                    ele.querySelector('.progress_bar').classList.add('active');
                    ele.querySelector('.video_status').classList.add('active');
                }, 2000)
            }
        }
        let userAgent = navigator.userAgent;

        if (userAgent.match(/firefox|fxios/i)) {
            picture_in_picture.style.display = 'none'
        }
        picture_in_picture.addEventListener('click', () => {
            main_video.requestPictureInPicture();
        })
        fullscreen.addEventListener('click', () => {

            fullScreen()
        })

        function fullScreen() {
            if (!video_player.classList.contains('openfullScreen')) {
                video_player.classList.add('openfullScreen');
                fullscreen.innerHTML = 'fullscreen_exit';
                video_player.requestFullscreen();
            } else {
                video_player.classList.remove('openfullScreen');
                fullscreen.innerHTML = 'fullscreen';
                document.exitFullscreen();
            }
        }
        main_video.addEventListener('ended', () => {
            $('html, body').animate({
                scrollTop: '+=280px'
            }, 'slow');
        })
        video_overlay.addEventListener('click', () => {
            video_overlay.style.display = 'none';
            main_video.classList.add('running');
            playVideo();;
        })
        play_pause.addEventListener('click', () => {
            let isVideoPaused = video_player.classList.contains('paused');
            isVideoPaused ? playVideo() : pauseVideo();
        })
        video_title.addEventListener('click', () => {
            playVideo();
        })
        video_player.addEventListener('mousemove', (e) => {
            var isVideoPaused = video_player.classList.contains('paused');
            isVideoPaused ? notActive() : active();
        })

        function active() {
            progress_bar.classList.add('active');
            video_status.classList.add('active');
            sc_control.classList.add('active');
            setTimeout(function() {
                progress_bar.classList.remove('active');
                video_status.classList.remove('active');
                sc_control.classList.remove('active');
            }, 2000);
        }
        notActive()

        function notActive() {
            progress_bar.classList.add('active');
            video_status.classList.add('active');
            sc_control.classList.add('active');
        }

        function noActive() {
            progress_bar.classList.remove('active');
            video_status.classList.remove('active');
            sc_control.classList.remove('active');
        }
        main_video.addEventListener('loadeddata', () => {
            setInterval(() => {
                let bufferedTime = main_video.buffered.end(0);
                let duration = main_video.duration;
                let width = (bufferedTime / duration) * 100;
                buffered_progress_bar.style.width = `${width}%`
            }, 500);
        })
        //spinner.style.display='none';
        main_video.addEventListener('waiting', () => {
            spinner.style.display = 'block';
            video_overlay.style.display = 'block';

        })

        main_video.addEventListener('canplay', () => {
            if (main_video.classList.contains('running')) {
                spinner.style.display = 'none';
                video_overlay.style.display = 'none';
            }
        })
        //current video duration
        //load video duration
        main_video.addEventListener('loadeddata', (e) => {
            let videoDuration = e.target.duration;
            let totalSec = Math.floor(videoDuration % 60);
            let totalMin = Math.floor(videoDuration / 60);
            let totalhour = Math.floor(videoDuration / 3600);
            totalMin = totalMin - totalhour * 60;
            //if seconds are less than 10 then add 0 at the begning
            totalhour < 10 ? totalhour = '0' + totalhour : totalhour;
            totalSec < 10 ? totalSec = '0' + totalSec : totalSec;
            totalMin < 10 ? totalMin = '0' + totalMin : totalMin;

            if (totalhour >= 1) {
                duration.innerHTML = `${totalhour}:${totalMin}:${totalSec}`;
            } else {
                duration.innerHTML = `${totalMin} : ${totalSec}`;
            }
        })
        //current video duration
        main_video.addEventListener('timeupdate', (e) => {
            let currentVideoTime = e.target.currentTime;
            let currentSec = Math.floor(currentVideoTime % 60);
            let currentMin = Math.floor(currentVideoTime / 60);
            let currenthour = Math.floor(currentVideoTime / 3600);
            currentMin = currentMin - currenthour * 60;

            //if seconds are less than 10 then add 0 at the begning
            currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
            currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
            currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

            if (currenthour >= 1) {
                current.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
            } else {
                current.innerHTML = `${currentMin} : ${currentSec}`;
            }

            // width change
            let videoDuration = e.target.duration;
            let progressWidth = (currentVideoTime / videoDuration) * 100;
            progress_bar.style.width = `${progressWidth}%`
        })
        progress_area.addEventListener('click', (e) => {
            let videoDuration = main_video.duration;
            let progresswidthval = progress_area.clientWidth;
            let ClickOffsetX = e.offsetX;
            main_video.currentTime = (ClickOffsetX / progresswidthval) * videoDuration;
            active()

        })
        progress_area.addEventListener("pointerdown", (e) => {

            progress_area.setPointerCapture(e.pointerId);
            setTimelinePosition(e);
            progress_area.addEventListener("pointermove", setTimelinePosition);
            progress_area.addEventListener("pointerup", () => {
                progress_area.removeEventListener("pointermove", setTimelinePosition);
            })
        });

        function setTimelinePosition(e) {
            let videoDuration = main_video.duration;
            let progressWidthval = progress_area.clientWidth + 2;
            let ClickOffsetX = e.offsetX;
            main_video.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;

            let progressWidth = (main_video.currentTime / videoDuration) * 100 + 0.5;
            progress_bar.style.width = `${progressWidth}%`;

            let progressTime = main_video.currentTime;
            let currentSec = Math.floor(progressTime % 60);
            let currentMin = Math.floor(progressTime / 60);
            let currenthour = Math.floor(progressTime / 3600);
            currentMin = currentMin - currenthour * 60;

            currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
            currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
            currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

            if (currenthour >= 1) {
                progressAreaTime.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
            } else {
                progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
            }
        }
        //update progress area time and display block on mouse move 
        progress_area.addEventListener('touchmove', (e) => {
            //alert('');
            let progresswidthval = progress_area.clientWidth;
            let x = event.touches[0].clientX;

            let videoDuration = main_video.duration;
            let progressTime = Math.floor((x / progresswidthval) * videoDuration)

            let currentSec = Math.floor(progressTime % 60);
            let currentMin = Math.floor(progressTime / 60);
            let currenthour = Math.floor(progressTime / 3600);
            currentMin = currentMin - currenthour * 60;

            currenthour < 10 ? currenthour = '0' + currenthour : currenthour;
            currentSec < 10 ? currentSec = '0' + currentSec : currentSec;
            currentMin < 10 ? currentMin = '0' + currentMin : currentMin;

            if (currenthour >= 1) {
                progressAreaTime.innerHTML = `${currenthour}:${currentMin}:${currentSec}`;
            } else {
                progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
            }

            if (x >= progresswidthval - 80) {
                x = progresswidthval - 80;
            } else if (x <= 75) {
                x = 75;
            } else {
                x = e.offsetX;
            }

            progressAreaTime.style.setProperty('--x', `${x}px`);
            progressAreaTime.style.display = 'block';
        })
        progress_area.addEventListener('touchend', () => {
            progressAreaTime.style.display = 'none';
            thumbnail.style.display = 'none';

        })
        video_player.addEventListener("touchstart", tapHandler);
        var tapedTwice = false;

        function tapHandler(event) {
            if (!tapedTwice) {
                tapedTwice = true;
                setTimeout(function() {
                    tapedTwice = false;
                }, 300);
                return false;

            }
            if (tapedTwice == true) {
                noActive()
            }
            var x = 0;
            var y = 0;
            if (event.touches && event.touches[0]) {
                x = event.touches[0].clientX;
                y = event.touches[0].clientY;
            } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
                x = event.originalEvent.changedTouches[0].clientX;
                y = event.originalEvent.changedTouches[0].clientY;
            } else if (event.clientX && event.clientY) {
                x = event.clientX;
                y = event.clientY;
            }
            var z = video_player.clientWidth;


            if (z / 2 > x) {
                main_video.currentTime -= 10;
                left.style.display = 'block';
                setTimeout(function() {
                    left.style.display = 'none';
                }, 900)
            } else {
                main_video.currentTime += 10;
                right.style.display = 'block';
                setTimeout(function() {
                    right.style.display = 'none';
                }, 900)
            }
            video_player.addEventListener('touchstart', touchHandler, false);
            video_player.addEventListener('touchmove', touchHandler, false);
            video_player.addEventListener('touchend', touchHandler, false);
        }
        //auto playpasue
        setInterval(autoplay, 2000);

        function autoplay() {
            const isplay = auto_play.classList.contains('active');
            if (isplay == true) {
                const position = elements[tt].getBoundingClientRect().top;
                if (position >= height / 7 && position <= height / 2) {
                    if (main_video.paused) {
                        video_overlay.style.display = 'none';
                        main_video.classList.add('running');
                        playVideo();
                    }
                }
            }
        }
        //thumbnail genrator
        main_video.addEventListener("loadeddata", () => {
            main_video.currentTime = main_video.duration * 0.1;

            function thumbnailGenerator() {
                const canvas = document.createElement("canvas");
                canvas.width = main_video.videoWidth;
                canvas.height = main_video.videoHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(main_video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL();
                thumbnail_img.src = dataURL;
            }
            main_video.addEventListener('timeupdate', thumbnailGenerator);
            //Stop after 5 seconds
            setTimeout(function() {
                main_video.removeEventListener('timeupdate', thumbnailGenerator);
                main_video.currentTime = 0;
                control_bottom.style.display = 'flex';
                progress_area.style.display = 'flex';
                //progress_area
            }, 3000);
        });
    }
}

for(let i= 0; i<16; i++){
    $('#loading_icon').append(`<div class="wave ${i}"></div>`)
  }
  $(document).ready(function(){
     $("#scrollBtn").click(function(){
      $('html, body').animate({ scrollTop: '=0px' }, 'slow');})
  })
}
