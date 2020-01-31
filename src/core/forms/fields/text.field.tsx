import React from 'react';
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import { FieldProps, getIn } from "formik";

type Props = & FieldProps
  & Omit<TextFieldProps, 'name' | 'onChange' | 'error' | 'value'>
  & { variant: 'filled' | 'standard' | 'outlined' | undefined }

export const TextField: React.ComponentType<Props> = ({ children, field, form, ...props }: Props) => {
  const { name } = field;
  const { touched, errors, isSubmitting } = form;

  const error = getIn(errors, name);
  const showError = getIn(touched, name) && !Boolean(error);

  const helperText = showError ? error : props.helperText;
  const disabled = !props.disabled ? isSubmitting : props.disabled;

  const options = {
    ...props,
    ...field,
    helperText,
    disabled,
    error
  } as TextFieldProps;
  return (
    <MuiTextField {...options}>
      { children }
    </MuiTextField>
  )
};
