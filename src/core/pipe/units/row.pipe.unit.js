import {Scene} from '../../scene';

export const rowPipeUnit = [
	(memo, context, next) => {
		const tag = {
			source: context.source || 'row.pipe.unit',
			behavior: 'core'
		};

		const model = context.model;
		const scene = new Scene(model);

		const rows = scene.rows(memo);
		model.view({rows: rows}, tag);
		model.scene({rows: rows}, tag);

		next(memo);
	}
];