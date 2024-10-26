        const playmusic = document.getElementById("playmusic");
        const pausemusic = document.getElementById("pausemusic");
        const stopmusic = document.getElementById("stopmusic");
        const songList = document.getElementById("song-list");
        const audio = document.getElementById("audio");
        const seekBar = document.getElementById("seek-bar");
        const currentDuration = document.getElementById("current-duration");
        const totalDuration = document.getElementById("total-duration");

        // Format time helper function
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
            return `${minutes}:${secs}`;
        }

        // Set default song on load
        window.onload = () => {
            const defaultSong = songList.querySelector("li");
            audio.src = defaultSong.getAttribute("data-src");
            document.getElementById("track-name").textContent = `Lagu: ${defaultSong.getAttribute("data-song")}`;
            document.getElementById("artist-name").textContent = `Artis: ${defaultSong.getAttribute("data-band")}`;
            document.getElementById("cover-img").src = defaultSong.getAttribute("data-img");
        };

        // Play and pause functionality
        playmusic.addEventListener("click", () => audio.play());
        pausemusic.addEventListener("click", () => audio.pause());
        stopmusic.addEventListener("click", () => {
            audio.pause();
            audio.currentTime = 0;
        });

        // Update seek bar and time display during playback
        audio.addEventListener("timeupdate", () => {
            seekBar.value = audio.currentTime;
            currentDuration.textContent = formatTime(audio.currentTime);
        });

        // Set total duration when metadata is loaded
        audio.addEventListener("loadedmetadata", () => {
            seekBar.max = audio.duration;
            totalDuration.textContent = formatTime(audio.duration);
        });

        // Seek functionality when slider is moved
        seekBar.addEventListener("input", (e) => {
            audio.currentTime = e.target.value;
        });

        // Change song when a list item is clicked
        songList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                audio.src = e.target.getAttribute("data-src");
                audio.play();

                const judul = e.target.getAttribute("data-song");
                const band = e.target.getAttribute("data-band");
                const cover = e.target.getAttribute("data-img");

                document.getElementById("track-name").textContent = `Lagu: ${judul}`;
                document.getElementById("artist-name").textContent = `Artis: ${band}`;
                document.getElementById("cover-img").src = cover;
                
            }
        });