<template>
  <div>
    <h1>Events Listing for {{user.user.name}} </h1>
    <event-card v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{name: 'event-list', query: { page: page - 1  } }" rel="prev"> 
        Prev Page
      </router-link> |
    </template>
    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{name: 'event-list', query: { page: page + 1  } }" rel="next"> 
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  name:'EventList',
  components: {
    EventCard
  },
  computed: {
   ...mapState([
     'event',
     'user'
    ]),
   page() {
     return parseInt(this.$route.query.page) || 1
   }
  },
  created () {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page,
    });
  },
};
</script>

<style>

</style>