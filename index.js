const apiKey = 'Tka5KCykDbZGTDv7GDzOxpyu0PSKHiG87VVUTpte';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';
const states = [
  {number: 0, name: 'Choose a State', code: 0},
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
  {number: 50, name: 'Wyoming', code: 'WY'},
];

function createDropDownList(states) {
  for (let i=0; i < states.length; i++) {
    $('select.search').append(`
    <option id="${states[i].number}" value="${states[i].code}">${states[i].name}</option>
    `);
  }
}

//function getSelectedState() {
//  let selectedState = $('#js-search-term option:selected').val();
//  return selectedState;
//}

//function getMaxResults() {
//  let maxResults = $('#js-max-results').val();
//  return maxResults;
//}

function formatQueryParams(params) {
   const queryItems = Object.keys(params).map(key=> 
     `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
   return queryItems.join('&');
}

function getNationalParks(state, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: maxResults
  }
  const queryString = formatQueryParams(params);
  const url = searchURL + '&' + queryString;

//  if (getSelectedState() === "0") {
//    $('#js-error-message').text(`Please choose a State.`);
//  } else {

//  fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${apiKey}&stateCode=${getSelectedState()}&limit=${getMaxResults()}`)
  console.log(url);

  fetch (url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`)
  });
}

//function formatAddress(responseJson) {
//  let parkAddress = "";
//  for (let i=0; i < responseJson.data.length; i++) {
//    parkAddress += 
//    `<h3>Address:</h3>
//    <p>${responseJson.data[i].addresses[0].line1}</p>
//    <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
//    `
//  }
//  return parkAddress;
//}

// bonus: add park's address to results
// insert html for address into #results-list
// <p>Address: ${responseJson}</p>

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

//function addState() {
//  $('#multiple-states-search').append(
//    `<li>
//      
//    </li>`
//  );
//}

// listens for when user adds state
//function handleAddState() {
//  $('#add-state-btn').click(event => {
//    event.preventDefault();
//    addState();
//  });
//}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#js-error-message').empty();
    const state = $('#js-search-term option:selected').val();
    const maxResults = $('#js-max-results').val();
    if (state === "0") {
      $('#js-error-message').text(`Please choose a State.`);
    } else {
//    getSelectedState();
//    getMaxResults();
      getNationalParks(state, maxResults);
    }
  });
}

$(createDropDownList(states));
$(watchForm);