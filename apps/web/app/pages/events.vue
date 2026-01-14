<script setup lang="ts">
import { gql } from '@apollo/client';
import type { EventModel, Query } from '~/types/graphql';

const { query, loading } = useGraphQL();

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
    }
  }
`;

const events = ref<EventModel | any>();
const error = ref<any>(null);

onMounted(async () => {
  const result = await query<Query>(GET_EVENTS);
  events.value = result.data?.events;
  error.value = result.error;
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="events">
      <div v-for="event in events" :key="event.id">
        {{ event.title }}
      </div>
    </div>
  </div>
</template>
