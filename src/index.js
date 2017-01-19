import angular from 'angular';
import Model from './core/infrastructure/model';
import Grid from './components/grid/grid';
import DataModel from './core/grid/data.model';
import HeadModel from './core/head/head.model';
import BodyModel from './core/body/body.model';
import SelectionModel from './core/grid/selection.model';
import Template from './components/template/tempate';
import ColumnList from './components/column/column.list';
import Column from './components/column/column';
import CellCore from './components/cell/cell.core';
import ViewCore from './components/grid/view.core';
import Head from './components/head/head';
import HeadCore from './components/head/head.core';
import StickyCore from './components/sticky/sticky.core';
import BodyCore from './components/body/body.core';
import * as def from './definition';

Model.register('data', DataModel)
	.register('selection', SelectionModel)
	.register('head', HeadModel)
	.register('body', BodyModel);

export default angular
	.module(def.MODULE_NAME, [])
	.component(def.GRID_NAME, Grid)
	.directive(def.CELL_CORE_NAME, () => CellCore)
	.directive(def.VIEW_CORE_NAME, () => ViewCore)
	.directive(def.HEAD_CORE_NAME, () => HeadCore)
	.directive(def.STICKY_CORE_NAME, () => StickyCore)
	.directive(def.BODY_CORE_NAME, () => BodyCore)
	.component(def.HEAD_NAME, Head)
	.component(def.TEMPLATE_NAME, Template)
	.component(def.COLUMN_LIST_NAME, () => ColumnList)
	.component(def.COLUMN_NAME, Column)
	.service(def.SERVICE_NAME, () => () => new Model())
	.run(Setup)
	.name;

Setup.$inject = ['$templateCache'];
function Setup($templateCache) {
	$templateCache.put('qgrid.tpl.html', require('./components/grid/grid.html'));
	$templateCache.put('qgrid.head.cell.tpl.html', require('./components/head/cell.html'));
	$templateCache.put('qgrid.body.cell.tpl.html', require('./components/body/cell.html'));
}