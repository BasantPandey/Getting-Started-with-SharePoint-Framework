import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CardWithImagePropertyPane } from './CardWithImagePropertyPane';

export interface ICardWithImageAdaptiveCardExtensionProps {
  title: string;
}

export interface ICardWithImageAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'CardWithImage_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CardWithImage_QUICK_VIEW';

export default class CardWithImageAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICardWithImageAdaptiveCardExtensionProps,
  ICardWithImageAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CardWithImagePropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'CardWithImage-property-pane'*/
      './CardWithImagePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.CardWithImagePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
