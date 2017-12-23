import { select } from 'd3';
import defineStyles from './util/defineStyles';
import clone from './util/clone';
import './util/object-assign';
import defaults from './defaults/index';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';
import IDtimeline from './IDtimeline/index';
import listing from './listing/index';

export default function clinicalTimelines(element = 'body', settings, test = false) {
    //Define unique div within passed element argument.
    const container = select(element)
            .append('div')
            .attr('id', 'clinical-timelines'),
        leftSide = container.append('div').attr('id', 'left-side'),
        rightSide = container.append('div').attr('id', 'right-side');

    //Define .css styles to avoid requiring a separate .css file.
    if (!test) defineStyles();

    const mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = defaults.syncControls(defaults.controls, syncedSettings),
        controls = createControls(leftSide.node(), { location: 'top', inputs: syncedControls }),
        clinicalTimelines = createChart(rightSide.node(), syncedSettings, controls);
    clinicalTimelines.test = test; // pass test argument along down the line

    for (const callback in callbacks)
        clinicalTimelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    clinicalTimelines.leftSide = leftSide;
    clinicalTimelines.rightSide = rightSide;
    clinicalTimelines.initialSettings = clone(syncedSettings);
    clinicalTimelines.IDtimeline = IDtimeline(clinicalTimelines);
    clinicalTimelines.listing = listing(clinicalTimelines);

    return clinicalTimelines;
}
