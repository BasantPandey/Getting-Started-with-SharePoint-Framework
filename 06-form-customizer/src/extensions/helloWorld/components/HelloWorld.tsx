import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './HelloWorld.module.scss';

export interface IHelloWorldProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'HelloWorld';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: HelloWorld mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: HelloWorld unmounted');
  }

  public render(): React.ReactElement<{}> {
    let formType = '';
    if (this.props.displayMode === FormDisplayMode.Display) {
      formType = 'Display';
    }
    else if (this.props.displayMode === FormDisplayMode.Edit)
    {
       formType = 'Edit';
    }
    else {
       formType = 'New';
    }
    return (
      <>
        <div className={styles.helloWorld}> 
          {this.props.context.list.title} :  
          {formType} : {this.props.context.item?.Title}
        </div>
        
      </>
    );
  }
}
