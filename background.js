//background.js used to listen for command activations and send messages to content.js
browser.commands.onCommand.addListener((command) => {
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {command: command});
    });
});

