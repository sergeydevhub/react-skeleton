import React from 'react';
import ReduxTypes from "ReduxTypes";
import { DEFAULT_LANG } from "@core/configs/localization.config";
import { connect, ConnectedProps } from 'react-redux';
import * as messages from './locales';
import { IntlProvider } from "react-intl";
import { flatten } from "@core/utils";


const mapStateToProps = (state: ReduxTypes.RootState) => ({
  language: state.localization.language
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>

type State = {
  defaultLang: string;
}

class LocalizationProvider extends React.Component<Props, State> {
  state = {
    defaultLang: DEFAULT_LANG
  };

  render() {
    const locale: (keyof typeof messages) = this.props.language;
    const flattenObj: Record<string, string> = flatten(messages[locale]);

    return (
      <IntlProvider
        locale={locale}
        messages={flattenObj}
        defaultLocale={this.state.defaultLang}
      >
        { React.Children.only(this.props.children) }
      </IntlProvider>
    )
  }
}

export default connector(LocalizationProvider);
