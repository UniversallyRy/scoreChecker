import React from 'react';
import { NativeBaseProvider } from 'native-base';
import renderer from 'react-test-renderer';
import { SubmitButton, LoadingButton } from './Buttons';

describe('<SubmitButton />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(
      <NativeBaseProvider>
        <SubmitButton> Test </SubmitButton>
      </NativeBaseProvider>
    );
    console.log(tree.root)
    expect(tree.root.child.length).toBe(1);
  });
});

describe('<LoadingButton />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<LoadingButton />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
