import * as fromSelectors from './title.selectors';
import { TitleState } from "./title.reducers";

describe('Title selectors', () => {
  it('should select title', () => {
    const initialState: TitleState = {
      title: 'Test'
    };

    const result = fromSelectors.selectTitle.projector(initialState);
    expect(result).toEqual('Test');
  });
});
