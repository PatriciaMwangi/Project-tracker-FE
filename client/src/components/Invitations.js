import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"

const Invited = () =>{

    const navigate = useNavigate()
    const { register, handleSubmit} = useForm()


    // const [emails,setEmail]=useState(["","","",""])

    const [projectData,setProjectData] = useState({})



    const onSubmit = (data) =>{
        // 
        let userData = JSON.parse(localStorage.getItem('project_data'))

        console.log("Projext", userData)
        console.log("Projext", userData["name"])



    

        let projObj = {
            name: userData?.name,
            description: userData?.description,
            ghlink: userData?.ghlink,
            contributors: data

        }
        console.log(data)
        console.log("REquest data", projObj)
        fetch('http://127.0.0.1:5600/projects',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projObj)
        })
        .then((response)=>response.json())
        .then(data =>{
            console.log("data", data)
            navigate('/new_project')
        })
        .catch(error => console.log("Error", error))

    }
    
    // const handleEmail = (index,event) => {
    //     const NewEmails = [...emails]
    //     NewEmails[index] = event.target.value
    //     setEmail(NewEmails)
    //     console.log(NewEmails)

    // }

    useEffect(()=>{
        const storedProject = localStorage.getItem('project_data')
        const parsed = JSON.parse(storedProject)
        setProjectData(parsed)
    },[])

    // const handleSubmit = (e) =>{
    //     e.preventDefault()
    //     console.log({
    //         ...projectData,
    //         contributors: emails
    //     });  

    //     fetch('http://127.0.0.1:5600/projects',{
    //         method :'POST',
    //         headers : {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             ...projectData,
    //             contributors:emails,
    //         }), 
    //     })
    //     .then((response)=>response.json())
    //     .then((data)=>{
    //         console.log('Success',data)
    //         navigate('/new_project')
    //     })
    //     .catch((error)=>{
    //         console.log('Error:', error)
    //     })
    // }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* {emails.map((email, index) => ( */}
        <input
                    // key={index}
                    type='email'
                    // value={email}
                    placeholder={`Email  1`}
                    {...register("email1", { required: true })}
                    // onChange={(e) => handleEmail(index, e)}
                    // required={index < 4}
                />

<input
                    // key={index}
                    type='email'
                    // value={email}
                    // placeholder={`Email ${index + 1}`}
                    placeholder={`Email  2`}

                    {...register("email2", { required: true })}
                    // onChange={(e) => handleEmail(index, e)}
                    // required={index < 4}
                />
        
                 <input
                    // key={index}
                    type='email'
                    // value={email}
                    // placeholder={`Email ${index + 1}`}
                    placeholder={`Email  3`}

                    {...register("email3", { required: true })}
                    // onChange={(e) => handleEmail(index, e)}
                    // required={index < 4}
                />
                 <input
                    // key={index}
                    type='email'
                    // value={email}
                    // placeholder={`Email ${index + 1}`}
                    placeholder={`Email  4`}

                    {...register("email4", { required: true })}
                    // onChange={(e) => handleEmail(index, e)}
                    // required={index < 4}
                />
            {/* ))} */}
            <button type='submit'>Submit</button>
        </form>
        
        </>
    )
}
export default Invited