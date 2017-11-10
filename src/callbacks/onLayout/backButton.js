import enableDisableControls from '../functions/enableDisableControls';
import updateIDfilter from '../functions/updateIDfilter';

export default function backButton() {
    delete this.selected_id;

    enableDisableControls.call(this);
    updateIDfilter.call(this);

    //Hide ID timelines.
    this.IDdetails.wrap.classed('hidden', true);
    this.IDtimeline.wrap.classed('hidden', true);
    this.listing.wrap.classed('hidden', true);
    this.backButton.classed('hidden', true);

    //Display population timelines.
    this.populationDetails.wrap.classed('hidden', false);
    this.wrap.select('svg.wc-svg').classed('hidden', false);

    //Redraw clinical timelines.
    this.draw();

    //Highlight ID dropdown.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.label === this.config.id_unitPropCased)
        .style({
            'font-weight': 'bold'
        })
        .transition()
        .delay(500)
        .style({
            'font-weight': 'normal'
        })
        .select('select')
        .node()
        .focus();
}
