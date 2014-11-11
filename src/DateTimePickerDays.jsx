/** @jsx React.DOM */
var DateTimePickerDays, React, moment;

React = require('react');

moment = require('moment');

DateTimePickerDays = React.createClass({
  propTypes: {
    subtractMonth: React.PropTypes.func.isRequired,
    addMonth: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    showToday: React.PropTypes.bool,
    daysOfWeekDisabled: React.PropTypes.array,
    setSelectedDate: React.PropTypes.func.isRequired,
    showMonths: React.PropTypes.func.isRequired,
    shouldDayBeDisabled: React.PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      showToday: true
    };
  },
  shouldDayBeDisabled: function (selected_date) {

    var selected_date = selected_date || this.state.selectedDate,
        today = moment(),
        moment_date = moment(selected_date, this.props.inputFormat);

      return moment_date.isBefore(today, 'day');
  },
  renderDays: function() {
    var cells, classes, days, html, i, month, nextMonth, prevMonth, row, year, _i, _len, _ref;
    year = this.props.viewDate.year();
    month = this.props.viewDate.month();
    prevMonth = this.props.viewDate.clone().subtract("months", 1);
    days = prevMonth.daysInMonth();
    prevMonth.date(days).startOf('week');
    nextMonth = moment(prevMonth).clone().add(42, "d");
    html = [];
    cells = [];
    while (prevMonth.isBefore(nextMonth)) {
      classes = {
        day: true
      };
      if (prevMonth.year() < year || (prevMonth.year() === year && prevMonth.month() < month)) {
        classes['old'] = true;
      } else if (prevMonth.year() > year || (prevMonth.year() === year && prevMonth.month() > month)) {
        classes['new'] = true;
      }
      if (prevMonth.isSame(moment({
        y: this.props.selectedDate.year(),
        M: this.props.selectedDate.month(),
        d: this.props.selectedDate.date()
      }))) {
        classes['active'] = true;
      }
      if (this.props.showToday) {
        if (prevMonth.isSame(moment(), 'day')) {
          classes['today'] = true;
        }
      }

      if (this.props.daysOfWeekDisabled) {
        _ref = this.props.daysOfWeekDisabled;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (prevMonth.day() === this.props.daysOfWeekDisabled[i]) {
            classes['disabled'] = true;
            break;
          }
        }
      }

      if (this.props.shouldDayBeDisabled && this.shouldDayBeDisabled(prevMonth)) {
          classes['disabled'] = true;
      }

      cells.push(React.DOM.td( {className:React.addons.classSet(classes), onClick:this.props.setSelectedDate}, prevMonth.date()));
      if (prevMonth.weekday() === moment().endOf('week').weekday()) {
        row = React.DOM.tr(null, cells);
        html.push(row);
        cells = [];
      }
      prevMonth.add(1, "d");
    }
    return html;
  },
  render: function() {
    return (
    React.DOM.div( {className:"datepicker-days", style:{display: 'block'}},
        React.DOM.table( {className:"table-condensed"},
          React.DOM.thead(null,
            React.DOM.tr(null,
              React.DOM.th( {className:"prev", onClick:this.props.subtractMonth}, "‹"),

              React.DOM.th( {className:"switch", colSpan:"5", onClick:this.props.showMonths}, moment.months()[this.props.viewDate.month()], this.props.viewDate.year()),

              React.DOM.th( {className:"next", onClick:this.props.addMonth}, "›")
            ),

            React.DOM.tr(null,
              React.DOM.th( {className:"dow"}, "Su"),

              React.DOM.th( {className:"dow"}, "Mo"),

              React.DOM.th( {className:"dow"}, "Tu"),

              React.DOM.th( {className:"dow"}, "We"),

              React.DOM.th( {className:"dow"}, "Th"),

              React.DOM.th( {className:"dow"}, "Fr"),

              React.DOM.th( {className:"dow"}, "Sa")
            )
          ),

          React.DOM.tbody(null,
            this.renderDays()
          )
        )
      )
    );
  }
});

module.exports = DateTimePickerDays;