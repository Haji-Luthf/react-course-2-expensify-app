import React from 'react';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
//import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

//Snapshot Testing
test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
   // expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toBe('Expensify');
    //const renderer = new ReactShallowRenderer();
    //renderer.render(<Header />);
    //expect(renderer.getRenderOutput()).toMatchSnapshot();
    //console.log(renderer.getRenderOutput());
});

test('should call startLogout on button click', () => {
    const startLogoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogoutSpy}/>);
    wrapper.find('button').simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
}); 