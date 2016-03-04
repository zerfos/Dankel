var MyDataTable = SuperWidget.extend({

	myTable: null,
	mydata: [],
	tableData: null,

	bindings: {
		local: {
			'datatable-add-row': ['click_addRow'],
			'datatable-del-row': ['click_delRow'],
			'datatable-edit-row': ['click_editRow'],
			'datatable-show-column': ['click_showColumn'],
			'datatable-hide-column': ['click_hideColumn'],
			'datatable-reload': ['click_reload'],
			'datatable-selected': ['click_selected'],

		},
		global: {}
	},

	init: function() {
		var that = this;
		that.loadTable();

	},

	loadTable: function() {

		var that = this;

		that.mydata = [{
			id: "1",
			name: "Acre",
			uf: "AC"
		}, {
			id: "2",
			name: "Alagoas",
			uf: "AL"
		}, {
			id: "3",
			name: "Amazonas",
			uf: "AM"
		}, {
			id: "4",
			name: "Amapá",
			uf: "AP"
		}, {
			id: "5",
			name: "Bahia",
			uf: "BA"
		}, {
			id: "6",
			name: "Ceará",
			uf: "CE"
		}, {
			id: "7",
			name: "Distrito Federal",
			uf: "DF"
		}, {
			id: "8",
			name: "Espírito Santo",
			uf: "ES"
		}, {
			id: "9",
			name: "Goiás",
			uf: "GO"
		}, {
			id: "10",
			name: "Maranhão",
			uf: "MA"
		}];

		that.myTable = FLUIGC.datatable('#idtable' + "_" + that.instanceId, {
			dataRequest: that.mydata,
			renderContent: ['id', 'name', 'uf'],
			header: [{
				'title': 'Code',
				'dataorder': 'name',
				'size': 'col-md-4'
			}, {
				'title': 'Name',
				'standard': true,
				'size': 'col-md-4'
			}, {
				'title': 'UF',
				'size': 'col-md-4',
				'dataorder': 'ASC'
			}],
			search: {
				enabled: true,
				onlyEnterkey: true,
				searchAreaStyle: 'col-md-5',
				onSearch: function(res) {
					that.myTable.reload(that.tableData);
					if (res) {
						var data = that.myTable.getData();
						var search = data.filter(function(el) {
							return el.name.toUpperCase().indexOf(res.toUpperCase()) >= 0;
						});
						that.myTable.reload(search);
					}
				}
			},
			scroll: {

				target: ".target",
				enabled: true

			},
			actions: {
				enabled: true,
				template: '.mydatatable-template-row-area-buttons',
				actionAreaStyle: 'col-md-6'
			},
			navButtons: {
				enabled: true,
				forwardstyle: 'btn-warning',
				backwardstyle: 'btn-warning',
			},
			draggable: {
				enabled: false
			},
		}, function(err, data) {
			if (err) {
				FLUIGC.toast({
					message: err,
					type: 'danger'
				});
			}
		});

		that.myTable.on('fluig.datatable.loadcomplete', function() {
			if (!that.tableData) {
				that.tableData = that.myTable.getData();
			}
		});

	},

	addRow: function(el, ev) {

		var that = this;
		var row = {
			id: "11",
			name: "Santa Catarina",
			uf: "SC"
		};

		that.myTable.addRow(0, row);
	},

	delRow: function(el, ev) {
		var that = this;
		var itemsToRemove = that.myTable.selectedRows();

		if (itemsToRemove.length > 0) {
			for (var i = 0; i <= itemsToRemove.length; i++) {
				that.myTable.removeRow(that.myTable.selectedRows()[0]);
			}
		}

		FLUIGC.toast({
			title: '',
			message: "Removed element",
			type: 'success'
		});

	},

	editRow: function(el, ev) {
		var that = this;
		var row = that.myTable.getRow(that.myTable.selectedRows()[0]);
		that.myTable.updateRow(that.myTable.selectedRows()[0], row, '.template_datatable_edit');
		$('#datatable-input-id').val(row.id);
		$('#datatable-input-name').val(row.name);
		$('#datatable-input-uf').val(row.uf);

		$('[data-datatable-edit-row]').prop("disabled", true);

		$('[data-update-row]').click(function(e) {
			var editedRow = {
				id: $('#datatable-input-id').val(),
				name: $('#datatable-input-name').val(),
				uf: $('#datatable-input-uf').val()
			};
			that.myTable.updateRow(that.myTable.selectedRows()[0], editedRow);

			$('[data-datatable-edit-row]').prop("disabled", false);

			FLUIGC.toast({
				title: '',
				message: "Edited!",
				type: 'success'
			});

		});
	},

	showColumn: function(el, ev) {
		var that = this;
		var index = 1;
		that.myTable.showColumn(index);
	},

	hideColumn: function(el, ev) {
		var that = this;
		var index = 1;
		that.myTable.hideColumn(index);
	},

	reload: function(el, ev) {
		var that = this;
		that.myTable.reload();
	},

	selected: function(el, ev) {
		var that = this;
		var index = that.myTable.selectedRows()[0];
		var selected = that.myTable.getRow(index);
		FLUIGC.toast({
			title: '',
			message: "{\"id\" :" + selected.id + ", \"name\" :" + selected.name + " , \"uf\" :" + selected.uf + "}",
			type: 'success'
		});

	}

});

