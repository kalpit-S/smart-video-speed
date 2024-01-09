//Content.js used to adjust video speed
//console.log('Content script loaded');
function createSpeedIndicator() {
    //console.log('Creating speed indicator element');
    const speedIndicator = document.createElement('div');
    speedIndicator.id = 'video-speed-indicator';
    // Styling for the speed indicator
    Object.assign(speedIndicator.style, {
        position: 'fixed', top: '100px', left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white',
        padding: '10px', borderRadius: '5px', fontSize: '15px',
        fontFamily: 'Arial, sans-serif', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: '80px', height: '40px', transition: 'opacity 0.5s ease-in-out'
    });
    document.body.appendChild(speedIndicator);
    return speedIndicator;
}

function updateSpeedIndicator(speed) {
    let speedIndicator = document.getElementById('video-speed-indicator') || createSpeedIndicator();
    speedIndicator.textContent = `${speed.toFixed(2)}x`;
    speedIndicator.style.opacity = '1';
    setTimeout(() => speedIndicator.style.opacity = '0', 4000);//TODO make this an option
}

// Adjust the playback speed of all video elements on the page
function adjustVideoSpeed(speed, isIncrement = false) {
    //console.log('adjustVideoSpeed called with speed:', speed, 'isIncrement:', isIncrement);
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (isIncrement) {
            // Adjust speed by increment/decrement
            video.playbackRate = Math.max(0.1, video.playbackRate + speed);
        } else {
            // Set specific speed
            video.playbackRate = speed;
        }
        updateSpeedIndicator(video.playbackRate);
    });
}
// Adjust the video speed based on calculated WPM from the transcript
function adjustVideoSpeedBasedOnWPM(target_wpm) {
    //console.log('adjustVideoSpeedBasedOnWPM called');
    const current_wpm = fetchAndCalculateWPM();
    //console.log('Calculated WPM:', current_wpm);
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => { 
        let newSpeed = determineSpeedFromWPM(current_wpm,target_wpm);
        video.playbackRate = newSpeed;
        updateSpeedIndicator(video.playbackRate);
    });
}

// Function to determine the video speed based on the calculated WPM
function determineSpeedFromWPM(current_wpm,target_wpm) {
    //console.log(`Determining speed from WPM: Target WPM = ${target_wpm}, Actual WPM = ${current_wpm}`);
    let newSpeed = (target_wpm / current_wpm);
    newSpeed = Math.max(1.0, newSpeed); // Lower limit
    newSpeed = Math.min(10.0, newSpeed); // Upper limit
    //console.log('Calculated new speed:', newSpeed);
    return newSpeed;
}

// Function to fetch the first x seconds of the transcript and calculate the WPM
function fetchAndCalculateWPM(transcript_seconds = 60) {
    //console.log('fetchAndCalculateWPM called');
    // Select all transcript segment elements
    const transcriptSegments = document.querySelectorAll('ytd-transcript-segment-renderer');
    let wordCount = 0, lastTimestamp = 0;
    for (let segment of transcriptSegments) {
        // Extract and parse the timestamp text
        const timestampText = segment.querySelector('.segment-timestamp').textContent.trim();
        const timestamp = parseTimestampToSeconds(timestampText);
        if (timestamp > transcript_seconds) break;
        lastTimestamp = timestamp;
        const text = segment.querySelector('.segment-text').textContent.trim();
        wordCount += text.split(/\s+/).length;
    }
    //console.log("Word count:", wordCount, "Time (sec):", lastTimestamp, "Calculated WPM:", wordCount / (lastTimestamp / 60));
    return lastTimestamp > 0 ? (wordCount / (lastTimestamp / 60)) : 0;
}
// handles xx:xx:xx and xx:xx timestamps
function parseTimestampToSeconds(timestamp) {
    const parts = timestamp.split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parts[0] * 60 + parts[1];
}


