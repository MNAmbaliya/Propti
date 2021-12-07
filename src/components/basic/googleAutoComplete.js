import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import useMediaQuery from "use-mediaquery";

const GooglePlaceAutoComplete=( { value, setSearchProperty, searchProperty, onClickSearch,cssclass="",placeholder,setAddress} )=>{
    const matches = useMediaQuery("(min-width: 800px)");
    const [add, setadd] = useState("");
    
    const onSearch = async () => {
        if(add != ""){

            setSearchProperty({
                ...searchProperty,
                address: add.formatted_address,                
            })
            onClickSearch();
        }
        else{
            console.log("Please fill the searchbox")
        }
    }
    return(
        <Fragment>       
            <div className="position-relative d-flex align-items-center hero_search">
                {
                    matches&&<Button className="search-button btn-lg hero_search" onClick = {onSearch}>Search</Button>
                }
                <Autocomplete
                    value = {value == "" ? add.formatted_address : value}
                    style={{
                        width: '100%',
                        padding: '32px 42px',
                        borderRadius:'55px',
                        border:'none',
                        boxShadow:'0px 30px 40px rgba(0, 0, 0, 0.05)',
                        outline:'none',
                        background: '#FCFDFD',
                        fontFamily:'Poppins',
                        fontSize:'20px',
                        lineHeight:'28px',
                        className:{cssclass}
                    }}
                    onPlaceSelected={(place) => {                        
                        setadd(place);
                    }}
                    
                    types={['address']}
                    componentRestrictions={{country: "au"}}
                    placeholder={placeholder}
                />
            </div>
            {
                !matches&&  
                    <div className="text-center mt-2 search_btn">
                        <Button className="app-text" style={{borderRadius:'30px'}} onClick = {onSearch}>Search</Button>
                    </div>
            }
        </Fragment>
        
    )
}

export default GooglePlaceAutoComplete;