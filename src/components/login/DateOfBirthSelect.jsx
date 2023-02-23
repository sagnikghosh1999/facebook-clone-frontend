import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bYear,
  bMonth,
  handleRegisterChange,
  dateError,
}) {
  const view3 = useMediaQuery({
    query: "(min-width : 1170px)",
  });

  const years = Array.from(
    new Array(120),
    (_, index) => new Date().getFullYear() - index
  );
  const months = Array.from(new Array(12), (_, index) => index + 1);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (_, index) => index + 1);

  return (
    <div className="reg_col">
      <div className="reg_line_header">
        Date of Birth <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{
          marginBottom: `${dateError && !view3 ? "90px" : "0"}`,
        }}
      >
        <select name="bDay" onChange={handleRegisterChange} value={bDay}>
          {days.map((day, i) => (
            <option value={day} key={i}>
              {day}
            </option>
          ))}
        </select>
        <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
          {months.map((month, i) => (
            <option value={month} key={i}>
              {month}
            </option>
          ))}
        </select>
        <select name="bYear" value={bYear} onChange={handleRegisterChange}>
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>
        {dateError && (
          <div
            className={!view3 ? "input_error" : "input_error input_error_large"}
          >
            <div
              className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
            />
            {dateError}
          </div>
        )}
      </div>
    </div>
  );
}
