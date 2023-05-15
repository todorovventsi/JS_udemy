// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const printForecast = (temps) =>
    `...${temps.map((t, i) => `${t}ºC in ${i + 1} days`).join("...")}...`;

console.log(printForecast([17, 21, 23]));
