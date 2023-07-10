import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './Customfield.module.scss';

export interface ICustomfieldProps {
  text: string;
}

const LOG_SOURCE: string = 'Customfield';

export default class Customfield extends React.Component<ICustomfieldProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: Customfield mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: Customfield unmounted');
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.customfield}>
        { this.props.text }
      </div>
    );
  }
}
