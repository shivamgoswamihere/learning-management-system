import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../redux/userSlice";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    if (loading) return <p>Loading user...</p>;
    if (error) return <p>Error: {error}</p>;

    return user ? (
        <div>
            <h2>{user.fullName}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    ) : (
        <p>No user found</p>
    );
};

export default UserProfile;
