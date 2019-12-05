import * as React from 'react';
import ReactDOM from 'react-dom';
import { SearchInput } from './SearchInput';
import { Suggesstions } from './Suggesstions';

export enum KeyDirection {
  UP,
  DOWN,
}

export enum SuggestionsEvent {
  SELECT = 'select-suggesstion',
  UNSELECT = 'unselect-suggesstion',
}

export class InputWithSuggesstions extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.onKeyNavigation = this.onKeyNavigation.bind(this);
  }

  onKeyNavigation(keyDirection: KeyDirection) {
    const node = ReactDOM.findDOMNode(this) as Element;
    const suggestionsElements = Array.from(
      node.querySelectorAll('.suggestion'),
    );
    const selectedIndex = suggestionsElements.findIndex(el => {
      return el.getAttribute('data-selected') === 'true';
    });
    const nextIndex =
      (keyDirection === KeyDirection.UP
        ? selectedIndex - 1 + suggestionsElements.length
        : selectedIndex + 1) % suggestionsElements.length;
    suggestionsElements[selectedIndex].dispatchEvent(
      new Event(SuggestionsEvent.UNSELECT),
    );
    suggestionsElements[nextIndex].dispatchEvent(
      new Event(SuggestionsEvent.SELECT),
    );
  }

  render() {
    return (
      <div>
        <SearchInput onKeyNavigation={this.onKeyNavigation} />
        <Suggesstions />
      </div>
    );
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this) as Element;
    Array.from(node.querySelectorAll('.suggestion'))[0].dispatchEvent(
      new Event(SuggestionsEvent.SELECT),
    );
  }
}
