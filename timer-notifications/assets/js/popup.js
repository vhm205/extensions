const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const textDebug = document.querySelector('#text-debug');
let timeout = null;

// let port = chrome.runtime.connect({ name: 'timer-notify' });

// port.onMessage.addListener(function (msg) {
// 	if (msg.stop === false) {
// 		textDebug.textContent = `${JSON.stringify({ doneLap: true })}`;
// 	} else {
// 		textDebug.textContent = `${JSON.stringify(msg)}`;
// 	}
// });

window.onload = function () {
	chrome.storage.sync.get(['form-data'], (data) => {
		if (data) {
			try {
				const { hours, minutes, seconds, delay, loop } = JSON.parse(
					data['form-data']
				);
				setFormData({ hours, minutes, seconds, delay, loop });
			} catch (error) {
				textDebug.textContent = error.message;
			}
		}
	});
};

btnStart.addEventListener('click', async () => {
	const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});

	const hours = +document.getElementById('inputHours').value;
	const minutes = +document.getElementById('inputMinutes').value;
	const seconds = +document.getElementById('inputSeconds').value;
	const delay = +document.getElementById('inputDelay').value;
	const loop = document.getElementById('cbLoop').checked;
	let ms = 0;

	if (hours || hours !== 0) {
		ms = +hours * 60 * 60 * 1000;
	}

	if (minutes || minutes !== 0) {
		ms += +minutes * 60 * 1000;
	}

	if (seconds || seconds !== 0) {
		ms += +seconds * 1000;
	}

	chrome.storage.sync.set({
		'form-data': JSON.stringify({ hours, minutes, seconds, delay, loop }),
	});

	chrome.runtime.sendMessage({ message: 'start', ms, delay, loop });

	fireNotify({
		id: 'notify-rest-time',
		title: 'Hey!! Timer is running...',
		message: `Down time ${hours}:${minutes}:${seconds}`,
	});

	// port.postMessage({ message: 'start', ms, delay, loop });

	// textDebug.textContent = `Debug:
	// 	${hours.value}-${minutes.value}-${seconds.value}-${ms}
	// `;

	// chrome.power.requestKeepAwake('display');

	// chrome.system.memory.getInfo((info) => {
	// 	textDebug.textContent = `${JSON.stringify(info)}`;
	// });

	// chrome.topSites.get((mostVisitedURL) => {
	// 	textDebug.textContent = `${JSON.stringify(mostVisitedURL)}`;
	// });
});

btnStop.addEventListener('click', function () {
	chrome.runtime.sendMessage({ message: 'stop' });
	fireNotify({
		id: 'notify-rest-time',
		title: 'Hey!! Timer is stoped ✅',
		message: 'Relax',
	});
});

// async function finishTime(tabID) {
// chrome.scripting.executeScript({
// 	target: { tabId: tabID },
// 	function: setPageBackgroundColor,
// });
// const badgeValue = await getBadgeText(tabID);
// setBadge(tabID, `${+badgeValue + 1}`);
// fireNotify();
// }

function setFormData({ hours, minutes, seconds, delay, loop }) {
	document.getElementById('inputHours').value = hours;
	document.getElementById('inputMinutes').value = minutes;
	document.getElementById('inputSeconds').value = seconds;
	document.getElementById('inputDelay').value = delay;
	document.getElementById('cbLoop').checked = loop;
}
