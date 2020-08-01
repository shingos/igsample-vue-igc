import Vue from 'vue'
import App from './App.vue'

import { defineCustomElements } from 'igniteui-dockmanager/loader';
defineCustomElements();

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import {
  IgcDataChartCoreModule, IgcDataChartCategoryModule, IgcDataChartInteractivityModule,
  IgcNumericXAxisModule, IgcNumericYAxisModule, IgcCategoryXAxisModule, IgcCategoryYAxisModule,
  IgcBarSeriesModule, IgcLineSeriesModule
} from 'igniteui-webcomponents-charts';

ModuleManager.register(
  IgcDataGridModule,
  IgcDataChartCoreModule,IgcDataChartCategoryModule, IgcDataChartInteractivityModule,
  IgcNumericXAxisModule, IgcNumericYAxisModule, IgcCategoryXAxisModule, IgcCategoryYAxisModule,
  IgcBarSeriesModule, IgcLineSeriesModule
);

Vue.config.ignoredElements = [
  'igc-dockmanager',
  'igc-data-grid',
  'igc-data-chart',
  'igc-numeric-x-axis', 'igc-numeric-y-axis', 'igc-category-x-axis', 'igc-category-y-axis',
  'igc-bar-series', 'igc-line-series'
];

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
