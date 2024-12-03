import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/login" />;
};

// Prop validation using PropTypes
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children is passed and is a valid React node
};

export default PrivateRoute;
