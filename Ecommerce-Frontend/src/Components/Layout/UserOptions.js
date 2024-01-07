import React,{useState} from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Dashboard, ExitToApp,Person,ListAlt} from '@material-ui/icons';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../Store/UserActions';


const UserOptions = ({ user }) => {
    const [open,setOpen]=useState(false);
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const profile=()=>{
        navigate('/account');
    };

    const order =()=>{
        navigate('/myOrders');
    };
    const dashboard =()=>{
        navigate('/admin/dashboard');
    };
    const logOut =()=>{
        dispatch(logOutUser("hello"));
        alert.success("Log Out Successfully");
    };

    const options=[
        {icon:<Person></Person>, name:"Profile", func: profile},
        {icon:<ListAlt></ListAlt>, name:"Orders", func: order},
        {icon:<ExitToApp></ExitToApp>, name:"LogOut", func: logOut}, 
      ];
      if(user.role==="admin"){
          options.unshift( {icon:<Dashboard></Dashboard>, name:"Dashboard", func:dashboard});
      }

    return (
        <div className=' absolute right-2 top-20'>
        
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<img src={user.avatar.url} alt='profileImgs' className='h-full w-full rounded-full'></img>}
                direction='down'
                open={open}
                onOpen={()=>setOpen(true)}
                onClose={()=>setOpen(false)}
                className='z-40'
            >  
            {options.map((item,i)=>(
                <SpeedDialAction icon={item.icon} key={i} onClick={item.func} tooltipTitle={item.name} className='z-10'></SpeedDialAction>
            ))}
            </SpeedDial>
        </div>
    )
}

export default UserOptions