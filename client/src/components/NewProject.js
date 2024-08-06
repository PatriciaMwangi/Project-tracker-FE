import { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom'

import { useForm, SubmitHandler } from "react-hook-form"

const NewProject = () => {
    const { register, handleSubmit} = useForm()
    const [ input, setInput] = useState([])


    const navigate = useNavigate()

    const onSubmit = (data) =>{
        console.log(data)
        setInput(data)

        localStorage.setItem('project_data',JSON.stringify(data))
        navigate('/invitations')


    }


    const dateInput = useRef(null)

    useEffect(()=>{
        const today = new Date().toISOString().split('T')[0]
        if (dateInput.current) {
            dateInput.current.value = today
           
        }
    },[])

    const handleRedirect = () =>{
        //e.preventDefault()
        
    }
    const HandleLink = (e) =>{
        if(!input.ghlink){
            e.preventDefault()
            alert('Please fill up the gh link')
        }
    }
    return (
        <>
        <h1>New Projects</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
            type ='text'
            name='name'
            placeholder="PROJECT NAME"
            {...register("name", { required: true })} 
            />
            <input
            type='text'
            name='description'
            placeholder="PROJECT DESCRIPTION"
            {...register("description", { required: true })}
             />
            <input 
            type='text'
            name='ghlink'
            placeholder="GITHUB LINK"
            {...register("ghlink", { required: true })} 
            />
            {input && (
                < a
                title="Click me and i'll take you to the github page"
                href={input.ghlink}
                target="_blank"
                rel = "noopener noreferrer"
                onClick={HandleLink}
                >
                    Go to project
                </a>
            )}
            <button 
            type='submit'
            >Invite Members</button>
        </form>
    </>
    )
}
export default NewProject