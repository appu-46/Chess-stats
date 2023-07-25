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

  const html = `<article class="stat">
  <div class="ratings__blitz">
  <h2><strong><span>🔥Blitz Ratings</strong></span> </h2>
    <p class="best">Best Elo: ${blitz.best.rating}</p>
    <p class="latest">Live Elo: ${blitz.last.rating}</p>
    <p class="record"> 
    <p>Wins:     ${blitz.record.win}</p>
    <p>Losses:   ${blitz.record.loss}</p>
    <p>Draws:    ${blitz.record.draw}</p>
  </div>
  </article>
  <article class="stat">
  <div class="ratings__bullet">
  <h2><strong><span>⏱️Bullet Ratings</strong></span> </h2>
    <p class="best">Best Elo: ${bullet.best.rating}</p>
    <p class="latest">Live Elo: ${bullet.last.rating}</p>
    <p class="record"> 
    <p>Wins:     ${bullet.record.win}</p>
    <p>Losses:   ${bullet.record.loss}</p>
    <p>Draws:    ${bullet.record.draw}</p>
  </div>
  </article>
  <article class="stat">
  <div class="ratings__daily">
  <h2><strong><span>☀️Daily Ratings</strong></span> </h2>
    <p class="best">Best Elo: ${daily.best.rating}</p>
    <p class="latest">Live Elo: ${daily.last.rating}</p>
    <p class="record"> 
    <p>Wins:     ${daily.record.win}</p>
    <p>Losses:   ${daily.record.loss}</p>
    <p>Draws:    ${daily.record.draw}</p>
  </div>
  </article>
  <article class="stat">
  <div class="ratings__rapid">
  <h2><strong><span>⏰Rapid Ratings</strong></span> </h2>
    <p class="best">Best Elo: ${rapid.best.rating}</p>
    <p class="latest">Live Elo: ${rapid.last.rating}</p>
    <p class="record"> 
    <p>Wins:     ${rapid.record.win}</p>
    <p>Losses:   ${rapid.record.loss}</p>
    <p>Draws:    ${rapid.record.draw}</p>
  </div>
  </article>
  `;

  /*
  window.onload = function () {
    var chart = new CanvasJS.Chart('chartContainer', {
      theme: 'dark2', //light1
      title: {
        text: 'Blitz',
      },
      data: [
        {
          type: 'column',
          dataPoints: [
            { label: 'apple', y: 10 },
            { label: 'orange', y: 15 },
            { label: 'banana', y: 25 },
            { label: 'mango', y: 30 },
            { label: 'grape', y: 28 },
          ],
        },
      ],
    });
    chart.render();
  };
  */
  statsContainer.insertAdjacentHTML('beforeend', html);
  textbox.hidden = true;
  statsButton.hidden = true;
};
statsButton.addEventListener('click', function () {
  renderStats(textbox.value);
});

renderStats('hikaru');
