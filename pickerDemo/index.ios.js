/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var sprintf = require("sprintf-js").sprintf;
var {
  AppRegistry,
  StyleSheet,
  Text,
  PickerIOS,
  View,
} = React;

var PickerItemIOS = PickerIOS.Item;

var MAKES_URL = 'http://localhost:8080/car/makes';
var MODELS_URL = 'http://localhost:8080/car/%s/models';

var pickerDemo = React.createClass({
  getInitialState: function() {
    return {
      selectedMake: 'alfa',
      makeLoaded: false
    };
  },

  componentDidMount: function() {
    this.fetchMakesData();
  },

  render: function() {
    if (!this.state.makeLoaded) {
      return this.renderLoadingView();
    }

    var modelPicker;
    if (this.state.modelLoaded) {
      modelPicker = (<PickerIOS
        selectedValue={this.state.modelIndex}
        key={this.state.selectedMake}
        onValueChange={(modelIndex) => this.setState({modelIndex})}>
        {this.state.models.map(
          (modelName, modelIndex) => (
            <PickerItemIOS
              key={this.state.selectedMake + '_' + modelIndex}
              value={modelIndex}
              label={modelName}
            />
          ))
        }
      </PickerIOS>);
    } else {
      modelPicker = (
        <Text>
          Model Loading...
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Please choose a make for your car:</Text>
        <PickerIOS
           selectedValue={this.state.selectedMake}
           onValueChange={this.makeChange}>
           {this.state.makes.map((carMake) => (
            <PickerItemIOS
              key={carMake.key}
              value={carMake.key}
              label={carMake.value}
              />
            )
          )}
        </PickerIOS>
        <Text>Please choose a model of {this.getMakeLable(this.state.makes, this.state.selectedMake)}:</Text>
        {modelPicker}
      </View>
    );
  },

  makeChange: function(selectedMake) {
    this.setState({selectedMake, modelIndex: 0});
    this.fetchModelsData();
  },

  getMakeLable: function(makes, key) {
    return _.result(_.findWhere(makes, {key: key}), 'value');
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading data...
        </Text>
      </View>
    )
  },

  fetchMakesData: function() {
    fetch(MAKES_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          makes: responseData,
          makeLoaded: true,
        });

        this.makeChange(this.state.selectedMake);
      })
      .done();
  },

  fetchModelsData: function() {
    fetch(sprintf(MODELS_URL, this.state.selectedMake))
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          models: responseData,
          modelLoaded: true
        });
      })
      .done();
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('pickerDemo', () => pickerDemo);
