import ColumnChooserModel from './column-chooser/column.chooser.model';
import ColumnFilterModel from './column-filter/column.filter.model';
import PopupModel from './popup/popup.model';
import {DataManipulationModel} from '@grid/plugin/data-manipulation/data.manipulation.model';
import LegendModel from './legend/legend.model';

export function setup(model) {
	model.register('columnChooser', ColumnChooserModel)
		.register('columnFilter', ColumnFilterModel)
		.register('popup', PopupModel)
		.register('dataManipulation', DataManipulationModel)
		.register('legend', LegendModel);
}