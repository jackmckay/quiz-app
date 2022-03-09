import { render, screen } from '@testing-library/react';
import {shallow} from 'enzyme';
import App from './App';

test('renders app', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
