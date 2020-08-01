<template>
  <div id="app"> 
    <igc-dockmanager ref="dockManager" style="width: 100vw; height: 100vh;">
      <BarChart slot="content1" class="dockManagerContent" :data-source="dataSource" ref="c_barchart" />
      <div slot="content2" class="dockManagerContent">Content 2</div>
      <Grid slot="content3" class="dockManagerContent" :data-source="dataSource" ref="c_grid" />
      <LineChart slot="content4" class="dockManagerContent" ref="c_linechart" />
      <div slot="content5" class="dockManagerContent">Content 5</div>
      <ButtonPane slot="content6" class="dockManagerContent" @click="onButtonClicked" ref="c_button" />
      <div slot="content7" class="dockManagerContent">Content 7</div>
      <div slot="content8" class="dockManagerContent">Content 8</div>
      <HelloWorld slot="content9" class="dockManagerContent" msg="Welcome to Your Vue.js + TypeScript App" />
    </igc-dockmanager>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { IgcDockManagerPaneType, IgcSplitPaneOrientation, IgcDockManagerComponent, IgcDockManagerLayout } from 'igniteui-dockmanager';

import HelloWorld from './components/HelloWorld.vue';
import Grid from "@/components/Grid.vue";
import ButtonPane from "@/components/ButtonPane.vue";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";

export interface DataItem {
  rowId: string;
  numValue: number;
  strValue: string;
}

@Component({
  components: {
    HelloWorld,
    Grid,
    ButtonPane,
    BarChart,
    LineChart
  },
})
export default class App extends Vue {
  
  public layout: IgcDockManagerLayout;
  public dataSource: Array<DataItem>;

  public static getRandomNumber(min: number, max: number): number {
    return Math.round(min + Math.random() * (max - min));
  }

  constructor() {
    super();

    this.dataSource = [];
    for (let i = 0; i < 10; i++) {
      const val = App.getRandomNumber(0, 1000);
      this.dataSource.push({
        rowId: `#${(i + 1).toString().padStart(3, "0")}`,
        numValue: val,
        strValue: `String-${App.getRandomNumber(1, 10)}`,
      });
    }

    this.layout = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: "content1",
                header: "Content Pane 1"
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: "content2",
                header: "Unpinned Pane 1",
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            size: 200,
            panes: [
              {
                type: IgcDockManagerPaneType.documentHost,
                size: 200,
                rootPane: {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.horizontal,
                  panes: [
                    {
                      type: IgcDockManagerPaneType.tabGroupPane,
                      panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: "Document 1",
                          contentId: "content3"
                        },
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: "Document 2",
                          contentId: "content4"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: "content5",
                header: "Unpinned Pane 2",
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.tabGroupPane,
                size: 200,
                panes: [
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: "content6",
                    header: "Tab 1"
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: "content7",
                    header: "Tab 2"
                  }
                ]
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: "content8",
                header: "Content Pane 2"
              }
            ]
          }
        ]
      },
      floatingPanes: [
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingHeight: 150,
          floatingWidth: 250,
          floatingLocation: { x: 300, y: 200 },
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              contentId: "content9",
              header: "Floating Pane"
            }
          ]
        }
      ]
    } as IgcDockManagerLayout;
  }
  
  public mounted() {
    const dockManager = this.$refs.dockManager as IgcDockManagerComponent;
    dockManager.layout = this.layout;
    
    for (const item of this.dataSource) {
      (this.$refs.c_linechart as LineChart).pushValue(item.numValue);
    }
  }
  
  public onButtonClicked() {
    const i = App.getRandomNumber(0, this.dataSource.length - 1);
    const oldValue = this.dataSource[i].numValue;
    const newValue = App.getRandomNumber(0, 1000);
    this.dataSource[i].numValue = newValue;

    (this.$refs.c_grid as Grid).dataRowChanged(i, this.dataSource[i]);
    (this.$refs.c_barchart as BarChart).dataRowChanged(i, this.dataSource[i]);

    (this.$refs.c_linechart as LineChart).pushValue(newValue);

    (this.$refs.c_button as ButtonPane).valueChanged(this.dataSource[i].rowId, newValue, oldValue);
  }
}
</script>

<style lang="scss">
body {
  margin: 0; padding: 0;
}

#app {
  margin: 0; padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dockManagerContent {
  padding: 0.5rem;
}
</style>
