import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import {string} from 'yup';
import {setLoading} from '../appState';
import {RootState} from '../store';
import {fetchSellers} from './thunks';

export type SellerType = {
  id: string;
  name: string;
  description: string;
  location: any;
};

export type SellerQueryHits = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: {
    id: number;
    name: string;
    description: string;
    location: any; //POINT (-66.646332 45.964993);,
    createdAt: any;
    updatedAt: any;
  };
};

interface AdditionalSellerState {
  example: boolean;
}

export const SellersAdapter = createEntityAdapter<SellerType>();

const initialState: EntityState<SellerType> & AdditionalSellerState =
  SellersAdapter.getInitialState({
    example: false,
  });

const sellersSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSellers.pending, state => {
      console.log('PENDING', state);
    });
    builder.addCase(fetchSellers.fulfilled, (state, action) => {
      SellersAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchSellers.rejected, state => {
      console.log('FAILED');
    });
  },
});
// All possible selector actions
// https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions

// All possible CRUD Actions
// https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions

export const {
  selectById: selectSellerById,
  selectIds: selectSellerIds,
  selectEntities: selectSellerEntities,
  selectAll: selectAllSellers, // use in app example: const sellers = useSelector(selectAllSellers);
  selectTotal: selectTotalSellers,
} = SellersAdapter.getSelectors((state: RootState) => state.sellers);

export default sellersSlice.reducer;

/*

initialState NOTE
The initial state value for this slice of state.

This may also be a "lazy initializer" function, which should return an initial state value when called. This will be used whenever the reducer is called with undefined as its state value, and is primarily useful for cases like reading initial state from localStorage.
*/
