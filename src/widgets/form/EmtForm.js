
import React, { Component } from 'react';
import GenerateForm from 'react-native-form-builder';
import { StyleSheet } from "react-native";
import { View, Text, Button } from 'native-base';
import async from 'async-es';
import server from '../../utils/server';
import CodePush from 'react-native-code-push';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 150,
    },
    view: {
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    header1: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#d6d7da',
        fontSize: 24,
        padding: 2,
        fontWeight: 'bold',
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
});
// These Fields will create a login form with three fields
const fields = [
    {
        type: 'text',
        name: 'user_name',
        required: true,
        icon: 'ios-person',
        label: 'Username',
    },
    {
        type: 'password',
        name: 'password',
        icon: 'ios-lock',
        required: true,
        label: 'Password',
    },
    {
        type: 'picker',
        name: 'country',
        mode: 'dialog',
        label: 'Select Country',
        defaultValue: 'INDIA',
        options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
    },
];
class EmtForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [],
            actions: []
        }
    }
    componentDidMount() {
        var me = this,
            urlFormFields = me.props.configuration && me.props.configuration.params && me.props.configuration.params.formFields;
        var urlApi = me.props.configuration && me.props.configuration.params && me.props.configuration.params.api;
        if (urlFormFields) {
            async.parallel({
                formFields: function (callback) {
                    if (me.props.configuration.params.requestType === "post") {
                        server.postData(urlFormFields, me.props.configuration.params.requestParams)
                            .then(function (res) {
                                callback(null, res.data)
                            });
                    } else {
                        server.getData(urlFormFields).then(function (res) {
                            callback(null, res.data)
                        });
                    }
                    // setTimeout(function () {
                    //   callback(null, 1);
                    // }, 200);
                }
            }, function (err, results) {
                // results is now equals to: {one: 1, two: 2}
                console.log(results, results.formFields);
                let fields = [], actions = [];
                results.formFields.fields.forEach((field) => {
                    fields.push({
                        type: field.type === "string" ? 'text' : field.type,
                        name: field.key,
                        required: field.required,
                        icon: field.icon,
                        label: field.name,
                    })
                })
                console.log(results);
                console.log(JSON.stringify(results));
                // results.rowData.data.forEach((dataItem) => {
                //     let dataArray = [];
                //     tableHead.forEach(head => {
                //         dataArray.push(dataItem[head]);
                //     })
                //     tableData.push(dataArray);
                // })
                me.setState({
                    fields: fields,
                    actions: results.formFields.actions
                    //tableTitle: tableTitle,
                    //     tableData: tableData
                });
            });


        }
    }
    login(action) {
        console.log(action)
        const formValues = this.formGenerator.getValues();
        console.log('FORM VALUES', formValues);

        switch (action.type) {
            case "post": {
                let api = action.api;//formURL(action.api, action.params, initialVal);
                server.postData(api, formValues).then((res) => {
                    console.log(res.data);
                    
CodePush.restartApp();
                })
            }
        }

    }
    render() {
        const { fields, actions } = this.state;
        return (
            <View style={styles.view}>
                {fields && fields.length > 0 ? <View>
                    <GenerateForm
                        ref={(c) => {
                            this.formGenerator = c;
                        }}
                        fields={fields}
                    />
                </View> : <Text></Text>
                }
                <View style={styles.submitButton}>
                    {actions && actions.length > 0 ?
                        actions.map((action) =>
                            <Button block onPress={() => this.login(action)}>
                                <Text>{action.text}</Text>
                            </Button>)
                        : <Text></Text>
                    }
                </View>
            </View>
        );
    }
}
export default EmtForm;