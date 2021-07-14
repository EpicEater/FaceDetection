import './FaceRecognition.css'

function FaceRecognition ( {ImgUrl, box}) {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={ImgUrl} width='500px' height='auto' />
                <div className='facebox' style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;