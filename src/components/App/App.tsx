import React from 'react';
import { translate, InjectedTranslateProps } from 'react-i18next';
import s from './App.scss';
import { InputWithSuggesstions } from '../InputWithSuggesstions/InputWithSuggesstions';

interface AppProps extends InjectedTranslateProps {}

class App extends React.Component<AppProps> {
  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <InputWithSuggesstions />
      </div>
    );
  }
}

export default translate()(App);
