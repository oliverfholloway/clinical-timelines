import backButton from './onLayout/backButton';
import drawParticipantTimeline from './onLayout/drawParticipantTimeline';

export default function onLayout() {
    const context = this;

    //Add div for population stats.
    this.populationDetails.wrap = this.controls.wrap
        .append('div')
        .classed('annotation population-details', true);

    //Add div for back button and participant ID title.
    this.participantDetails.wrap = this.controls.wrap
        .append('div')
        .classed('annotation participant-details hidden', true)
        .html(`Viewing ${this.config.unit} <span id = 'participant'></span>`);

    //Add div for back button and participant ID title.
    this.backButton = this.controls.wrap.append('div').classed('back-button hidden', true);
    this.backButton
        .append('button')
        .html('&#8592; Back')
        .on('click', () => {
            backButton.call(this);
        });

    //Add top x-axis.
    const topXaxis = this.svg.append('g').classed('x-top axis linear', true);
    topXaxis
        .append('text')
        .classed('axis-title top', true)
        .text('Study Day');

    //Hide multiples that are currently unselected.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter')
        .each(function(filter) {
            if (filter.label === 'Event Type')
                d3
                    .select(this)
                    .selectAll('option')
                    .property('selected', d => {
                        return context.currentEventTypes instanceof Array
                            ? context.currentEventTypes.indexOf(d) > -1
                            : true;
                    });
        })
        .on('change', filter => {
            if (filter.value_col === this.config.id_col) {
                drawParticipantTimeline.call(this);
            } else if (filter.value_col === this.config.event_col) {
                this.currentEventTypes = this.filters.filter(
                    filter => filter.col === this.config.event_col
                )[0].val;
                if (this.selected_id) drawParticipantTimeline.call(this);
            } else {
                console.log('handle custom filters here');
            }
        });
}