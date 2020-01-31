import React from "react";
import { FormikErrors, FormikConfig, ErrorMessage } from "formik";
import { FormattedMessage } from "react-intl";
import { InvalidPropertyError as FieldError } from "@core/errors/variations/validator.error";
import { TextField } from "@core/forms/fields";
import * as validator from "@core/forms/validation";
import { Field, Form, Formik, } from "formik";
import Button from "@material-ui/core/Button"
import { Props, State } from './login-form.types';
import messages from "./messages";
import { capitalize } from "lodash";

interface FormOpt {
  email: string;
  password: string;
}

const fields: FormOpt = {
  email: '',
  password: ''
};

class LoginFormComponent extends React.Component<Props, State> {
  onSubmit = (values: FormOpt, helpers: any): void => {
    helpers.setSubmitting(true);
    const { email, password }: FormOpt = values;
    const payload = {
      email,
      password
    };
    const meta = {
      helpers,
      timestamp: Date.now()
    };

    this.props.login.triggered({
      payload,
      meta
    })
  };
  
  render() {
    const { schema } = validator;
    const isEmail: validator.Validate<FormOpt> = (
      values: FormOpt
    ) => schema.email(values.email) || new FieldError<FormOpt>('invalid', 'email');
    
    const isEmailRequired: validator.Validate<FormOpt> = (
      values: FormOpt
    ) => schema.required(values.email) || new FieldError<FormOpt>('required', 'email');

    const isPasswordRequired: validator.Validate<FormOpt> = (
      values: FormOpt
    ) => schema.required(values.password) || new FieldError<FormOpt>('required', 'password');
    
    const isGreaterThan: validator.Validate<FormOpt> = (values: FormOpt) => {
      const isValid = validator.schema.greater.than;
      return isValid(values.password, 6) || new FieldError<FormOpt>('greaterThan', 'password')
    };

    const validate: FormikConfig<FormOpt>['validate'] = (
      values: FormOpt
    ): FormikErrors<FormOpt> => {
      let result: Partial<FormOpt> = {};
      const pipe = [isGreaterThan, isEmail, isEmailRequired, isPasswordRequired];
      validator.execute(pipe, values).map(
        (exception: FieldError<FormOpt>) => {
          result[exception.property] = exception.message
        }
      );

      return result;
    };

    return (
      <Formik
        onSubmit={this.onSubmit}
        initialValues={fields}
        validate={validate}
      >
        {(props) => (
            <Form>
              <Field
                label={
                  <FormattedMessage { ...messages.email }>
                    { message => capitalize(message as string)}
                  </FormattedMessage>
                }
                name="email"
                component={TextField}
              />
              <ErrorMessage component="span" name="email" />
              <Field
                label={
                  <FormattedMessage { ...messages.password }>
                    { message => capitalize(message as string)}
                  </FormattedMessage>
                }
                name="password"
                component={TextField}
              />
              <ErrorMessage component="span" name="password" />
              <Button
                type="submit"
                disabled={props.isSubmitting && props.isValidating && !this.props.status.isTriggered}
              >
                <FormattedMessage { ...messages.send }>
                  { message => capitalize(message as string) }
                </FormattedMessage>
              </Button>
          </Form>
        )}
      </Formik>
    )
  }
}

export {
  LoginFormComponent
};
