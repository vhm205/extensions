function getPermissionNotify() {
	return new Promise((resolve) => {
		chrome.notifications.getPermissionLevel((level) => resolve(level));
	});
}

async function fireNotify({
	id = 'default-notify-id',
	type = 'basic',
	title = '',
	message = '',
	iconUrl = 'assets/images/get_started16.png',
	eventTime = Date.now() + 2000
}) {
	const permission = await getPermissionNotify();
	if (permission === 'granted') {
		chrome.notifications.create(id, {
			type,
			title,
			message,
			iconUrl,
			eventTime,
		});
	}
}

function clearNotify(notifyID) {
	chrome.notifications.clear(notifyID);
}

function getBadgeText(tabID) {
	return chrome.action.getBadgeText({ tabId: tabID })
}

function setBadge(tabID, text, background = '#b71540') {
	chrome.action.setBadgeText({
	    text,
	    tabId: tabID,
	})
	chrome.action.setBadgeBackgroundColor(
		{ color: background },
		() => { /* ... */ },
	);
}
