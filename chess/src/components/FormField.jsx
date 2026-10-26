function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = "",
  placeholder = "",
  required = false,
  autoComplete,
  maxLength,
}) {
  const errorId = `${id}-error`;

  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark" aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="form-input"
      />
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
