import eventService from '@/services/eventService.js';

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event; 
  },
}

export const actions = {
  createEvent({ commit }, event) {
    return eventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event);
    });
  },
  fetchEvents({ commit }, {perPage, page}) {
    eventService.getEvents(perPage, page).then((response) => {
      commit('SET_EVENTS', response.data)
      commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
      console.log('Total event are' + response.heade)
    }).catch((error) => {
      console.log('There was an error: ' + error.response);
    });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event) ;
    } else {
      eventService.getEvent(id).then((response) => {
        commit('SET_EVENT', response.data) ;
      }).catch((error) => {
        console.log(`There was an error: ${error}`);
      });
    }
  },
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}