const toggleButton = document.querySelector(".toggle-button");
const body = document.querySelector("body");
const timerElement = document.querySelector(".timer");
const showContainer = document.querySelector(".showContainer");
const loadingCircle = document.querySelector(".loading-circle");
toggleButton.addEventListener("click", () => {
  if (toggleButton.classList.contains("toggle-right")) {
    toggleButton.classList.remove("toggle-right");
    body.classList.remove("dark-mode");
  } else {
    toggleButton.classList.add("toggle-right");
    body.classList.add("dark-mode");
  }
});

function startTimer() {
  let time = 60;

  const interval = setInterval(() => {
    if (time > 0) {
      timerElement.textContent = time;
      time--;
    } else {
      clearInterval(interval);
      fetchData();
      startTimer();
    }
  }, 1000);
}

startTimer();

// Fetch data and display in show container and box
fetchData();

async function fetchData() {
  try {
      showLoading();
    const response = await fetch("http://localhost:5001/api/v1/get");
    const data = await response.json();
    const tickers = data.tickers;

    // Clear previous data
    showContainer.innerHTML = "";

    tickers.forEach((ticker, index) => {
      const tickerItem = document.createElement("div");
      tickerItem.classList.add("tickerItem");

      const number = document.createElement("span");
      number.textContent = index + 1;
      number.classList.add("tableValue");
      tickerItem.appendChild(number);

      const platform = document.createElement("span");
      platform.textContent = ticker.name;
      platform.classList.add("tableValue");
      tickerItem.appendChild(platform);

      const lastTradedPrice = document.createElement("span");
      lastTradedPrice.textContent = ticker.last;
      lastTradedPrice.classList.add("tableValue");
      tickerItem.appendChild(lastTradedPrice);

      const buySellPrice = document.createElement("span");
      buySellPrice.textContent = `${ticker.buy} / ${ticker.sell}`;
      buySellPrice.classList.add("tableValue");
      tickerItem.appendChild(buySellPrice);

      const difference = document.createElement("span");
      difference.textContent = ticker.volume;
      difference.classList.add("tableValue");
      tickerItem.appendChild(difference);

      const savings = document.createElement("span");
      savings.textContent = ticker.baseUnit;
      savings.classList.add("tableValue");
      tickerItem.appendChild(savings);

      showContainer.appendChild(tickerItem);
    });

    hideLoading();
  } catch (error) {
    console.error(error);
    
    hideLoading();
  }
}

function showLoading() {
  loadingCircle.style.display = "block";
}

function hideLoading() {
  loadingCircle.style.display = "none";
}
