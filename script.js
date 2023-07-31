'use strict';

const statsButton = document.querySelector('.btn-stats');
const statsContainer = document.querySelector('.stats');
const textbox = document.querySelector('.textbox');
const profileContainer = document.querySelector('.player_info');
const errorContainer = document.querySelector('.error');
errorContainer.hidden = true;

// const input = document.getElementById('userid');

const getPlayerInfo = async function (username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  const data = await res.json();
  console.log(res);
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
  console.log(res);
  console.log(data);
  return data;
};

const getgames = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(res);
  console.log(data);
  return data;
};

const getarchive = async function (username) {
  const res = await fetch(
    `https://api.chess.com/pub/player/${username}/games/archives`
  );
  const data = await res.json();
  getgames(data.archives[0]);
  console.log(res);
  console.log(data);
  return data;
};

getarchive('appu_46');
const renderError = function (msg) {
  errorContainer.insertAdjacentHTML('beforeend', msg);
  textbox.hidden = true;
  statsButton.hidden = true;
};

const renderProfile = async function (data) {
  // if (data === '') {
  //   return;
  // }
  try {
    const res = await getPlayerInfo(data);

    const title = !res.title ? ' ' : res.title;
    const name = !res.name ? res.username : res.name;
    const avatar = !res.avatar ? 'img\\channels4_profile.jpg' : res.avatar;
    const country = await getPlayerCountry(res.country);
    const league = !res.league ? ' ' : res.league + ' League';
    const verified = res.verified ? '✅' : '';

    const html = `<article class="profile">
  <img class="pfp" src="${avatar}"/>
  <h2>${title} \t ${name} ${verified} </h2>
  <img class="flag" src="${country[1]}"/><h2>${country[2]}</h2> 
  <h2>${league}</h2> 
  </article>`;

    profileContainer.insertAdjacentHTML('beforeend', html);
    textbox.hidden = true;
    statsButton.hidden = true;
  } catch (err) {
    errorContainer.hidden = false;
    renderError(
      `Error: Something went wrong while fetching profile! Press home button and retry!`
    );
    console.error(err);
  }
};

