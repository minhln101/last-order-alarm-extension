try {
    // let goldTime = new Date().setHours(14, 48);
    let goldTime = Date.now();


    console.log("Creating alarm...");
    chrome.alarms.create("Closing Time", {
        when: goldTime
    });

    console.log("On fire alarm...");
    chrome.alarms.onAlarm.addListener(
        function muteAllTabs() {
            // temporary mute all tabs
            console.log('Mute all active tabs...');
            chrome.tabs.query({url: []}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    var mutedInfo = tabs[i].mutedInfo;
                    if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": true});
                }
            });

            console.log('Play alarm song...');

            // play alarm song
            try {
                console.log(new Audio('alarm-theme-song.mp3'));
                const themeSong = new Audio('alarm-theme-song.mp3');

                const audioPromise = themeSong.play();

                if (audioPromise !== undefined) {
                    audioPromise
                        .then(_ => {
                            audioPromise.play();
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            } catch (e) {
                console.log(e);
            }

        }
    );

    console.log("Cleared all alarms");

} catch (e) {
    console.log(e)
} finally {
    // unmute all tabs
    console.log('Unmute all tabs');
    chrome.tabs.query({url: []}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var mutedInfo = tabs[i].mutedInfo;
            if (mutedInfo) chrome.tabs.update(tabs[i].id, {"muted": false});
        }
    });
}


