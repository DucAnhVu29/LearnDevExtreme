$(() => {

    const url = 'https://localhost:44389/api/tasks'

    const urlAPI = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

    var datasource, list;

    const getData = (value) => {
        $.ajax({
            url: "https://localhost:44389/api/tasks",
            type: "GET",
            success: function (response) {
                datasource = response;
                $("#grid-learn").dxDataGrid({
                    dataSource: datasource,
                })
            },
            error: function (xhr) {
                console.log("🚀 ~ login ~ xhr:", xhr)
            }
        })
    }

    const status = [
        'Completed', 'Pending', 'In Progress', 'Not Started'
    ]

    getData()

    const grid = $("#grid-learn").dxDataGrid({
        dataSource: datasource,
        // remoteOperations: true,
        remoteOperations: {
            filtering: true,
            sorting: true,
            summary: true
        },
        keyExpr: "ID",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        repaintChangesOnly: true,
        columnChooser: {
            enabled: true,
        },
        columnFixing: {
            enabled: true,
        },
        searchPanel: {
            visible: true,
            width: 280,
            placeholder: 'Search...',
        },
        editing: {
            mode: "Row",
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            useIcons: true,
        },
        // scrolling: {
        //     rowRenderingMode: 'virtual',
        // },
        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },
        columns: [
            {
                dataField: "ID",
                visible: false,
                editorOptions: {
                    disabled: true,
                }
            },
            {
                dataField: "Name",
                fixed: true,
                fixedPosition: "left",
                caption: 'Summary',
                editorOptions: {
                }
            },
            {
                dataField: "Description",
                customizeText: function (cellInfo,) {
                    return cellInfo.value + " - Custom cell text";
                },
                editorOptions: {
                }
            },
            {
                caption: "TimeSpan",
                columns: [
                    {
                        dataField: "StartDate",
                        dataType: "date",
                        editorOptions: {
                        }
                    },
                    {
                        dataField: "DueDate",
                        dataType: "date",
                        editorOptions: {
                        }
                    },
                    {
                        caption: "Time Left",
                        calculateCellValue: function (rowData) {
                            const startDate = new Date(rowData.StartDate);
                            const dueDate = new Date(rowData.DueDate);
                            const timeLeft = Math.round((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                            return timeLeft + ' days';
                        }
                    }
                ]
            },
            {
                dataField: "Status",
                editorType: 'dxDropDownBox',
                width: 150,
                lookup: {
                    dataSource: status,
                },
                editorOptions: {
                    acceptCustomValue: true,
                    contentTemplate: function (e) {
                        const $list = $("<div>").dxList({
                            dataSource: status,
                            selectionMode: "single",
                            onSelectionChanged: function (arg) {
                                const selected = arg.addedItems[0];
                                e.component.option("value", selected);
                                e.component.close();
                                grid.refresh()
                            },
                        });
                        list = $list.dxList('instance');
                        return $list;
                    },
                },
            },
            {
                type: 'buttons',
                width: 110,
                headerCellTemplate: $('<i style="color: red">Action</i>'),
                buttons: ['edit', 'delete', {
                    hint: 'Clone',
                    icon: 'copy',
                    visible(e) {
                        return !e.row.isEditing;
                    },
                    onClick(e) {
                        console.log("🚀 ~ onClick ~ e:", e)
                        var message = 'Custom button just clicked'
                        var type = 'success'

                        toast.option({ message, type });
                        toast.show();
                        e.component.refresh(true);
                        e.event.preventDefault();
                    },
                }],
            },
        ],
        onRowUpdated(e) {
            const data = e.data;
            // console.log("🚀 ~ onSaved ~ data:", data)

            $.ajax({
                url: `${url}/${data.ID}`,
                type: "PUT",
                data: data,
                success: function (response) {
                    grid.refresh()
                },
                error: function (xhr) {
                    console.log("🚀 ~ login ~ xhr:", xhr)
                }
            })
        },
        onRowRemoved(e) {
            console.log("🚀 ~ onRowRemoved ~ e:", e)
            const data = e.data
            $.ajax({
                url: `${url}/${e.key}`,
                type: "DELETE",
                data: data,
                success: function (response) {
                    grid.refresh()
                },
                error: function (xhr) {
                    console.log("🚀 ~ login ~ xhr:", xhr)
                }
            })
        },
        onRowInserted(e) {
            console.log("🚀 ~ onRowInserted ~ e:", e)
            const data = e.data
            delete data.ID
            console.log("🚀 ~ onRowRemoved ~ data:", data)
            $.ajax({
                url: url,
                type: "POST",
                data: data,
                success: function (response) {
                    getData();
                },
                error: function (xhr) {
                    console.log("🚀 ~ login ~ xhr:", xhr)
                }
            })
        },
    }).dxDataGrid('instance')

    const gridAPI = $("#grid-API").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: 'OrderID',
            loadUrl: `${urlAPI}/Orders`,
            insertUrl: `${urlAPI}/InsertOrder`,
            updateUrl: `${urlAPI}/UpdateOrder`,
            deleteUrl: `${urlAPI}/DeleteOrder`,
            onBeforeSend(method, ajaxOptions) {
                console.log("🚀 ~ OrdersDataSource - onBeforeSend ~ ajaxOptions:", ajaxOptions)
                // ajaxOptions.xhrFields = { withCredentials: true };
            },
        }),
        filterRow: {
            visible: true,
        },
        headerFilter: {
            visible: true,
        },
        scrolling: {
            mode: 'virtual',
        },
        editing: {
            mode: "Row",
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            useIcons: true,
        },
        searchPanel: {
            visible: true,
            width: 280,
            placeholder: 'Search...',
        },
        remoteOperations: true,
        width: '100%',
        height: 600,
        showBorders: true,
        columnChooser: {
            enabled: true,
        },
        remoteOperations: true,
        columns: [
            {
                dataField: 'CustomerID',
                caption: 'Customer',
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Customer must be a string with a maximum length of 5.',
                    max: 5,
                }],
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: 'Value',
                        loadUrl: `${urlAPI}/CustomersLookup`,
                        onBeforeSend(method, ajaxOptions) {
                            console.log("🚀 ~ CustomersLookup - onBeforeSend ~ ajaxOptions:", ajaxOptions)
                        },
                    }),
                    valueExpr: 'Value',
                    displayExpr: 'Text',
                },
            },
            {
                dataField: 'ShipName',
            },
            {
                caption: 'Ship Address',
                columns: [
                    {
                        dataField: "ShipAddress",
                        caption: "Address"
                    },
                    {
                        dataField: "ShipCity"
                    },
                    {
                        dataField: "ShipRegion"
                    },
                    {
                        dataField: "ShipPostalCode"
                    },
                ]
            },
            {
                dataField: 'OrderDate',
                dataType: 'date',
                validationRules: [{
                    type: 'required',
                    message: 'The OrderDate field is required.',
                }],
            },
            {
                dataField: 'RequiredDate',
                dataType: 'date',
                validationRules: [{
                    type: 'required',
                    message: 'The RequiredDate field is required.',
                }],
            },
            {
                dataField: 'ShippedDate',
                dataType: 'date',
            },
            {
                dataField: 'Employee',
            },
            {
                dataField: 'Freight',
                headerFilter: {
                    groupInterval: 100,
                },
                validationRules: [{
                    type: 'range',
                    message: 'The field Freight must be between 0 and 2000.',
                    min: 0,
                    max: 2000,
                }],
            },
            {
                dataField: 'ShipCountry',
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field ShipCountry must be a string with a maximum length of 15.',
                    max: 15,
                }],
            },
            {
                dataField: 'ShipVia',
                caption: 'Shipping Company',
                dataType: 'number',
                lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: 'Value',
                        loadUrl: `${urlAPI}/ShippersLookup`,
                        onBeforeSend(method, ajaxOptions) {
                            console.log("🚀 ~ ShippersLookup - onBeforeSend ~ ajaxOptions:", ajaxOptions)
                            // ajaxOptions.xhrFields = { withCredentials: true };
                        },
                    }),
                    valueExpr: 'Value',
                    displayExpr: 'Text',
                },
            },
        ],
        onRowInserted(e) {
            console.log("🚀 ~ onRowInserted ~ e:", e)
        }
    })


    const toast = $('#custom-button-toast').dxToast({ displayTime: 600 }).dxToast('instance');
})