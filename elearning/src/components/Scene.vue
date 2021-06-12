<template>
<div v-if="root">
  <div v-for="(data, index) of root.data" :key="index">
    <v-tabs vertical v-model="tab">
      <v-tab-item
          v-for="lev2 of structure.lev1.find(i => i.ref === lev1).lev2"
          :key="lev2.ref"
      >
        <v-carousel
          show-arrows
          :continuous="false"
        >
          <v-carousel-item
              v-for="content of data.content.filter(c => lev2.lev3.some(i => i.ref === c.ref))"
              :key="content.ref"
          >
            <Content :content="content" :lev1="lev1" :lev2="lev2" :structure="structure"></Content>
          </v-carousel-item>
        </v-carousel>
      </v-tab-item>
      <v-tab
          v-for="lev2 of structure.lev1.find(i => i.ref === lev1).lev2"
          :key="lev2.ref"
      >
        {{lev2.label[0]}}
      </v-tab>
    </v-tabs>
  </div>
</div>
</template>

<script>
import api from "@/api";
import Content from "@/components/Content";

export default {
  name: "Scene",
  components: {Content},
  props: ["lev1", "structure"],
  
  data: () => ({
    root: null,
    tab: 0
  }),
  
  async beforeMount() {
    this.root = await api.fetchSceneData(this.lev1)
  },
}
</script>

<style scoped>

</style>