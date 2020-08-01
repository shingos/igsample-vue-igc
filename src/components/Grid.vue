<template>
  <div class="main-content">
    <igc-data-grid auto-generate-columns="true" ref="grid"></igc-data-grid>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';

@Component
export default class Grid extends Vue {

  @Prop()
  public dataSource!: Array<object>;

  mounted() {
    const dataGrid = this.$refs.grid as IgcDataGridComponent;
    dataGrid.dataSource = this.dataSource;
  }

  dataRowChanged(i: number, item: object): void {
    (this.$refs.grid as IgcDataGridComponent).notifySetItem(i, item, item);
  }
}
</script>

<style scoped>
.main-content {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>
