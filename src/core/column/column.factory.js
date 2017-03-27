import * as guard from 'core/infrastructure/guard';
import {assignWith, clone, isUndefined} from 'core/services/utility';
import CustomColumn from 'core/column-type/column.view';
import TextColumn from 'core/column-type/text.column';
import NumberColumn from 'core/column-type/number.column';
import BoolColumn from 'core/column-type/bool.column';
import DateColumn from 'core/column-type/date.column';
import PasswordColumn from 'core/column-type/password.column';
import ArrayColumn from 'core/column-type/array.column';
import EmailColumn from 'core/column-type/email.column';
import SelectColumn from 'core/column-type/select.column';
import GroupColumn from 'core/column-type/group.column';
import PivotColumn from 'core/column-type/pivot.column';
import RowNumberColumn from 'core/column-type/row.number.column';
import RowIndicatorColumn from 'core/column-type/row.indicator.column';
import PadColumn from 'core/column-type/pad.column';

function merge(target, source) {
	if (target && source) {
		return assignWith(target, source, (s, t) => isUndefined(s) ? t : s);
	}

	return target || clone(source);
}

export default function (model) {
	const columnList = model.columnList;
	const columnMap = {
		'text': TextColumn,
		'number': NumberColumn,
		'bool': BoolColumn,
		'date': DateColumn,
		'array': ArrayColumn,
		'email': EmailColumn,
		'password': PasswordColumn,
		'select': SelectColumn,
		'group': GroupColumn,
		'pivot': PivotColumn,
		'row-number': RowNumberColumn,
		'row-indicator': RowIndicatorColumn,
		'pad': PadColumn,
		'custom': CustomColumn
	};

	const create = (entityType, columnType, body) => {
		const Type = columnMap[entityType];
		const settings = columnList().columns[columnType];
		body = merge(body, settings);

		const model = Type.model(body);
		return new Type(model);
	};

	return (type, body = null) => {
		guard.notNullOrEmpty(type, 'type');

		if (columnMap.hasOwnProperty(type)) {
			return create(type, type, body);
		}

		return create('custom', type, body);
	};
}