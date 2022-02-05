import { getProject, types as t } from '@theatre/core';
import state from './state.json';
// import studio from '@theatre/studio';

// studio.initialize();
const proj = getProject('Test', { state });

const nudgableNumber = t.number(1, { nudgeMultiplier: 0.01 });

function makeBouncingBox(i) {
  const boxContainer = document.createElement('div');
  boxContainer.className = 'boxContainer';
  document.getElementById('space').appendChild(boxContainer);

  const sheet = proj.sheet('Bouncing box', 'Instance ' + i);

  const boxObj = sheet.object('Box', {
    y: 0,
    stretch: nudgableNumber,
  });

  const boxDiv = document.createElement('div');
  boxDiv.className = 'box';
  boxContainer.appendChild(boxDiv);

  boxDiv.addEventListener('click', () => {
    sheet.sequence.play({ rate: 2, iterationCount: 1 });
  });

  boxObj.onValuesChange(({ y, stretch }) => {
    boxDiv.style.transform = `translateY(${-y}px) scale(${1 / stretch}, ${stretch})`;
  });

  const dustDiv = document.createElement('div');
  dustDiv.className = 'dust';
  boxContainer.appendChild(dustDiv);

  const dustObj = sheet.object('Dust', {
    opacity: nudgableNumber,
    scale: nudgableNumber,
  });

  dustObj.onValuesChange(({ opacity, scale }) => {
    dustDiv.style.opacity = String(opacity);
    dustDiv.style.transform = `scale(${scale})`;
  });
}

makeBouncingBox(1);
makeBouncingBox(2);
