// Function to fetch data from the API using async/await
async function fetchData() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

  // Function to render data in the table
  function renderData(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = ''; // Clear existing data
  
    data.forEach(crypto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${crypto.name}</td>
        <td>${crypto.symbol}</td>
        <td>${crypto.current_price}</td>
        <td>${crypto.total_volume}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to handle search functionality
  function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm) ||
      crypto.symbol.toLowerCase().includes(searchTerm)
    );
    renderData(filteredData);
  }
  
  // Function to sort data by market cap or percentage change
  function sortData(sortBy) {
    let sortedData;
    if (sortBy === 'marketCap') {
      sortedData = data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    } else if (sortBy === 'percentageChange') {
      sortedData = data.sort((a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
    }
    renderData(sortedData);
  }
  
  // Fetch data and render on page load
  let data;
  fetchData()
    .then(response => {
      data = response;
      renderData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  