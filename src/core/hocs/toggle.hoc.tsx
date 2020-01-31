import React from 'react';

export type InjectedProps = {
  toggle: () => void;
  isToggledOn: boolean;
}

type InjectedState = {
  isToggledOn: boolean
}

type WithHoc = <T extends {}>(
  WrappedComponent: React.ComponentType<T>
) => React.ComponentType<T & InjectedProps>

export const withToggle: WithHoc = <BaseProps extends {}>(
  WrappedComponent: React.ComponentType<BaseProps>
): React.ComponentType<BaseProps & InjectedProps> => {
  type HocProps = BaseProps & InjectedProps & {};
  type HocState = InjectedState;

  return class ToggleHoc extends React.Component<HocProps, HocState> {
    static readonly WrappedComponent = WrappedComponent;
    static displayName = `${withToggle.name}(${WrappedComponent.name})`;

    state: HocState = {
      isToggledOn: false
    };

    toggle = (): void => {
      this.setState({
        isToggledOn: !this.state.isToggledOn
      })
    };

    render() {
      return (
        <WrappedComponent
          {...this.props as HocProps }
          toggle={this.toggle}
          isToggledOn={ this.state.isToggledOn }
        />
      )
    }
  }
};
