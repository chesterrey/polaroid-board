import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import polaroidListData from '../data'
const PolaroidDetail = () => {

    const {id} = useParams();
    const [imageElement, setImageElement] = useState();
    const [imageStyle, setImageStyle] = useState({}); 
    const [containerHeight, setContainerHeight] = useState('');

    useEffect(()=>{
        if(imageElement){
          if(imageElement.clientWidth > imageElement.clientHeight){
            let styleObject = {
              transform: 'rotate(90deg)',
              width: containerHeight
            };
            setImageStyle(styleObject);
          }
        }
      },[containerHeight, imageElement]);


    const [opacity, setOpacity] = useState('calc(0)');

    const navigate = useNavigate();


    useEffect(()=>{
        setOpacity('calc(100)')
    },[]);

    const handleCloseBtn = () =>{
        setOpacity('calc(0)');
        setTimeout(navigate, 400, '/')
    }

    const polaroidData = polaroidListData[id]

    return (
        <div className='polaroid-detail' style={{opacity: opacity}}> 
            <svg onClick={handleCloseBtn} className='close-btn' viewBox="0 0 384 512"><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
            <div className='image-container'>
                <img src={'/static/polaroid-images/'+polaroidData.img} alt={polaroidData.title} style={imageStyle} onLoad={(event)=>{
                setImageElement(event.target)
                setContainerHeight(event.target.parentNode.clientHeight)
                window.addEventListener('resize', ()=>{setContainerHeight(event.target.parentNode.clientHeight)})}}/>
            </div>
            <div className='title-field'>
                <h1>{polaroidData.title}</h1>
            </div>
            <p>{polaroidData.date}</p>
        </div>
  )
}

export default PolaroidDetail

//replace axios get request into manually database [x]
//remove edit and delete buttons [x]
//change input into h1 [x]
//replace img src file path [x]