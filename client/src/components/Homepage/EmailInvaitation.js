import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import './bootstrap-import.css'

const Invited = () =>{

    const navigate = useNavigate()
    const { register, handleSubmit} = useForm()



    const [projectData,setProjectData] = useState({})



    const onSubmit = (data) =>{


        console.log(data)
        fetch('https://project-tracker-be-bs7w.onrender.com',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response)=>response.json())
        .then(data =>{
            console.log("data", data)
            navigate('/home')
        })
        .catch(error => console.log("Error", error))

    }
    
   

    useEffect(()=>{
        const storedProject = localStorage.getItem('project_data')
        const parsed = JSON.parse(storedProject)
        setProjectData(parsed)
    },[])

    


    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Invitation Email</h5>
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
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default Invited