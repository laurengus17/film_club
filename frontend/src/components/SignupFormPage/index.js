import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
const dispatch = useDispatch();
const sessionUser = useSelector((state) => state.session.user);
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
const [errors, setErrors] = useState([]);

if (sessionUser) return (
    <Redirect to="/" />
) 

const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
    setErrors([]);
    return dispatch(sessionActions.signup({ email, username, password, image }))
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
};

const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
};

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };

return (
<div className='signup-outer'>
    <div className='signup-structure'>
        <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <h2 className='signup-title'>Sign Up</h2>
        <div className='signup-body'>
                <input
                type="text"
                className='input'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="text"
                className='input'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <input
                type="password"
                className='input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <input
                type="password"
                className='input'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
                <input 
                type="file" 
                onChange={updateFile} 
                className='input'
                />
                {/* <label>
                    Multiple Upload
                    <input 
                    type="file"
                    multiple
                    onChange={updateFiles} />
                </label> */}
        </div>
        <button type="submit" className='signup-button'>Sign Up</button>
        </form>
        <div>
            {sessionUser && (
            <div>
                <h1>{sessionUser.username}</h1>
                <img
                style={{ width: "150px" }}
                src={sessionUser.profileImageUrl}
                alt="profile"
                />
            </div>
            )}
        </div>
    </div>
</div>
);
}

export default SignupFormPage;