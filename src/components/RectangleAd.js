import React, {useEffect} from 'react'


function RectangleAd() {
    
    useEffect(() => {
        var adsbygoogle;
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        (adsbygoogle = window.adsbygoogle || []).push({}); 
    }, []);
    return (
        <>
            <ins className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client='ca-pub-7362256281567785'
                data-ad-slot='4178751068'
                data-ad-format='rectangle'
                data-full-width-responsive="true"
            
            />
        </>
    )
}

export default RectangleAd
