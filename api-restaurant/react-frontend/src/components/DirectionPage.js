import React, {useState} from 'react'
import Iframe from 'react-iframe'
// import { Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'



import Embed from 'react-embed';


function DirectionPage() {
    
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCoord);
        //   console.log(position.coords.latitude)
        //   console.log(position.coords.longitude)
        } else {
            console.log('error')
        }
      }
      
      function getCoord(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      }
    let test = 12
    return (
        <div>
           {getLocation()}
           {/* <Link to="https://www.google.com/maps/search/Chipotle/@${latitude},${longitude},20z">
               <Button>
                   <p>Click Me!</p>
               </Button>
            </Link> */}

          {/* <form action="https://www.google.com/maps/search/Chipotle/@${latitude},${longitude},20z">
              <input type="submit" value="Go to Chipotle" />
          </form> */}

          <p>Check out <a href="https://www.google.com/maps/search/Chipotle/@${latitude},${longitude},20z" target="_blank" rel="noopener noreferrer">freeCodeCamp</a>.</p>

            
           {/* <Embed width = {500} height = "1000" url={`https://www.google.com/maps/search/Chipotle/@${latitude},${longitude},20z`} /> */}
           
            {/* <Iframe url="http://www.youtube.com/embed/dQw4w9WgXcQ" width="450px" height="450px"
            id="iframeId" display="initial" position="relative"/> */}
            

            {/* https://www.google.com/maps/@38.5543196,-121.7537398,15z */}
            {console.log('x ',latitude)}
            {console.log('y ',longitude)}
            {/* <h1>{`https://www.google.com/maps/@${latitude},${longitude}`}</h1> */}
            
            {/* <Iframe src={`https://www.google.com/maps/embed/@${latitude},${longitude},2z?hl=en-US`} width="1515" height="1000" 
             id="iframeId" display="initial" position="relative"/> */}

            
                
                {/* <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99843.29130273024!2d-121.81796789917398!3d38.55444402497057
                !2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808529735e834de5%3A0x80e9e5db64a12406!2sChipotle%20Mexican%20Grill!5e0!3m2
                !1sen!2sus!4v1632614249740!5m2!1sen!2sus"
                 width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></Iframe>
                <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99842.97637221195!2d-121.81796794771395!3d38.55467078438871
                !2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085297503bdbc59%3A0xaee10b2dd7940d88!2sTaco%20Bell!5e0!3m2!1sen!2sus!4v1632614602558!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></Iframe> */}
      
        </div>
    )
}

export default DirectionPage
