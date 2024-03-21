const datatype = [{
    text: 'Text Box',
    value: 'dxTextBox',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxTextBox({
            showClearButton: true,
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Number Box',
    value: 'dxNumberBox',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxNumberBox({
            showClearButton: true,
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Check Box',
    value: 'dxCheckBox',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxCheckBox({
            onValueChanged(e) {

                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Date Box',
    value: 'dxDateBox',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxDateBox({
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Select Box',
    value: 'dxSelectBox',
    func: (cellElement, cellInfo, dataSource) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxSelectBox({
            items: dataSource,
            dataSource: dataSource,
            searchEnabled: true,
            searchExpr: ['compar', 'value'],
            displayExpr: 'value',
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Drop Box',
    value: 'dxDropDownBox',
    func: (cellElement, cellInfo, dataSource) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxDropDownBox({
            acceptCustomValue: true,
            contentTemplate: function (e) {
                const $list = $("<div>").dxList({
                    dataSource: dataSource,
                    selectionMode: "single",
                    searchEnabled: true,
                    searchExpr: ['compar', 'value'],
                    displayExpr: 'value',
                    onSelectionChanged: function (arg) {
                        console.log("🚀 ~ arg:", arg)
                        const selected = arg.addedItems[0];
                        cellInfo.data.Editor = selected.value;
                        console.log("🚀 ~ cellInfo.data.Editor:", cellInfo.data.Editor)
                        e.component.option("value", selected.value);
                        e.component.close();
                    },
                });
                var list = $list.dxList('instance');
                return $list;
            },

            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Tag Box',
    value: 'dxTagBox',
    func: (cellElement, cellInfo, dataSource) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxTagBox({
            items: dataSource,
            dataSource: dataSource,
            searchEnabled: true,
            searchExpr: ['compar', 'value'],
            displayExpr: 'value',
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Text Area',
    value: 'dxTextArea',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxTextArea({
            height: 90,
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Switch',
    value: 'dxSwitch',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxSwitch({
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
{
    text: 'Color Box',
    value: 'dxColorBox',
    func: (cellElement, cellInfo) => {
        cellElement.addClass('editorContainer');
        $('<div />').dxColorBox({
            onValueChanged(e) {
                cellInfo.data.Editor = e.value
            },
        }).appendTo(cellElement)
    }
},
]