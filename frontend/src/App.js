import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AlbumForm from './components/AlbumFormPage/AlbumForm';
import UserHomePage from './components/UserHomePage'
import CreatePhotoForm from './components/PhotoForm/CreatePhotoForm';
import UserAlbumContent from './components/UserAlbums/UserAlbumContent'
import PhotoPage from './components/PhotoForm/PhotoPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
  <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>

        <Route path="/api/album">
          <AlbumForm />
        </Route>

        <Route path='/users'>
          <UserHomePage />
        </Route>

        <Route path='/api/photo/create/:albumId'>
          <CreatePhotoForm />
        </Route>

        <Route path='/content/:albumId'>
          <UserAlbumContent />
        </Route>

        <Route path='/display/:photoId'>
          <PhotoPage />
        </Route>

      </Switch>
    )}
  </>
  );
}

export default App;