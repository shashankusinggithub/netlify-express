import React, { useEffect, useState } from "react";
import "./index.css"
import axios from "axios";
import playlisticon from "./images.png"
import addplaylist from "./images (1).png"



const Playlistbox = (props) => {
    // header and token

    const token = localStorage.getItem("token")
    const headers = {
        authorization: token
    }
    const [playlistdisplay, setPlaylistDisplay] = useState(false)
    const [checked, setChecked] = React.useState(false);


    
    const createplaylist= async ()=>{
        {document.getElementById("createplaylistname").value && await axios.post("selfplaylist/createplaylist",{name: document.getElementById("createplaylistname").value }, {headers})}
        document.getElementById("createplaylistname").value = ''
        // props.setDetails()
        // console.log(props.details)

    }
    const Newlist =        
            props.details.map((det) => (
                <div> <input type="checkbox" id={det.value} onKeyDown={() => addorremove(det.value)} onClickCapture={() => addorremove(det.value)} />
        <label className="inputplaylist"  >{det.label}</label></div>
                ))



            
    const addorremove=(id)=>{
        console.log(document.getElementById(id).value)
        if ( !document.getElementById(id).checked){
            console.log({playid: id, movie: props.movie})
            axios.post("selfplaylist/removefromplaylist",{playid: id, movie: props.movie})
        }if(document.getElementById(id).checked){
            console.log({playid: id, movie: props.movie}, 'remove')
            axios.put("selfplaylist/addtoplaylist",{playid: id, movie: props.movie})
        }
    } 

   

    



    return (
        <div className="playlistbox">

            {playlistdisplay && <form className="playlistlist"  onSubmit={e => e.preventDefault()} >

                {/* <label for="username">Create Playlist</label>
                <div>
                <button className="createbutton" onClick={() => props.createplaylistto(document.getElementById("createplaylistname").value)}>Create.!</button>
            </div> */}
            <input
                className="createplaylisttype" type="text" id="createplaylistname" />
                <img className="playlistimgopen"
                onClick={() => createplaylist()}
                src={addplaylist}  />
                <br></br>

                {Newlist}

            </form>}

            <img className="playlistimgopen"
                onClick={() => { setPlaylistDisplay(bol => !bol) }}
                src={playlisticon}  />
        </div>
    )

}
export default Playlistbox