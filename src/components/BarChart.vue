<template>
  <div class="main-content">
    <igc-data-chart name="chart" width="100%" height="100%" ref="chart">
      <igc-numeric-x-axis name="xAxis" minimum-value="0" maximum-value="1000" label-angle="90"></igc-numeric-x-axis>
      <igc-category-y-axis name="yAxis" label="rowId"></igc-category-y-axis>
      <igc-bar-series name="series1"
        x-axis-name="xAxis"
        y-axis-name="yAxis"
        value-member-path="numValue"
      ></igc-bar-series>
    </igc-data-chart>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

@Component
export default class BarChart extends Vue {

  @Prop()
  public dataSource!: Array<object>;

  mounted() {
    const chart = this.$refs.chart as IgcDataChartComponent;
    chart.dataSource = this.dataSource;
  }

  dataRowChanged(i: number, item: object): void {
    (this.$refs.chart as IgcDataChartComponent).notifySetItem(this.dataSource, i, item, item);
  }
}

</script>

<style scoped>
.main-content {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10;
}
</style>
