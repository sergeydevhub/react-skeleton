import React from 'react'
import {MessageDescriptor, FormattedMessage} from 'react-intl';
import {Prompt } from 'react-router-dom'
import { FormikConsumer } from 'formik';
import { capitalize } from 'lodash';

type Props = {
  message: MessageDescriptor
};

type State = {}

class PromptIncompleteForm extends React.Component<Props, State> {
  render() {
    return (
      <FormattedMessage {...this.props.message}>
        {
          translate => (
            <FormikConsumer>
              { formik => <Prompt when={ formik.dirty } message={( capitalize(translate as string) )} /> }
            </FormikConsumer>
          )
        }
      </FormattedMessage>
    )
  }
}

export default PromptIncompleteForm
