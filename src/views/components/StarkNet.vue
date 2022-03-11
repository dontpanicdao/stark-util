<template>
  <div class="text-center">
    <div
      v-if="is_testnet"
      class="btn btn-light btn-lg"
      @click="is_testnet = false"
    >
      testnet
    </div>
    <div v-else class="btn btn-success btn-lg" @click="is_testnet = true">
      mainnet
    </div>
    <ul class="list-group my-3">
      <li class="list-group-item">
        <span class="float-left">Tx Status:</span>
        <div
          v-if="txStatus"
          class="btn btn-sm"
          :class="[txSuccess ? 'btn-outline-success' : 'btn-outline-danger']"
        >
          {{ txStatus }}
        </div>
      </li>
      <li class="list-group-item d-flex" style="align-items: center">
        <input
          id="txHash"
          v-model="txHash"
          type="text"
          class="form-control formy text-center shadow"
          placeholder="tx hash"
        />
        <button
          class="ml-3 btn btn-sm btn-success"
          style="height: 2rem"
          @click="checkTx"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </li>
    </ul>
    <div class="text-center">
      <ul class="list-group my-3">
        <li class="list-group-item d-flex">
          <input
            v-model="contractAddr"
            type="text"
            class="form-control formy my-3 mr-2 text-center shadow"
            placeholder="contract address"
          />
          <input
            v-model="entryPoint"
            type="text"
            class="form-control formy my-3 ml-2 text-center shadow"
            placeholder="entryPoint"
          />
        </li>
        <li class="list-group-item d-flex" style="align-items: center">
          <input
            v-model="inputs"
            type="text"
            class="form-control formy my-3 ml-2 text-center shadow"
            placeholder="comma separated inputs"
          />
          <button
            class="ml-3 btn btn-sm btn-success"
            style="height: 2rem"
            @click="callContract"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </li>
        <li class="list-group-item">
          <span class="float-left">Output:</span>
          <div
            class="btn btn-sm btn-outline-success"
            v-for="(res, i) in outputs"
            :key="i"
          >
            {{ res }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// import utils from "@/utils";

export default {
  data() {
    return {
      txHash: "",
      is_testnet: true,
      is_mainnet: false,
      entryPoint: "",
      inputs: "",
      contractAddr: "",
    };
  },
  computed: {
    ...mapGetters("stark", ["txSuccess", "txStatus", "outputs"]),
  },
  methods: {
    checkTx() {
      this.$store.dispatch("stark/checkTx", {
        txHash: this.txHash,
        is_testnet: this.is_testnet,
      });
    },
    callContract() {
      this.$store.dispatch("stark/callContract", {
        contract: this.contractAddr,
        entry: this.entryPoint,
        inputs: this.inputs,
        is_testnet: this.is_testnet,
      });
    },
    async copy(text) {
      await navigator.clipboard.writeText(text);
    },
  },
};
</script>
<style></style>
