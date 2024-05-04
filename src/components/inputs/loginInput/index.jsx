import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import "./style.css";

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width : 850px)",
  });
  const view1050 = useMediaQuery({
    query: "(max-width : 1050px)",
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView && view1050 && field.name === "password"
              ? "input_error input_error_desktop err_res_password"
              : desktopView
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView && view1050 && field.name === "confPassword"
              ? "input_error conf_password_error"
              : desktopView
              ? "input_error input_error_desktop"
              : "input_error"
          }
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView && "63%"}` }}
        ></i>
      )}
    </div>
  );
}
