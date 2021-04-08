import React, {useEffect} from 'react';

function HorizontalAd() {
    useEffect(() => {
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        var adsbygoogle;
        (adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
    return (
        <div style={{ padding:'20px' }}>
           
            <ins className='adsbygoogle adslot_2'
                style={{ display:'inline-block' , textAlign: 'center' , minWidth:'400px',maxWidth:'970px',width:'100%',height:'90px!imporant'}}
                data-ad-client='ca-pub-7362256281567785'
                data-ad-slot='6606615613'
                data-ad-format='horizontal'
                data-full-width-responsive="true"
                
            />
        </div>
    )
}

export default HorizontalAd;
