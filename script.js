const resultsBody = document.getElementById("results");
const checkButton = document.getElementById("check-button");
const showDetailsButton = document.getElementById("show-details-button");
const hideDetailsButton = document.getElementById("hide-details-button");

checkButton.addEventListener("click", function () {
  const minInputValue = document.getElementById("min-number-input").value;
  const maxInputValue = document.getElementById("max-number-input").value;
  const intMin = parseInt(minInputValue);
  const intMax = parseInt(maxInputValue);
  const overAllStartTime = performance.now();
  getPrimesInRange(intMin, intMax);
  const overAllEndTime = performance.now();
  const overAllTime = overAllEndTime - overAllStartTime;
  var elem = document.createElement("input");
  elem.type = "text";
  elem.id = "overAllTime";
  document.body.appendChild(elem);
  elem.value = `Time:${overAllTime}ms`;
});

function getPrimesInRange(min, max) {
  const sieve = Array(max + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  let startTime = 0;
  let endTime = 0;
  let timeTaken = 0;
  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (sieve[i]) {
      startTime = performance.now();
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
      endTime = performance.now();
      timeTaken = endTime - startTime;
    }
  }

  const primes = [];
  const times = [];
  for (let i = min; i <= max; i++) {
    if (sieve[i]) {
      primes.push(i);
      times.push(timeTaken);
    }
  }

  const firstHalfPrimes = primes.slice(0, primes.length / 2);
  const secondHalfPrimes = primes.slice(primes.length / 2);
  const firstHalfTimes = times.slice(0, times.length / 2);
  const secondHalfTimes = times.slice(times.length / 2);

  for (let i = min; i <= max; i++) {
    const result = primes.indexOf(i);
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    const primeCell = document.createElement("td");
    const timeCell = document.createElement("td");

    numberCell.textContent = i;
    primeCell.textContent = result != -1 ? "Prime" : "Normal";

    if (i <= max / 2) {
      timeCell.textContent = times[result] ? times[result] : 0;
      resultsBody.appendChild(row);
    } else {
      const detailedTable = document.getElementById("detailed-results-1");
      timeCell.textContent = secondHalfTimes[result]
        ? secondHalfTimes[result]
        : 0;
      detailedTable.appendChild(row);
    }

    row.appendChild(numberCell);
    row.appendChild(primeCell);
    row.appendChild(timeCell);
  }
  document.getElementById("show-details-button").style.display = "block";
}
showDetailsButton.addEventListener("click", function () {
  document.getElementById("show-details-button").style.display = "none";
  document.getElementById("detailed-results-1").style.display = "block";
  document.getElementById("detailed-results-2").style.display = "block";
  document.getElementById("hide-details-button").style.display = "block";
});

hideDetailsButton.addEventListener("click", function () {
  document.getElementById("show-details-button").style.display = "block";
  document.getElementById("detailed-results-1").style.display = "none";
  document.getElementById("detailed-results-2").style.display = "none";
  document.getElementById("hide-details-button").style.display = "none";
});
