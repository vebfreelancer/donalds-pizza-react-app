import Loader from '../assets/img/loader.gif'

const Loading = () => {
    return (
        <div className='loading'>
            <div className='container'>
                <h1>loading...</h1>
                <img src={Loader} alt="" />
            </div>
        </div>
    )
}

export default Loading;