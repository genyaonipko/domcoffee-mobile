import {PackActions} from './PackReducer';
import PackServiceImpl from '../../Services/PackService';

export const getPacks = () => async (dispatch, getState) => {
  try {
    dispatch(PackActions.packInit());
    const response = await PackServiceImpl.getPacks();
    dispatch(PackActions.packSuccess(response.data.data));
  } catch (error) {
    dispatch(PackActions.packFailure(error));
  }
}
