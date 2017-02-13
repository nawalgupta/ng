export default class SelectionService {
	select(context, isSelected = true) {
		if (Array.isArray(context)) {
			context.forEach((item) => this.select(item, isSelected));
			return;
		}

		if (context instanceof Node) {
			context.rows.forEach((index) => this.select(this.items[index], isSelected));
			return;
		}

		this._selectItem(context, isSelected);
	}

	state(context) {
		const state = {
		};

		if (Array.isArray(context)) {
			state.isSelected = context.rows.every((item) => this.state(item));
			state.isIndeterminate = !state.isSelected && context.rows.some((item) => this.state(item));
			return state;
		}

		if (context instanceof Node) {
			state.isSelected = context.rows.every((index) => this.state(this.items[index]));
			state.isIndeterminate = !state.isSelected && context.rows.some((index) => this.state(this.items[index]));
			return state;
		}

		state.isSelected = this._isItemSelected(context);
		return state;
	}
}