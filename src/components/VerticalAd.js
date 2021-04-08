import React, { Component } from 'react';


var adsbygoogle;
export default class VerticalAd extends Component {
    
    componentDidMount = () => {
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        var adsbygoogle;
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
    componentDidUpdate = () => {

    }
    render() {
        return (
            <div style={{ marginBottom: "20px" }} >
               
                <ins className='adsbygoogle'
                    style={{ display: 'block' }}
                    data-ad-client='ca-pub-7362256281567785'
                    data-ad-slot='4178751068'
                    data-ad-format='vertical'
                    data-full-width-responsive="true"
                />
            </div>
        )
    }
}

// import React, { useEffect } from 'react';

// function VerticalAd({format}) {
//     useEffect(() => {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }, []);
//     return (
//         <>
//             <ins className='adsbygoogle'
//                 style={{ display: 'block' }}
//                 data-ad-client='ca-pub-7362256281567785'
//                 data-ad-slot='4178751068'
//                 data-ad-format={format}
//                 data-full-width-responsive="true"
//                 // data-full-width-responsive="false"
//             />
//         </>
//     )
// }

// export default VerticalAd;
