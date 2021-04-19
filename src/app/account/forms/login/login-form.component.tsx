import React, { SyntheticEvent } from "react";
import { FormikErrors, FormikConfig, ErrorMessage, FormikHelpers, FormikState } from "formik";
import { FormattedMessage } from "react-intl";
import { TextField } from "@core/forms/fields";
import { Field, Form, Formik, } from "formik";
import Button from "@material-ui/core/Button"
import { TComponentProps as Props, TComponentState as State, IFormValues } from './login-form.types';
import messages from "./messages";
import { capitalize } from "lodash";
import { AbstractHandlerMiddleware } from "@core/middlewares";
import {
  LengthValidator,
  CapitalsContainsValidator,
  DigitsContainsValidator,
  EmailValidator
} from './validators';

type FormProps = FormikConfig<Readonly<IFormValues>> & FormikState<IFormValues>;

class LoginFormComponent extends React.Component<Props, State> {
  private _emailValidator: AbstractHandlerMiddleware<string>;
  private _passwordValidator: AbstractHandlerMiddleware<Array<string>>;


  constructor(props: Props) {
    super(props);
    this.state = { email: '', password: '' };

    this._emailValidator = new EmailValidator();

    this._passwordValidator = new LengthValidator(16);
    this._passwordValidator.register(new CapitalsContainsValidator(2))
      .register(new DigitsContainsValidator(3));
  }

  validate = (values: IFormValues): object => {
    const defaultMessage: string = '';

    const email: string = !this._emailValidator.isAllowed(values.email)
      ? this._emailValidator.message
      : defaultMessage;

    const password: string = !this._passwordValidator.isAllowed(
      Array.from(values.password)
    ) ? this._passwordValidator.message : defaultMessage;

    return {
      email,
      password
    }
  };

  isValid = (errors: FormikErrors<IFormValues>): boolean => {
    return !!Object.values(errors).filter(Boolean).length;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const field = event.currentTarget.name;
    const value = event.target.value;

    this.setState({ ...this.state, [field]: value });
  };

  onSubmit = (values: IFormValues, helpers: FormikHelpers<IFormValues>): void => {
    helpers.setSubmitting(true);

    const meta = {
      helpers,
      timestamp: Date.now()
    };

    this.props.login(values, meta);
  };
  
  public render() {
    return (
      <Formik
        enableReinitialize
        handleChange={this.onChange}
        onSubmit={this.onSubmit}
        initialValues={this.state}
        validate={this.validate}
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
              {
                props.touched.email && props.errors.email && (
                  <ErrorMessage component="span" name="email"/>
                )
              }
              <Field
                label={
                  <FormattedMessage { ...messages.password }>
                    { message => capitalize(message as string)}
                  </FormattedMessage>
                }
                name="password"
                component={TextField}
              />
              {
                props.touched.password && props.errors.password && (
                  <ErrorMessage component="span" name="password" />
                )
              }
              <Button
                type="submit"
                disabled={ props.isSubmitting && props.isValidating && this.isValid(props.errors) }
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

export default LoginFormComponent;