const renderStats = async function (data) {
  try {
    const res = await getStats(data);
    if (res.code === 0) {
      // throw new Error(`${res.message}`);
      renderError(`${res.message} Press home button and try again!`);
    }
    // console.log(typeof !res.chess_bullet, !res.chess_bullet, res.chess_bullet);
    const rapid = !res.chess_rapid
      ? ['NA', 'NA', 'NA', 'NA', 'NA']
      : [
          !res.chess_rapid.best        ? 'NA' : res.chess_rapid.best.rating,
          !res.chess_rapid.last.rating ? 'NA' : res.chess_rapid.last.rating,
          !res.chess_rapid.record.win  ? 'NA' : res.chess_rapid.record.win,
          !res.chess_rapid.record.loss ? 'NA' : res.chess_rapid.record.loss,
          !res.chess_rapid.record.draw ? 'NA' : res.chess_rapid.record.draw,
        ];

    const blitz = !res.chess_blitz
      ? ['NA', 'NA', 'NA', 'NA', 'NA']
      : [
          !res.chess_blitz.best        ? 'NA' : res.chess_blitz.best.rating,
          !res.chess_blitz.last.rating ? 'NA' : res.chess_blitz.last.rating,
          !res.chess_blitz.record.win  ? 'NA' : res.chess_blitz.record.win,
          !res.chess_blitz.record.loss ? 'NA' : res.chess_blitz.record.loss,
          !res.chess_blitz.record.draw ? 'NA' : res.chess_blitz.record.draw,
        ];

    const bullet = !res.chess_bullet
      ? ['NA', 'NA', 'NA', 'NA', 'NA']
      : [
          !res.chess_bullet.best        ? 'NA' : res.chess_bullet.best.rating,
          !res.chess_bullet.last.rating ? 'NA' : res.chess_bullet.last.rating,
          !res.chess_bullet.record.win  ? 'NA' : res.chess_bullet.record.win,
          !res.chess_bullet.record.loss ? 'NA' : res.chess_bullet.record.loss,
          !res.chess_bullet.record.draw ? 'NA' : res.chess_bullet.record.draw,
        ];

    const daily = !res.chess_daily
      ? ['NA', 'NA', 'NA', 'NA', 'NA']
      : [
          !res.chess_daily.best        ? 'NA' : res.chess_daily.best.rating,
          !res.chess_daily.last.rating ? 'NA' : res.chess_daily.last.rating,
          !res.chess_daily.record.win  ? 'NA' : res.chess_daily.record.win,
          !res.chess_daily.record.loss ? 'NA' : res.chess_daily.record.loss,
          !res.chess_daily.record.draw ? 'NA' : res.chess_daily.record.draw,
        ];

    // console.log(res, blitz, bullet, daily, rapid);

    const htmlBlitz = `<article class="stat">
  <h2><strong><span>🔥Blitz Ratings</strong></span> </h2>
  <div class="ratings">
    <p class="best">Best Elo: ${blitz[0]}</p>
    <p class="latest">Live Elo: ${blitz[1]}</p>
    <p class="record"> 
    <p>Wins:     ${blitz[2]}</p>
    <p>Losses:   ${blitz[3]}</p>
    <p>Draws:    ${blitz[4]}</p>
  </div>
  </article>`;
    const htmlBullet = `<article class="stat">
  <h2><strong><span>⏱️Bullet Ratings</strong></span> </h2>
  <div class="ratings">
    <p class="best">Best Elo: ${bullet[0]}</p>
    <p class="latest">Live Elo: ${bullet[1]}</p>
    <p class="record"> 
    <p>Wins:     ${bullet[2]}</p>
    <p>Losses:   ${bullet[3]}</p>
    <p>Draws:    ${bullet[4]}</p>
  </div>
  </article>`;
    const htmlDaily = `<article class="stat">
  <h2><strong><span>☀️Daily Ratings</strong></span> </h2>
  <div class="ratings">
    <p class="best">Best Elo: ${daily[0]}</p>
    <p class="latest">Live Elo: ${daily[1]}</p>
    <p class="record"> 
    <p>Wins:     ${daily[2]}</p>
    <p>Losses:   ${daily[3]}</p>
    <p>Draws:    ${daily[4]}</p>
  </div>
  </article>`;
    const htmlRapid = `<article class="stat">
  <h2><strong><span>⏰Rapid Ratings</strong></span> </h2>
  <div class="ratings">
    <p class="best">Best Elo: ${rapid[0]}</p>
    <p class="latest">Live Elo: ${rapid[1]}</p>
    <p class="record"> 
    <p>Wins:     ${rapid[2]}</p>
    <p>Losses:   ${rapid[3]}</p>
    <p>Draws:    ${rapid[4]}</p>
  </div>
  </article>
  `; /*
  const html960daily = `<article class="stat">
  <div class="ratings__960daily">
  <h2><strong><span>⏰960Daily Ratings</strong></span> </h2>
    <p class="best">Best Elo: ${daily960.best.rating}</p>
    <p class="latest">Live Elo: ${daily960.last.rating}</p>
    <p class="record"> 
    <p>Wins:     ${daily960.record.win}</p>
    <p>Losses:   ${daily960.record.loss}</p>
    <p>Draws:    ${daily960.record.draw}</p>
  </div>
  </article>
    `;*/
    statsContainer.insertAdjacentHTML('beforeend', htmlRapid);
    statsContainer.insertAdjacentHTML('beforeend', htmlBlitz);
    statsContainer.insertAdjacentHTML('beforeend', htmlBullet);
    statsContainer.insertAdjacentHTML('beforeend', htmlDaily);
    textbox.hidden = true;
    statsButton.hidden = true;
  } catch (err) {
    errorContainer.hidden = false;
    renderError(
      `Error: Something went wrong while fetching stats! Press home button and try again!`
    );
    console.error(err);
  }
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
};

statsButton.addEventListener('click', function () {
  if (textbox.value === '') {
    alert(`Please enter a chess.com username!`);
    return;
  }

  renderStats(textbox.value);
  renderProfile(textbox.value);
});

// renderProfile('arionmiles');
// renderStats('arionmiles');
