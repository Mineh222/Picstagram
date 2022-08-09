import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import UserProfile from './components/UserProfile';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { authenticate } from './store/session';
import CreatePostForm from './components/CreatePostForm';
import ExplorePage from './components/ExplorePage';
import SinglePost from './components/SinglePost';
import UpdatePostForm from './components/UpdatePostForm';
import { thunkGetAllPosts } from './store/posts';
import UpdateUserProfileForm from './components/UpdateUserProfileForm';
import PhotoFeedPage from './components/PhotoFeed';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(thunkGetAllPosts());
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/:username' exact={true} >
          <UserProfile/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <PhotoFeedPage />
        </ProtectedRoute>
        <ProtectedRoute path='/post/new' exact={true} >
          <CreatePostForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/explore/posts' exact={true} >
          <ExplorePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/post/:postId' exact={true} >
          <SinglePost/>
        </ProtectedRoute>
        <ProtectedRoute path='/post/:postId/edit' exact={true} >
          <UpdatePostForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/:username/edit'>
          <UpdateUserProfileForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
