import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from './components/Footer';
import UserHomePage from './components/UserHomePage'
import UserAlbumContent from './components/UserAlbums/UserAlbumContent'
import PhotoPage from './components/PhotoForm/PhotoPage'
import HomePageLanding from './components/HomePage/HomePageLanding'


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
        <Route exact path="/">
          <HomePageLanding />
          <Footer />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path='/users/:userId'>
          <UserHomePage />
          <Footer />
        </Route>

        {/* <Route path='/api/photo/create/:albumId'>
          <CreatePhotoForm />
        </Route> */}

        <Route path='/content/:albumId'>
          <UserAlbumContent />
          <Footer />
        </Route>

        <Route path='/display/:photoId'>
          <PhotoPage />
          <Footer />
        </Route>
      </Switch>
    )}
  </>
  );
}

export default App;