import PluginComponent from '../plugin.component';
import {Action} from '@grid/core/action';
import {Command} from '@grid/core/command';
import {Composite} from '@grid/core/infrastructure/composite';
import {PersistencePanelController} from './persistence.panel';
import {PersistenceService} from '@grid/core/persistence/persistence.service';

const Plugin = PluginComponent('persistence', {
	inject: ['qgrid', '$mdPanel', '$document']
});

class Persistence extends Plugin {
	constructor() {
		super(...arguments);
	}

	onInit() {
		const model = this.model;
		const storageKey = `q-grid:${model.grid().id}:${model.persistence().id}:persistence-list`;

		model.persistence()
			.storage
			.getItem(storageKey)
			.then(items => {
				items = items || [];
				const defaultItem = items.find(item => item.isDefault);
				if (defaultItem) {
					const persistenceService = new PersistenceService(model);
					persistenceService.load(defaultItem.model);
				}
			});

		const actions = [
			new Action(
				new Command({
					source: 'persistence',
					execute: e => {
						if (!e) {
							e = {
								target: this.$element[0]
							};
						}

						const mdPanel = this.$mdPanel;
						const position = mdPanel.newPanelPosition()
							.relativeTo(e.target)
							.addPanelPosition(mdPanel.xPosition.ALIGN_START, mdPanel.yPosition.ALIGN_TOPS);

						const config = {
							attachTo: angular.element(this.$document[0].body), // eslint-disable-line no-undef
							controller: PersistencePanelController,
							controllerAs: '$persistence',
							templateUrl: 'qgrid.plugin.persistence-panel.tpl.html',
							panelClass: 'q-grid-persistence-panel',
							position: position,
							locals: {
								model: model,
								storageKey: storageKey
							},
							openFrom: e,
							clickOutsideToClose: true,
							escapeToClose: false,
							focusOnOpen: false,
							zIndex: 2
						};

						mdPanel.open(config);
					},
				//	shortcut: 'ctrl+shift+h'
				}),
				'Load/Save',
				'history'
			)
		];

		model
			.action({
				items: Composite.list([actions, model.action().items])
			});
	}
}

export default Persistence.component({
	controller: Persistence,
	controllerAs: '$persistence',
	bindings: {
		'onSubmit': '&',
		'onCancel': '&'
	}
});