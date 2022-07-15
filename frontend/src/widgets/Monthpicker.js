const Monthpicker = (props) => {
    return (
        <div className="monthpicker">
        <span className="monthpicker__title">Pick a month</span>
        <input
          className="monthpicker__picker"
          type="month"
          min="2012-01"
          max="2021-12"
          defaultValue={props.selectedMonth}
          onChange={props.changeMonthHandler}
        ></input>
      </div>
    )
}

export default Monthpicker;