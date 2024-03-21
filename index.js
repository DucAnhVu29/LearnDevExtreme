$(() => {
    const employees = data;
    var dataForm;

    let list, treelist, formDropBoxList;
    const dataSource = ['123', '234', '345', '456', '567', '678', '789', '890'];

    var positionTemp = [];
    positions.map((position) => {
        positionTemp.push({
            value: position.toString(),
            compar: removeVietnameseTones(position),
        })
    });

    const treeListData = $.map(tasks, (task) => {
        task.Task_Assigned_Employee = null;
        $.each(employees, (_, employee) => {
            if (employee.ID === task.Task_Assigned_Employee_ID) {
                task.Task_Assigned_Employee = employee;
            }
        });
        return task;
    });

    // const treeListDataType = $.map()

    const syncTreeViewSelection = function (treeViewInstance, value) {
        if (!value) {
            treeViewInstance.unselectAll();
        } else {
            treeViewInstance.selectItem(value);
        }
    };

    var taskSelected;
    var cellSelected;
    var random;

    const employeesStore = new DevExpress.data.ArrayStore({
        key: 'ID',
        data: employees,
    });


    const grid = $("#gridContainer").dxDataGrid({
        dataSource: employeesStore,
        keyExpr: "ID",
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        // selection: {
        //   mode: "single",
        // },
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
            mode: "cell",
            allowUpdating: true,
            allowDeleting: true,
        },
        selection: {
            mode: "multiple",
            allowSelectAll: true,
            deferred: true
        },
        columns: [
            {
                caption: "Employee",
                width: 230,
                fixed: true,
                allowSorting: false,
                calculateCellValue(data) {
                    return [data.Title, data.FirstName, data.LastName].join(" ");
                },
            },
            {
                dataField: "BirthDate",
                visible: false,
                dataType: "date",
                editorOptions: {
                    onValueChanged(e) {
                        console.log("🚀 ~ onValueChanged ~ e:", e)
                        e.component.option("value", e.value);
                        form.updateData('BirthDate', e.value)

                    }
                }
            },
            {
                dataField: "HireDate",
                visible: false,
                dataType: "date",
                editorOptions: {
                    onValueChanged(e) {
                        console.log("🚀 ~ onValueChanged ~ e:", e)
                        e.component.option("value", e.value);
                        form.updateData('HireDate', e.value)

                    }
                }
            },
            {
                dataField: "Position",
                alignment: "right",
                displayExpr: 'value',
                editorType: 'dxSelectBox',
                editorOptions: {
                    dataSource: positionTemp,
                    searchEnabled: 'true',
                    searchExpr: ['compar', 'value'],
                    displayExpr: 'value',
                    valueExpr: 'value',
                    onSelectionChanged(e) {
                        e.component.option("value", e.selectedItem.value);
                        form.updateData('Position', e.selectedItem.value)
                        e.component.close();
                    },
                },
                // editorType: 'dxDropDownBox',
                // width: 150,
                // editorOptions: {
                //     acceptCustomValue: true,
                //     contentTemplate: function (e) {
                //         const $list = $("<div>").dxList({
                //             dataSource: positionTemp,
                //             selectionMode: "single",
                //             displayExpr: 'value',
                //             searchEnabled: 'true',
                //             searchExpr: ['compar', 'value'],
                //             onSelectionChanged: function (arg) {
                //                 console.log("🚀 ~ arg:", arg)
                //                 const selected = arg.addedItems[0];
                //                 e.component.option("value", selected.value);
                //                 e.component.close();
                //             },
                //         });
                //         list = $list.dxList('instance');
                //         return $list;
                //     },
                // },
            },
            {
                caption: "Address",
                visible: false,
                columns: [
                    {
                        dataField: "Address",
                        width: 230,
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('Address', e.value)

                            }
                        }

                    },
                    {
                        dataField: "City",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('City', e.value)

                            }
                        }
                    },
                    {
                        dataField: "State",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('State', e.value)

                            }
                        }
                    },
                    {
                        dataField: "Zipcode",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('Zipcode', e.value)

                            }
                        }
                    },
                ]
            },
            {
                caption: 'Contact',
                visible: false,
                columns: [
                    {
                        dataField: "HomePhone",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('HomePhone', e.value)
                            }
                        }
                    },
                    {
                        dataField: "MobilePhone",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('MobilePhone', e.value)
                            }
                        }
                    },
                    {
                        dataField: "Skype",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('Skype', e.value)
                            }
                        }
                    },
                    {
                        dataField: "Email",
                        editorOptions: {
                            onValueChanged(e) {
                                console.log("🚀 ~ onValueChanged ~ e:", e)
                                e.component.option("value", e.value);
                                form.updateData('Email', e.value)
                            }
                        }
                    },
                ]
            },
            {
                dataField: "DataTypes",
                alignment: "right",
                width: 150,
                // displayExpr: 'text',
                // editorType: 'dxSelectBox',
                editorType: 'dxDropDownBox',
                editorOptions: {
                    acceptCustomValue: true,
                    contentTemplate: function (e) {
                        const $list = $("<div>").dxList({
                            dataSource: datatype,
                            selectionMode: "single",
                            displayExpr: 'text',
                            onSelectionChanged: function (arg) {
                                const selected = arg.addedItems[0];
                                e.component.option("value", selected.text);
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
                dataField: "Editor",
                alignment: "right",
                allowEditing: false,
                width: 320,
                cellTemplate(container, options) {
                    if (options.data.DataTypes) {
                        const editor = datatype.find(x => {
                            if (x.text == options.data.DataTypes) {
                                return x;
                            }
                        })
                        editor.func(container, options, positionTemp)
                    }
                },
            }
        ],
        onCellClick(selectedItems) {
            dataForm = selectedItems.data
            cellSelected = selectedItems
            $("#gridDataForm").dxForm({
                formData: dataForm
            })
            $("#submitButton").dxButton({
                text: 'Save Employee Info'
            })
        },
        // onSelectionChanged(selectedItems) {
        //     dataForm = selectedItems.selectedRowsData[0];
        //     var positiontmp = dataForm.Position;
        //     dataForm.Position = {
        //         value: positiontmp.toString(),
        //         compar: removeVietnameseTones(positiontmp),
        //     }
        //     $("#gridDataForm").dxForm({
        //         formData: dataForm
        //     })
        //     $("#submitButton").dxButton({
        //         text: 'Save Employee Info'
        //     })
        // },
    }).dxDataGrid('instance');

    var form = $("#gridDataForm").dxForm({
        formData: dataForm,
        colCount: 2,
        labelMode: 'floating',
        labelLocation: 'top',
        items: [
            {
                dataField: "ID",
                disabled: true,
            },
            {
                dataField: "FirstName",
                validationRules: [{
                    type: 'required',
                    message: 'First Name is required',
                }],
            },
            {
                dataField: "LastName",
                validationRules: [{
                    type: 'required',
                    message: 'Last Name is required',
                }],
            },
            {
                dataField: "Email",
                validationRules: [{
                    type: 'required',
                    message: 'Email is required',
                }, {
                    type: 'email',
                    message: 'Email is invalid',
                }],
            },
            {
                dataField: "Position",
                editorType: "dxDropDownBox",
                editorOptions: {
                    acceptCustomValue: true,
                    contentTemplate: function (e) {
                        const $list = $("<div>").dxList({
                            dataSource: positionTemp,
                            selectionMode: "single",
                            searchEnabled: true,
                            searchExpr: ['compar', 'value'],
                            displayExpr: 'value',
                            onSelectionChanged: function (arg) {
                                console.log("🚀 ~ arg:", arg)
                                const selected = arg.addedItems[0];
                                e.component.option("value", selected.value);
                                e.component.close();
                            },
                        });
                        formDropBoxList = $list.dxList('instance');
                        return $list;
                    },
                },
            },
            {
                dataField: 'List Drop Box',
                editorType: "dxDropDownBox",
                editorOptions: {
                    acceptCustomValue: true,
                    contentTemplate: function (e) {
                        const $list = $("<div>").dxList({
                            dataSource: positionTemp,
                            selectionMode: "single",
                            searchEnabled: true,
                            searchExpr: ['compar', 'value'],
                            displayExpr: 'value',
                            onSelectionChanged: function (arg) {
                                console.log("🚀 ~ arg:", arg)
                                const selected = arg.addedItems[0];
                                e.component.option("value", selected.value);
                                e.component.close();
                            },
                        });
                        list = $list.dxList('instance');
                        return $list;
                    },
                },
            },
            {
                dataField: 'Task',
                editorType: "dxDropDownBox",
                displayExpr: 'Task_Subject',
                keyExpr: 'Task_ID',
                editorOptions: {
                    acceptCustomValue: true,
                    contentTemplate: function (e) {
                        const $treelist = $("<div>").dxTreeView({
                            dataSource: treeListData,
                            dataStructure: 'plain',
                            selectionMode: "single",
                            displayExpr: 'Task_Subject',
                            keyExpr: 'Task_ID',
                            parentIdExpr: 'Task_Parent_ID',
                            scrolling: { mode: 'virtual' },
                            selectByClick: true,
                            selectNodesRecursive: false,
                            onItemSelectionChanged(args) {
                                const selected = args.itemData;
                                e.component.option('value', selected.Task_Subject);
                                taskSelected = selected;
                            },
                        });
                        treelist = $treelist.dxTreeView('instance');

                        e.component.on('valueChanged', (args) => {
                            syncTreeViewSelection(treelist, args.value);
                            e.component.close();
                        });

                        return $treelist;
                    },
                },
            },
            {
                dataField: "BirthDate",
                editorType: "dxDateBox",
                validationRules: [{
                    type: 'required',
                    message: 'BirthDay is required',
                }],
            },
            {
                dataField: "HireDate",
                editorType: "dxDateBox",
                validationRules: [{
                    type: 'required',
                    message: 'Hire Date is required',
                }],
            },
            {
                dataField: "Title",
                editorType: "dxSelectBox",
                editorOptions: {
                    items: title,
                },
                validationRules: [{
                    type: 'required',
                    message: 'Title is required',
                }],
            },
            {
                dataField: "Address",
                validationRules: [{
                    type: 'required',
                    message: 'Address is required',
                }],
            },
            {
                dataField: "City",
                validationRules: [{
                    type: 'required',
                    message: 'City is required',
                }],
            },
            {
                dataField: "State",
                validationRules: [{
                    type: 'required',
                    message: 'State is required',
                }],
            },
            {
                dataField: "Zipcode",
                validationRules: [{
                    type: 'required',
                    message: 'Zipcode is required',
                },]
            },
            {
                dataField: "Skype",
                validationRules: [{
                    type: 'required',
                    message: 'Skype is required',
                }],
            },
            {
                dataField: "DepartmentID",
                validationRules: [{
                    type: 'required',
                    message: "Department's ID is required",
                }],
            },
            {
                itemType: 'group',
                caption: 'Phone Number',
                items: [
                    {
                        dataField: "HomePhone",
                        editorOptions: {
                            mask: 'X00-000-0000',
                            maskRules: { X: /[01-9]/ },
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Home Phone is required',
                        }],
                    },
                    {
                        dataField: "MobilePhone",
                        editorOptions: {
                            mask: 'X00-000-0000',
                            maskRules: { X: /[01-9]/ },
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Mobile Phone is required',
                        }],
                    },
                ],
            },
        ],
    }).dxForm('instance');

    const submitButton = $("#submitButton").dxButton({
        stylingMode: 'outlined',
        disabled: true,
        text: 'Add Employee Info',
        type: 'normal',
        width: 180,
        onClick() {
            var formTmp = $('#gridDataForm').dxForm('instance');
            if (formTmp.validate().isValid) {
                var $inputs = $('#gridDataForm :input');
                var values = {};
                $inputs.each(function () {
                    values[this.name] = $(this).val();
                });
                values.Task = taskSelected;
                if (values.ID) {
                    saveEmployee(values)
                } else (
                    addEmployee(values)
                )
            }
        },
    });

    $("#checkBox").dxCheckBox({
        text: 'Are you sure about that?',
        onValueChanged(data) {
            console.log("🚀 ~ onValueChange ~ data:", data)
            if (data.value) {
                $("#submitButton").dxButton({
                    disabled: false
                })
            } else {
                $("#submitButton").dxButton({
                    disabled: true
                })
            }
        }
    })

    const addEmployee = (employee) => {
        employee.ID = employees.length + 1;
        employees.push(employee);
        grid.refresh();
        form.clear()
    }

    const saveEmployee = (employee) => {
        const index = employees.indexOf(employees.find((empl) => empl.ID == employee.ID));
        console.log("🚀 ~ saveEmployee ~ employee.Position:", employee)
        employees[index] = employee;
        grid.refresh();
        form.clear()
    }

    $("#gridDataForm").on("submit", function (e) {
        console.log("🚀 ~ $ ~ e:", e)
    });

    $("#clearButton").dxButton({
        stylingMode: 'outlined',
        text: 'Clear Info',
        type: 'normal',
        width: 120,
        onClick() {
            $("#gridDataForm").dxForm({
                formData: {},
            })
            $("#submitButton").dxButton({
                text: 'Add Employee Info'
            })
        },
    });

    $('#formBox').dxBox({
        direction: 'row',
        width: '100%',
        align: 'center',
        crossAlign: 'center',
    });

    $('#toolbar').dxToolbar({
        elementAttr: {
            class: 'dx-theme-background-color',
        },
        items: [{
            widget: 'dxButton',
            location: 'after',
            options: {
                icon: 'login',
                stylingMode: 'text',
                onClick() {
                    localStorage.removeItem('token')
                    window.location.href = "http://127.0.0.1:5500/DevExtreme/login.html";
                },
            },
        }],
    });

    const checkLogin = () => {
        var token = localStorage.getItem('token');

        if (!token) {
            localStorage.removeItem('token')
            window.location.href = "http://127.0.0.1:5500/DevExtreme/login.html";
        } else {
            $.ajax({
                url: "https://localhost:44389/api/accounts/checkRole",
                type: "GET",
                headers: { "Authorization": 'Bearer ' + token },
                success: function (response) {
                    if (response != 'admin') {
                        $("#checkBox").dxCheckBox({
                            disabled: true
                        })
                    }
                },
                error: function (xhr) {
                    localStorage.removeItem('token')
                    window.location.href = "http://127.0.0.1:5500/DevExtreme/login.html";
                }
            })
        }
    }
    setInterval(checkLogin(), 60 * 1000);

    $('#tooltip1').dxTooltip({
        target: '.checkBoxContainer',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        contentTemplate(data) {
            data.html("Only admin can eidt or add employee");
        },
        hideOnOutsideClick: false,
    });

});
