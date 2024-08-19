import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './bootstrap-import.css';
import { FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { sendInvites } from '../../features/projects/ProjectsSlice';
import { useEffect } from 'react';

const Invited = ({ projectId }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  // Access invite status and errors from Redux store
  const { inviteStatus, inviteError } = useSelector(state => state.projects);

  const onSubmit = (data) => {
    const emailAddresses = [data.email1, data.email2, data.email3, data.email4]
      .filter(email => email.trim());  // Filter out empty fields

    if (emailAddresses.length === 0) {
      alert('Please provide at least one valid email address.');
      return;
    }

    // Dispatch sendInvites thunk
    dispatch(sendInvites({ emails: emailAddresses, projectId }));
  };

  // Handle side effects based on invite status
  useEffect(() => {
    if (inviteStatus === 'succeeded') {
      navigate('/home');
    } else if (inviteStatus === 'failed') {
      console.error(inviteError);
    }
  }, [inviteStatus, inviteError, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card" style={{ width: '18rem', padding: '1rem' }}>
        <div className="card-body">
          <h5 className="card-title mb-4 d-flex align-items-center">
            <FaEnvelope className="me-2" /> Invitation Email
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email 1"
                {...register("email1", { required: "Email is required" })}
              />
              {errors.email1 && <p className="text-danger">{errors.email1.message}</p>}
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email 2"
                {...register("email2")}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email 3"
                {...register("email3")}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="Email 4"
                {...register("email4")}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#6d28d9', 
                color: 'white', 
                borderRadius: '0.375rem', 
                border: 'none',
                cursor: inviteStatus === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s',
              }}
              disabled={inviteStatus === 'loading'}
            >
              {inviteStatus === 'loading' ? 'Sending...' : 'Submit'}
            </button>
            {inviteStatus === 'failed' && (
              <div className="alert alert-danger mt-3">
                Failed to send invites: {inviteError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invited;
