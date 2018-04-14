![Build](https://travis-ci.org/sharkparty/heatmap.svg?branch=master)

# sharkparty-heatmap

This is a simple react-based heatmap that can be installed as an npm module. It's modestly configurable 

## Installation

```bash
npm i -S sharkparty-heatmap 
```

## Requirements

1. Map the day of week from 1-7 to Sunday-Saturday
    * In my opinion, this should be a zero-based index to conform to Javascript's `day`, but then I read the docs on Java's day and I caved.
    * Javascript (0-6): https://goo.gl/r3WvDo
    * Java (1-7): https://goo.gl/PGLr9D
    * Golang (0-6): https://goo.gl/BGK1Kt
1. Map the hour of day from 0-23 to Midnight-11PM
1. Map the "value" in a relative range (based on the min/max of the data set) into a color in the gradient from (blue, yellow, red)
    * Since this is an evaluation of the data used by the Heatmap, I thought the heatmap should calculate this based on whatever data is passed into it, so there's a function (`src/components/utils/calc-meta.ts` `calcMeta`) which takes in the Heatmap data and runs over it calculate max, min, & range.
1. Render the data as it is supplied, but it should accept a configuration which dictates which values in the "index" field map to which axis. And the name of the property under the "data" object should also be configurable. The widget renderer should not fetch its own data, but rather it should be provided to the renderer.
    * So I default to the schema I was provided with, but it's easy enough to pass in a config to override the mappings. There's an example in the unit test:
    * ```const subject = heatmapDataMapper(mockData, { ...defaultConfig, path: 'result' });```
1. Appear in two different locations on the page, each of them bound to different keys in the "index" object (you will need to copy and modify the supplied data)
    * There's two mock data files and two implementations in `App.tsx`. This entire repo is kind of a module demo for the module `sharkparty-heatmap`, which can be installed as an npm package.
1. The time period and severity controls in the screenshot are not required to be implemented
    * If I have time, I'll implement them into the little app that uses the module installation of this.
1. All data mappings to the widget should be configurable.
    * This is discussed above—I think. (#4)
