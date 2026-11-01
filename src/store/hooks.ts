import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Typed versions of the React-Redux hooks, so components get autocomplete and type errors
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
