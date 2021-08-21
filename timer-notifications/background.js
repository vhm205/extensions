// #3aa757
let color = '#000';
let done = false;
let timeout = null;
let delayTimeout = null;

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ color });
	console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onSuspend.addListener(function () {
	timeout = null;
	delayTimeout = null;
	// Do some simple clean-up tasks.
	console.log('Oh no :((');
});

// chrome.runtime.onConnect.addListener(function (port) {
// 	console.assert(port.name === 'timer-notify');
// 	console.log({ port });

// 	port.onMessage.addListener(function (data) {
// 		const { message, ms, delay, loop } = data;
// 		console.log({ data });

// 		switch (message) {
// 			case 'start':
// 				startTimer({ port, ms, delay, loop });
// 				// port.postMessage({ status: 'running...' });
// 				break;
// 			case 'stop':
// 				timeout && clearTimeout(timeout);
// 				delayTimeout && clearTimeout(delayTimeout);
// 				port.postMessage({ stop: true });
// 				break;
// 			default:
// 				port.postMessage({ stop: true });
// 				break;
// 		}
// 	});
// });

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
	console.log({ data, sender })
	const { message, ms, delay, loop } = data;

	switch (message) {
		case 'start':
			startTimer({ ms, delay, loop });
			sendResponse({ done: false });
			break;
		case 'stop':
			timeout && clearTimeout(timeout);
			delayTimeout && clearTimeout(delayTimeout);
			sendResponse({ done: true });
			break;
		default:
			sendResponse({ done: false });
			break;
	}
});

function startTimer({ ms, delay, loop }) {
	console.log({ ms, delay, loop, chrome })
	timeout = setTimeout(() => {
		clearTimeout(timeout);
		chrome.tabs.create({ url: 'rest_time.html' });

		// chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
		// 	if(changeInfo.status === 'complete'){
		// 		chrome.scripting.executeScript({
		// 			files: ["injectScript.js"],
		// 			target: { tabId: tabID }
		// 		})
		// 	}
		// })
		
		// chrome.notifications.create({
		// 	type: 'basic',
		// 	title: 'Hey!! Rest your eyes...',
		// 	message: 'Down time 30s',
		// 	iconUrl: 'http://www.google.com/favicon.ico',
		// 	// iconUrl: 'http://cdn.icon-icons.com/icons2/2098/PNG/512/clock_icon_128908.png',
		// 	eventTime: Date.now() + 2000,
		// });

		if (loop) {
			if (delay) {
				delayTimeout = setTimeout(() => startTimer({ ms, delay, loop }), delay);
			} else {
				startTimer({ ms, delay, loop });
			}
		}
	}, ms);
}
