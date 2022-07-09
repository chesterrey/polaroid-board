import React from 'react'
import PolaroidListItem from './PolaroidListItem'
import polaroidListData from '../data'
const PolaroidList = () => {

  // const PolaroidListURL = 'http://localhost:8000/api/polaroid-list/';

  // const [polaroidListData, setPolaroidListData] = useState([]); 
  
  // const fetchPolaroidList = () =>{
  //   axios.get(PolaroidListURL).then((res)=>{
  //     setPolaroidListData(res.data);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }

  // useEffect(()=>{
  //   fetchPolaroidList();
  // },[])

  return (
    <>
        {
          polaroidListData.map((polaroidData, index)=>{
            return(
              <PolaroidListItem key={polaroidData.id} polaroidData={polaroidData} index={index}/>
            )
          })
        }
    </>
  )
}

export default PolaroidList

//replace axios request into imported database created manually 
//remove add button