// Listen for messages from the background script
browser.runtime.onMessage.addListener((message) => {
    const command = message.command;
    //console.log('Received command:', command);
    browser.storage.local.get(['targetWPM', 'incrementAmount', 'preset_speed_1', 'preset_speed_2', 'preset_speed_3','defaultSpeed'], settings => {
        const incrementAmount = parseFloat(settings.incrementAmount) || 0.25;
        const defaultSpeed = parseFloat(settings.defaultSpeed) || 1.0;
        const targetWPM = parseFloat(settings.targetWPM) || 300;
        const preset_speed_1 = parseFloat(settings.preset_speed_1) || 1.0;
        const preset_speed_2 = parseFloat(settings.preset_speed_2) || 2.0;
        const preset_speed_3 = parseFloat(settings.preset_speed_3) || 3.0;
        if (command === 'increase_speed') {
            adjustVideoSpeed(incrementAmount, true);
        } else if (command === 'decrease_speed') {
            adjustVideoSpeed(-incrementAmount, true);
        } else if (command === 'set_wpm') {
            dynamicallyAdjust(targetWPM,defaultSpeed);
        } else if (command === 'preset_speed_1') {
            adjustVideoSpeed(preset_speed_1);
        } else if (command === 'preset_speed_2') {
            adjustVideoSpeed(preset_speed_2);
        } else if (command === 'preset_speed_3') {
            adjustVideoSpeed(preset_speed_3);
        }
    });
});

// Adjust the video speed based on calculated WPM from the transcript
function dynamicallyAdjust(target_wpm = 300,defaultSpeed = 1.0) {
    const videos = document.querySelectorAll('video');
    if (location.hostname === 'www.youtube.com' && videos.length > 0 && window.location.href.includes("watch")) {
        const transcriptIsOpen = !!document.querySelector('ytd-transcript-segment-renderer');
        //console.log('Transcript is open:', transcriptIsOpen);
        if (!transcriptIsOpen) {
            const showMoreButton = document.querySelector('tp-yt-paper-button#expand');
            if (showMoreButton) {
                showMoreButton.click();
                //console.log('Clicked "Show more" button');
            }
            setTimeout(() => {
                let buttons = document.querySelectorAll('button');
                // Find correct button and click it
                for (let button of buttons) {
                    if (button.innerText.includes('Show transcript')) {
                        button.click();
                        //console.log('Clicked "Show transcript" button');
                        break;
                    }
                }
                // Wait for the transcript to load
                setTimeout(() => {
                    const transcriptIsOpenAfterClick = !!document.querySelector('ytd-transcript-segment-renderer');
                    if (transcriptIsOpenAfterClick) {
                        adjustVideoSpeedBasedOnWPM(target_wpm);
                    } else {
                        // If the transcript is not available, adjust the video speed to the default speed
                        adjustVideoSpeed(defaultSpeed);
                    }
                }, 2000);
            }, 2000);
        } else {
            // If the transcript is already open, calculate WPM immediately
            adjustVideoSpeedBasedOnWPM(target_wpm);
        }
    }
}

// Adjust the video speed based on calculated WPM from the transcript or default
function adjustVideoSpeedOnLoad() {
    //console.log('adjustVideoSpeedOnLoad called');
    browser.storage.local.get(['defaultSpeed', 'targetWPM','useWPMbyDefault'], settings => {
        const defaultSpeed = parseFloat(settings.defaultSpeed) || 1.0;
        const target_wpm = settings.targetWPM || 300;
        const useWPMbyDefault = settings.useWPMbyDefault !== undefined ? settings.useWPMbyDefault : true;
        if (useWPMbyDefault) {
            dynamicallyAdjust(target_wpm,defaultSpeed);
        }
    else if (defaultSpeed != 1.0 && videos.length > 0) {
            adjustVideoSpeed(defaultSpeed);
        }

    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounce adjustVideoSpeedOnLoad
const debouncedAdjustVideoSpeedOnLoad = debounce(adjustVideoSpeedOnLoad, 200);

// Listen for the yt-navigate-finish event and call debouncedAdjustVideoSpeedOnLoad
window.addEventListener('yt-navigate-finish', debouncedAdjustVideoSpeedOnLoad);
