import { useEffect, useState } from 'react';
import { bell } from '../images';
import routes from '../routes';
import { useSelector } from 'react-redux';
import "./header.css";
import { selectAlertSuccess } from '../features/alertSlice';
export const Header = ()=>{
    const [title, setTitle] = useState<string>('');
    const success = useSelector(selectAlertSuccess);
   useEffect(()=>{
    Object.entries(routes).map(([key,value])=>{
        if(value.path.toUpperCase() ===  window.location.pathname.toUpperCase()){
            setTitle(value.title || '')
        }
    })
   },[]);

    return (
        <div className={ 'header'}>
           {/* {success &&  */}
           <>
           <div className='title dib w-20'>
                {title}
            </div>
            <div className='flex w-80 flex-end items-center'>
                <div className='mr-34'>
                    <img src= {bell} alt ='' />
                </div>
                <div className='profile'>

                </div>
                <div className='profile-name'>
                Baker Stone
                </div>
            </div>
            </>
            {/* } */}
        </div>
    )
}