$(() => {
    $('#responsive-box').dxResponsiveBox({
        rows: [
            { ratio: 1 },
            { ratio: 2 },
            { ratio: 1 },
        ],
        cols: [
            { ratio: 1 },
            { ratio: 2, screen: 'lg' },
            { ratio: 1 },
        ],
        singleColumnScreen: 'sm',
        screenByWidth(width) {
            return (width < 700) ? 'sm' : 'lg';
        },
    });

    var dataForm;
    const tabsText = [
        {
            id: 0,
            text: 'Login',
        },
        {
            id: 1,
            text: 'Sign Up',
        },
    ]

    const sendRequest = function (value) {
        $.ajax({
            url: "https://localhost:44389/api/accounts/checkEmail",
            type: "get", //send it through get method
            data: {
                email: value.toString(),
            },
            success: function (response) {
                console.log("🚀 ~ sendRequest ~ response:", response)
                const d = $.Deferred();
                setTimeout(() => {
                    d.resolve(value !== invalidEmail);
                }, 1000);
                return d.promise();
            },
            error: function (xhr) {
                console.log("🚀 ~ sendRequest ~ xhr:", xhr)
            }
        });
    };

    var form = $(function () {
        $("#loginForm").dxForm({
            formData: dataForm,
            colCount: 1,
            labelMode: 'floating',
            labelLocation: 'top',
            items: [
                {
                    dataField: "Email",
                    validationRules: [
                        {
                            type: 'required',
                            message: 'Email is required',
                        },
                        {
                            type: 'email',
                            message: 'Email is invalid',
                        },
                        // {
                        //     type: 'async',
                        //     message: 'Email is already registered',
                        //     validationCallback(params) {
                        //         return sendRequest(params.value);
                        //     },
                        // }
                    ],
                },
                {
                    dataField: "Password",
                    editorOptions: {
                        mode: 'password',
                        valueChangeEvent: 'keyup',
                        buttons: [{
                            name: 'password',
                            location: 'after',
                            options: {
                                stylingMode: 'text',
                                icon: 'eyeopen',
                                onClick: () => changePasswordMode('Password'),
                            },
                        }],
                    },
                    validationRules: [
                        {
                            type: 'required',
                            message: 'Email is required',
                        }
                    ],
                }
            ],
        })
    });

    const changePasswordMode = function (name) {
        var formTmp = $('#loginForm').dxForm('instance');
        const editor = formTmp.getEditor(name);
        editor.option('mode', editor.option('mode') === 'text' ? 'password' : 'text');
    };

    const login = (value) => {
        $.ajax({
            url: "https://localhost:44389/api/accounts/login",
            type: "POST",
            data: value,
            success: function (response) {
                console.log("🚀 ~ sendRequest ~ response:", response)
                localStorage.setItem("token", response.token);
                window.location.href = "http://127.0.0.1:5500/DevExtreme/home.html";
            },
            error: function (xhr) {
                const message = xhr.responseJSON.message.toString();
                const type = 'error'
                toast.option({ message, type });
                toast.show();
            }
        })
    }

    const toast = $('#toast').dxToast({ displayTime: 600 }).dxToast('instance');

    const submitButton = $("#submitButton").dxButton({
        stylingMode: 'contained',
        text: 'Login',
        type: 'default',
        width: 230,
        onClick() {
            var formTmp = $('#loginForm').dxForm('instance');
            if (formTmp.validate().isValid) {
                var $inputs = $('#loginForm :input');
                var values = {};
                $inputs.each(function () {
                    values[this.name] = $(this).val();
                });
                login(values);
            }
        },
    });

});