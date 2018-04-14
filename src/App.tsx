// React
import * as React from 'react';
// Vendor
import { compose, withProps, ComponentEnhancer } from 'recompose';
import HL from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/prism';
// Components
import { Heatmap, HeatmapData } from './components';
// Utils
import { heatmapDataMapper, HeatmapConfig } from './components/utils';
// Assets
import './App.css';
import * as RawData from './mock-data/pristine-sample-data';
import * as ModData from './mock-data/mod-sample-data';

export interface AppProps {
    heatmapData: HeatmapData;
    otherHeatmapData: HeatmapData;
}

const overrideConfig: HeatmapConfig = {
    path: 'default',
    dayKey: 'index.dayOfWeek',
    hourKey: 'index.hour',
    dataKey: 'data',
    valueKey: 'value',
    labelKey: 'timestamp'
};

export const enhance: ComponentEnhancer<{}, React.SFC<AppProps>> = compose(
    withProps({
        heatmapData: heatmapDataMapper(RawData),
        otherHeatmapData: heatmapDataMapper(ModData, overrideConfig)
    })
);

const heatmapSchema = `[
  {
    "0": {
      "value": 10,
      "label": "Sun 12am"
    },
    "10": {
      "value": 110,
      "label": "Sun 10am"
    },
    "11": {
      "value": 410,
      "label": "Sun 11am"
    }
  }
]`;

const heatmapOverride = `
{
    path: 'default', // The root of the data array
    dayKey: 'index.dayOfWeek', // Key within (^) array for the 'day' property
    hourKey: 'index.hour', // Key within (^) array for the 'hour' property 
    dataKey: 'data', // Key within (^) array for the data
    valueKey: 'value', // Key within (^) data for the 'value'
    labelKey: 'timestamp' // Key within (^) data for the 'label'
}
`;

const App: React.SFC<AppProps> = ({
    heatmapData,
    otherHeatmapData
}) => (
    <div className="app">
        <header className="app-header">
            <h1 className="app-headline">Heatmap Demo</h1>
        </header>
        <div className="app-content">
            <div className="mw9 center ph3-ns">
                <div className="cf ph2-ns">
                    <div className="fl w-100 w-50-ns pa2">
                        <h3>Pristine Demo</h3>
                        <Heatmap
                            data={heatmapData}
                        />
                        <br/><br/>
                        <div>
                            <h3>Schema:</h3>
                            <HL
                                style={darcula}
                                language="json"
                                showLineNumbers={true}
                                wrapLines={true}
                            >
                                {heatmapSchema}
                            </HL>
                        </div>
                    </div>
                    <div className="fl w-100 w-50-ns pa2">
                        <h3>Config Override Demo</h3>
                        <Heatmap
                            data={otherHeatmapData}
                        />
                        <br/><br/>
                        <div>
                            <h3>Override Config:</h3>
                            <HL
                                style={darcula}
                                language="javascript"
                                showLineNumbers={true}
                                wrapLines={true}
                            >
                                {heatmapOverride}
                            </HL>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default enhance(App);
