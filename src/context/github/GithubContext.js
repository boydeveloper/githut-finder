import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    loading: false,
    repos: [],
    user: {},
    users: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //GET INITIALS
  //GET SEARCH TRESULTS
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };
  ///single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = '/notFound';
    } else {
      const data = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };
  //cler

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });
  //
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
