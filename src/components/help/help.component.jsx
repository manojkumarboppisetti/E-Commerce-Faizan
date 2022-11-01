import './help.styles.scss'
import {Accordionn} from "../accordian/accordiaon.component";

export const Help=()=>{
    return(
        <>
            <div className='main-div'>
                <div className='sub-main-div'>
                    <div className='card-div'>
                        <h1>Tericsoft Technology Solutions Pvt Ltd </h1>
                        <p>Address: Judges Colony, New Malakpet, Hyderabad, Telangana 500036</p>
                        <p>Contact: 8299651725</p>

                    </div>
                </div>
                <div className='accordionn'>
                    <p>Frequently Asked Questions:</p>
                    <Accordionn/>
                </div>

            </div>
        </>
    )
}