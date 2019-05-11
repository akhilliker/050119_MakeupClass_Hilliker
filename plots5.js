// Brainstorming steps for activity:
// need an event handler for stock name (input from user)
// upon click of button, event handler will call handleInput function
// handleInput function will store stock name and execute buildPlot function
// buildPlot function uses stock name as parameter and makes API call for data associate with stock
// then builds the graph
// need an empty string to store the input value
// then ask for data for that stock only when you make the api call
// the rest is the same as activity 04

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} data
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 */
function unpack(a, index) {
  return a.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
function handleInput() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // #stockInput comes from the html file for the input box for = "stockInput"
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value, so box can be reused for another entry
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
}


// put apiKey and url in function so that the stock name is already stored from input before API call
function buildPlot(stock) {
  var apiKey = "ZrdWEQgw7B-fRyD7kK1A";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  d3.json(url).then(response => {
    console.log(response);
    var dates = unpack(response.dataset.data, 0);
    var closingPrices = unpack(response.dataset.data, 4);
    var name = response.dataset.name;
    var stock = response.dataset.dataset_code;
    var startDate = response.dataset.start_date;
    var endDate = response.dataset.end_date;
    

   // plot data
   var traces = [{
    x: dates,
    y: closingPrices,
    type: "scatter",
    mode: "lines",
    name: name,
    line: {
      color: "#9f14c9"
    }
  }];
  var layout = {
    title: `${stock} Closing Price By date`,
    xaxis: {
      range: [startDate, endDate],
      type: "date"
    },
    yaxis: {
      autorange: true,
      type: "linear"
    }
  };
  Plotly.newPlot("plot", traces, layout);
  // console.log(data);
});
};


// Add event listener for input when submit button is clicked
// then handleInput function is called
d3.select("#submit").on("click", handleInput);