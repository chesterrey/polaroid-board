import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const PolaroidListItem = ({polaroidData, index}) => {
  
  const [isPortrait, setIsPortrait] = useState(true);
  const [orientation, setOrientation] = useState('');
  const [imageElement, setImageElement] = useState();
  const [imageStyle, setImageStyle] = useState({});
  const [containerHeight, setContainerHeight] = useState('');

  const navigate = useNavigate();

  const handlePinClick = () =>{
    setIsPortrait(!isPortrait);
    if(isPortrait){
      setOrientation('');
    } else{
      if(index%2 !== 0){
        setOrientation('rotate(90deg) translateY(-4vw)')
      } else {
        setOrientation('rotate(-90deg) translateY(-4vw)')
      }

    }
  }

  const handleDoubleClick = (id) =>{
    navigate(`/polaroid/${id}`);
  }

  useEffect(()=>{
    if(imageElement){
      if(imageElement.clientWidth > imageElement.clientHeight){
        if(index%2 !== 0){
          setOrientation('rotate(90deg) translateY(-4vw)');
        } else {
          setOrientation('rotate(-90deg) translateY(-4vw)');
        }

        let styleObject;

        if(index%2 !== 0){
            styleObject = {
            transform: 'rotate(-90deg)',
            width: containerHeight
          };
        } else {
          styleObject = {
            transform: 'rotate(90deg)',
            width: containerHeight
          };
        }

        setImageStyle(styleObject);
      }
    }
  },[containerHeight, imageElement, index]);


  const handleReposition = (event) =>{
      let polaroidItemDiv = event.target.parentNode.parentNode;
      if (index%2 !== 0){
        polaroidItemDiv.classList.add('right');
      } else {
        polaroidItemDiv.classList.add('left');
      }
  }

  return (
    <div className='polaroid-list-item' style={{transform: orientation, zIndex: `${Math.floor(99/(index+1))}`}} onLoad={handleReposition}>
        <div className='pin-bottom' onClick={()=>{handlePinClick()}}>
            <div className='pin-top'></div>
        </div>     
        <div className='image-container' onDoubleClick={()=>{
          handleDoubleClick(polaroidData.id)
        }}>
            <img alt='polaroid' src={'static/polaroid-images/'+polaroidData.img} style={imageStyle} onLoad={(event)=>{
              setImageElement(event.target)
              setContainerHeight(event.target.parentNode.clientHeight)
              window.addEventListener('resize', ()=>{setContainerHeight(event.target.parentNode.clientHeight)})}}/>
        </div>
        <h3>{polaroidData.title}</h3>
        <p>{polaroidData.date}</p>
    </div>
  )
}

export default PolaroidListItem
