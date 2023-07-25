'use strict';

const statsButton = document.querySelector('.btn-stats');
const statsContainer = document.querySelector('.stats');
const textbox = document.querySelector('.textbox');
const profileContainer = document.querySelector('.player_info');

// const input = document.getElementById('userid');
const getPlayerInfo = async function (username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  const data = await res.json();

  console.log(data);

  return data;
};

const getPlayerCountry = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  const countryName = data.name;
  const countryCode = data.code;
  const res2 = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  const data2 = await res2.json();
  // console.log(data2);
  const flag = data2[0].flags.svg;
  const country = [countryCode, flag, countryName];
  // console.log(countryName);

  return country;
};

const getStats = async function (username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  const data = await res.json();
  console.log(data);
  return data;
};

const renderProfile = async function (data) {
  const res = await getPlayerInfo(data);

  const title = !res.title ? ' ' : res.title;
  const name = !res.name ? res.username : res.name;
  const avatar = res.avatar;
  const country = await getPlayerCountry(res.country);
  const league = res.league;

  const html = `<article class="profile">
  <img class="pfp" src="${avatar}"/>
  <h2>${title} \t ${name}</h2> 
  <img class="flag" src="${country[1]}"/><h2>${country[2]}</h2> 
  <h2>${league} League</h2> 
  </article>`;

  profileContainer.insertAdjacentHTML('beforeend', html);
  textbox.hidden = true;
  statsButton.hidden = true;
};

const renderStats = async function (data) {
  const res = await getStats(data);

  const rapid = !res.chess_blitz ? ' ' : res.chess_rapid;
  const blitz = !res.chess_blitz ? ' ' : res.chess_blitz;
  const bullet = !res.chess_bullet ? ' ' : res.chess_bullet;
  const daily = !res.chess_daily ? ' ' : res.chess_daily;

  // console.log(res, blitz, bullet, daily, rapid);

  const html =
    daily === ' '
      ? ''
      : `<article class="stat">
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
  renderProfile(textbox.value);
});

// renderStats('hikaru');
// renderProfile('hikaru');
// renderStats('hikaru');
