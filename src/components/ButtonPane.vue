<template>
  <div class="main-content">
    <button @click="onClick"><span>Set random value</span></button>
    <div ref="label"></div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class ButtonPane extends Vue {

  @Emit()
  public click() {
  }

  public onClick() {
    this.click();
  }
  
  valueChanged(id: string, newval: number, oldval: number): void {
    (this.$refs.label as HTMLDivElement).textContent = `${id} : ${oldval}=>${newval}`;
  }
}

</script>

<style scoped>
.main-content {
  padding: 10px;
}
</style>
