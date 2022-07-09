import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const PolaroidForm = () => {

    const PolaroidListURL = 'http://localhost:8000/api/polaroid-list/';

    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [opacity, setOpacity] = useState('calc(0)');
    const [displayImg, setDisplayImg] = useState('');

    const navigate = useNavigate();

    const handleCloseBtn = () =>{
        setOpacity('calc(0)');
        setTimeout(navigate, 400, '/')
    }

    const handleChange = (event) =>{
        setTitle(event.target.value)
    }

    useEffect(()=>{
        setOpacity('calc(100)')
    },[]);

    const formatDate = (date)=>{
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const date = formatDate(Date.now())

    const handleUpload = (event) =>{
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          const uploadedImg = reader.result;
          setDisplayImg(uploadedImg);
        });
        if(event.target.files.length > 0){
          reader.readAsDataURL(event.target.files[0])
        } else {
          setDisplayImg();
        }
        setImg(event.target.files[0]);
    }

    const handleSubmit = () =>{
        const uploadData = new FormData();
        uploadData.append('img', img, img.name);
        uploadData.append('title', title);
        
        axios.post(PolaroidListURL, uploadData,{
            header: {
                'content-type': 'multipart/form-data'
            },
        }).then(res => {
            setOpacity('calc(0)');
            setTimeout(navigate, 400, '/')
        }).catch(err=>console.log(err))
    }

    return (
        <>
            <div className='polaroid-detail' style={{opacity: opacity}}> 
                <svg onClick={handleCloseBtn} className='close-btn' viewBox="0 0 384 512"><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
                <div className='image-container form'>
                    <img src={displayImg} alt=''/>
                    <label className='file-upload'>
                    <input type='file' id="image-input" accept="image/jpeg, image/png, image/jpg" onChange={handleUpload}/>
                    Upload Photo
                    </label>
                </div>
                <div className='title-field'>
                    <input type='text' placeholder='Enter title' value={title} onChange={handleChange}/>
                </div>
                <p>{date}</p>
                <div className='pin-btn' onClick={handleSubmit} >
                    <img alt='pin-btn' src='static/images/pin-btn.png'/>
                </div>
            </div>
        </>
  )
}

export default PolaroidForm