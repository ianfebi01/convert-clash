import { useField, ErrorMessage } from "formik";
import "./style.css";

export default function TextArea({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <div
      // className={
      //   meta.touched && meta.error ? " textarea error-border" : "textarea"
      // }
      >
        {/* {console.log("input eror : ", meta.error)}
      {console.log("input Touched : ", meta.touched)}
    {console.log("input name : ", field.name)} */}
        <textarea
          className={
            meta.touched && meta.error ? " textarea error-border" : "textarea"
          }
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error && (
        <div className='error-text'>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
