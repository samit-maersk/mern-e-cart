import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userInfo } from '../redux/authSlice';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            <table className="table table-border mt-5 mp-5">
                <thead>
                    <tr>
                        {Object.keys(user).map((key, index) => <th key={index}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(user).map((key, index) => <td key={index}>{user[key]}</td>)}
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button className="btn btn-info">Edit Profile</button>
                <button className="btn btn-danger">Reset Password</button>
            </div>
        </div>
    )
}

export default Profile