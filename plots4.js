var apiKey = "ZrdWEQgw7B-fRyD7kK1A";
// Brainstorming steps for this activity:
// Make an API call- Plotly.d3.json
// Use 'unpack' to select the data you want
// Store the response in console log?
// Clean up data if needed
// code and configure your plot
// var apiKey = api_key;

/* global Plotly */
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

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

//  Use to check data import and data structure in browser console
// That would give you the index structure that is added in the starter file, above
// var promise = d3.json(url);
// promise.then(response => {
//   console.log(response.dataset.data);
// })
// You could dig into parts of the json data by making the console log request
//  more specific: console.log(response.dataset.data) to get arrays of part of the data

function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

/**
 * Fetch data and build the timeseries plot
 */
function buildPlot() {
  // .json returns promise, so can chain with .then
  d3.json(url).then(response => {
    // put data in traces; stores data from index 0 and 1 from json response, using unpack function to select data
    // good practice to print data to console so you can see it
    // different ways to store data using unpack function or indexing or could use .map
    console.log(response);
    var dates = unpack(response.dataset.data, 0);
    var closingPrices = unpack(response.dataset.data, 4);
    var name = response.dataset.name;
    var stock = response.dataset.dataset_code;
    var startDate = response.dataset.start_date;
    var endDate = response.dataset.end_date;


    // another way to get data without using function
    var high = response.dataset.data.map(x => x[2]);
    // get all the data like this
    // var data = response.dataset.data;
  
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

buildPlot();
