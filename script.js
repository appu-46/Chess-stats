'use strict';



const statsButton = document.querySelector('.btn-stats');
const statsContainer = document.querySelector('.stats');
const textbox = document.querySelector('.textbox');
const profileContainer = document.querySelector('.player_info');
const errorContainer = document.querySelector('.error');
// const blitzRecord = document.getElementById('graph_blitz')
// const dailyRecord = document.getElementById('graph_daily')
// const rapidRecord = document.getElementById('graph_rapid')
// const bulletRecord = document.getElementById('graph_bullet')

// const grpah = document.getElementById('graph_blitz')
errorContainer.hidden = true;



const percentCalc = function(data) {
  const arr = data
  // console.log(`arrslice:${arr.slice(2,5)}`)
  // console.log(`arr:${arr}`)
  if (data.slice(2,5).includes('No data')) {
    return ['','','']
  };
  
  const winpercent = arr[2]/(arr[2]+arr[3]+arr[4]) * 100
  const losspercent = arr[3]/(arr[2]+arr[3]+arr[4]) * 100
  const drawpercent = arr[4]/(arr[2]+arr[3]+arr[4]) * 100
  const res = [winpercent,drawpercent,losspercent]
  console.log(res)  
  return res;
}
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
  const countryCode = (data.code === 'XX') ? 'IN': data.code ;
  const res2 = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  const data2 = await res2.json();
  // console.log(data2);
  const flag = data2[0].flags.svg;
  const country = (data.code === 'XX') ?  [countryCode, "img\\earth_flag.jpg", countryName] : [countryCode, flag, countryName];
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
    // const verified = res.verified ? '✅' : '';

    const html = `<article class="profile">
  <img class="pfp" src="${avatar}"/>
  <h2>${title} \t ${name}  </h2>
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
      ? ['No data', 'No data', 'No data', 'No data', 'No data']
      : [
          !res.chess_rapid.best        ? 'No data' : res.chess_rapid.best.rating,
          !res.chess_rapid.last.rating ? 'No data' : res.chess_rapid.last.rating,
          !res.chess_rapid.record.win  ? 'No data' : res.chess_rapid.record.win,
          !res.chess_rapid.record.loss ? 'No data' : res.chess_rapid.record.loss,
          !res.chess_rapid.record.draw ? 'No data' : res.chess_rapid.record.draw,
        ];
    const percentRapid = percentCalc(rapid);
    
    const blitz = !res.chess_blitz
      ? ['No data', 'No data', 'No data', 'No data', 'No data']
      : [
          !res.chess_blitz.best        ? 'No data' : res.chess_blitz.best.rating,
          !res.chess_blitz.last.rating ? 'No data' : res.chess_blitz.last.rating,
          !res.chess_blitz.record.win  ? 'No data' : res.chess_blitz.record.win,
          !res.chess_blitz.record.loss ? 'No data' : res.chess_blitz.record.loss,
          !res.chess_blitz.record.draw ? 'No data' : res.chess_blitz.record.draw,
        ];
    const percentBlitz = percentCalc(blitz);

    const bullet = !res.chess_bullet
      ? ['No data', 'No data', 'No data', 'No data', 'No data']
      : [
          !res.chess_bullet.best        ? 'No data' : res.chess_bullet.best.rating,
          !res.chess_bullet.last.rating ? 'No data' : res.chess_bullet.last.rating,
          !res.chess_bullet.record.win  ? 'No data' : res.chess_bullet.record.win,
          !res.chess_bullet.record.loss ? 'No data' : res.chess_bullet.record.loss,
          !res.chess_bullet.record.draw ? 'No data' : res.chess_bullet.record.draw,
        ];
    const percentBullet = percentCalc(bullet);

    const daily = !res.chess_daily
      ? ['No data', 'No data', 'No data', 'No data', 'No data']
      : [
          !res.chess_daily.best        ? 'No data' : res.chess_daily.best.rating,
          !res.chess_daily.last.rating ? 'No data' : res.chess_daily.last.rating,
          !res.chess_daily.record.win  ? 'No data' : res.chess_daily.record.win,
          !res.chess_daily.record.loss ? 'No data' : res.chess_daily.record.loss,
          !res.chess_daily.record.draw ? 'No data' : res.chess_daily.record.draw,
        ];
        const percentDaily = percentCalc(daily);

    // console.log(res, blitz, bullet, daily, rapid);

    const htmlBlitz = `<article class="stat">
  <h2><strong>Blitz Ratings</strong></h2>
  <div class="ratings">
    <p class="best">Best Elo: ${blitz[0]}</p>
    <p class="latest">Live Elo: ${blitz[1]}</p>
    <p class="record"> 
    <p>Wins:     ${blitz[2]}</p>
    <p>Losses:   ${blitz[3]}</p>
    <p>Draws:    ${blitz[4]}</p>
  </div>
    <div id = "graph_blitz" class = "graph">
  </div>
  <style>
  #graph_blitz{
    border: solid rgb(48, 48, 48) 0.25rem;
    margin-top: 2.5rem ;
    height: 2rem;
    width: 40rem;
    border-radius:3rem;
    background : linear-gradient(
      90deg, 
      #80FF00,
      #80FF00 ${percentBlitz[0]}%,
      #FCF75E ${percentBlitz[0]}%,
      #FCF75E ${percentBlitz[0] + percentBlitz[1]}%,
      #FF2400 ${percentBlitz[0] + percentBlitz[1]}%
    );
  };
  </style>
  <div class="legend">
  <div class ="win"></div><p> Wins  ${Math.round(percentBlitz[0])}% </p>
  <div class ="draw"></div><p> Draws ${Math.round(percentBlitz[1])}% </p>
  <div class ="loss"></div><p> Losses ${Math.round(percentBlitz[2])}% </p>
    </div>
  </article>`;
    const htmlBullet = `<article class="stat">
  <h2><strong>Bullet Ratings</strong></h2>
  <div class="ratings">
    <p class="best">Best Elo: ${bullet[0]}</p>
    <p class="latest">Live Elo: ${bullet[1]}</p>
    <p class="record"> 
    <p>Wins:     ${bullet[2]}</p>
    <p>Losses:   ${bullet[3]}</p>
    <p>Draws:    ${bullet[4]}</p>
    </div>
    <div id = "graph_bullet" class = "graph">
  </div><style>
  #graph_bullet{
    border: solid rgb(48, 48, 48) 0.25rem;
    margin-top: 2.5rem ;
    height: 2rem;
    width: 40rem;
    border-radius:3rem;
    background : linear-gradient(
      90deg, 
      #80FF00,
      #80FF00 ${percentBullet[0]}%,
      #FCF75E ${percentBullet[0]}%,
      #FCF75E ${percentBullet[0] + percentBullet[1]}%,
      #FF2400 ${percentBullet[0] + percentBullet[1]}%
    );
  };
  </style>
  <div class="legend">
  <div class ="win"></div><p> Wins  ${Math.round(percentBullet[0])}% </p>
  <div class ="draw"></div><p> Draws ${Math.round(percentBullet[1])}% </p>
  <div class ="loss"></div><p> Losses ${Math.round(percentBullet[2])}% </p>
    </div>
  </article>`;
    const htmlDaily = `<article class="stat">
  <h2><strong>Daily Ratings</strong></h2>
  <div class="ratings">
    <p class="best">Best Elo: ${daily[0]}</p>
    <p class="latest">Live Elo: ${daily[1]}</p>
    <p class="record"> 
    <p>Wins:     ${daily[2]}</p>
    <p>Losses:   ${daily[3]}</p>
    <p>Draws:    ${daily[4]}</p>
    </div>
    <div id = "graph_daily"  class = "graph">
  </div>
  <style>
  #graph_daily{
    border: solid rgb(48, 48, 48) 0.25rem;
    margin-top: 2.5rem ;
    height: 2rem;
    width: 40rem;
    border-radius:3rem;
    background : linear-gradient(
      90deg, 
      #80FF00,
      #80FF00 ${percentDaily[0]}%,
      #FCF75E ${percentDaily[0]}%,
      #FCF75E ${percentDaily[0] + percentDaily[1]}%,
      #FF2400 ${percentDaily[0] + percentDaily[1]}%
    );
  };
  </style>
  <div class="legend">
  <div class ="win"></div><p> Wins  ${Math.round(percentDaily[0])}% </p>
  <div class ="draw"></div><p> Draws ${Math.round(percentDaily[1])}% </p>
  <div class ="loss"></div><p> Losses ${Math.round(percentDaily[2])}% </p>
    </div>
  </article>`;
    const htmlRapid = `<article class="stat">
  <h2><strong>Rapid Ratings</strong></h2>
  <div class="ratings">
    <p class="best">Best Elo: ${rapid[0]}</p>
    <p class="latest">Live Elo: ${rapid[1]}</p>
    <p class="record"> 
    <p>Wins:     ${rapid[2]}</p>
    <p>Losses:   ${rapid[3]}</p>
    <p>Draws:    ${rapid[4]}</p>
  </div>
  <div id = "graph_rapid" class = "graph">
  </div>
  <style>
  #graph_rapid{
    border: solid rgb(48, 48, 48) 0.25rem;
    margin-top: 2.5rem ;
    height: 2rem;
    width: 40rem;
    border-radius:3rem;
    background : linear-gradient(
      90deg, 
      #80FF00,
      #80FF00 ${percentRapid[0]}%,
      #FCF75E ${percentRapid[0]}%,
      #FCF75E ${percentRapid[0] + percentRapid[1]}%,
      #FF2400 ${percentRapid[0] + percentRapid[1]}%
    );
  };
  </style>
  <div class="legend">
  <div class ="win"></div><p> Wins  ${Math.round(percentRapid[0])}% </p>
  <div class ="draw"></div><p> Draws ${Math.round(percentRapid[1])}% </p>
  <div class ="loss"></div><p> Losses ${Math.round(percentRapid[2])}% </p>
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
    const chart = new CanvasJS.Chart('chartContainer', {
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

textbox.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 ) {
    if (textbox.value === '') {
      alert(`Please enter a chess.com username!`);
      return;
    }
    renderStats(textbox.value);
    renderProfile(textbox.value);
  }
});

/*
const data = [1, 1, 2, 3, 5, 8, 13, 21];
const pie = d3.pie();
const arcs = pie(data);

console.log(`pie: ${pie},\narcs: ${arcs}`)

const svg = d3.create("svg")

svg.append("g")
    .selectAll()
    .data(arcs)
console.log (svg)
// return svg.node();

*/

/*
// const input = document.getElementById('userid');
const renderPieChart = function (data) {
  const width = 250,
      height = 250,
      margin = 40
  
  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin
  
  // append the svg object to the div called 'my_dataviz'
  const svg = d3.select(d3constainer)
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  // Create dummy data
  // const data = {Wins: 1460, losses: 1349, draws:99}
  
  // set the color scale
  const color = d3.scaleOrdinal()
    .range(["green", "red", "gray"])
  
  // Compute the position of each group on the pie:
  const pie = d3.pie()
    .value(function(d) {return d[1]; })
  const data_ready = pie(Object.entries(data))
  
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data[1]))})
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
  }
  */
//  renderStats('hikaru')
