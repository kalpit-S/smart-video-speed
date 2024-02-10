# Chrome Version: https://github.com/kalpit-S/smart-video-speed-chrome

# Smart Video Speed

## Overview

Smart Video Speed is a versatile browser extension that provides users with the ability to control video playback speeds on any website using convenient keyboard shortcuts. Unique to YouTube videos, it features an advanced automatic speed adjustment based on the speaker's words per minute.

## Features

- **Hotkey Controls**: Increase or decrease video speed with preset keyboard shortcuts.
- **Dynamic Speed Adjustment**: Automatically adjusts the video speed to match a target WPM.
- **Customizable Presets**: Set custom speed presets to allow quick switching.
- **User-friendly Interface**: A simple, intuitive options page for easy customization of settings.

## Installation (Firefox)

To install the Smart Video Speed Controller extension in Firefox, follow these steps:

1. Download the extension's `.xpi` file from the GitHub repository release section.
2. Open Firefox and navigate to `about:addons`.
3. Click on the gear icon and select 'Install Add-on From File'.
4. Choose the downloaded `.xpi` file and confirm the installation.

## Usage

The extension offers customizable keyboard shortcuts for controlling video speed. Here are the default shortcuts for Windows/Linux and Mac:

For Windows/Linux:

- **Increase Video Speed**: `Ctrl + Shift + Period`
- **Decrease Video Speed**: `Ctrl + Shift + Comma`
- **Activate Dynamic Speed**: `Ctrl + Shift + Y`
- **Jump to Preset Speed 1**: `Ctrl + Alt + J`
- **Jump to Preset Speed 2**: `Ctrl + Alt + K`
- **Jump to Preset Speed 3**: `Ctrl + Alt + L`

For Mac:

- **Increase Video Speed**: `MacCtrl + Shift + Period`
- **Decrease Video Speed**: `MacCtrl + Shift + Comma`
- **Activate Dynamic Speed**: `MacCtrl + Shift + Y`
- **Jump to Preset Speed 1**: `MacCtrl + Ctrl + J`
- **Jump to Preset Speed 2**: `MacCtrl + Ctrl + K`
- **Jump to Preset Speed 3**: `MacCtrl + Ctrl + L`

## Settings

- **Default Speed**: Sets the starting playback speed for videos upon loading. (may be unreliable with ads)
- **Speed Increment Amount**: Determines the magnitude of speed change each time the playback speed is adjusted.
- **Target Words Per Minute**: Specifies the preferred speech rate for videos under dynamic speed adjustment.
- **Apply Target Words Per Minute Speed on Page Load**: Option to automatically open transcript and adjust video speed based on target WPM on page load.
- **Preset Speeds**: Three customizable speed settings for quick selection, offering a convenient way to switch between frequently used playback speeds.

## Contributing

Contributions to improve Smart Video Speed are welcome. Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request with a clear description of the changes.

## License

This extension is released under the MIT License..

## Support

For support, feature requests, or bug reports, please file an issue. Feel free to star, fork, or watch the repository for updates..

---

## Possible future updates

- Chrome extension (will do this very soon)

- Upload to Firefox Add-ons and Chrome Web store

- User-Defined Shortcuts: Allow users to set custom shortcuts

- Music Video Exclusion: Exclude music videos from getting affected by default speed settings

- Enhanced Transcript Analysis: The extension could analyze the upcoming transcript from that point to determine the speaker's pace and adjust the video speed accordingly, allowing for more localized control.

- Context-Sensitive Speed Adjustment: For example, if a video has complex math, then it probably shouldn't be sped up as much as other videos
