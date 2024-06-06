import { List, ListItem, Typography ,Avatar} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import "./styles.css"

export default function UserComment({comment}) {
    // console.log(comment, "du lieu cmt");
    return (
    <>
    <ListItem sx={{width: '100%', display:'flex', flexDirection:"column"}}>
        <div style={{display:"flex", justifyContent: "flex-start", gap: "10px", width:"100%", marginBottom: "10px"}}>
            <Avatar />
            <Link sx={{width: "fit-content"}} to={`http://localhost:3000/home/users/${comment.user_id._id}`}>
                <Typography className="comment-name" sx={{ mr: '20px', fontWeight:"700", textDecoration:"underline", color:"black"}}>
                    {comment?.user_id?.first_name + " " + comment?.user_id?.last_name}
                </Typography>
            </Link>
            <Typography style={{fontWeight:"500", fontSize:"16px",paddingTop: "3px"}}>
                {moment(comment?.date_time).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
        </div>
        <Typography sx={{ display:"flex", justifyContent: "flex-start", width:"100%",backgroundColor:"whitesmoke", padding: "5px", borderRadius:"5px"}}>
            {comment.comment}
        </Typography>
    </ListItem>
    </>
    )
}