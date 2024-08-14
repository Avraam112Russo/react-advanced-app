import {classNames} from "shared/lib/classNames";

describe('classNames',() => {

    test('test-with-one-classname', () => {
        expect(classNames('someClass')).toBe('someClass')
    });


    test('test-with-multiple-classnames', () => {
        const expectedResult = 'someClass classname2 classname3'
        expect(classNames('someClass', {}, ['classname2', 'classname3'])).toBe(expectedResult)
    });

    test('test-with-multiple-classnames-and-with-mods', () => {
        const expectedResult = 'someClass classname2 classname3 hovered scrollable'
        expect(classNames('someClass', {hovered:true, scrollable:true, readable:false}, ['classname2', 'classname3']))
            .toBe(expectedResult)
    });

    test('test-with-multiple-classnames-and-with-mods-and-undefined-props', () => {
        const expectedResult = 'someClass classname2 classname3 hovered scrollable'
        expect(classNames('someClass', {hovered:true, scrollable:true, readable:false, someProps:undefined}, ['classname2', 'classname3']))
            .toBe(expectedResult)
    });


})