import Directive from '../directive';
import {GRID_NAME, FOOT_CORE_NAME} from '../../definition';

class HeadCore extends Directive(FOOT_CORE_NAME, {root: `^^${GRID_NAME}`}) {
	constructor() {
		super();
	}

	onInit() {
	}
}

HeadCore.$inject = [];

export default {
	restrict: 'A',
	bindToController: true,
	controllerAs: '$head',
	controller: HeadCore,
	require: HeadCore.require,
	link: HeadCore.link
};