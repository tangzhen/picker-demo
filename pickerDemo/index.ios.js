/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  PickerIOS,
  View,
} = React;

var PickerItemIOS = PickerIOS.Item;

var MAKES_URL = 'http://localhost:8080/car/makes';

var pickerDemo = React.createClass({
  getInitialState: function() {
    return {
      selectedMake: 'alfa',
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Text>Please choose a make for your car:</Text>
        <PickerIOS
           selectedValue={this.state.selectedMake}>
           {this.state.makes.map((carMake) => (
            <PickerItemIOS
              key={carMake.key}
              value={carMake.key}
              label={carMake.value}
              />
            )
          )}
        </PickerIOS>
      </View>
    );
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

  fetchData: function() {
    fetch(MAKES_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          makes: responseData,
          loaded: true,
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
