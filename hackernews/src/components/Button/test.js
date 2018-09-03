import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../App';
import Button from '../Button';


describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Show more...</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button>Show more...</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});
