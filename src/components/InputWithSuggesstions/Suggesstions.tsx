import * as React from 'react';
import * as s from './style.scss';
import { SuggestionsEvent } from './InputWithSuggesstions';

export const Suggesstions = () => {
  const list = ['s1', 's2', 's3', 's4'];
  return (
    <div>
      {list.map(suggestion => (
        <Suggestion key={suggestion} name={suggestion} />
      ))}
    </div>
  );
};

interface ISuggestionProps {
  name: string;
}

interface ISuggestionState {
  selected: boolean;
}

class Suggestion extends React.Component<ISuggestionProps, ISuggestionState> {
  ref: React.RefObject<HTMLDivElement>;

  constructor(props: ISuggestionProps) {
    super(props);
    this.state = { selected: false };
    this.setSetSelected = this.setSetSelected.bind(this);
    this.ref = React.createRef();
  }

  getClasses() {
    return `suggestion ${this.state.selected ? s.selectedSuggestion : ''}`;
  }

  setSetSelected(selected: boolean) {
    this.setState({ selected });
  }

  render() {
    return (
      <div
        className={this.getClasses()}
        data-selected={this.state.selected}
        onMouseEnter={() => this.setSetSelected(true)}
        onMouseLeave={() => this.setSetSelected(false)}
        ref={this.ref}
      >
        {this.props.name}
      </div>
    );
  }

  componentDidMount() {
    this.ref.current &&
      this.ref.current.addEventListener(SuggestionsEvent.UNSELECT, () =>
        this.setSetSelected(false),
      );
    this.ref.current &&
      this.ref.current.addEventListener(SuggestionsEvent.SELECT, () =>
        this.setSetSelected(true),
      );
  }
}
