<template>
  <div>
    <h1>Events Listing</h1>
    <event-card v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import eventService from '@/services/eventService.js'

export default {
  name:'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    eventService.getEvents()
      .then((response) => {
        this.events= response.data;
      }).catch((error) => {
        console.log('There was an error: ' + error.response);
      });
  },
};
</script>

<style>

</style>