import * as React from 'react';
import { KeyDirection } from './InputWithSuggesstions';

type OnKeyNavigation = (keyDirection: KeyDirection) => void;

interface ISearchInputProps {
  onKeyNavigation: OnKeyNavigation;
}

const getOnKeyDown = (onKeyNavigation: OnKeyNavigation) => (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (e.key === 'ArrowDown') {
    onKeyNavigation(KeyDirection.DOWN);
    return;
  }
  if (e.key === 'ArrowUp') {
    onKeyNavigation(KeyDirection.UP);
    return;
  }
};

export const SearchInput = ({ onKeyNavigation }: ISearchInputProps) => (
  <input onKeyDown={getOnKeyDown(onKeyNavigation)} />
);
