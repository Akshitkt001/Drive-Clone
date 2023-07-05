import React, { useEffect, useState } from 'react'
import "./css/data.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from './firebase';
function Data() {
  const[files, setFiles]=useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot(snapshot=>{
      setFiles(snapshot.docs.map(doc=>({id:doc.id,
        data:doc.data()
      })))
    })
    
  },[])
  function formateBytes(bytes, decimals=2){
    if(bytes==0) return '0 bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes/Math.pow(k,i)).toFixed(dm))+''+sizes[i];


  }
 
  return (
    
    <div className='data'>
          <div className='data__header'>
               <div className='data__headerLeft'>
               <p>My Drive</p>
                <ArrowDropDownIcon/>
               </div>
               <div className='data__headerRight'>
               <ListIcon/>
               <InfoOutlinedIcon/>

               </div>
          </div>


          <div className='data__content'>
            <div className='data_grid'>
            { files.map((file)=>{
                   return <div className='data__file'>
                           <InsertDriveFileIcon/>
                           <p>{file.data.filename}</p>
                           </div>})
             
            }    
            </div>
              
            <div className='data_list'></div>
                 <div className='detailsRow'>
                    <p><b>Name</b><ArrowDownwardIcon/></p>
                    <p><b>Owner</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                 </div>
                 {files.map((file)=>{
                   return <div className='detailsRow'>
                               <p>
                                <a href={file.data.fileURL} target="_blank">
                               {file.data.filename}<InsertDriveFileIcon/>
                               </a>
                               </p>
                               <p>Akshit Kr. Tiwari</p>
                               <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                               <p>{formateBytes(file.data.size)}</p>
                           </div>
                 })
                 }
            </div>
    </div>
  )
}

export default Data