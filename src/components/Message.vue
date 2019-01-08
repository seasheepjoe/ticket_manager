<template>
  <b-list-group-item>
    <b-row id="small">{{ author }}</b-row>
    <b-row id="content">{{ content }}</b-row>
    <b-row id="small">{{ date | format }}</b-row>
  </b-list-group-item>
</template>


<script>
export default {
  name: 'Message',
  props: {
    author: String,
    content: String,
    date: String,
  },
  filters: {
    format(date) {
      const formatted = new Date(date).toLocaleDateString('en-EN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      return formatted;
    },
  },
};
</script>

<style scoped>
#content {
  margin: 10px;
}

#small {
  font-size: 12px;
  color: grey;
  margin: 10px;
}
</style>
