<template>
  <div class="main-content">
    <igc-data-chart name="chart" width="100%" height="100%" ref="chart" is-horizontal-zoom-enabled="true" is-vertical-zoom-enabled="true">
      <igc-category-x-axis name="xAxis"></igc-category-x-axis>
      <igc-numeric-y-axis name="yAxis" minimum-value="0" maximum-value="1000"></igc-numeric-y-axis>
      <igc-line-series name="series1" x-axis-name="xAxis" y-axis-name="yAxis" value-member-path="val"></igc-line-series>
    </igc-data-chart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IgcDataChartComponent } from 'igniteui-webcomponents-charts';

interface DataItem {
  date: Date;
  val: number;
}

@Component
export default class LineChart extends Vue {

  public dataSource: Array<DataItem>;

  constructor() {
    super();
    this.dataSource = [];
  }

  mounted() {
    const chart = this.$refs.chart as IgcDataChartComponent;
    chart.dataSource = this.dataSource;
  }

  pushValue(value: number): void {
    const chart = this.$refs.chart as IgcDataChartComponent;

    const newItem = {date: new Date(), val: value};
    this.dataSource.push(newItem);
    chart.notifyInsertItem(this.dataSource, this.dataSource.length - 1, newItem);

    if (this.dataSource.length > 10) {
      const oldItem = this.dataSource.shift();
      chart.notifyRemoveItem(this.dataSource, 0, oldItem);
    }
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
