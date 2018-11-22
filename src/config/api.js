export const API_URL = 'https://cbkregio-oost.herokuapp.com';

export const fetchLeagues = async () => {
  return fetch(`${API_URL}/leagues`)
    .then(handleErrors)
    .then(res => res.json());
};

export const getLeagueDetail = async id => {
  return fetch(`${API_URL}/leagues/${id}`)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getPlayers = async id => {
  return fetch(`${API_URL}/leagues/${id}/players`)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getEloRanking = async id => {
  return fetch(`${API_URL}/leagues/${id}/elo-ranking`)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const fetchAddresses = async id => {
  return fetch(`${API_URL}/leagues/${id}/addresses`)
    .then(res => res.json())
    .catch(err => console.log(err));
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
