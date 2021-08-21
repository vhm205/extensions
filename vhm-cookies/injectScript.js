const divVhm = document.createElement('div');
const textContentVhm = document.createTextNode('Rest Your Eyes 👀');
divVhm.appendChild(textContentVhm);
divVhm.classList.add('injected-div-vhm')
divVhm.style.width = '100vw';
divVhm.style.height = '100vh';
divVhm.style.background = 'black';
divVhm.style.opacity = .9;
divVhm.style.position = 'fixed';
divVhm.style.top = 0;
divVhm.style.textAlign = 'center';
divVhm.style.fontSize = 30;
divVhm.style.zIndex = 10000000000000000;

document.body.appendChild(divVhm);
