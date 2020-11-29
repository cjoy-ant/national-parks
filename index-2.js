const apiKey = 'Tka5KCykDbZGTDv7GDzOxpyu0PSKHiG87VVUTpte';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';
const states = [
//  {number: 0, name: 'Choose a State', code: ""},
  {number: 1, name: 'Alabama', code: 'AL'},
  {number: 2, name: 'Alaska', code: 'AK'},
  {number: 3, name: 'Arizona', code: 'AZ'},
  {number: 4, name: 'Arkansas', code: 'AR'},
  {number: 5, name: 'California', code: 'CA'},
  {number: 6, name: 'Colorado', code: 'CO'},
  {number: 7, name: 'Connecticut', code: 'CT'},
  {number: 8, name: 'Delaware', code: 'DE'},
  {number: 9, name: 'Florida', code: 'FL'},
  {number: 10, name: 'Georgia', code: 'GA'},
  {number: 11, name: 'Hawaii', code: 'HI'},
  {number: 12, name: 'Idaho', code: 'ID'},
  {number: 13, name: 'Illinois', code: 'IL'},
  {number: 14, name: 'Indiana', code: 'IN'},
  {number: 15, name: 'Iowa', code: 'IA'},
  {number: 16, name: 'Kansas', code: 'KS'},
  {number: 17, name: 'Kentucky', code: 'KY'},
  {number: 18, name: 'Louisiana', code: 'LA'},
  {number: 19, name: 'Maine', code: 'ME'},
  {number: 20, name: 'Maryland', code: 'MD'},
  {number: 21, name: 'Massachusetts', code: 'MA'},
  {number: 22, name: 'Michigan', code: 'MI'},
  {number: 23, name: 'Minnesota', code: 'MN'},
  {number: 24, name: 'Mississippi', code: 'MS'},
  {number: 25, name: 'Missouri', code: 'MO'},
  {number: 26, name: 'Montana', code: 'MT'},
  {number: 27, name: 'Nebraska', code: 'NE'},
  {number: 28, name: 'Nevada', code: 'NV'},
  {number: 29, name: 'New Hampshire', code: 'NH'},
  {number: 30, name: 'New Jersey', code: 'NJ'},
  {number: 31, name: 'New Mexico', code: 'NM'},
  {number: 32, name: 'New York', code: 'NY'},
  {number: 33, name: 'North Carolina', code:'NC'},
  {number: 34, name: 'Nork Dakota', code: 'ND'},
  {number: 35, name: 'Ohio', code: 'OH'},
  {number: 36, name: 'Oklahoma', code:'OK'},
  {number: 37, name: 'Oregon', code: 'OR'},
  {number: 38, name: 'Pennsylvania', code: 'PA'},
  {number: 39, name: 'Rhode Island', code: 'RI'},
  {number: 40, name: 'South Carolina', code: 'SC'},
  {number: 41, name: 'South Dakota', code: 'SD'},
  {number: 42, name: 'Tenneseee', code: 'TN'},
  {number: 43, name: 'Texas', code: 'TX'},
  {number: 44, name: 'Utah', code: 'UT'},
  {number: 45, name: 'Vermont', code: 'VT'},
  {number: 46, name: 'Virginia', code: 'VA'},
  {number: 47, name: 'Washington', code: 'WA'},
  {number: 48, name: 'West Virgina', code: 'WV'},
  {number: 49, name: 'Wisconsin', code: 'WI'},
  {number: 50, name: 'Wyoming', code: 'WY'}
];
const search = {quantity: 1};
//const statesToSearch = [];

function createDropDownList(states) {
  for (let i=0; i < states.length; i++) {
    $('#js-search-term-1').append(`
    <option id="${states[i].number}" value="${states[i].code}">${states[i].name}</option>
    `);
  }
}

//function multipleStateParams() {
//  let value = $(`#js-search-term-${states.quantity} option:selected`).val()
//  for (let i=0; i < index; i++) {
//    statesToSearch.push({stateCode:`${value}`});
//  }
//}

function formatQueryParams(params) {
   const queryItems = Object.keys(params).map(key=> 
     `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
   return queryItems.join('&');
}

function getNationalParks(state, maxResults) {
  const params = {
    api_key: apiKey,
    limit: maxResults,
    stateCode: state,
  }

  const queryString = formatQueryParams(params);
  const url = searchURL + '&' + queryString;

  console.log(url);
  console.log('Searching for national parks')
  fetch (url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`)
  });
}

// inputs results to #results-list and displays to the DOM
// full name, description, website URL, address
function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">Visit their website</a></p>
      <p>Address:
      <br>
      ${responseJson.data[i].addresses[0].line1}
      <br>
      ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} 
      ${responseJson.data[i].addresses[0].postalCode}</p>
      </li>`
    );
  }
  $('#results').removeClass('hidden');
}

// listens for when user clicks #add-state-btn and inputs html to #search-list
function handleAddState() {
  $('#add-state-btn').click(event => {
    console.log('Adding a State');
    event.preventDefault();
    search.quantity++;
    $('#js-search-list').append(
      `<li><select class="search" id="js-search-term-${search.quantity}" required></select></li>`
    );
    for (let i=0; i < states.length; i++) {
      $(`#js-search-term-${search.quantity}`).append(`
      <option id="${states[i].number}" value="${states[i].code}">${states[i].name}</option>
      `);
    }
  });
}

// listens for when user clicks #clear-filters-btn and clears the DOM
function handleClearFilters() {
  $('#clear-filters-btn').click(event => {
    console.log('Clearing filters')
    event.preventDefault();
    search.quantity = 1;
    $('#results-list').empty();
    $('#js-search-list').empty();
    $('#js-search-list').append(`<li><select class="search" id="js-search-term-1" required></select><li>`)
    createDropDownList(states);
  })
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#js-error-message').empty();
    $('#results-list').empty();
    const state = $('#js-search-term-1 option:selected').val();
    const maxResults = $('#js-max-results').val();
    // HOW TO CATCH IF THEY DID NOT CHOOSE A STATE
    if (state === "0") {
      $('#js-error-message').text(`Please choose a State.`);
    } else {
      getNationalParks(state, maxResults);
    getNationalParks(state, maxResults);
    }
  });
}

function runApp() {
  createDropDownList(states);
  handleAddState();
  watchForm();
  handleClearFilters();
}

$(runApp)