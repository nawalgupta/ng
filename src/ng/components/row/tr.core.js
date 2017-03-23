import Directive from 'ng/directives/directive';
import {VIEW_CORE_NAME, TR_CORE_NAME} from 'ng/definition';

class TrCore extends Directive(TR_CORE_NAME, {view: `^^${VIEW_CORE_NAME}`}) {
	constructor($scope, $element) {
		super();

		this.$scope = $scope;
		this.element = $element[0];
	}

	onInit() {
		this.view.style.monitor.row.add(this.element);
	}

	onDestroy(){
		this.view.style.monitor.row.delete(this.element);
	}

}

TrCore.$inject = [
	'$scope',
	'$element'
];

export default {
	restrict: 'A',
	bindToController: true,
	controllerAs: '$tr',
	controller: TrCore,
	require: TrCore.require,
	link: TrCore.link
};