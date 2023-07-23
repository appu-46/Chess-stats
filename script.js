'use strict';

const statsButton = document.querySelector('.btn-stats');
const statsContainer = document.querySelector('.stats');
const textbox = document.querySelector('.textbox');
// const input = document.getElementById('userid');

const getStats = async function (username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  const data = await res.json();
  console.log(data);
  return data;
};

// statsButton.addEventListener('click', chessStats('appu_46'));

const renderStats = async function (data) {
  const res = await getStats(data);

  const blitz = res.chess_blitz;
  const bullet = res.chess_bullet;
  const daily = res.chess_daily;
  const rapid = res.chess_rapid;

  // console.log(res, blitz, bullet, daily, rapid);

  const html = `<article class="stats">
  <div class="ratings">
    <p class="blitz">Best Blitz rating : ${blitz.best.rating}</h3>
    <p class="bullet">Best Bullet rating : ${bullet.best.rating}</h4>
    <p class="daily">Best Daily rating : ${daily.best.rating}</p>
    <p class="rapid">Best Rapid rating : ${rapid.best.rating}</p>
  </div>
  </article>`;
  statsContainer.insertAdjacentHTML('beforeend', html);
  textbox.hidden = true;
  statsButton.hidden = true;
};

statsButton.addEventListener('click', function () {
  renderStats(textbox.value);
});

// chessStats("samayraina");
