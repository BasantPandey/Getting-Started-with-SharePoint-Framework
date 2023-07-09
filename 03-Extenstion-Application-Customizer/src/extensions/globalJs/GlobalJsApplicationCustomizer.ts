import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GlobalJsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GlobalJsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGlobalJsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalJsApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalJsApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
      /* handle error */
    });

   
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top
      );
    

      if (this._topPlaceholder?.domElement) {
        this._topPlaceholder.domElement.innerHTML = `
        <div>
          <div >
            <i class="ms-Icon ms-Icon--Info" aria-hidden="true"> 
            this is top placeholder
            </i>   
          </div>
        </div>`;
      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom
      );
    

      if (this._bottomPlaceholder?.domElement) {
        this._bottomPlaceholder.domElement.innerHTML = `
        <div>
          <div >
            <i class="ms-Icon ms-Icon--Info" aria-hidden="true"> 
            this is bottom placeholder
            </i>   
          </div>
        </div>`;
      }
    }
    
    return Promise.resolve();
  }
}
