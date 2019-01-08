<template>
  <div id="contributor">
    <span @click="removeContributor" id="close">&times;</span>
    {{ fullname }}
  </div>
</template>

<script>
import api from '@/config/ApiConfig';

export default {
  name: 'Contributor',
  props: {
    fullname: String,
    contributorId: Number,
    ticketId: Number,
  },
  methods: {
    removeContributor() {
      const contributorId = this.ticketId;
      const ticketId = this.contributorId;
      api
        .post('http://api.ticketmanager.com/tickets/contributors/remove', {
          ticketId,
          contributorId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#contributor {
  margin: 5px 0;
  padding: 10px;
  border: 1px solid black;
  width: fit-content;
  font-size: 15px;
}

#close {
  font-size: 20px;
  cursor: pointer;
}
</style>
