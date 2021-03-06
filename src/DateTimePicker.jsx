
/** @jsx React.DOM */
var DateTimePicker, DateTimePickerDate, DateTimePickerTime, Glyphicon, React;

React = require('react');

DateTimePickerDate = require('./DateTimePickerDate');

DateTimePickerTime = require('./DateTimePickerTime');

Glyphicon = require('react-bootstrap/Glyphicon');

DateTimePicker = React.createClass({
  propTypes: {
    showDatePicker: React.PropTypes.bool,
    showTimePicker: React.PropTypes.bool,
    subtractMonth: React.PropTypes.func.isRequired,
    addMonth: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    showToday: React.PropTypes.bool,
    daysOfWeekDisabled: React.PropTypes.array,
    setSelectedDate: React.PropTypes.func.isRequired,
    subtractYear: React.PropTypes.func.isRequired,
    addYear: React.PropTypes.func.isRequired,
    setViewMonth: React.PropTypes.func.isRequired,
    setViewYear: React.PropTypes.func.isRequired,
    subtractHour: React.PropTypes.func.isRequired,
    addHour: React.PropTypes.func.isRequired,
    subtractMinute: React.PropTypes.func.isRequired,
    addMinute: React.PropTypes.func.isRequired,
    addDecade: React.PropTypes.func.isRequired,
    subtractDecade: React.PropTypes.func.isRequired,
    togglePeriod: React.PropTypes.func.isRequired,
    shouldDayBeDisabled: React.PropTypes.func,
  },
  renderDatePicker: function() {
    if (this.props.showDatePicker) {
      return (
      DateTimePickerDate(
            {addMonth:this.props.addMonth,
            subtractMonth:this.props.subtractMonth,
            setSelectedDate:this.props.setSelectedDate,
            viewDate:this.props.viewDate,
            selectedDate:this.props.selectedDate,
            showToday:this.props.showToday,
            daysOfWeekDisabled:this.props.daysOfWeekDisabled,
            subtractYear:this.props.subtractYear,
            addYear:this.props.addYear,
            setViewMonth:this.props.setViewMonth,
            setViewYear:this.props.setViewYear,
            addDecade:this.props.addDecade,
            subtractDecade:this.props.subtractDecade,
            shouldDayBeDisabled: this.props.shouldDayBeDisabled,
          }
      )
      );
    }
  },
  renderTimePicker: function() {
    if (this.props.showTimePicker) {
      return (
      DateTimePickerTime(
            {viewDate:this.props.viewDate,
            selectedDate:this.props.selectedDate,
            setSelectedHour:this.props.setSelectedHour,
            setSelectedMinute:this.props.setSelectedMinute,
            addHour:this.props.addHour,
            subtractHour:this.props.subtractHour,
            addMinute:this.props.addMinute,
            subtractMinute:this.props.subtractMinute,
            togglePeriod:this.props.togglePeriod}
      )
      );
    }
  },
  render: function() {
    return (
      React.DOM.div( {className:React.addons.classSet(this.props.widgetClasses), style:this.props.widgetStyle},

        this.renderDatePicker(),

        React.DOM.a( {className:"btn btn-default picker-switch", style:{width:'100%'}, onClick:this.props.togglePicker}, Glyphicon( {glyph:this.props.showTimePicker ? 'calendar' : 'time'} )),

        this.renderTimePicker()

      )

    );
  }
});

module.exports = DateTimePicker;
