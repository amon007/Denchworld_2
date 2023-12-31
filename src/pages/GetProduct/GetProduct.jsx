import { useEffect, useState } from 'react'
import { AllProducts, GetProductById } from '../../api'
import Carousel from 'react-multi-carousel'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/loading/Loading'
import './GetProduct.css'


export default function GetProduct() {
    const [product,setProduct] = useState([])
    const [productRecommend,setProductRecommend] = useState([])
    const [counter,setCounter] = useState(0)
    const [loading,setLoading] = useState(true)
    const _id = localStorage.getItem('productID')
    const navigate = useNavigate()
    useEffect(() => {
        GetProductById(_id).then(data => {
            console.log(data.producte);
            setProduct(data.producte)
            setLoading(false)
        })
    },[])
    useEffect(() => {
      AllProducts().then(data => {
        console.log(data);
        setProductRecommend(data.posts)
      })
    },[])
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };



  return (
    <>
    {loading && <Loading/>}
    {!loading &&  <div className='product grid grid-cols-2 2xl:container 2xl:mx-auto'>
        <div className='info bg-[#F5F7FF]'>
            <div className='info h-full w-full flex flex-col p-20'>
              <div className=' mb-8'>
                <Link to={'/'}className='mr-2'><FontAwesomeIcon icon={faHome}/>   Home</Link>
                <Link to={-1}><FontAwesomeIcon icon={faAngleLeft} fade/> Back</Link>
              </div>
                <div className='title font-bold text-[32px]'>{product.title}</div>
                <div className='desc text-justify'>{product.description}</div>
                <div className=' flex items-end h-full'>
                    <div className='buyBlock flex items-center'>
                      <button onClick={() => navigate('/buy/' + product._id)} className='border-none bg-[#0156FF] text-white h-[50px] w-[151px] rounded-[40px]'>Ավելացնել քարտին</button>
                      <input type="number" min={1}  placeholder='1' className=' border-2 border-black rounded outline-none w-[60px] ml-2 p-2' onChange={(e) => setCounter(e.target.value)}/>
                      <div className=' ml-2'>{counter > 0 ? counter * product.price + '֏' : product.price + '֏'}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='imagesBlock m-8'>
          {console.log(product)}
            <Carousel responsive={responsive} className='images w-[700px] h-[700px]'>
              {
                product.photos.map(el => <div key={el._id} className='image w-[700px] h-[500px] flex' style={{background:`url('${el.url}')`,backgroundSize:'cover',backgroundPosition:'center'}}></div>)
              }
            </Carousel>
        </div>
    </div>} 
      <div className='2xl:container 2xl:mx-auto w-full'>
            <p className=' text-center  text-2xl font-semibold mt-2'>Այլ ապրանքներ</p>
              <div className=' grid sm:grid-cols-2 lg:grid-cols-4'>
              {
                productRecommend.map(el => <a href="" className='m-4' key={el._id}>
                    <div key={el._id} 
                      className=' flex justify-center items-center flex-col  p-4 cursor-pointer duration-300 hover:shadow-lg'
                      onClick={() => {
                        localStorage.setItem('productID',el._id)
                        navigate('/electronic/' + el._id)}}>   
                          <img src={el.photos[0].url} alt="" className='h-[230px] w-[230px]'/>
                          <div className='titleCateg font-semibold'>{el.title}</div>
                          <div>{el.price} ֏</div>
                      </div>
                  </a>)
              }
              </div>
      </div>
  </>
  )
}
