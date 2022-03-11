<template>
  <div>
    <div class="main-content">
      <div
        class="header d-flex pt-4 pt-md-8 min-vh-100 bg-cover"
        rel="preload"
        style="
          display: none;
          background-image: url('/img/theme/elements-cover.svg');
          background-size: cover;
          background-position: center top;
        "
      >
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-7">
              <div class="card bg-secondary shadow border-0">
                <div class="card-header text-center">
                  <h2>Stark Util &nbsp;&nbsp;<i class="fas fa-random"></i></h2>
                </div>
                <div class="card-body px-lg-5">
                  <Converter v-if="utilPane == 1" />
                  <StarkNet v-if="utilPane == 2" />
                  <EC v-if="utilPane == 3" />
                </div>
                <div class="card-footer footy">
                  <div
                    v-if="utilPane !== 1"
                    class="btn btn-sm btn-success float-left"
                    @click="moveLeft"
                  >
                    <i class="fas fa-angle-left"></i>
                  </div>
                  <div
                    v-if="utilPane !== 3"
                    class="btn btn-sm btn-success float-right"
                    @click="moveRight"
                  >
                    <i class="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Converter from "@/views/components/Converter.vue";
import StarkNet from "@/views/components/StarkNet.vue";
import EC from "@/views/components/EC.vue";

export default {
  components: {
    Converter,
    StarkNet,
    EC,
  },
  computed: {
    ...mapGetters("util", ["utilPane"]),
  },
  methods: {
    moveRight() {
      const old = this.$store.getters["util/utilPane"];
      this.$store.commit("util/setUtilPane", old + 1);
    },
    moveLeft() {
      const old = this.$store.getters["util/utilPane"];
      this.$store.commit("util/setUtilPane", old - 1);
    },
  },
};
</script>
<style src="@vueform/toggle/themes/default.css"></style>
