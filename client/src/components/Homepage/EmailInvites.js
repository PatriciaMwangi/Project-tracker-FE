import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import './bootstrap-import.css'
import { FaEnvelope } from 'react-icons/fa';


const Invited = () =>{

    const navigate = useNavigate()
    const { register, handleSubmit} = useForm()

    const onSubmit = (data) =>{

      const emailAddresses =[data.email1,data.email2,data.email3,data.email4]

        fetch('http://127.0.0.1:5000/project_members',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({emails:emailAddresses})
        })
        .then((response)=>response.json())
        .then(data =>{
            console.log("data", data)
            navigate('/home')
        })
        .catch(error => console.log("Error", error))

    }
    
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
                  {...register("email1", { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email 2"
                  {...register("email2", { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email 3"
                  {...register("email3", { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email 4"
                  {...register("email4", { required: true })}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6d28d9', // Purple background
                  color: 'white', // White text
                  borderRadius: '0.375rem', // Rounded corners
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5b21b6'} // Darker purple on hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'} // Reset to original purple
        >      
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    ); 

}
export default Invited