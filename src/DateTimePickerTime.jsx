
/** @jsx React.DOM */
var DateTimePickerHours, DateTimePickerMinutes, DateTimePickerTime, React;

React = require('react');

DateTimePickerMinutes = require('./DateTimePickerMinutes');

DateTimePickerHours = require('./DateTimePickerHours');

DateTimePickerTime = React.createClass({
  propTypes: {
    setSelectedHour: React.PropTypes.func.isRequired,
    setSelectedMinute: React.PropTypes.func.isRequired,
    subtractHour: React.PropTypes.func.isRequired,
    addHour: React.PropTypes.func.isRequired,
    subtractMinute: React.PropTypes.func.isRequired,
    addMinute: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    togglePeriod: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      minutesDisplayed: false,
      hoursDisplayed: false
    };
  },
  showMinutes: function() {
    return this.setState({
      minutesDisplayed: true
    });
  },
  showHours: function() {
    return this.setState({
      hoursDisplayed: true
    });
  },
  renderMinutes: function() {
    if (this.state.minutesDisplayed) {
      return (DateTimePickerMinutes(
            {setSelectedMinute:this.props.setSelectedMinute}
       )
       );
    } else {
      return '';
    }
  },
  renderHours: function() {
    if (this.state.hoursDisplayed) {
      return (DateTimePickerHours(
            {setSelectedHour:this.props.setSelectedHour}
      )
      );
    } else {
      return '';
    }
  },
  renderPicker: function() {

    if (!this.state.minutesDisplayed && !this.state.hoursDisplayed) {
      return (
      React.DOM.div( {className:"timepicker-picker"},
        React.DOM.table( {className:"table-condensed"},
          React.DOM.tbody(null,
            React.DOM.tr(null,
              React.DOM.td(null, React.DOM.a({className:"btn", onClick:this.props.addHour}, React.DOM.i({className:"fa fa-chevron-up"}))),

              React.DOM.td( {className:"separator"}),

              React.DOM.td(null, React.DOM.a( {className:"btn", onClick:this.props.addMinute}, React.DOM.i({className:"fa fa-chevron-up"})) ),

              React.DOM.td( {className:"separator"})
            ),

            React.DOM.tr(null,
              React.DOM.td(null, React.DOM.span( {className:"timepicker-hour", onClick:this.showHours}, this.props.selectedDate.format('h'))),

              React.DOM.td( {className:"separator"}, ":"),

              React.DOM.td(null, React.DOM.span( {className:"timepicker-minute", onClick:this.showMinutes}, this.props.selectedDate.format('mm'))),

              React.DOM.td( {className:"separator"}),

              React.DOM.td(null, React.DOM.button( {className:"btn btn-primary", onClick:this.props.togglePeriod, type:"button"}, this.props.selectedDate.format('A')))
            ),

            React.DOM.tr(null,
              React.DOM.td(null, React.DOM.a( {className:"btn", onClick:this.props.subtractHour}, React.DOM.i({className:"fa fa-chevron-down"}))),

              React.DOM.td( {className:"separator"}),

              React.DOM.td(null, React.DOM.a( {className:"btn", onClick:this.props.subtractMinute}, React.DOM.i({className:"fa fa-chevron-down"}))),

              React.DOM.td( {className:"separator"})
            )
          )
        )
      )
      );
    } else {
      return '';
    }
  },
  render: function() {
    return (
        React.DOM.div( {className:"timepicker"},
          this.renderPicker(),

          this.renderHours(),

          this.renderMinutes()
        )
    );
  }
});

module.exports = DateTimePickerTime;
