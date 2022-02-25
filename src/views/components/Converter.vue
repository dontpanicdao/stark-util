<template>
  <div>
    <input
      v-model="input"
      type="text"
      class="form-control formy my-5 text-center shadow"
      placeholder="input..."
    />
    <div>
      <ul class="list-group mb-4">
        <li class="list-group-item">
          felt:
          <div
            v-if="outBNComp.val"
            :class="[
              outBNComp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outBNComp.val)"
          >
            {{ outBNComp.val }}
          </div>
        </li>
        <li class="list-group-item">
          hex:
          <div
            v-if="outHexComp.val"
            :class="[
              outHexComp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outHexComp.val)"
          >
            {{ outHexComp.val }}
          </div>
        </li>

        <li class="list-group-item">
          selector:
          <div
            v-if="outSelectorComp.val.hexy"
            :class="[
              outSelectorComp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outSelectorComp.hexy)"
          >
            {{ outSelectorComp.val.hexy }}
          </div>
          <div
            v-if="outSelectorComp.val.inty"
            :class="[
              outSelectorComp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outSelectorComp.val.inty)"
          >
            {{ outSelectorComp.val.inty }}
          </div>
        </li>
        <li class="list-group-item">
          uint256<small>(low high)</small>: <br />
          <div
            v-if="out256Comp.val.low"
            :class="[
              out256Comp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(out256Comp.val.low)"
          >
            {{ out256Comp.val.low }}
          </div>
          <div
            v-if="out256Comp.val.high"
            :class="[
              out256Comp.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(out256Comp.val.high)"
          >
            {{ out256Comp.val.high }}
          </div>
        </li>
        <li class="list-group-item">
          Big3<small>(d0 d1 d2)</small>: <br />
          <div
            v-if="outBig3.val.D0"
            :class="[
              outBig3.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outBig3.val.D0)"
          >
            {{ outBig3.val.D0 }}
          </div>
          <div
            v-if="outBig3.val.D1"
            :class="[
              outBig3.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outBig3.val.D1)"
          >
            {{ outBig3.val.D1 }}
          </div>
          <div
            v-if="outBig3.val.D2"
            :class="[
              outBig3.valid
                ? 'btn btn-outline-success'
                : 'btn btn-outline-danger',
            ]"
            @click="copy(outBig3.val.D2)"
          >
            {{ outBig3.val.D2 }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import utils from "@/utils";
import BN from "bn.js";

export default {
  data() {
    return {
      input: "",
      MAX_VAL: new BN(
        "3618502788666131106986593281521497120414687020801267626233049500247285301248",
        10
      ),
      MAX_VAL_HIGH: new BN("340282366920938463463374607431768211456", 10),
      MAX_VAL_D2: new BN("79228162514264337593543950336", 10),
    };
  },
  computed: {
    outHexComp() {
      const val = utils.toHex(this.input);
      let data = { val: val, valid: true };
      const test = new BN(utils.toBN(val));
      if (test.gte(this.MAX_VAL)) {
        data.valid = false;
      }
      return data;
    },
    outBNComp() {
      const val = utils.toBN(this.input).toString(10);
      let data = { val: val, valid: true };
      const test = new BN(val);
      if (test.gte(this.MAX_VAL)) {
        data.valid = false;
      }
      return data;
    },
    outSelectorComp() {
      const val = utils.toSelector(this.input);
      let data = { val: val, valid: true };
      const test = new BN(utils.toBN(val.inty));
      if (test.gte(this.MAX_VAL)) {
        data.valid = false;
      }
      return data;
    },
    out256Comp() {
      const val = utils.to256(this.input);
      let data = { val: val, valid: true };
      const test = new BN(utils.toBN(val.high));
      if (test.gte(this.MAX_VAL_HIGH)) {
        data.valid = false;
      }
      return data;
    },
    outBig3() {
      const val = utils.toBig3(this.input);
      let data = { val: val, valid: true };
      const test = new BN(utils.toBN(val.D2));
      if (test.gte(this.MAX_VAL_D2)) {
        data.valid = false;
      }
      return data;
    },
  },
  methods: {
    async copy(text) {
      await navigator.clipboard.writeText(text);
    },
  },
};
</script>
<style>
.list-group-item {
  float: left;
  overflow: scroll;
  font-size: 0.8rem;
}
.list-group-item .btn {
  font-size: 0.8rem;
}
</style>
