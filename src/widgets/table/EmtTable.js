import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows, TableWrapper, Col } from 'react-native-table-component';
import server from '../../utils/server';
import async from 'async-es';
import requestBuilder from '../../utils/requestBuilder';

export default class EmtTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableTitle: [],
      tableData: []
    }
  }
  fetchData(config, cb) {
    let me = this;
    var urlApi = me.props.configuration && me.props.configuration.params && me.props.configuration.params.api;
    //let storeKey = me.props.configuration.params.storeKey;
    if (me.props.configuration.params.requestType === "post") {
      // var reqParams = Object.assign({
      //   widgetUID: me.props.configuration.uid,
      //   query: me.props.queryString // as of now only supported in performace widget.. need to move so that other lists can also be configured with URL query string
      // }, me.props.configuration.params.requestParams);
      var reqParams = requestBuilder.buildParams(me.props.queryString, me.props.configuration)
      server.postData(urlApi, reqParams)
        .then(function (res) {
          cb(null, res.data)
          // if (res.data.pages >= 0) {
          //   me.props.loadList(storeKey, res.data);
          // } else {
          //   me.props.loadList(storeKey, {
          //     data: res.data.data,
          //     pages: undefined
          //   });
          // }
          me.resetPageCounts = false;
        });
    } else {
      var tableConfig = `&pageSize=${config.pageSize}`;
      if (config.sorted && config.sorted.length > 0) {
        let sorting = {};
        sorting[config.sorted[0].id] = config.sorted[0].desc ? -1 : 1;
        tableConfig += `&sort=${JSON.stringify(sorting)}`;
      }

      if (config.filtered && config.filtered.length > 0) {
        let filtering = {};
        config.filtered.forEach((filter) => {
          filtering[filter.id] = filter.value;
        });
        tableConfig += `&filter=${JSON.stringify(filtering)}`;
      }
      me.resetPageCounts = me.tblConfig != tableConfig;
      server.getData(urlApi + `?page=${config.page}&totalPages=${(me.resetPageCounts) ? undefined : config.pages}${tableConfig}`).then(function (res) {
        cb(null, res.data)
        // if (res.data.pages >= 0) {
        //   me.props.loadList(storeKey, res.data);
        // } else {
        //   me.props.loadList(storeKey, { data: res.data, pages: Math.ceil(res.data.length / config.pageSize) });
        // }
      }
      );
      me.tblConfig = tableConfig
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
        },
        rowData: function (callback) {
          me.fetchData.call(me, {}, callback);
        }
      }, function (err, results) {
        // results is now equals to: {one: 1, two: 2}
        console.log(results);
        let tableHead = [], tableTitle = [], tableData = [];
        results.formFields.fields.forEach((field) => {
          tableHead.push(field.key);
          tableTitle.push(field.name);
        })
        console.log(results);
        console.log(JSON.stringify(results));
        results.rowData.data.forEach((dataItem) => {
          let dataArray = [];
          tableHead.forEach(head => {
            dataArray.push(dataItem[head]);
          })
          tableData.push(dataArray);
        })
        me.setState({
          tableHead: tableHead,
          tableTitle: tableTitle,
          tableData: tableData
        });
      });


    }
  }
  render() {
    const state = this.state;
    const { configuration } = this.props;
    return (
      <View style={styles.view}>
        <Text style={styles.header1}>{configuration.title}</Text>
        {(state.tableHead.length > 0) ?
          <Table>
            <Row data={state.tableTitle} flexArr={[2, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
            <TableWrapper style={styles.wrapper}>
              <Rows data={state.tableData} flexArr={[2, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
            </TableWrapper>
          </Table> : <Text>Issue in getting data</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  text: { textAlign: 'center' }
});