// Function to load settings from storage and display them in the form
function loadSettings() {
    // Get settings from storage
    browser.storage.local.get(['incrementAmount', 'targetWPM', 'transcriptSeconds', 'useWPMbyDefault', 'preset_speed_1', 'preset_speed_2', 'preset_speed_3']).then(settings => {
        document.getElementById('defaultSpeed').value = settings.defaultSpeed || 1.0;
        document.getElementById('incrementAmount').value = settings.incrementAmount || 0.25;
        document.getElementById('targetWPM').value = settings.targetWPM || 300; 
        document.getElementById('transcriptSeconds').value = settings.transcriptSeconds || 60; 
        document.getElementById('useWPMbyDefault').checked = settings.useWPMbyDefault || false;
        document.getElementById('preset_speed_1').value = settings.preset_speed_1 || 1.0; 
        document.getElementById('preset_speed_2').value = settings.preset_speed_2 || 2.0; 
        document.getElementById('preset_speed_3').value = settings.preset_speed_3 || 3.0; 
    }, error => {
        console.error(`Error: ${error}`);
    });
}

// save settings to storage
function saveSettings(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Capture new settings from form fields
    const defaultSpeed = parseFloat(document.getElementById('defaultSpeed').value);
    const incrementAmount = parseFloat(document.getElementById('incrementAmount').value);
    const targetWPM = parseFloat(document.getElementById('targetWPM').value);
    const transcriptSeconds = parseFloat(document.getElementById('transcriptSeconds').value);
    const useWPMbyDefault = document.getElementById('useWPMbyDefault').checked;
    const preset_speed_1 = parseFloat(document.getElementById('preset_speed_1').value);
    const preset_speed_2 = parseFloat(document.getElementById('preset_speed_2').value);
    const preset_speed_3 = parseFloat(document.getElementById('preset_speed_3').value);

    // Save these settings to storage
    browser.storage.local.set({
        defaultSpeed: defaultSpeed,
        incrementAmount: incrementAmount,
        targetWPM: targetWPM,
        transcriptSeconds: transcriptSeconds,
        useWPMbyDefault: useWPMbyDefault,
        preset_speed_1: preset_speed_1,
        preset_speed_2: preset_speed_2,
        preset_speed_3: preset_speed_3
    }).then(() => {
        console.log('Settings saved');
    }, error => {
        console.error(`Error: ${error}`);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    document.getElementById('settings-form').addEventListener('submit', saveSettings);
});