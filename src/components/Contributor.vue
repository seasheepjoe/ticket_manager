<template>
  <div id="contributor">
    <span @click="removeContributor" id="close">&times;</span>
    {{ fullname }}
  </div>
</template>

<script>
import api from "@/config/ApiConfig";

export default {
  name: "Contributor",
  props: {
    fullname: String,
    contributorId: Number,
    ticketId: Number,
    onContributorRemoved: Function
  },
  methods: {
    removeContributor() {
      const contributorId = this.contributorId;
      const ticketId = this.ticketId;
      const that = this;
      api
        .post("http://api.ticketmanager.com/tickets/contributors/remove", {
          ticket_id: ticketId,
          contributor_id: contributorId
        })
        .then(response => {
          const { data } = response;
          switch (data.status) {
            case "success":
              that.onContributorRemoved(contributorId);
              break;
            case "error":
              that.$data.error = true;
              that.$data.error_message = that.$i18n.t(data.message);
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#contributor {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid black;
  width: fit-content;
  font-size: 15px;
}

#close {
  font-size: 20px;
  cursor: pointer;
}
</style>
