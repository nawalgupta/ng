import { PipeUnit as PU, PipeUnit } from '../pipe/pipe.unit';
import { uniq } from '../utility';


export class PipeModel {
	constructor() {
		this.reduce = (units, model) => {
			const dataPipe = model.data().pipe;
			
			// Change one of default pipes to data pipes - cause default literaly means data
			// we can change only one because all other will be moved out during reduce
			const index = units.indexOf(PipeUnit.default);
			if (index >= 0) {
				units[index] = dataPipe;
			}

			units = uniq(units);
			const set = new Set(units);

			const schema = new Map([
				[PipeUnit.default, dataPipe],
				[PipeUnit.view, PipeUnit.default],
				[PipeUnit.column, PipeUnit.view]
			]);

			const shouldKeep = unit => {
				let next;
				while ((next = schema.get(unit))) {
					if (next === unit) {
						break;
					}

					if (set.has(next)) {
						return false;
					}

					unit = next;
				}

				return true;
			};

			return units.reduce((memo, unit) => {
				if (shouldKeep(unit)) {
					memo.push(unit);
				}

				return memo;
			}, []);
		};

		this.triggers = {
			'data': {
				'rows': PU.default,
				'columns': PU.column
			},
			'pagination': {
				'current': PU.default,
				'size': PU.default
			},
			'fetch': {
				'skip': PU.default,
				'round': PU.default
			},
			'sort': {
				'by': PU.default
			},
			'filter': {
				'by': PU.default,
				'unit': PU.column
			},
			'group': {
				'by': PU.default
			},
			'pivot': {
				'by': PU.default
			},
			'columnList': {
				'index': PU.column
			},
			'row': {
				'status': PU.rowDetails
			},
			'selection': {
				'mode': PU.column,
				'unit': PU.column
			}
		};
	}
}